import { dedent, escapeHtml, highlight } from './highlight.mjs';

export const VERSION = '0.1.0';

export const ICONS = {
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  copy: '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/>',
  chevron: '<path d="M2 3.5 5 6.5 8 3.5"/>',
  arrow: '<path d="M7 17 17 7M8 7h9v9"/>',
  palette:
    '<circle cx="12" cy="12" r="9"/><circle cx="8.5" cy="10" r="1.2"/><circle cx="12" cy="7.5" r="1.2"/><circle cx="15.5" cy="10" r="1.2"/>',
};

export function icon(name, className = '') {
  const cls = className ? ` class="${className}"` : '';
  const box = name === 'chevron' ? '0 0 10 10' : '0 0 24 24';
  const width = name === 'chevron' ? '1.5' : '2';
  return `<svg${cls} viewBox="${box}" fill="none" stroke="currentColor" stroke-width="${width}" aria-hidden="true">${ICONS[name]}</svg>`;
}

export const ACCENTS = [
  ['cobalto', 'Cobalto'],
  ['esmeralda', 'Esmeralda'],
  ['ambar', 'Ámbar'],
  ['rubi', 'Rubí'],
  ['violeta', 'Violeta'],
  ['grafito', 'Grafito'],
];

export function codeBlock(code, { lang = 'html', file = '' } = {}) {
  const source = dedent(code);
  const label = file || lang.toUpperCase();
  return `<div class="cb-code">
  <div class="cb-code__head"><span>${escapeHtml(label)}</span><button class="cb-code__copy" type="button" data-cb-copy>${icon('copy')}<span data-cb-copy-label>Copiar</span></button></div>
  <pre class="cb-code__pre"><code>${highlight(source, lang)}</code></pre>
</div>`;
}

export function table(headers, rows) {
  if (!rows?.length) return '';
  const head = headers.map((h) => `<th scope="col">${h}</th>`).join('');
  const body = rows
    .map(
      (row) =>
        `<tr>${row.map((cell, i) => `<td${i === 0 ? ' class="cb-table__strong"' : ''}>${inlineCode(cell)}</td>`).join('')}</tr>`
    )
    .join('\n');
  return `<div class="docs-table"><div class="cb-table-scroll"><table class="cb-table cb-table--compact"><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table></div></div>`;
}

export function inlineCode(text) {
  return escapeHtml(text).replace(/`([^`]+)`/g, '<code>$1</code>');
}

function sidebarGroups(groups, current, prefix) {
  return groups
    .map(
      (group) => `<div class="cb-sidenav__group">
        <p class="cb-sidenav__title">${group.title}</p>
        <ul class="cb-sidenav__list">
          ${group.items
            .map((item) => {
              const isCurrent = item.slug === current;
              return `<li><a class="cb-sidenav__link" href="${prefix}${item.href}"${isCurrent ? ' aria-current="page"' : ''}>${item.title}${item.badge ? `<span class="cb-sidenav__badge">${item.badge}</span>` : ''}</a></li>`;
            })
            .join('\n')}
        </ul>
      </div>`
    )
    .join('\n');
}

function sidebar(groups, current, prefix, idPrefix = '') {
  return `<nav class="cb-sidenav" aria-label="Documentacion">
    <div class="cb-sidenav__version">
      <label class="cb-sr-only" for="${idPrefix}version">Version</label>
      <div class="cb-select"><select class="cb-input cb-input--sm" id="${idPrefix}version" data-cb-version-select>
        <option value="" selected>v${VERSION} (actual)</option>
        <option value="https://github.com/oscarcastellanos/cobalto/blob/main/CHANGELOG.md">Changelog</option>
      </select></div>
    </div>
    ${sidebarGroups(groups, current, prefix)}
  </nav>`;
}

function accentMenu() {
  const items = ACCENTS.map(
    ([value, label]) =>
      `<button class="cb-dropdown__item" type="button" role="menuitemradio" data-cb-accent-set="${value}"><span class="docs-swatch-dot" data-cb-accent="${value}" aria-hidden="true"></span>${label}</button>`
  ).join('\n');
  return `<div class="cb-dropdown" data-cb-dropdown>
    <button class="cb-icon-btn" type="button" data-cb-dropdown-trigger aria-label="Tema de color">${icon('palette')}</button>
    <div class="cb-dropdown__panel cb-dropdown__panel--end" role="menu" aria-label="Tema de color">
      <p class="cb-dropdown__label">Tema de color</p>
      ${items}
    </div>
  </div>`;
}

export function layout({
  title,
  description,
  current,
  prefix = '',
  groups,
  main,
  toc = '',
  search,
  wide = false,
}) {
  const pageTitle =
    current === 'index' ? 'Cobalto · Componentes UI para Tailwind CSS' : `${title} · Cobalto`;
  const tocColumn = toc ? `<aside class="docs-toc">${toc}</aside>` : '';
  return `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(pageTitle)}</title>
  <meta name="description" content="${escapeHtml(description)}">
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
  <script src="${prefix}assets/docs.js" defer></script>
