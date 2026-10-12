import { chromium } from 'playwright-core';
import { mkdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { extname, resolve } from 'node:path';
import { createServer } from 'node:http';

const args = process.argv.slice(2);
const flags = new Set(args.filter((arg) => arg.startsWith('--')));
const pages = args.filter((arg) => !arg.startsWith('--'));
const outDir = resolve('.tmp/shots');
const axeSource = await readFile(resolve('node_modules/axe-core/axe.min.js'), 'utf8');

const themes = flags.has('--all-themes')
  ? ['cobalto', 'esmeralda', 'ambar', 'rubi', 'violeta', 'grafito']
  : ['cobalto'];
const modes = ['dark', 'light'];
const widths = [
  1280,
  ...(flags.has('--tablet') ? [1024, 768] : []),
  ...(flags.has('--mobile') ? [360] : []),
];

function browserPath() {
  const candidates = [
    process.env.CB_BROWSER,
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    '/usr/bin/google-chrome',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  ];
  return candidates.find((path) => path && existsSync(path));
}

const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
};

// por file:// axe no puede leer las hojas de estilo, asi que se sirve todo por http
function serve() {
  const server = createServer(async (req, res) => {
    if (req.url === '/favicon.ico') return res.writeHead(204).end();
    const path = resolve('.' + decodeURIComponent(new URL(req.url, 'http://x').pathname));
    try {
      const body = await readFile(path);
      res.writeHead(200, { 'content-type': types[extname(path)] || 'application/octet-stream' });
      res.end(body);
    } catch {
      res.writeHead(404);
      res.end();
    }
  });
  return new Promise((done) => server.listen(0, () => done(server)));
}

function slug(path) {
  return path.replace(/[\\/]/g, '_').replace(/\.html$/, '');
}

async function audit(page) {
  await page.addScriptTag({ content: axeSource });
  return page.evaluate(async () => {
    // el texto gigante del footer es decoracion pura, WCAG no le exige contraste
    const context = { exclude: [['.cb-footer__huge']] };
    const result = await window.axe.run(context, {
      runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa'] },
    });
    return result.violations.map((v) => ({
      id: v.id,
      impact: v.impact,
      nodes: v.nodes
        .slice(0, 4)
        .map(
          (n) => `${n.target.join(' ')} :: ${n.failureSummary.split('\n').slice(1, 2).join('')}`
        ),
      count: v.nodes.length,
    }));
  });
}

async function run() {
  await mkdir(outDir, { recursive: true });
  const server = await serve();
  const origin = `http://localhost:${server.address().port}`;
  const browser = await chromium.launch({ executablePath: browserPath() });
  let problems = 0;

  for (const file of pages) {
    for (const width of widths) {
      for (const accent of themes) {
        for (const mode of modes) {
          const context = await browser.newContext({
            viewport: { width, height: 900 },
            reducedMotion: 'reduce',
          });
          const page = await context.newPage();
          const errors = [];
          page.on('pageerror', (error) => errors.push(error.message));
          page.on('console', (msg) => msg.type() === 'error' && errors.push(msg.text()));
          await page.addInitScript(
            ([theme, acc]) => {
              localStorage.setItem('cb-theme', theme);
              localStorage.setItem('cb-accent', acc);
              localStorage.setItem('theme', theme);
            },
            [mode, accent]
          );
          await page.goto(`${origin}/${file.replaceAll('\\', '/')}`, { waitUntil: 'networkidle' });
          await page.evaluate(() => document.fonts.ready);

          const overflow = await page.evaluate(
            () => document.documentElement.scrollWidth - document.documentElement.clientWidth
          );
          const name = `${slug(file)}-${width}-${accent}-${mode}.png`;
          if (!flags.has('--no-shots')) {
            await page.screenshot({
              path: resolve(outDir, name),
              fullPage: !flags.has('--viewport'),
            });
          }
          const violations = flags.has('--no-axe') ? [] : await audit(page);
          const label = `${file} ${width}px ${accent}/${mode}`;
          const issues = [...errors.map((e) => `error: ${e}`)];
          if (overflow > 0) issues.push(`scroll horizontal de ${overflow}px`);
          violations.forEach((v) => {
            issues.push(`axe ${v.id} (${v.impact}, ${v.count})`);
            v.nodes.forEach((n) => issues.push(`    ${n}`));
          });
          problems += issues.length;
          console.log(issues.length ? `x ${label}\n  ${issues.join('\n  ')}` : `ok ${label}`);
          await context.close();
        }
      }
    }
  }

  await browser.close();
  server.close();
  if (problems) process.exitCode = 1;
}

run();
