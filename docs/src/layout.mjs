import { dedent, escapeHtml, highlight } from './highlight.mjs';
import { BASE_LANG, attrs, availableLocales, format, plain, t, tr } from './i18n.mjs';

export const VERSION = '0.1.1';
export const REPO = 'https://github.com/OscarCastellanos01/cobalto';
export const NPM = 'https://www.npmjs.com/package/cobalto';

export const ICONS = {
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  copy: '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/>',
  check: '<path d="m5 12 5 5 9-10"/>',
  globe:
    '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z"/>',
  palette:
    '<circle cx="12" cy="12" r="9"/><circle cx="8.5" cy="10" r="1.2"/><circle cx="12" cy="7.5" r="1.2"/><circle cx="15.5" cy="10" r="1.2"/>',
};

export function icon(name, className = '') {
  const cls = className ? ` class="${className}"` : '';
  return `<svg${cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">${ICONS[name]}</svg>`;
}

export const ACCENTS = ['cobalto', 'esmeralda', 'ambar', 'rubi', 'violeta', 'grafito'];
const LANGS = ['en', 'es'];

export function codeBlock(code, { lang = 'html', file = '', fileKey = '' } = {}) {
  const source = dedent(code);
  const label = fileKey
    ? tr('span', fileKey)
    : `<span>${escapeHtml(file || lang.toUpperCase())}</span>`;
  return `<div class="cb-code">
  <div class="cb-code__head">${label}<button class="cb-code__copy" type="button" data-cb-copy ${attrs({ 'data-cb-copy-done': 'ui.code.copied' })}>${icon('copy')}${tr('span', 'ui.code.copy', 'data-cb-copy-label')}</button></div>
  <pre class="cb-code__pre"><code>${highlight(source, lang)}</code></pre>
</div>`;
}

/**
 * Cada celda es { key } para texto traducible o { code } para codigo.
 */
export function table(headerKeys, rows) {
  if (!rows?.length) return '';
  const head = headerKeys.map((key) => tr('th', key, 'scope="col"')).join('');
  const cell = (value, i) => {
    const cls = i === 0 ? 'class="cb-table__strong"' : '';
    if (value.key) return tr('td', value.key, cls);
    return `<td ${`${cls} translate="no"`.trim()}>${format(value.code)}</td>`;
  };
  const body = rows.map((row) => `<tr>${row.map(cell).join('')}</tr>`).join('\n');
  return `<div class="docs-table"><div class="cb-table-scroll"><table class="cb-table cb-table--compact"><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table></div></div>`;
}

function sidebarGroups(groups, current, prefix) {
  return groups
    .map(
      (group) => `<div class="cb-sidenav__group">
        ${tr('p', group.key, 'class="cb-sidenav__title"')}
        <ul class="cb-sidenav__list">
          ${group.items
            .map((item) => {
              const isCurrent = item.slug === current ? 'aria-current="page"' : '';
              return `<li>${tr('a', item.key, `class="cb-sidenav__link" href="${prefix}${item.href}" ${isCurrent}`.trim())}</li>`;
            })
            .join('\n')}
        </ul>
      </div>`
    )
    .join('\n');
}

function sidebar(groups, current, prefix, idPrefix = '') {
  return `<nav class="cb-sidenav" ${attrs({ 'aria-label': 'ui.menu.sidebar' })}>
    <div class="cb-sidenav__version">
      ${tr('label', 'ui.version.label', `class="cb-sr-only" for="${idPrefix}version"`)}
      <div class="cb-select"><select class="cb-input cb-input--sm" id="${idPrefix}version" data-cb-version-select>
        ${tr('option', 'ui.version.current', 'value="" selected', { version: VERSION })}
        ${tr('option', 'ui.version.changelog', `value="${REPO}/blob/main/CHANGELOG.md"`)}
      </select></div>
    </div>
    ${sidebarGroups(groups, current, prefix)}
  </nav>`;
}

function accentMenu() {
  const items = ACCENTS.map(
    (value) =>
      `<button class="cb-dropdown__item" type="button" role="menuitemradio" data-cb-accent-set="${value}"><span class="docs-swatch-dot" data-cb-accent="${value}" aria-hidden="true"></span>${tr('span', `ui.accents.${value}`)}</button>`
  ).join('\n');
  return `<div class="cb-dropdown max-cb-sm:hidden" data-cb-dropdown>
    <button class="cb-icon-btn" type="button" data-cb-dropdown-trigger ${attrs({ 'aria-label': 'ui.theme.accent' })}>${icon('palette')}</button>
    <div class="cb-dropdown__panel cb-dropdown__panel--end" role="menu" ${attrs({ 'aria-label': 'ui.theme.accent' })}>
      ${tr('p', 'ui.theme.accent', 'class="cb-dropdown__label"')}
      ${items}
    </div>
  </div>`;
}

