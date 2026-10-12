import { ACCENTS } from '../layout.mjs';

const TOKENS = [
  ['bg', 'Fondo de la página'],
  ['bg-2', 'Superficie elevada (cards en hover, paneles)'],
  ['bg-3', 'Superficie más elevada (hover de menús, kbd)'],
  ['line', 'Bordes y divisiones'],
  ['line-2', 'Bordes de controles'],
  ['text', 'Texto principal'],
  ['muted', 'Texto secundario'],
  ['dim', 'Texto atenuado (metadatos)'],
  ['accent', 'Color de marca'],
  ['accent-ink', 'Texto sobre relleno de acento'],
  ['accent-bg', 'Relleno de acento (botón primario)'],
  ['accent-soft', 'Fondo suave de acento'],
  ['success', 'Éxito'],
  ['warning', 'Aviso'],
  ['danger', 'Error'],
  ['info', 'Información'],
];

const SCALE = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];

export default {
  slug: 'personalizacion',
  title: 'Personalización',
  order: 3,
  description:
    'Cambia los colores de Cobalto: una variable, un tema predefinido o un tema propio. Incluye un personalizador en vivo.',
  keywords: 'colores tema acento dark light oscuro claro tokens variables personalizador',
  render({ codeBlock, table }) {
    const sections = [
      { id: 'personalizador', title: 'Personalizador en vivo' },
      { id: 'niveles', title: 'Tres niveles' },
      { id: 'temas', title: 'Temas predefinidos' },
      { id: 'modo', title: 'Claro y oscuro' },
      { id: 'escala', title: 'Escala de acento' },
      { id: 'tokens', title: 'Tokens de color' },
      { id: 'tema-propio', title: 'Crear un tema propio' },
      { id: 'otros-tokens', title: 'Otros tokens' },
    ];

    const swatches = ACCENTS.map(
      ([value, label]) =>
        `<button class="docs-swatch" type="button" data-cb-accent-set="${value}"><i data-cb-accent="${value}"></i>${label}</button>`
    ).join('\n');

    const tokenGrid = TOKENS.map(
      ([name, desc]) =>
        `<div><i style="background: var(--cb-${name})"></i><span><code class="text-cb-text">--cb-${name}</code><br><span class="text-cb-dim">${desc}</span></span></div>`
    ).join('\n');

    const scale = SCALE.map(
      (step) => `<div style="background: var(--cb-accent-${step})"><span>${step}</span></div>`
    ).join('');

    const main = `
<header class="docs-header">
  <div class="cb-label"><b>03/</b>Empezar</div>
  <h1 class="cb-h2">Personalización</h1>
  <p class="cb-lead">Todos los colores pasan por variables CSS. Cambia una y se recolorea toda la librería, sin tocar los componentes.</p>
</header>

<section class="docs-section" id="personalizador">
  <h2 class="docs-section__title">Personalizador en vivo</h2>
  <p class="docs-section__desc">Elige un color y mira cómo cambia esta página. El CSS de abajo está listo para pegar en tu proyecto. Los colores se ajustan solos para mantener contraste AA en ambos modos.</p>

  <div class="cb-panel" data-docs-customizer>
    <div class="cb-panel__body grid gap-6 cb-md:grid-cols-[280px_1fr]">
      <div class="flex flex-col gap-5">
        <div class="cb-field">
          <label class="cb-field__label" for="cz-color">Color de acento</label>
          <div class="cb-input-group">
            <input class="cb-input h-cb-control w-12 shrink-0 cursor-pointer p-1" id="cz-color" type="color" value="#3b82f6" aria-describedby="cz-hint">
            <input class="cb-input" id="cz-hex" value="#3b82f6" spellcheck="false" aria-label="Color en hexadecimal">
          </div>
          <p class="cb-field__hint" id="cz-hint">Acepta cualquier color en hexadecimal.</p>
        </div>
        <label class="cb-check"><input class="cb-switch" type="checkbox" role="switch" id="cz-tint"><span class="cb-check__text">Teñir los neutros<span class="cb-check__hint">Fondos y bordes toman un poco del acento.</span></span></label>
        <div class="cb-field">
          <span class="cb-field__label">Modo</span>
          <div class="cb-tabs--pills"><div class="cb-tabs__list" role="group" aria-label="Modo">
            <button class="cb-tabs__tab" type="button" data-cb-theme-set="dark">Oscuro</button>
            <button class="cb-tabs__tab" type="button" data-cb-theme-set="light">Claro</button>
            <button class="cb-tabs__tab" type="button" data-cb-theme-set="system">Sistema</button>
          </div></div>
        </div>
        <button class="cb-btn cb-btn--ghost cb-btn--sm self-start" type="button" id="cz-reset">Restablecer</button>
      </div>

      <div class="flex min-w-0 flex-col gap-4">
        <div class="flex flex-wrap gap-2">
          <button class="cb-btn cb-btn--primary" type="button">Primario ↗</button>
          <button class="cb-btn cb-btn--outline" type="button">Outline</button>
          <button class="cb-btn cb-btn--soft" type="button">Soft</button>
          <span class="cb-tag cb-tag--live self-center">Activo</span>
          <span class="cb-badge cb-badge--solid self-center">Pro</span>
        </div>
        <div class="cb-alert" role="status"><div class="cb-alert__body"><p class="cb-alert__title">Vista previa</p><p class="cb-alert__text">Los componentes de toda la página usan el nuevo color. <a href="#personalizador">Un enlace</a></p></div></div>
        <div class="cb-progress"><div class="cb-progress__track" role="progressbar" aria-label="Ejemplo" aria-valuenow="62" aria-valuemin="0" aria-valuemax="100"><div class="cb-progress__bar" style="--cb-progress: 62%"></div></div></div>
        <div class="docs-table"><div class="cb-table-scroll">
          <table class="cb-table cb-table--compact">
            <thead><tr><th scope="col">Contraste (mín. 4.5)</th><th scope="col" class="cb-table__num">Oscuro</th><th scope="col" class="cb-table__num">Claro</th></tr></thead>
            <tbody id="cz-contrast"></tbody>
          </table>
        </div></div>
      </div>
    </div>
    <div class="border-t border-cb-line p-5">
      <div class="cb-code">
        <div class="cb-code__head"><span>tu-tema.css</span><button class="cb-code__copy" type="button" data-cb-copy="cz-output"><span data-cb-copy-label>Copiar CSS</span></button></div>
        <pre class="cb-code__pre"><code id="cz-output"></code></pre>
      </div>
    </div>
  </div>
</section>

<section class="docs-section" id="niveles">
  <h2 class="docs-section__title">Tres niveles</h2>
  <p class="docs-section__desc"><strong class="text-cb-text">1. Una variable.</strong> Cambia \`--cb-accent\` y se recalculan la escala 50–950, el relleno de botones, los fondos suaves y el foco.</p>
  ${codeBlock(
    `
    :root {
      --cb-accent: #e11d48;
    }
  `,
    { lang: 'css' }
  )}
  <p class="docs-section__desc mt-8"><strong class="text-cb-text">2. Un tema predefinido.</strong> Seis temas, cada uno con su versión clara y oscura.</p>
  ${codeBlock(`<html data-cb-accent="esmeralda">`)}
  <p class="docs-section__desc mt-8"><strong class="text-cb-text">3. Un tema propio.</strong> Define los valores de cada modo con los prefijos \`--cb-dark-*\` y \`--cb-light-*\`. Mira el ejemplo completo en <a class="cb-link" href="#tema-propio">Crear un tema propio</a>.</p>
</section>

<section class="docs-section" id="temas">
  <h2 class="docs-section__title">Temas predefinidos</h2>
  <p class="docs-section__desc">Haz clic para aplicarlo a esta página. La elección se guarda en \`localStorage\`. Los puntos de color usan \`data-cb-accent\` anidado: un tema también se puede aplicar solo a una parte de la página.</p>
  <div class="docs-swatches">${swatches}</div>
  <div class="mt-6">
  ${codeBlock(`
    <!-- en toda la pagina -->
    <html data-cb-accent="violeta">

    <!-- solo en una seccion -->
    <section data-cb-accent="ambar">...</section>
  `)}
  </div>
  <div class="cb-grid cb-grid--4 mt-6">
    ${ACCENTS.slice(1, 5)
      .map(
        ([value, label]) =>
          `<div class="cb-card cb-card--compact bg-cb-bg" data-cb-accent="${value}"><span class="cb-tag cb-tag--live self-start">${label}</span><p class="cb-card__text">Sección con <code>data-cb-accent="${value}"</code>.</p><button class="cb-btn cb-btn--primary cb-btn--sm self-start" type="button">Botón</button></div>`
      )
      .join('\n    ')}
  </div>
</section>

<section class="docs-section" id="modo">
  <h2 class="docs-section__title">Claro y oscuro</h2>
  <p class="docs-section__desc">Sin atributo, Cobalto sigue \`prefers-color-scheme\` (oscuro si el sistema no indica nada). \`data-cb-theme\` lo fija, en \`html\` o en cualquier sección.</p>
  ${codeBlock(`
    <html data-cb-theme="light">

    <!-- una seccion oscura dentro de una pagina clara -->
    <section data-cb-theme="dark">...</section>
  `)}
  <p class="docs-section__desc mt-6">Las variantes \`dark:\` y \`light:\` de Tailwind siguen las mismas reglas:</p>
  ${codeBlock(`<div class="bg-cb-bg-2 dark:bg-cb-bg-3 light:shadow-cb-sm">...</div>`)}
  <p class="docs-section__desc mt-6">Desde JS:</p>
  ${codeBlock(
    `
    cobalto.theme.set('light'); // 'dark', 'light' o 'system'
    cobalto.theme.toggle();
    cobalto.theme.setAccent('rubi');

    document.addEventListener('cb:theme', (event) => console.log(event.detail.resolved));
  `,
    { lang: 'js' }
  )}
</section>

<section class="docs-section" id="escala">
  <h2 class="docs-section__title">Escala de acento</h2>
  <p class="docs-section__desc">Generada con \`color-mix(in oklab)\` a partir de \`--cb-accent\`. Disponible como variables (\`--cb-accent-500\`) y utilidades (\`bg-cb-accent-200\`).</p>
  <div class="docs-scale">${scale}</div>
</section>

<section class="docs-section" id="tokens">
  <h2 class="docs-section__title">Tokens de color</h2>
  <p class="docs-section__desc">Cada token existe como variable \`--cb-*\` y como utilidad de Tailwind: \`bg-cb-bg-2\`, \`text-cb-muted\`, \`border-cb-line\`, \`bg-cb-accent/20\`...</p>
  <div class="docs-token-grid">${tokenGrid}</div>
</section>

<section class="docs-section" id="tema-propio">
  <h2 class="docs-section__title">Crear un tema propio</h2>
  <p class="docs-section__desc">Copia este bloque, cambia los valores y actívalo con \`data-cb-accent="marca"\`. Si omites un token, se usa el de Cobalto. Revisa que el texto tenga al menos 4.5:1 de contraste con el fondo.</p>
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
  <p class="docs-section__desc mt-6">Los colores de estado también se pueden cambiar por modo: \`--cb-dark-success\`, \`--cb-light-danger\`, etc.</p>
</section>

<section class="docs-section" id="otros-tokens">
  <h2 class="docs-section__title">Otros tokens</h2>
  <p class="docs-section__desc">Definidos en \`@theme\`, así que también generan utilidades (\`font-cb-mono\`, \`rounded-cb-lg\`, \`py-cb-section\`, \`text-cb-4xl\`...).</p>
  ${table(
    ['Grupo', 'Tokens'],
    [
      ['Fuentes', '`--font-cb-mono`, `--font-cb-sans`'],
      [
        'Tipografía',
        '`--text-cb-xs` (11px) a `--text-cb-6xl` (`clamp(64px, 17vw, 230px)`), `--text-cb-lead`',
      ],
      ['Tracking', '`--tracking-cb-tight|tighter|display|huge|wide|wider`'],
      [
        'Radios',
        '`--radius-cb-sm` (5px), `--radius-cb` (8px), `--radius-cb-lg` (10px), `--radius-cb-full`',
      ],
      [
        'Espaciado',
        '`--spacing-cb-section` (110px), `--spacing-cb-block` (56px), `--spacing-cb-gutter` (24px), `--spacing-cb-nav` (64px)',
      ],
      ['Contenedor', '`--cb-max` (1180px) → utilidad `max-w-cb`'],
      [
        'Breakpoints',
        '`--breakpoint-cb-sm` (600px), `--breakpoint-cb-md` (960px) → variantes `cb-sm:`, `max-cb-md:`',
      ],
      ['Sombras', '`--shadow-cb-sm|md|lg` (usan `--cb-scrim`)'],
      ['Movimiento', '`--cb-duration-fast|pop|duration|slow|reveal`, `--ease-cb`, `--ease-cb-out`'],
      ['Capas', '`--cb-z-dropdown|mobile|sticky|drawer|overlay|toast|tooltip`'],
    ]
  )}
</section>
`;
    return { main, sections };
  },
};
