# Cobalto

[![npm](https://img.shields.io/npm/v/cobalto)](https://www.npmjs.com/package/cobalto) [![licencia](https://img.shields.io/npm/l/cobalto)](LICENSE)

**Documentación y ejemplos:** [cobalto.trupermax.com](https://cobalto.trupermax.com)

Componentes UI editoriales para **Tailwind CSS v4**: tipografía monoespaciada, bordes finos en lugar de sombras, secciones numeradas y un sistema de color que cambias con una sola variable.

- Componentes de la navbar a la tabla de datos.
- 6 temas de color, cada uno con modo claro y oscuro, todos con contraste AA verificado.
- JavaScript opcional y sin dependencias, controlado con atributos `data-cb-*`.
- Funciona con Laravel, Livewire y Alpine sin configuración extra.

## Instalación

### Con Tailwind (recomendado)

El paquete está en [npmjs.com/package/cobalto](https://www.npmjs.com/package/cobalto).

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

`autoInit()` restaura el tema guardado, inicializa los componentes de la página y vigila el DOM para inicializar los que se agreguen después.

### Sin build, desde CDN

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/cobalto@0.1.0/dist/cobalto.min.css">
<script src="https://cdn.jsdelivr.net/npm/cobalto@0.1.0/dist/cobalto.umd.min.js" defer></script>
```

El script se inicializa solo. Agrega `data-cb-manual` al `<script>` si prefieres llamar a `cobalto.init()` tú mismo.

Sin atributo, el modo claro u oscuro sigue al sistema. Si tus usuarios eligen un tema, agrega este script en el `head` para aplicarlo antes del primer pintado y evitar un parpadeo (sirve igual en cualquier stack, incluido Laravel):

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

### Laravel 12 y 13 + Vite

```css
/* resources/css/app.css: lo que trae Laravel, mas Cobalto */
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

### Livewire 3 y 4, Alpine

Después de cada `wire:navigate` se vuelve a inicializar todo, y lo que Livewire o Alpine agregan al DOM se inicializa solo. Cobalto solo usa clases `cb-*` y atributos `data-cb-*`, así que no choca con `x-*` ni `wire:*`.

Para lanzar un toast desde PHP:

```php
$this->dispatch('toast', title: 'Guardado', variant: 'success');
```

```js
document.addEventListener('livewire:init', () => {
  Livewire.on('toast', (event) => cobalto.toast(event));
});
```

O con Alpine: `<div x-data x-on:toast.window="cobalto.toast($event.detail)"></div>`.

### Fuente

Cobalto no carga ninguna fuente. Sin nada más usa la monoespaciada del sistema. Para JetBrains Mono, agrega el `<link>` de Google Fonts o instala `@fontsource-variable/jetbrains-mono` y cambia el token:

```css
:root {
  --font-cb-mono: "JetBrains Mono Variable", ui-monospace, monospace;
}
```

## Uso

```html
<section class="cb-section">
  <div class="cb-wrap">
    <div class="cb-label"><b>01/</b>Servicios</div>
    <h2 class="cb-h2">Seis servicios.<br>Un solo equipo.</h2>
    <p class="cb-lead">Cada proyecto se construye a la medida.</p>
    <div class="cb-actions">
      <a class="cb-btn cb-btn--primary" href="#">Cotizar ↗</a>
      <button class="cb-btn cb-btn--outline" type="button" data-cb-open="contacto">Contacto</button>
    </div>
  </div>
</section>
```

Los componentes viven en `@layer components`, así que cualquier utilidad de Tailwind los sobrescribe: `<div class="cb-card bg-cb-bg-2 p-4">`.

## Colores

Todos los colores pasan por variables `--cb-*`. Hay tres formas de cambiarlos.

**1. Una variable.** La escala `--cb-accent-50` a `--cb-accent-950`, el relleno de los botones, los fondos suaves y el foco se recalculan solos.

```css
:root {
  --cb-accent: #e11d48;
}
```

**2. Un tema predefinido:** `cobalto` (por defecto), `esmeralda`, `ambar`, `rubi`, `violeta` o `grafito`. También se puede aplicar a una sola sección.

```html
<html data-cb-accent="esmeralda">
```

**3. Un tema propio**, con valores distintos para cada modo:

```css
[data-cb-accent="marca"] {
  --cb-dark-accent: #fb923c;
  --cb-dark-accent-ink: #0c0a09;
  --cb-light-accent: #c2410c;
  --cb-light-accent-ink: #ffffff;
  /* tambien --cb-dark-bg, --cb-light-text, etc. */
}
```

Este CSS va en tu propia hoja de estilos, después de importar Cobalto (en Laravel, `resources/css/app.css`). Ojo: un bloque en `:root` gana siempre, incluso sobre `data-cb-accent`; si quieres tu tema y además poder cambiar entre los predefinidos, usa la forma con nombre y actívala con `<html data-cb-accent="marca">` o `cobalto.theme.setAccent('marca')`.

La documentación incluye un personalizador en vivo que ajusta el color para mantener contraste AA y genera el CSS.

### Claro y oscuro

Sin atributo se sigue `prefers-color-scheme` (oscuro si el sistema no indica nada). `data-cb-theme="light|dark"` lo fija en `html` o en cualquier sección. Las variantes `dark:` y `light:` de Tailwind siguen las mismas reglas.

```js
cobalto.theme.set('light'); // 'dark', 'light' o 'system'
cobalto.theme.toggle();
cobalto.theme.setAccent('violeta');
```

### Tokens

| Token | Utilidad |
| --- | --- |
| `--cb-bg`, `--cb-bg-2`, `--cb-bg-3` | `bg-cb-bg`, `bg-cb-bg-2`... |
| `--cb-line`, `--cb-line-2` | `border-cb-line` |
| `--cb-text`, `--cb-muted`, `--cb-dim` | `text-cb-muted` |
| `--cb-accent`, `--cb-accent-ink`, `--cb-accent-bg`, `--cb-accent-50…950` | `bg-cb-accent`, `text-cb-accent-ink`, `bg-cb-accent-200` |
| `--cb-success`, `--cb-warning`, `--cb-danger`, `--cb-info` | `text-cb-danger` |

También hay tokens de fuentes, tipografía (`text-cb-xs` a `text-cb-6xl`), radios, espaciado, sombras, duraciones y capas. La lista completa está en la página de personalización de la documentación.

## Componentes

| Estructura | Contenido | Acciones | Formularios y datos | Overlays | Estado |
| --- | --- | --- | --- | --- | --- |
| Barra de anuncio | Card | Botones | Formularios | Modal | Tabs |
| Navbar | Grid de cards | Chips y tags | Tabla de datos | Drawer | Accordion |
| Menú móvil | Principios | Badge y avatar | | Command palette ⌘K | Toast |
| Hero | Stats | Dropdown | | Tooltip y popover | Alert y banner |
| Encabezado de sección | CTA | Breadcrumb | | | Progress |
| Footer | Pricing | Paginación | | | Skeleton y spinner |
| Sidebar de docs | Testimonios | | | | Stepper |
| Layout de dashboard | Timeline | | | | |
| | Empty state | | | | |
| | Bloque de código | | | | |

## JavaScript

Cada componente expone `init(root)`, admite varias instancias por página y se puede llamar varias veces sin duplicar listeners.

```js
import cobalto from 'cobalto';

cobalto.init(document.querySelector('#panel'));
cobalto.toast({ title: 'Guardado', variant: 'success' });
cobalto.modal.open('confirmar');

document.querySelector('#acciones').addEventListener('cb:select', (event) => {
  console.log(event.detail.value);
});
```

Componentes sueltos: `import { init } from 'cobalto/components/tabs';`

Los eventos usan el prefijo `cb:` (`cb:open`, `cb:close`, `cb:change`, `cb:select`...). `cb:open` y `cb:close` se pueden cancelar con `preventDefault()`.

## Textos de los componentes

Los textos que ven tus usuarios (estado vacío de la búsqueda, cerrar un toast, estado y paginación de la tabla, copiar) vienen en español. Cámbialos para todo el sitio o por elemento:

```js
cobalto.autoInit({ messages: { commandEmpty: 'No results for', copyDone: 'Copied' } });
cobalto.setMessages({ tableStatus: 'Showing {start}–{end} of {total}' });
```

```html
<div data-cb-table data-cb-table-empty="No results">...</div>
```

La lista completa de claves y atributos está en la página de instalación de la documentación.

## Convenciones

- Clases con prefijo `cb-` en BEM: `.cb-card`, `.cb-card__title`, `.cb-card--featured`.
- Estados con clases `is-*` (`is-open`, `is-active`) o atributos ARIA (`aria-expanded`, `aria-current`).
- Comportamiento con atributos `data-cb-*`.
- Ningún componente usa colores fijos.

## Accesibilidad

- Contraste AA en los 6 temas y en ambos modos (`npm run test:contrast` lo verifica).
- Navegación completa con teclado, foco visible con el color de acento.
- Foco atrapado en modal, drawer y paleta; Esc cierra la capa de más arriba.
- Sin JS el contenido se ve completo; las animaciones se apagan con `prefers-reduced-motion`.

## Contribuir

```bash
npm install
npm run dev     # recompila el CSS del sitio al guardar
npm run build   # dist/, paginas de docs y assets
npm test        # estilo, contraste y pruebas de interaccion
```

Las pruebas de interacción y de accesibilidad (`npm run test:a11y`) usan Edge o Chrome instalados; con otra ruta, define `CB_BROWSER`.

Estilo de código:

- Comentarios solo cuando aportan algo (una decisión no obvia, un workaround), en español y sin tildes.
- Sin alineación vertical: un solo espacio alrededor de `=`, `:` y operadores.
- Indentación de 2 espacios, sin tabs. `.editorconfig` y `.prettierrc` ya lo configuran.
- Nombres en inglés; textos visibles en español.
- El autor siempre se escribe como "Oscar Castellanos (TruperMax)".

`npm run lint:style` revisa lo básico.

Para documentar un componente nuevo, agrega su estructura y ejemplos en `docs/src/components/` y sus textos en `docs/i18n/es.json`. Después corre `npm run i18n:sync` (crea las mismas claves vacías en `en.json`) y `npm run build:site`. La documentación nunca lleva textos escritos directamente en el HTML; `npm run test:i18n` lo verifica.

## Publicar la documentación y los ejemplos

```bash
npm run build:deploy
```

Genera la carpeta `_site/` con la documentación, los ejemplos y los archivos de `dist/` que usan. Sube el **contenido** de esa carpeta tal cual a cualquier hosting estático (GitHub Pages, Netlify, Vercel, Cloudflare Pages o un servidor con cPanel). La landing queda en la raíz y la documentación en `/docs/`. También genera `sitemap.xml`, `robots.txt`, URLs canónicas y un `CNAME` para GitHub Pages, usando `https://cobalto.trupermax.com`; para otro dominio usa `CB_SITE_URL=https://otro.dominio npm run build:deploy`. No subas solo los HTML: dependen de `docs/assets`, `docs/js`, `docs/i18n` y `dist`.

## Licencia

MIT © 2026 Oscar Castellanos ([TruperMax](https://trupermax.com))
