# Cobalto

Componentes UI editoriales para **Tailwind CSS v4**: tipografía monoespaciada, bordes finos en lugar de sombras, secciones numeradas y un sistema de color que cambias con una sola variable.

- 36 componentes, de la navbar a la tabla de datos.
- 6 temas de color, cada uno con modo claro y oscuro, todos con contraste AA verificado.
- JavaScript opcional y sin dependencias, controlado con atributos `data-cb-*`.
- Funciona con Laravel, Livewire y Alpine sin configuración extra.

## Instalación

### Con Tailwind (recomendado)

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

### Laravel + Vite

```css
/* resources/css/app.css */
@import "tailwindcss";
@import "cobalto/tailwind";

@source "../views";
```

```js
// resources/js/app.js
import cobalto from 'cobalto';

window.cobalto = cobalto;
cobalto.autoInit();
```

Después de cada `wire:navigate` se vuelve a inicializar todo, y lo que Livewire o Alpine agregan al DOM se inicializa solo. Cobalto solo usa clases `cb-*` y atributos `data-cb-*`, así que no choca con `x-*` ni `wire:*`.

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

Antes de abrir un pull request, lee [`CLAUDE.md`](CLAUDE.md): comentarios solo cuando aportan, en español y sin tildes, sin alineación vertical y con indentación de 2 espacios. `npm run lint:style` revisa lo básico.

Para documentar un componente nuevo, agrega su entrada en `docs/src/components/` y corre `npm run build:site`.

## Licencia

MIT © 2026 Oscar Castellanos ([TruperMax](https://trupermax.com))
