import { ACCENTS } from '../layout.mjs';
import { attrs, tr } from '../i18n.mjs';

const P = 'pages.personalizacion';
const C = `${P}.customizer`;
const TOKENS = [
  'bg',
  'bg-2',
  'bg-3',
  'line',
  'line-2',
  'text',
  'muted',
  'dim',
  'accent',
  'accent-ink',
  'accent-bg',
  'accent-soft',
  'success',
  'warning',
  'danger',
  'info',
];
const SCALE = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];
const OTHER_TOKENS = [
  '`--font-cb-mono`, `--font-cb-sans`',
  '`--text-cb-xs` (11px) … `--text-cb-6xl` (`clamp(64px, 17vw, 230px)`), `--text-cb-lead`',
  '`--tracking-cb-tight|tighter|display|huge|wide|wider`',
  '`--radius-cb-sm` (5px), `--radius-cb` (8px), `--radius-cb-lg` (10px), `--radius-cb-full`',
  '`--spacing-cb-section` (110px), `--spacing-cb-block` (56px), `--spacing-cb-gutter` (24px), `--spacing-cb-nav` (64px)',
  '`--cb-max` (1180px) → `max-w-cb`',
  '`--breakpoint-cb-sm` (600px), `--breakpoint-cb-md` (960px) → `cb-sm:`, `max-cb-md:`',
  '`--shadow-cb-sm|md|lg` (`--cb-scrim`)',
  '`--cb-duration-fast|pop|duration|slow|reveal`, `--ease-cb`, `--ease-cb-out`',
  '`--cb-z-dropdown|mobile|sticky|drawer|overlay|toast|tooltip`',
];

