import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

const DIR = resolve('docs/i18n');
const BASE = 'en';
const LOCALES = ['es'];
const checkOnly = process.argv.includes('--check');

async function load(lang) {
  const path = resolve(DIR, `${lang}.json`);
  return existsSync(path) ? JSON.parse(await readFile(path, 'utf8')) : {};
}

// copia la forma del idioma base: lo traducido se conserva y lo nuevo queda vacio
function align(base, target, path, report) {
  if (Array.isArray(base)) {
    const list = Array.isArray(target) ? target : [];
    return base.map((item, i) => align(item, list[i], `${path}.${i}`, report));
  }
  if (base && typeof base === 'object') {
    const source = target && typeof target === 'object' && !Array.isArray(target) ? target : {};
    Object.keys(source)
      .filter((key) => !(key in base))
      .forEach((key) => report.extra.push(`${path}.${key}`.slice(1)));
    return Object.fromEntries(
      Object.keys(base).map((key) => [key, align(base[key], source[key], `${path}.${key}`, report)])
    );
  }
  if (typeof target === 'string') return target;
  report.missing.push(path.slice(1));
  return '';
}

function countEmpty(value) {
  if (typeof value === 'string') return value ? 0 : 1;
  return Object.values(value || {}).reduce((sum, item) => sum + countEmpty(item), 0);
}

const base = await load(BASE);
let failed = false;

for (const lang of LOCALES) {
  const current = await load(lang);
  const report = { missing: [], extra: [] };
  const { meta, ...rest } = base;
  const { meta: currentMeta = {}, ...currentRest } = current;
  const aligned = align(rest, currentRest, '', report);
  const result = {
    meta: { lang, name: currentMeta.name || lang, ready: currentMeta.ready === true },
    ...aligned,
  };
  const pending = countEmpty(aligned);
  console.log(
    `${lang}: ${report.missing.length} claves nuevas, ${report.extra.length} sobrantes, ${pending} sin traducir`
  );
  report.extra.forEach((key) => console.log(`  sobra: ${key}`));
  if (checkOnly) {
    if (report.missing.length || report.extra.length) failed = true;
    continue;
  }
  await writeFile(resolve(DIR, `${lang}.json`), `${JSON.stringify(result, null, 2)}\n`);
}

if (failed) {
  console.log('\nlas claves no coinciden, corre npm run i18n:sync');
  process.exitCode = 1;
}
