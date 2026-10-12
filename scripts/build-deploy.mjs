import { cp, mkdir, readdir, rm, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

const OUT = resolve('_site');

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

const ROOT_INDEX = `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Cobalto</title>
  <meta http-equiv="refresh" content="0; url=examples/landing.html">
  <link rel="canonical" href="examples/landing.html">
</head>
<body>
  <a href="examples/landing.html">Cobalto</a>
</body>
</html>
`;

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

  await writeFile(resolve(OUT, 'index.html'), ROOT_INDEX);
  // github pages ignora carpetas que empiezan con guion bajo si no existe este archivo
  await writeFile(resolve(OUT, '.nojekyll'), '');
  console.log(`_site listo: ${examples.length} ejemplos y la documentacion`);
}

main();