export default {
  slug: 'personalizacion',
  order: 3,
  render({ codeBlock, table }) {
    const desc = (key, extra = '') => tr('p', `${P}.${key}`, `class="docs-section__desc${extra}"`);
    const title = (key) => tr('h2', `${P}.${key}.title`, 'class="docs-section__title"');
    const ids = [
      ['personalizador', 'customizer'],
      ['niveles', 'levels'],
      ['donde', 'where'],
      ['temas', 'themes'],
      ['modo', 'mode'],
      ['escala', 'scale'],
      ['tokens', 'tokens'],
      ['tema-propio', 'custom'],
      ['otros-tokens', 'other'],
    ];
    const sections = ids.map(([id, key]) => ({ id, key: `${P}.${key}.title` }));

    const swatches = ACCENTS.map(
      (value) =>
        `<button class="docs-swatch" type="button" data-cb-accent-set="${value}"><i data-cb-accent="${value}"></i>${tr('span', `ui.accents.${value}`)}</button>`
    ).join('\n');

    const themeCards = ACCENTS.slice(1, 5)
      .map(
        (value) =>
          `<div class="cb-card cb-card--compact bg-cb-bg" data-cb-accent="${value}">${tr('span', `ui.accents.${value}`, 'class="cb-tag cb-tag--live self-start"')}${tr('p', `${P}.themes.card`, 'class="cb-card__text"', { accent: value })}${tr('button', `${P}.themes.button`, 'class="cb-btn cb-btn--primary cb-btn--sm self-start" type="button"')}</div>`
      )
      .join('\n    ');

    const tokenGrid = TOKENS.map(
      (name) =>
        `<div><i style="background: var(--cb-${name})"></i><span><code class="text-cb-text">--cb-${name}</code><br>${tr('span', `${P}.tokens.items.${name}`, 'class="text-cb-dim"')}</span></div>`
    ).join('\n');

    const scale = SCALE.map(
      (step) => `<div style="background: var(--cb-accent-${step})"><span>${step}</span></div>`
    ).join('');

    const contrastRows = [0, 1, 2, 3]
      .map(
        (i) =>
          `<tr data-cz-row="${i}">${tr('td', `${C}.rows.${i}`, 'class="cb-table__strong"')}<td class="cb-table__num" data-cz-dark></td><td class="cb-table__num" data-cz-light></td></tr>`
      )
      .join('');

    const otherRows = OTHER_TOKENS.map((tokens, i) => [
      { key: `${P}.other.groups.${i}` },
      { code: tokens },
    ]);

    const main = `
<header class="docs-header">
  <div class="cb-label"><b>03/</b>${tr('span', 'ui.start')}</div>
  ${tr('h1', `${P}.title`, 'class="cb-h2"')}
  ${tr('p', `${P}.lead`, 'class="cb-lead"')}
</header>

<section class="docs-section" id="personalizador">
  ${title('customizer')}
  ${desc('customizer.desc')}

  <div class="cb-panel" data-docs-customizer>
    <div class="cb-panel__body grid gap-6 cb-md:grid-cols-[280px_1fr]">
      <div class="flex flex-col gap-5">
        <div class="cb-field">
          ${tr('label', `${C}.color`, 'class="cb-field__label" for="cz-color"')}
          <div class="cb-input-group">
            <input class="cb-input h-cb-control w-12 shrink-0 cursor-pointer p-1" id="cz-color" type="color" value="#3b82f6" aria-describedby="cz-hint">
            <input class="cb-input" id="cz-hex" value="#3b82f6" spellcheck="false" ${attrs({ 'aria-label': `${C}.hex` })}>
          </div>
          ${tr('p', `${C}.hint`, 'class="cb-field__hint" id="cz-hint"')}
        </div>
        <label class="cb-check"><input class="cb-switch" type="checkbox" role="switch" id="cz-tint"><span class="cb-check__text">${tr('span', `${C}.tint`)}${tr('span', `${C}.tintHint`, 'class="cb-check__hint"')}</span></label>
        <div class="cb-field">
          ${tr('span', `${C}.mode`, 'class="cb-field__label"')}
          <div class="cb-tabs--pills"><div class="cb-tabs__list" role="group" ${attrs({ 'aria-label': `${C}.mode` })}>
            ${tr('button', `${C}.dark`, 'class="cb-tabs__tab" type="button" data-cb-theme-set="dark"')}
            ${tr('button', `${C}.light`, 'class="cb-tabs__tab" type="button" data-cb-theme-set="light"')}
            ${tr('button', `${C}.system`, 'class="cb-tabs__tab" type="button" data-cb-theme-set="system"')}
          </div></div>
        </div>
        ${tr('button', `${C}.reset`, 'class="cb-btn cb-btn--ghost cb-btn--sm self-start" type="button" id="cz-reset"')}
      </div>

      <div class="flex min-w-0 flex-col gap-4">
        <div class="flex flex-wrap gap-2">
          ${tr('button', `${C}.primary`, 'class="cb-btn cb-btn--primary" type="button"')}
          ${tr('button', `${C}.outline`, 'class="cb-btn cb-btn--outline" type="button"')}
          ${tr('button', `${C}.soft`, 'class="cb-btn cb-btn--soft" type="button"')}
          ${tr('span', `${C}.active`, 'class="cb-tag cb-tag--live self-center"')}
          ${tr('span', `${C}.pro`, 'class="cb-badge cb-badge--solid self-center"')}
        </div>
        <div class="cb-alert" role="status"><div class="cb-alert__body">${tr('p', `${C}.previewTitle`, 'class="cb-alert__title"')}<p class="cb-alert__text">${tr('span', `${C}.previewText`)} ${tr('a', `${C}.previewLink`, 'href="#personalizador"')}</p></div></div>
        <div class="cb-progress"><div class="cb-progress__track" role="progressbar" ${attrs({ 'aria-label': `${C}.progress` })} aria-valuenow="62" aria-valuemin="0" aria-valuemax="100"><div class="cb-progress__bar" style="--cb-progress: 62%"></div></div></div>
        <div class="docs-table"><div class="cb-table-scroll">
          <table class="cb-table cb-table--compact">
            <thead><tr>${tr('th', `${C}.contrast`, 'scope="col"')}${tr('th', `${C}.darkColumn`, 'scope="col" class="cb-table__num"')}${tr('th', `${C}.lightColumn`, 'scope="col" class="cb-table__num"')}</tr></thead>
            <tbody id="cz-contrast">${contrastRows}</tbody>
          </table>
        </div></div>
      </div>
    </div>
    <div class="border-t border-cb-line p-5">
      <div class="cb-code">
        <div class="cb-code__head"><span>tu-tema.css</span><button class="cb-code__copy" type="button" data-cb-copy="cz-output" ${attrs({ 'data-cb-copy-done': 'ui.code.copied' })}>${tr('span', `${C}.copy`, 'data-cb-copy-label')}</button></div>
        <pre class="cb-code__pre"><code id="cz-output"></code></pre>
      </div>
    </div>
  </div>
</section>

<section class="docs-section" id="niveles">
  ${title('levels')}
  ${desc('levels.one')}
  ${codeBlock(
    `
    :root {
      --cb-accent: #e11d48;
    }
  `,
    { lang: 'css' }
  )}
  ${desc('levels.two', ' mt-8')}
  ${codeBlock(`<html data-cb-accent="esmeralda">`)}
  ${desc('levels.three', ' mt-8')}
</section>

<section class="docs-section" id="donde">
  ${title('where')}
  ${desc('where.desc')}
  ${codeBlock(
    `
    @import 'tailwindcss';
    @import 'cobalto/tailwind';

    :root {
      --cb-dark-accent: #808080;
      --cb-light-accent: #000000;
    }
  `,
    { lang: 'css', file: 'resources/css/app.css' }
  )}
  ${desc('where.cdn', ' mt-6')}
  ${codeBlock(`
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/cobalto@0.1.1/dist/cobalto.min.css">
    <link rel="stylesheet" href="/css/mi-tema.css">
  `)}
  ${desc('where.warn', ' mt-6')}
  ${codeBlock(
    `
    [data-cb-accent="marca"] {
      --cb-dark-accent: #808080;
      --cb-light-accent: #000000;
    }
  `,
    { lang: 'css', file: 'resources/css/app.css' }
  )}
  ${desc('where.activate', ' mt-6')}
  ${codeBlock(`
    <html data-cb-accent="marca">
  `)}
  <div class="mt-4">
  ${codeBlock(
    `
    cobalto.theme.setAccent('marca');
  `,
    { lang: 'js' }
  )}
  </div>
</section>

<section class="docs-section" id="temas">
  ${title('themes')}
  ${desc('themes.desc')}
  <div class="docs-swatches">${swatches}</div>
  <div class="mt-6">
  ${codeBlock(`
    <html data-cb-accent="violeta">

    <section data-cb-accent="ambar">...</section>
  `)}
  </div>
  <div class="cb-grid cb-grid--4 mt-6">
    ${themeCards}
  </div>
</section>

<section class="docs-section" id="modo">
  ${title('mode')}
  ${desc('mode.desc')}
  ${codeBlock(`
    <html data-cb-theme="light">

    <section data-cb-theme="dark">...</section>
  `)}
  ${desc('mode.variants', ' mt-6')}
  ${codeBlock(`<div class="bg-cb-bg-2 dark:bg-cb-bg-3 light:shadow-cb-sm">...</div>`)}
  ${desc('mode.js', ' mt-6')}
  ${codeBlock(
    `
    cobalto.theme.set('light'); // 'dark', 'light', 'system'
    cobalto.theme.toggle();
    cobalto.theme.setAccent('rubi');

    document.addEventListener('cb:theme', (event) => console.log(event.detail.resolved));
  `,
    { lang: 'js' }
  )}
</section>

<section class="docs-section" id="escala">
  ${title('scale')}
  ${desc('scale.desc')}
  <div class="docs-scale">${scale}</div>
</section>

<section class="docs-section" id="tokens">
  ${title('tokens')}
  ${desc('tokens.desc')}
  <div class="docs-token-grid">${tokenGrid}</div>
</section>

<section class="docs-section" id="tema-propio">
  ${title('custom')}
  ${desc('custom.desc')}
  ${codeBlock(
    `
    [data-cb-accent="marca"] {
      --cb-dark-bg: #0c0a09;
      --cb-dark-bg-2: #141210;
      --cb-dark-bg-3: #1c1917;
      --cb-dark-line: #292524;
      --cb-dark-line-2: #3a3431;
      --cb-dark-text: #f5f5f4;
      --cb-dark-muted: #a8a29e;
      --cb-dark-dim: #8a837e;
      --cb-dark-accent: #fb923c;
      --cb-dark-accent-ink: #0c0a09;

      --cb-light-bg: #fafaf9;
      --cb-light-bg-2: #f5f5f4;
      --cb-light-bg-3: #e7e5e4;
      --cb-light-line: #d6d3d1;
      --cb-light-line-2: #c4bfbb;
      --cb-light-text: #1c1917;
      --cb-light-muted: #57534e;
      --cb-light-dim: #6b645f;
      --cb-light-accent: #c2410c;
      --cb-light-accent-ink: #ffffff;
    }
  `,
    { lang: 'css', file: 'tema-marca.css' }
  )}
  ${desc('custom.status', ' mt-6')}
</section>

<section class="docs-section" id="otros-tokens">
  ${title('other')}
  ${desc('other.desc')}
  ${table([`${P}.other.headers.0`, `${P}.other.headers.1`], otherRows)}
</section>
`;
    return { main, sections };
  },
};