function languageOption(lang, available) {
  const active = lang === BASE_LANG;
  const disabled = available.includes(lang) ? '' : ' aria-disabled="true"';
  const soon = available.includes(lang)
    ? ''
    : tr('span', 'ui.lang.soon', 'class="cb-tag" data-docs-soon');
  return `<button class="cb-dropdown__item" type="button" role="menuitemradio" lang="${lang}" data-docs-lang="${lang}" aria-checked="${active}"${disabled}>${tr('span', `ui.lang.${lang}`)}${soon}${icon('check', 'docs-lang-check')}</button>`;
}

function languageMenu(available) {
  return `<div class="cb-dropdown" data-cb-dropdown>
    <button class="cb-icon-btn" type="button" data-cb-dropdown-trigger ${attrs({ 'aria-label': 'ui.lang.label' })}>${icon('globe')}</button>
    <div class="cb-dropdown__panel cb-dropdown__panel--end" role="menu" ${attrs({ 'aria-label': 'ui.lang.label' })}>
      ${tr('p', 'ui.menu.language', 'class="cb-dropdown__label"')}
      ${LANGS.map((lang) => languageOption(lang, available)).join('\n      ')}
    </div>
  </div>`;
}

function mobileSettings(available) {
  const langs = LANGS.map((lang) => {
    const disabled = available.includes(lang) ? '' : ' disabled';
    const soon = available.includes(lang)
      ? ''
      : tr('span', 'ui.lang.soon', 'class="cb-tag" data-docs-soon');
    return `<button class="cb-chip" type="button" lang="${lang}" data-docs-lang="${lang}" aria-pressed="${lang === BASE_LANG}"${disabled}>${tr('span', `ui.lang.${lang}`)}${soon}</button>`;
  }).join('');
  const accents = ACCENTS.map(
    (value) =>
      `<button class="cb-chip" type="button" data-cb-accent-set="${value}"><i class="cb-chip__swatch" data-cb-accent="${value}"></i>${tr('span', `ui.accents.${value}`)}</button>`
  ).join('');
  return `<div class="flex flex-col gap-5 border-b border-cb-line pb-6 mb-6">
    <div class="flex flex-col gap-2" role="group" ${attrs({ 'aria-label': 'ui.lang.label' })}>${tr('p', 'ui.menu.language', 'class="cb-sidenav__title"')}<div class="cb-chips">${langs}</div></div>
    <div class="flex flex-col gap-2" role="group" ${attrs({ 'aria-label': 'ui.theme.accent' })}>${tr('p', 'ui.menu.theme', 'class="cb-sidenav__title"')}<div class="cb-chips">${accents}</div></div>
  </div>`;
}

function navLink(key, href, isCurrent) {
  return `<li class="cb-nav__item">${tr('a', key, `class="cb-nav__link" href="${href}"${isCurrent ? ' aria-current="page"' : ''}`)}</li>`;
}