</head>
<body>
<a class="cb-btn cb-btn--primary sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[200]" href="#contenido">Saltar al contenido</a>

<header class="cb-nav">
  <div class="cb-nav__inner max-w-[1440px]">
    <button class="cb-icon-btn cb-nav__burger" type="button" data-cb-open="docs-menu" aria-label="Abrir navegacion">${icon('menu')}</button>
    <a href="${prefix}index.html" class="cb-logo"><span class="cb-logo__mark" aria-hidden="true">C</span>Cobalto<span class="cb-badge cb-badge--accent max-cb-sm:hidden">v${VERSION}</span></a>
    <nav aria-label="Principal">
      <ul class="cb-nav__menu">
        <li class="cb-nav__item"><a class="cb-nav__link" href="${prefix}instalacion.html"${current === 'instalacion' ? ' aria-current="page"' : ''}>Instalación</a></li>
        <li class="cb-nav__item"><a class="cb-nav__link" href="${prefix}personalizacion.html"${current === 'personalizacion' ? ' aria-current="page"' : ''}>Personalización</a></li>
        <li class="cb-nav__item"><a class="cb-nav__link" href="${prefix}componentes/botones.html"${prefix ? ' aria-current="page"' : ''}>Componentes</a></li>
        <li class="cb-nav__item"><a class="cb-nav__link" href="${prefix}../examples/landing.html">Ejemplos</a></li>
      </ul>
    </nav>
    <div class="cb-nav__actions">
      <button class="cb-search-btn" type="button" data-cb-command-open="docs-search" aria-label="Buscar en la documentacion">
        ${icon('search')}<span class="cb-search-btn__text">Buscar</span><kbd data-cb-kbd-mod="K">⌘K</kbd>
      </button>
      ${accentMenu()}
      <button class="cb-icon-btn" type="button" data-cb-theme-toggle aria-label="Cambiar entre modo claro y oscuro">
        ${icon('moon', 'cb-theme-toggle__moon')}${icon('sun', 'cb-theme-toggle__sun')}
      </button>
      <a href="https://github.com/oscarcastellanos/cobalto" class="cb-btn cb-btn--outline cb-nav__collapse">GitHub ↗</a>
    </div>
  </div>
</header>

<div class="cb-drawer cb-drawer--left" id="docs-menu" data-cb-drawer>
  <div class="cb-drawer__panel">
    <div class="cb-drawer__head">
      <p class="cb-drawer__title">Documentación</p>
      <button class="cb-drawer__close" type="button" data-cb-close aria-label="Cerrar">${icon('close')}</button>
    </div>
    <div class="cb-drawer__body">${sidebar(groups, current, prefix, 'drawer-')}</div>
  </div>
</div>

<div class="docs-shell${wide ? ' docs-shell--wide' : ''}">
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
    <div class="cb-footer__bottom mt-0 border-0 pt-0"><span>© 2026 Oscar Castellanos · Licencia MIT</span><span>Cobalto v${VERSION}</span></div>
  </div>
</footer>

<div class="cb-command" id="docs-search" data-cb-command data-cb-command-hotkey="k">
  <div class="cb-command__panel" aria-label="Buscar en la documentacion">
    <div class="cb-command__head">
      ${icon('search')}
      <input class="cb-command__input" data-cb-command-input placeholder="Buscar componentes, clases, páginas..." aria-label="Buscar">
      <kbd>Esc</kbd>
    </div>
    <div class="cb-command__results" data-cb-command-results></div>
    <div class="cb-command__foot"><span><kbd>↑</kbd> <kbd>↓</kbd> navegar</span><span><kbd>↵</kbd> abrir</span><span><kbd>Esc</kbd> cerrar</span></div>
  </div>
  <script type="application/json" data-cb-command-items>${JSON.stringify(search.map((item) => ({ ...item, href: prefix + item.href })))}</script>
</div>
</body>
</html>
`;
}

export function toc(sections) {
  const links = sections
    .map((s) => `<a class="cb-toc__link" href="#${s.id}">${s.title}</a>`)
    .join('\n');
  return `<nav class="cb-toc" aria-label="En esta pagina" data-cb-scrollspy><p class="cb-toc__title">En esta página</p>${links}</nav>`;
}
