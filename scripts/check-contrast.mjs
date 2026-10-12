import { readFile } from 'node:fs/promises';

const AA = 4.5;
const source = await readFile(new URL('../src/tokens.css', import.meta.url), 'utf8');

function readBlock(selector) {
  const start = source.indexOf(selector);
  if (start === -1) return {};
  const body = source.slice(source.indexOf('{', start) + 1, source.indexOf('}', start));
  const values = {};
  for (const [, name, value] of body.matchAll(/--cb-([\w-]+):\s*(#[0-9a-f]{6})/gi))
    values[name] = value;
  return values;
}

function luminance(hex) {
  const channels = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const [r, g, b] = channels.map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a, b) {
  const [x, y] = [luminance(a), luminance(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
}

// aproxima color-mix(in oklab, color 86%, black): la luminancia escala con el cubo de L
function darkenedLuminance(hex) {
  return luminance(hex) * 0.86 ** 3;
}

function fillContrast(ink, fill, mode) {
  const fillL = mode === 'dark' ? darkenedLuminance(fill) : luminance(fill);
  const [x, y] = [luminance(ink), fillL].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
}

const base = readBlock(':root,\n  [data-cb-accent="cobalto"]');
const statuses = readBlock(':root {\n    --cb-dark-success');
const themes = {
  cobalto: base,
  esmeralda: readBlock('[data-cb-accent="esmeralda"]'),
  ambar: readBlock('[data-cb-accent="ambar"]'),
  rubi: readBlock('[data-cb-accent="rubi"]'),
  violeta: readBlock('[data-cb-accent="violeta"]'),
  grafito: readBlock('[data-cb-accent="grafito"]'),
};

const surfaces = ['bg', 'bg-2', 'bg-3'];
const rules = [
  ['text', surfaces],
  ['muted', surfaces],
  ['dim', ['bg', 'bg-2']],
  ['accent', surfaces],
  ['success', surfaces],
  ['warning', surfaces],
  ['danger', surfaces],
  ['info', surfaces],
];

let failures = 0;
for (const [name, values] of Object.entries(themes)) {
  for (const mode of ['dark', 'light']) {
    const get = (token) =>
      values[`${mode}-${token}`] || statuses[`${mode}-${token}`] || base[`${mode}-${token}`];
    const problems = [];
    for (const [fg, backgrounds] of rules) {
      for (const bg of backgrounds) {
        const ratio = contrast(get(fg), get(bg));
        if (ratio < AA) problems.push(`${fg}/${bg} ${ratio.toFixed(2)}`);
      }
    }
    const ink = fillContrast(get('accent-ink'), get('accent'), mode);
    if (ink < AA) problems.push(`accent-ink/accent-bg ${ink.toFixed(2)}`);
    failures += problems.length;
    console.log(
      `${problems.length ? 'x' : 'ok'} ${name} ${mode}${problems.length ? `: ${problems.join(', ')}` : ''}`
    );
  }
}

if (failures) {
  console.log(`\n${failures} par(es) por debajo de ${AA}:1`);
  process.exitCode = 1;
}