export function layout({
  titleKey,
  descriptionKey,
  current,
  prefix = '',
  groups,
  main,
  toc = '',
  search,
}) {
  const available = availableLocales();
  const pageTitle =
    current === 'index' ? plain('pages.index.metaTitle') : `${plain(titleKey)} · Cobalto`;
  const tocColumn = toc ? `<aside class="docs-toc">${toc}</aside>` : '';
  const items = search.map((item) => ({ ...item, href: prefix + item.href }));
  return `<!doctype html>
<html lang="${BASE_LANG}" data-i18n-base="${prefix}" data-i18n-available="${available.join(',')}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title data-i18n-title="${current === 'index' ? 'pages.index.metaTitle' : titleKey}">${escapeHtml(pageTitle)}</title>
  <meta name="description" content="${escapeHtml(plain(descriptionKey))}">
  <meta name="theme-color" content="#060b18">
  <script>
    try {
      var t = localStorage.getItem('cb-theme');
      var a = localStorage.getItem('cb-accent');
      if (t) document.documentElement.setAttribute('data-cb-theme', t);
      if (a) document.documentElement.setAttribute('data-cb-accent', a);
    } catch (e) {}
  </script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="${prefix}assets/site.css">
  <script src="${prefix}assets/cobalto.umd.js" defer></script>
${available
    .filter((lang) => lang !== BASE_LANG)
    .map((lang) => `<script src="${prefix}i18n/${lang}.js" defer></script>`)
    .join('\n  ')}
  <script src="${prefix}js/i18n.js" defer></script>
  <script src="${prefix}js/docs.js" defer></script>
</head>
<body>
${tr('a', 'ui.skip', 'class="cb-btn cb-btn--primary sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[200]" href="#contenido"')}

<header class="cb-nav">
  <div class="cb-nav__inner max-w-[1440px]">
    <button class="cb-icon-btn cb-nav__burger" type="button" data-cb-open="docs-menu" ${attrs({ 'aria-label': 'ui.menu.open' })}>${icon('menu')}</button>
    <a href="${prefix}index.html" class="cb-logo" translate="no"><span class="cb-logo__mark" aria-hidden="true">C</span>Cobalto<span class="cb-badge cb-badge--accent max-cb-sm:hidden">v${VERSION}</span></a>
    <nav ${attrs({ 'aria-label': 'ui.nav.label' })}>
      <ul class="cb-nav__menu">
        ${navLink('ui.nav.install', `${prefix}instalacion.html`, current === 'instalacion')}
        ${navLink('ui.nav.customize', `${prefix}personalizacion.html`, current === 'personalizacion')}
        ${navLink('ui.nav.components', `${prefix}componentes/botones.html`, Boolean(prefix))}
        ${navLink('ui.nav.examples', `${prefix}../examples/landing.html`, false)}
      </ul>
    </nav>
    <div class="cb-nav__actions">
      <button class="cb-search-btn" type="button" data-cb-command-open="docs-search" ${attrs({ 'aria-label': 'ui.search.label' })}>
        ${icon('search')}${tr('span', 'ui.search.button', 'class="cb-search-btn__text max-xl:hidden"')}<kbd data-cb-kbd-mod="K">⌘K</kbd>
      </button>
      ${accentMenu()}
      ${languageMenu(available)}
      <button class="cb-icon-btn" type="button" data-cb-theme-toggle ${attrs({ 'aria-label': 'ui.theme.toggle' })}>
        ${icon('moon', 'cb-theme-toggle__moon')}${icon('sun', 'cb-theme-toggle__sun')}
      </button>
      ${tr('a', 'ui.nav.npm', `href="${NPM}" class="cb-btn cb-btn--ghost max-xl:hidden"`)}
      ${tr('a', 'ui.nav.github', `href="${REPO}" class="cb-btn cb-btn--outline max-xl:hidden"`)}
    </div>
  </div>
</header>

<div class="cb-drawer cb-drawer--left" id="docs-menu" data-cb-drawer>
  <div class="cb-drawer__panel">
    <div class="cb-drawer__head">
      ${tr('p', 'ui.menu.title', 'class="cb-drawer__title"')}
      <button class="cb-drawer__close" type="button" data-cb-close ${attrs({ 'aria-label': 'ui.menu.close' })}>${icon('close')}</button>
    </div>
    <div class="cb-drawer__body">${mobileSettings(available)}${sidebar(groups, current, prefix, 'drawer-')}</div>
  </div>
</div>

<div class="docs-shell">
  <aside class="docs-aside">
    <div class="cb-sidenav--sticky">${sidebar(groups, current, prefix)}</div>
  </aside>
  <main class="docs-main" id="contenido" tabindex="-1">
${main}
  </main>
  ${tocColumn}
</div>

<footer class="cb-footer border-t border-cb-line">
  <div class="cb-wrap max-w-[1440px]">
    <div class="cb-footer__bottom mt-0 border-0 pt-0"><span class="cb-footer__credit"><span translate="no">© 2026 Oscar Castellanos (<a href="https://trupermax.com">TruperMax</a>) ·</span> ${tr('a', 'ui.footer.license', `href="${REPO}/blob/main/LICENSE"`)}</span><span translate="no">Cobalto v${VERSION}</span></div>
  </div>
</footer>

<div class="cb-command" id="docs-search" data-cb-command data-cb-command-hotkey="k" ${attrs({ 'data-cb-command-empty': 'ui.search.empty' })}>
  <div class="cb-command__panel" ${attrs({ 'aria-label': 'ui.search.label' })}>
    <div class="cb-command__head">
      ${icon('search')}
      <input class="cb-command__input" data-cb-command-input ${attrs({ placeholder: 'ui.search.placeholder', 'aria-label': 'ui.search.input' })}>
      <kbd>Esc</kbd>
    </div>
    <div class="cb-command__results" data-cb-command-results></div>
    <div class="cb-command__foot"><span><kbd>↑</kbd> <kbd>↓</kbd> ${tr('span', 'ui.search.navigate')}</span><span><kbd>↵</kbd> ${tr('span', 'ui.search.open')}</span><span><kbd>Esc</kbd> ${tr('span', 'ui.search.close')}</span></div>
  </div>
  <script type="application/json" data-cb-command-items>${JSON.stringify(items)}</script>
</div>
</body>
</html>
`;
}

export function toc(sections) {
  const links = sections
    .map((s) => tr('a', s.key, `class="cb-toc__link" href="#${s.id}"`))
    .join('\n');
  return `<nav class="cb-toc" ${attrs({ 'aria-label': 'ui.toc.label' })} data-cb-scrollspy>${tr('p', 'ui.toc.title', 'class="cb-toc__title"')}${links}</nav>`;
}

export { t, tr, attrs, plain, format };
