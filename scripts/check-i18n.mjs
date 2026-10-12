import { chromium } from 'playwright-core';
import { existsSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const browserPath = [
  process.env.CB_BROWSER,
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  '/usr/bin/google-chrome',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
].find((path) => path && existsSync(path));

const pages = [
  ...readdirSync('docs')
    .filter((f) => f.endsWith('.html'))
    .map((f) => `docs/${f}`),
  ...readdirSync('docs/componentes').map((f) => `docs/componentes/${f}`),
];

// el codigo de ejemplo y los nombres propios no se traducen
const ALLOWED = [
  '[data-i18n]',
  '.docs-preview',
  '.cb-code',
  'code',
  'kbd',
  'script',
  'style',
  'svg',
  '[translate="no"]',
  '.cb-command__results',
  '.cb-tooltip',
  '.cb-toaster',
].join(',');

const browser = await chromium.launch({ executablePath: browserPath });
let total = 0;

for (const file of pages) {
  const page = await browser.newPage();
  await page.goto(pathToFileURL(resolve(file)).href);
  await page.waitForTimeout(100);
  const problems = await page.evaluate((allowed) => {
    const found = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const node = walker.currentNode;
      const text = node.textContent.trim();
      if (!/\p{L}/u.test(text)) continue;
      if (node.parentElement.closest(allowed)) continue;
      found.push(`texto: "${text.slice(0, 60)}"`);
    }
    document.querySelectorAll('[aria-label], [placeholder], [title]').forEach((el) => {
      if (el.closest('.docs-preview, .cb-code, [translate="no"]')) return;
      const spec = el.getAttribute('data-i18n-attr') || '';
      ['aria-label', 'placeholder', 'title'].forEach((name) => {
        if (
          el.hasAttribute(name) &&
          /\p{L}/u.test(el.getAttribute(name)) &&
          !spec.includes(`${name}:`)
        ) {
          found.push(
            `${name}: "${el.getAttribute(name)}" en <${el.tagName.toLowerCase()} class="${el.className}">`
          );
        }
      });
    });
    return [...new Set(found)];
  }, ALLOWED);
  total += problems.length;
  if (problems.length) console.log(`x ${file}\n  ${problems.join('\n  ')}`);
  await page.close();
}

await browser.close();
console.log(total ? `\n${total} texto(s) fuera de docs/i18n` : `i18n ok (${pages.length} paginas)`);
if (total) process.exitCode = 1;
