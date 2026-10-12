import { tr } from '../i18n.mjs';

const P = 'pages.index';

export default {
  slug: 'index',
  order: 1,
  render({ components, groups, codeBlock }) {
    const cards = groups
      .map(
        (group) => `
      ${tr('h2', `groups.${group.key}`, 'class="docs-section__title mt-14"')}
      <div class="cb-grid cb-grid--4 mt-5">
        ${group.components
          .map(
            (c) => `<a class="cb-card cb-card--compact" href="componentes/${c.slug}.html">
          <svg class="cb-card__go" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>
          ${tr('h3', `components.${c.slug}.title`, 'class="cb-card__title"')}
          ${tr('p', `components.${c.slug}.description`, 'class="cb-card__text"')}
        </a>`
          )
          .join('\n')}
      </div>`
      )
      .join('\n');

    const principles = [0, 1, 2]
      .map(
        (i) =>
          `<li class="cb-principles__item"><span class="cb-principles__num">0${i + 1}</span>${tr('h3', `${P}.principles.items.${i}.title`, 'class="cb-principles__title"')}${tr('p', `${P}.principles.items.${i}.text`, 'class="cb-principles__text"')}</li>`
      )
      .join('\n    ');

    const main = `
<header class="cb-hero cb-hero--grid mb-6 pt-4 pb-12">
  <div class="cb-label" translate="no"><b>v0.1/</b>Cobalto</div>
  ${tr('h1', `${P}.heading`, 'class="cb-h1"')}
  ${tr('p', `${P}.lead`, 'class="cb-lead"', { count: components.length })}
  <div class="cb-actions">
    ${tr('a', `${P}.install`, 'href="instalacion.html" class="cb-btn cb-btn--primary"')}
    ${tr('a', `${P}.customize`, 'href="personalizacion.html" class="cb-btn cb-btn--outline"')}
  </div>
  <p class="cb-note">${tr('span', `${P}.noteBefore`)} <kbd data-cb-kbd-mod="K">⌘K</kbd> ${tr('span', `${P}.noteAfter`)}</p>
</header>

<section class="docs-section" id="en-30-segundos">
  ${tr('h2', `${P}.quick.title`, 'class="docs-section__title"')}
  ${tr('p', `${P}.quick.desc`, 'class="docs-section__desc"')}
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
  ${tr('h2', `${P}.principles.title`, 'class="docs-section__title"')}
  <ol class="cb-principles mt-4">
    ${principles}
  </ol>
</section>

<section class="docs-section" id="componentes">
  ${tr('h2', `${P}.components.title`, 'class="docs-section__title"')}
  ${cards}
</section>
`;
    return {
      main,
      sections: [
        { id: 'en-30-segundos', key: `${P}.quick.title` },
        { id: 'principios', key: `${P}.principles.title` },
        { id: 'componentes', key: `${P}.components.title` },
      ],
    };
  },
};
