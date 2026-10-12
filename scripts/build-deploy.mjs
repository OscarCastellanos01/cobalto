import { cp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

const OUT = resolve('_site');
const SITE_URL = (process.env.CB_SITE_URL || 'https://cobalto.trupermax.com').replace(/\/$/, '');

// solo lo que usan las paginas publicadas; docs/src son fuentes y no se suben
const COPIES = [
  ['docs/index.html', 'docs/index.html'],
  ['docs/instalacion.html', 'docs/instalacion.html'],
  ['docs/personalizacion.html', 'docs/personalizacion.html'],
  ['docs/componentes', 'docs/componentes'],
  ['docs/assets', 'docs/assets'],
  ['docs/js', 'docs/js'],
  ['docs/i18n', 'docs/i18n'],
  ['dist/cobalto.css', 'dist/cobalto.css'],
  ['dist/cobalto.min.css', 'dist/cobalto.min.css'],
  ['dist/cobalto.umd.js', 'dist/cobalto.umd.js'],
  ['dist/cobalto.umd.min.js', 'dist/cobalto.umd.min.js'],
];

/**
 * La landing vive en examples/ y apunta a ../; en la raiz del sitio esas rutas cambian.
 */
function landingForRoot(html, examples) {
  const pages = examples.map((file) => file.replace(/\.html$/, '')).join('|');
  // cubre atributos (href="...") y el json de la busqueda ("href": "...")
  return html
    .replace(/((?:href|src)"?:? ?=?\s?")\.\.\/(dist|docs)\//g, '$1$2/')
    .replace(new RegExp(`(href"?:? ?=?\\s?")(${pages})\\.html`, 'g'), '$1examples/$2.html')
    .replace('</head>', `  <link rel="canonical" href="${SITE_URL}/">\n</head>`);
}

function withCanonical(html, path) {
  if (html.includes('rel="canonical"')) return html;
  return html.replace('</head>', `  <link rel="canonical" href="${SITE_URL}/${path}">\n</head>`);
}

async function listHtml(dir) {
  const files = [];
  for (const entry of await readdir(resolve(OUT, dir), { withFileTypes: true })) {
    const path = `${dir}/${entry.name}`;
    if (entry.isDirectory()) files.push(...(await listHtml(path)));
    else if (entry.name.endsWith('.html')) files.push(path);
  }
  return files;
}

function sitemap(paths) {
  const urls = paths
    .map(
      (path) => `  <url><loc>${SITE_URL}/${path.replace(/(^|\/)index\.html$/, '$1')}</loc></url>`
    )
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

async function main() {
  const missing = COPIES.map(([from]) => from).filter((from) => !existsSync(resolve(from)));
  if (missing.length) {
    console.error(
      `faltan archivos generados, corre npm run build primero:\n  ${missing.join('\n  ')}`
    );
    process.exitCode = 1;
    return;
  }

  await rm(OUT, { recursive: true, force: true });
  await mkdir(resolve(OUT, 'examples'), { recursive: true });

  for (const [from, to] of COPIES) {
    await cp(resolve(from), resolve(OUT, to), { recursive: true });
  }
  const examples = (await readdir('examples')).filter((file) => file.endsWith('.html'));
  for (const file of examples) {
    await cp(resolve('examples', file), resolve(OUT, 'examples', file));
  }

  const landing = await readFile(resolve('examples/landing.html'), 'utf8');
  await writeFile(resolve(OUT, 'index.html'), landingForRoot(landing, examples));

  const pages = [...(await listHtml('docs')), ...(await listHtml('examples'))];
  for (const path of pages) {
    const file = resolve(OUT, path);
    const canonical = path === 'examples/landing.html' ? '' : path;
    await writeFile(file, withCanonical(await readFile(file, 'utf8'), canonical));
  }

  await writeFile(
    resolve(OUT, 'sitemap.xml'),
    sitemap(['index.html', ...pages.filter((p) => p !== 'examples/landing.html')])
  );
  await writeFile(
    resolve(OUT, 'robots.txt'),
    `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`
  );
  // github pages ignora carpetas que empiezan con guion bajo si no existe este archivo
  await writeFile(resolve(OUT, '.nojekyll'), '');
  // github pages usa este archivo para el dominio propio; otros hostings lo ignoran
  await writeFile(resolve(OUT, 'CNAME'), `${new URL(SITE_URL).host}\n`);
  console.log(`_site listo para ${SITE_URL}: ${pages.length + 1} paginas`);
}

main();
