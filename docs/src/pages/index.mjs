export default {
  slug: 'index',
  title: 'Introducción',
  order: 1,
  description:
    'Cobalto: componentes UI editoriales para Tailwind CSS v4, con colores que cambias con una sola variable.',
  keywords: 'inicio cobalto',
  render({ components, groups, codeBlock }) {
    const cards = groups
      .map(
        (group) => `
      <h2 class="docs-section__title mt-14">${group.title}</h2>
      <div class="cb-grid cb-grid--4 mt-5">
        ${group.components
          .map(
            (c) => `<a class="cb-card cb-card--compact" href="componentes/${c.slug}.html">
          <svg class="cb-card__go" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>
          <h3 class="cb-card__title">${c.title}</h3>
          <p class="cb-card__text">${c.description.replace(/`/g, '')}</p>
        </a>`
          )
          .join('\n')}
      </div>`
      )
      .join('\n');

    const main = `
<header class="cb-hero cb-hero--grid mb-6 pt-4 pb-12">
  <div class="cb-label"><b>v0.1/</b>Cobalto</div>
  <h1 class="cb-h1">Componentes<br>editoriales. <em>Sin ruido.</em></h1>
  <p class="cb-lead">${components.length} componentes para Tailwind CSS v4 con tipografía monoespaciada, bordes finos en lugar de sombras y un sistema de color que cambias con una sola variable.</p>
  <div class="cb-actions">
    <a href="instalacion.html" class="cb-btn cb-btn--primary">Instalar ↗</a>
    <a href="personalizacion.html" class="cb-btn cb-btn--outline">Personalizar colores</a>
  </div>
  <p class="cb-note">Pulsa <kbd data-cb-kbd-mod="K">⌘K</kbd> para buscar cualquier componente o clase.</p>
</header>

<section class="docs-section" id="en-30-segundos">
  <h2 class="docs-section__title">En 30 segundos</h2>
  <p class="docs-section__desc">Importa Cobalto después de Tailwind y usa las clases \`cb-*\` en tu HTML.</p>
  ${codeBlock(
    `
    @import "tailwindcss";
    @import "cobalto/tailwind";
  `,
    { lang: 'css', file: 'app.css' }
  )}
  <div class="mt-4">
  ${codeBlock(`
    <a class="cb-btn cb-btn--primary" href="#">Empezar ↗</a>
  `)}
  </div>
</section>

<section class="docs-section" id="principios">
  <h2 class="docs-section__title">Principios</h2>
  <ol class="cb-principles mt-4">
    <li class="cb-principles__item"><span class="cb-principles__num">01</span><h3 class="cb-principles__title">Tokens primero</h3><p class="cb-principles__text">Ningún componente usa colores fijos. Todo pasa por variables \`--cb-*\`.</p></li>
    <li class="cb-principles__item"><span class="cb-principles__num">02</span><h3 class="cb-principles__title">Tus utilidades ganan</h3><p class="cb-principles__text">Los componentes viven en \`@layer components\`, así que \`mt-0\` o \`bg-cb-bg-2\` siempre los sobrescriben.</p></li>
    <li class="cb-principles__item"><span class="cb-principles__num">03</span><h3 class="cb-principles__title">JS opcional</h3><p class="cb-principles__text">Atributos \`data-cb-*\`, sin dependencias, compatible con Livewire y Alpine.</p></li>
  </ol>
</section>

<section class="docs-section" id="componentes">
  <h2 class="docs-section__title">Componentes</h2>
  ${cards}
</section>
`;
    return {
      main,
      sections: [
        { id: 'en-30-segundos', title: 'En 30 segundos' },
        { id: 'principios', title: 'Principios' },
        { id: 'componentes', title: 'Componentes' },
      ],
    };
  },
};
