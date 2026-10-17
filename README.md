# Cobalto

[![npm](https://img.shields.io/npm/v/cobalto)](https://www.npmjs.com/package/cobalto) [![license](https://img.shields.io/npm/l/cobalto)](LICENSE)

**Documentation and examples:** [cobalto.trupermax.com](https://cobalto.trupermax.com)

Editorial UI components for **Tailwind CSS v4**: monospaced typography, thin borders instead of shadows, numbered sections and a color system you change with a single variable.

- Components from the navbar to the data table.
- 6 color themes, each with light and dark mode, all with verified AA contrast.
- Optional, dependency-free JavaScript driven by `data-cb-*` attributes.
- Works with Laravel, Livewire and Alpine with no extra setup.

## Installation

### With Tailwind (recommended)

The package is at [npmjs.com/package/cobalto](https://www.npmjs.com/package/cobalto).

```bash
npm install cobalto
```

```css
/* app.css */
@import "tailwindcss";
@import "cobalto/tailwind";
```

```js
// app.js
import cobalto from 'cobalto';

cobalto.autoInit();
```

`autoInit()` restores the saved theme, initializes the components on the page and watches the DOM to initialize the ones added later.

### No build, from a CDN

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/cobalto@0.1.2/dist/cobalto.min.css">
<script src="https://cdn.jsdelivr.net/npm/cobalto@0.1.2/dist/cobalto.umd.min.js" defer></script>
```

The script initializes itself. Add `data-cb-manual` to the `<script>` if you prefer to call `cobalto.init()` yourself.

Without an attribute, light or dark mode follows the system. If your users pick a theme, add this script in the `head` to apply it before the first paint and avoid a flash (it works the same in any stack, Laravel included):

```html
<script>
  try {
    var t = localStorage.getItem('cb-theme');
    var a = localStorage.getItem('cb-accent');
    if (t) document.documentElement.setAttribute('data-cb-theme', t);
    if (a) document.documentElement.setAttribute('data-cb-accent', a);
  } catch (e) {}
</script>
```

### Laravel 12 and 13 + Vite

```css
/* resources/css/app.css: what Laravel ships, plus Cobalto */
@import 'tailwindcss';
@import 'cobalto/tailwind';

@source '../../vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php';
@source '../../storage/framework/views/*.php';
@source '../**/*.blade.php';
@source '../**/*.js';
```

```js
// resources/js/app.js
import cobalto from 'cobalto';

window.cobalto = cobalto;
cobalto.autoInit();
```

### Livewire 3 and 4, Alpine

Everything is initialized again after each `wire:navigate`, and whatever Livewire or Alpine add to the DOM is initialized on its own. Cobalto only uses `cb-*` classes and `data-cb-*` attributes, so it does not clash with `x-*` or `wire:*`.

To fire a toast from PHP:

```php
$this->dispatch('toast', title: 'Saved', variant: 'success');
```

```js
document.addEventListener('livewire:init', () => {
  Livewire.on('toast', (event) => cobalto.toast(event));
});
```

Or with Alpine: `<div x-data x-on:toast.window="cobalto.toast($event.detail)"></div>`.

### Font

Cobalto does not load any font. With nothing else it uses the system monospace. For JetBrains Mono, add the Google Fonts `<link>` or install `@fontsource-variable/jetbrains-mono` and change the token:

```css
:root {
  --font-cb-mono: "JetBrains Mono Variable", ui-monospace, monospace;
}
```

## Usage

```html
<section class="cb-section">
  <div class="cb-wrap">
    <div class="cb-label"><b>01/</b>Services</div>
    <h2 class="cb-h2">Six services.<br>One team.</h2>
    <p class="cb-lead">Every project is built to measure.</p>
    <div class="cb-actions">
      <a class="cb-btn cb-btn--primary" href="#">Get a quote ↗</a>
      <button class="cb-btn cb-btn--outline" type="button" data-cb-open="contact">Contact</button>
    </div>
  </div>
</section>
```

Components live in `@layer components`, so any Tailwind utility overrides them: `<div class="cb-card bg-cb-bg-2 p-4">`.

## Colors

All colors go through `--cb-*` variables. There are three ways to change them.

**1. One variable.** The `--cb-accent-50` to `--cb-accent-950` scale, the button fill, the soft backgrounds and the focus ring are recalculated on their own.

```css
:root {
  --cb-accent: #e11d48;
}
```

**2. A predefined theme:** `cobalto` (default), `esmeralda`, `ambar`, `rubi`, `violeta` or `grafito`. It can also be applied to a single section.

```html
<html data-cb-accent="esmeralda">
```

**3. Your own theme**, with different values for each mode:

```css
[data-cb-accent="brand"] {
  --cb-dark-accent: #fb923c;
  --cb-dark-accent-ink: #0c0a09;
  --cb-light-accent: #c2410c;
  --cb-light-accent-ink: #ffffff;
  /* also --cb-dark-bg, --cb-light-text, etc. */
}
```

This CSS goes in your own stylesheet, after importing Cobalto (in Laravel, `resources/css/app.css`). Note that a `:root` block always wins, even over `data-cb-accent`; if you want your theme and also the ability to switch between the predefined ones, use the named form and activate it with `<html data-cb-accent="brand">` or `cobalto.theme.setAccent('brand')`.

The documentation includes a live customizer that adjusts the color to keep AA contrast and generates the CSS.

### Light and dark

Without an attribute, `prefers-color-scheme` is followed (dark if the system says nothing). `data-cb-theme="light|dark"` fixes it on `html` or on any section. Tailwind's `dark:` and `light:` variants follow the same rules.

```js
cobalto.theme.set('light'); // 'dark', 'light' or 'system'
cobalto.theme.toggle();
cobalto.theme.setAccent('violeta');
```

### Tokens

| Token | Utility |
| --- | --- |
| `--cb-bg`, `--cb-bg-2`, `--cb-bg-3` | `bg-cb-bg`, `bg-cb-bg-2`... |
| `--cb-line`, `--cb-line-2` | `border-cb-line` |
| `--cb-text`, `--cb-muted`, `--cb-dim` | `text-cb-muted` |
| `--cb-accent`, `--cb-accent-ink`, `--cb-accent-bg`, `--cb-accent-50…950` | `bg-cb-accent`, `text-cb-accent-ink`, `bg-cb-accent-200` |
| `--cb-success`, `--cb-warning`, `--cb-danger`, `--cb-info` | `text-cb-danger` |

There are also tokens for fonts, typography (`text-cb-xs` to `text-cb-6xl`), radii, spacing, shadows, durations and layers. The full list is on the customization page of the documentation.

## Components

| Structure | Content | Actions | Forms and data | Overlays | State |
| --- | --- | --- | --- | --- | --- |
| Announcement bar | Card | Buttons | Forms | Modal | Tabs |
| Navbar | Card grid | Chips and tags | Data table | Drawer | Accordion |
| Mobile menu | Principles | Badge and avatar | | Command palette ⌘K | Toast |
| Hero | Stats | Dropdown | | Tooltip and popover | Alert and banner |
| Section header | CTA | Breadcrumb | | | Progress |
| Footer | Pricing | Pagination | | | Skeleton and spinner |
| Docs sidebar | Testimonials | | | | Stepper |
| Dashboard layout | Timeline | | | | |
| | Empty state | | | | |
| | Code block | | | | |

## JavaScript

Each component exposes `init(root)`, supports several instances per page and can be called many times without duplicating listeners.

```js
import cobalto from 'cobalto';

cobalto.init(document.querySelector('#panel'));
cobalto.toast({ title: 'Saved', variant: 'success' });
cobalto.modal.open('confirm');

document.querySelector('#actions').addEventListener('cb:select', (event) => {
  console.log(event.detail.value);
});
```

Individual components: `import { init } from 'cobalto/components/tabs';`

Events use the `cb:` prefix (`cb:open`, `cb:close`, `cb:change`, `cb:select`...). `cb:open` and `cb:close` can be cancelled with `preventDefault()`.

## Component texts

The texts your users see (search empty state, closing a toast, table status and pagination, copy) come in English. Change them for the whole site or per element:

```js
cobalto.autoInit({ messages: { commandEmpty: 'Sin resultados para', copyDone: 'Copiado' } });
cobalto.setMessages({ tableStatus: 'Mostrando {start}–{end} de {total}' });
```

```html
<div data-cb-table data-cb-table-empty="Sin resultados">...</div>
```

The full list of keys and attributes is on the installation page of the documentation.

## Conventions

- Classes with the `cb-` prefix in BEM: `.cb-card`, `.cb-card__title`, `.cb-card--featured`.
- States with `is-*` classes (`is-open`, `is-active`) or ARIA attributes (`aria-expanded`, `aria-current`).
- Behavior with `data-cb-*` attributes.
- No component uses fixed colors.

## Accessibility

- AA contrast in the 6 themes and both modes (`npm run test:contrast` checks it).
- Full keyboard navigation, focus ring in the accent color.
- Focus trapped in modal, drawer and palette; Esc closes the topmost layer.
- Without JS the content shows in full; animations switch off with `prefers-reduced-motion`.

## Contributing

```bash
npm install
npm run dev     # rebuilds the site CSS on save
npm run build   # dist/, docs pages and assets
npm test        # style, contrast and interaction tests
```

The interaction and accessibility tests (`npm run test:a11y`) use an installed Edge or Chrome; with another path, set `CB_BROWSER`.

Code style:

- Comments only when they add something (a non-obvious decision, a workaround), in Spanish and without accents.
- No vertical alignment: a single space around `=`, `:` and operators.
- 2-space indentation, no tabs. `.editorconfig` and `.prettierrc` already set this up.
- Names in English; visible texts in English.
- The author is always written as "Oscar Castellanos (TruperMax)".

`npm run lint:style` checks the basics.

To document a new component, add its structure and examples in `docs/src/components/` and its texts in `docs/i18n/en.json`. Then run `npm run i18n:sync` (creates the same empty keys in `es.json`) and `npm run build:site`. The documentation never carries texts written directly in the HTML; `npm run test:i18n` checks it.

## Publishing the documentation and examples

```bash
npm run build:deploy
```

It generates the `_site/` folder with the documentation, the examples and the `dist/` files they use. Upload the **contents** of that folder as is to any static host (GitHub Pages, Netlify, Vercel, Cloudflare Pages or a cPanel server). The landing page sits at the root and the documentation at `/docs/`. It also generates `sitemap.xml`, `robots.txt`, canonical URLs and a `CNAME` for GitHub Pages, using `https://cobalto.trupermax.com`; for another domain use `CB_SITE_URL=https://other.domain npm run build:deploy`. Do not upload only the HTML files: they depend on `docs/assets`, `docs/js`, `docs/i18n` and `dist`.

## License

MIT © 2026 Oscar Castellanos ([TruperMax](https://trupermax.com))
