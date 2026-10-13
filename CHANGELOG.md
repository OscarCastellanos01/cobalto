# Changelog

Todos los cambios importantes de este proyecto se documentan aquí. El formato sigue [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/) y el versionado sigue [SemVer](https://semver.org/lang/es/).

## [0.1.0] - 2026-10-12

### Agregado

- Tokens de color `--cb-*` mapeados a utilidades de Tailwind v4 con `@theme inline`.
- Escala de acento `--cb-accent-50` a `--cb-accent-950` generada con `color-mix()`.
- Temas `cobalto`, `esmeralda`, `ambar`, `rubi`, `violeta` y `grafito`, con modo claro y oscuro.
- Modo claro y oscuro con `data-cb-theme` y `prefers-color-scheme`, y variantes `dark:` y `light:`.
- Tokens de tipografía, radios, espaciado, sombras, duraciones, capas y breakpoints.
- Componentes: topbar, navbar, menú móvil, command palette, hero, encabezado de sección, card, grid, principios, stats, CTA, footer, botones, chips y tags, formularios, tabla de datos, tabs, accordion, modal, drawer, toast, alert, tooltip, popover, badge, avatar, breadcrumb, paginación, sidebar de documentación, bloque de código, pricing, testimonios, timeline, skeleton, spinner, empty state, stepper, dropdown, progress y layout de dashboard.
- JavaScript sin dependencias (ESM y UMD) con `init()`, `autoInit()`, `toast()`, `modal`, `drawer` y `theme`.
- Soporte para Livewire (`livewire:navigated`) y nodos agregados dinámicamente.
- Sitio de documentación con personalizador de colores en vivo y ejemplos de landing, dashboard, login, pricing y documentación.

### Cambiado respecto al diseño de referencia

- `--cb-dark-dim` pasa de `#56689a` a `#6f7fab` y `--cb-light-dim` de `#7d8db3` a `#5c6a8d` para llegar a contraste AA.
- El relleno de acento en modo oscuro (`--cb-accent-bg`) se oscurece un 14 % para que el texto blanco del botón primario llegue a 4.5:1.

[0.1.0]: https://github.com/OscarCastellanos01/cobalto/releases/tag/v0.1.0
