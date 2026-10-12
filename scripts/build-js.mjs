import { build } from 'esbuild';
import { readFile } from 'node:fs/promises';

const pkg = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'));
const banner = `/*! cobalto v${pkg.version} | MIT | Oscar Castellanos (TruperMax) */`;

const umdOpen = `(function (root, factory) {
  if (typeof define === 'function' && define.amd) define([], factory);
  else if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.cobalto = factory();
})(typeof self !== 'undefined' ? self : this, function () {`;
const umdClose = `return __cobalto.default;
});`;

const shared = {
  bundle: true,
  target: ['es2020'],
  legalComments: 'none',
  logLevel: 'info',
};

await build({
  ...shared,
  entryPoints: ['src/js/index.js'],
  outfile: 'dist/cobalto.js',
  format: 'esm',
  banner: { js: banner },
});

for (const minify of [false, true]) {
  await build({
    ...shared,
    entryPoints: ['src/js/umd.js'],
    outfile: minify ? 'dist/cobalto.umd.min.js' : 'dist/cobalto.umd.js',
    format: 'iife',
    globalName: '__cobalto',
    minify,
    banner: { js: `${banner}\n${umdOpen}` },
    footer: { js: umdClose },
  });
}
