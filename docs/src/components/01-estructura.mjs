const chevron =
  '<svg class="cb-nav__chevron" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M2 3.5 5 6.5 8 3.5"/></svg>';
const moon =
  '<svg class="cb-theme-toggle__moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';
const sun =
  '<svg class="cb-theme-toggle__sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
const searchIcon =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>';
const homeIcon =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 11 12 4l9 7v9H3z"/></svg>';
const usersIcon =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="9" cy="8" r="4"/><path d="M2 21a7 7 0 0 1 14 0M17 4a4 4 0 0 1 0 8M22 21a7 7 0 0 0-4-6.3"/></svg>';
const chartIcon =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>';

export default {
  title: 'Estructura',
  components: [
    {
      slug: 'topbar',
      title: 'Barra de anuncio',
      description:
        'Franja superior para estados, avisos cortos o información de contacto. Va antes de la navbar.',
      examples: [
        {
          title: 'Con estado',
          description:
            'El punto `cb-dot` pulsa con el color de acento. Usa `cb-dot--static` para quitar la animación.',
          layout: 'flush',
          html: `
            <div class="cb-topbar">
              <div class="cb-topbar__inner">
                <div class="cb-topbar__status"><span class="cb-dot" aria-hidden="true"></span>Todos los sistemas operativos</div>
                <div class="cb-topbar__aside">Soporte de lunes a viernes · <a class="cb-topbar__link" href="#">Contacto</a></div>
              </div>
            </div>
          `,
        },
        {
          title: 'Estados de color',
          layout: 'flush',
          html: `
            <div class="cb-topbar">
              <div class="cb-topbar__inner">
                <div class="cb-topbar__status"><span class="cb-dot cb-dot--warning" aria-hidden="true"></span>Mantenimiento programado el sábado a las 22:00</div>
              </div>
            </div>
          `,
        },
      ],
      classes: [
        ['`.cb-topbar`', 'Contenedor con borde inferior y texto pequeño.'],
        ['`.cb-topbar__inner`', 'Fila centrada con el ancho máximo del contenedor.'],
        ['`.cb-topbar__status`', 'Texto principal con espacio para el punto.'],
        ['`.cb-topbar__aside`', 'Texto secundario. Se oculta por debajo de 600px.'],
        ['`.cb-topbar__link`', 'Enlace subrayado dentro de la barra.'],
        [
          '`.cb-dot`',
          'Indicador que pulsa. Variantes `--success`, `--warning`, `--danger`, `--static`.',
        ],
      ],
      a11y: [
        'Marca el punto con `aria-hidden="true"`: el texto ya comunica el estado.',
        'La animación del punto se detiene con `prefers-reduced-motion`.',
      ],
    },
    {
      slug: 'navbar',
      title: 'Navbar',
      description:
        'Barra fija con logo, menú con submenús (hover y clic), búsqueda, cambio de tema y llamada a la acción.',
      examples: [
        {
          title: 'Completa',
          description:
            'Los submenús usan el mismo componente que el dropdown. Con `data-cb-dropdown-hover` también se abren al pasar el mouse en dispositivos que lo permiten.',
          layout: 'flush',
          html: `
            <header class="cb-nav static">
              <div class="cb-nav__inner">
                <a href="#" class="cb-logo"><span class="cb-logo__mark" aria-hidden="true">A</span>Acme</a>
                <nav aria-label="Principal">
                  <ul class="cb-nav__menu">
                    <li class="cb-nav__item"><a class="cb-nav__link" href="#" aria-current="page">Inicio</a></li>
                    <li class="cb-nav__item cb-dropdown" data-cb-dropdown data-cb-dropdown-hover>
                      <button class="cb-nav__link" type="button" data-cb-dropdown-trigger>Productos ${chevron}</button>
                      <div class="cb-dropdown__panel cb-dropdown__panel--wide">
                        <a class="cb-dropdown__item cb-dropdown__item--rich" href="#"><span class="cb-dropdown__num">01</span><span><strong class="cb-dropdown__title">Facturación</strong><span class="cb-dropdown__desc">Emite y controla tus documentos.</span></span></a>
                        <a class="cb-dropdown__item cb-dropdown__item--rich" href="#"><span class="cb-dropdown__num">02</span><span><strong class="cb-dropdown__title">Inventario</strong><span class="cb-dropdown__desc">Existencias en tiempo real.</span></span></a>
                      </div>
                    </li>
                    <li class="cb-nav__item"><a class="cb-nav__link" href="#">Precios</a></li>
                  </ul>
                </nav>
                <div class="cb-nav__actions">
                  <button class="cb-search-btn" type="button" aria-label="Buscar">${searchIcon}<span class="cb-search-btn__text">Buscar</span><kbd data-cb-kbd-mod="K">⌘K</kbd></button>
                  <button class="cb-icon-btn" type="button" data-cb-theme-toggle aria-label="Cambiar tema">${moon}${sun}</button>
                  <a href="#" class="cb-btn cb-btn--primary cb-nav__collapse-sm">Empezar ↗</a>
                </div>
              </div>
            </header>
          `,
        },
      ],
      classes: [
        ['`.cb-nav`', 'Barra fija arriba con fondo translúcido y desenfoque.'],
        ['`.cb-nav__inner`', 'Fila con el ancho máximo del contenedor y 64px de alto.'],
        ['`.cb-logo`, `.cb-logo__mark`', 'Logo con marca cuadrada en color de acento.'],
        ['`.cb-nav__menu`', 'Lista de enlaces. Se oculta por debajo de 960px.'],
        [
          '`.cb-nav__item`, `.cb-nav__link`',
          'Elemento y enlace o botón del menú. `aria-current="page"` lo marca activo.',
        ],
        ['`.cb-nav__chevron`', 'Flecha que gira cuando el submenú está abierto.'],
        ['`.cb-nav__actions`', 'Grupo de acciones alineado a la derecha.'],
        ['`.cb-nav__collapse`', 'Se oculta por debajo de 960px.'],
        ['`.cb-nav__collapse-sm`', 'Se oculta por debajo de 600px.'],
        ['`.cb-nav__burger`', 'Botón del menú móvil, visible solo por debajo de 960px.'],
        ['`.cb-search-btn`', 'Botón de búsqueda con atajo de teclado.'],
        [
          '`.cb-theme-toggle__sun`, `.cb-theme-toggle__moon`',
          'Iconos que se alternan solos según el modo.',
        ],
      ],
      attributes: [
        ['`data-cb-dropdown`', 'Convierte el `li` en un submenú.'],
        ['`data-cb-dropdown-hover`', 'Abre el submenú con hover en dispositivos con mouse.'],
        ['`data-cb-theme-toggle`', 'Alterna entre claro y oscuro y lo guarda.'],
        ['`data-cb-kbd-mod="K"`', 'Muestra ⌘K en Mac y Ctrl K en el resto.'],
      ],
      events: [
        ['`cb:open` / `cb:close`', 'En el `li` del submenú al abrir o cerrar.'],
        ['`cb:theme`', 'En `document` al cambiar el modo. `detail.theme` y `detail.resolved`.'],
      ],
      a11y: [
        'Los submenús son botones con `aria-expanded` y `aria-controls`; Esc los cierra y devuelve el foco.',
        'Flecha abajo en el botón abre el submenú y enfoca el primer enlace.',
        'El botón de tema necesita `aria-label`; los iconos van con `aria-hidden`.',
      ],
    },
    {
      slug: 'menu-movil',
      title: 'Menú móvil',
      description:
        'Menú a pantalla completa que entra desde la derecha debajo de la navbar. Se cierra al elegir un enlace, con Esc o al pasar a escritorio.',
      examples: [
        {
          title: 'Botón y panel',
          description:
            'El botón apunta al id del panel con `data-cb-mobile-toggle`. Achica la ventana por debajo de 960px para verlo funcionar.',
          layout: 'block',
          html: `
            <button class="cb-icon-btn" type="button" data-cb-mobile-toggle="demo-mobile" aria-label="Menú">
              <svg class="cb-burger__open" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
              <svg class="cb-burger__close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>
            </button>
            <nav class="cb-mobile-menu" id="demo-mobile" data-cb-mobile-menu aria-label="Menú móvil">
              <a class="cb-mobile-menu__link" href="#">Inicio <span class="cb-mobile-menu__meta">01</span></a>
              <a class="cb-mobile-menu__link" href="#">Servicios <span class="cb-mobile-menu__meta">02</span></a>
              <div class="cb-label cb-mobile-menu__label"><b>//</b>Productos</div>
              <a class="cb-mobile-menu__link" href="#">Facturación <span class="cb-mobile-menu__meta">↗</span></a>
              <a href="#" class="cb-btn cb-btn--primary cb-mobile-menu__cta">Empezar ↗</a>
            </nav>
          `,
        },
      ],
      classes: [
        ['`.cb-mobile-menu`', 'Panel fijo bajo la navbar. `.is-open` lo muestra.'],
        ['`.cb-mobile-menu__link`', 'Enlace grande con borde inferior.'],
        ['`.cb-mobile-menu__meta`', 'Número o flecha a la derecha del enlace.'],
        ['`.cb-mobile-menu__label`', 'Separador de sección (se combina con `.cb-label`).'],
        ['`.cb-mobile-menu__cta`', 'Botón de ancho completo al final.'],
        [
          '`.cb-burger__open`, `.cb-burger__close`',
          'Iconos que se alternan según `aria-expanded`.',
        ],
      ],
      attributes: [
        ['`data-cb-mobile-menu`', 'Marca el panel. Necesita `id`.'],
        ['`data-cb-mobile-toggle="id"`', 'Botón que abre y cierra el panel.'],
      ],
      events: [['`cb:open` / `cb:close`', 'En el panel. `cb:open` se puede cancelar.']],
      a11y: [
        'El botón recibe `aria-expanded` y `aria-controls` automáticamente.',
        'Cerrado queda con `visibility: hidden`, así sus enlaces no reciben foco.',
        'Esc cierra el menú y devuelve el foco al botón.',
      ],
    },
    {
      slug: 'hero',
      title: 'Hero',
      description:
        'Portada con etiqueta numerada, titular grande, texto, acciones, nota y chips. La cuadrícula de fondo es opcional.',
      examples: [
        {
          title: 'Con cuadrícula',
          layout: 'flush',
          html: `
            <section class="cb-section cb-hero cb-hero--grid border-b-0">
              <div class="cb-wrap">
                <div class="cb-label"><b>01/</b>Plataforma</div>
                <h1 class="cb-h1">Herramientas<br>que trabajan. <em>Sin ruido.</em></h1>
                <p class="cb-lead">Un párrafo corto que explica qué haces y para quién. Dos o tres líneas como máximo.</p>
                <div class="cb-actions">
                  <a href="#" class="cb-btn cb-btn--primary">Empezar ↗</a>
                  <a href="#" class="cb-btn cb-btn--outline">Ver demo</a>
                </div>
                <p class="cb-note">Sin tarjeta de crédito. <a href="#">Más información</a></p>
                <div class="cb-chips cb-hero__chips">
                  <span class="cb-chip"><i class="cb-chip__swatch" style="--cb-chip-color: var(--cb-accent-700)"></i>Laravel</span>
                  <span class="cb-chip"><i class="cb-chip__swatch"></i>Livewire</span>
                  <span class="cb-chip"><i class="cb-chip__swatch" style="--cb-chip-color: var(--cb-accent-300)"></i>Alpine.js</span>
                </div>
              </div>
            </section>
          `,
        },
        {
          title: 'Centrado y sin cuadrícula',
          layout: 'flush',
          html: `
            <section class="cb-section cb-hero cb-cta border-b-0">
              <div class="cb-wrap">
                <div class="cb-label"><b>v2</b>Nueva versión</div>
                <h1 class="cb-h1">Menos pasos.<br><em>Más trabajo hecho.</em></h1>
                <p class="cb-lead">Usa <code>cb-cta</code> para centrar el texto, el párrafo y las acciones.</p>
                <div class="cb-actions"><a href="#" class="cb-btn cb-btn--primary">Probar gratis ↗</a></div>
              </div>
            </section>
          `,
        },
      ],
      classes: [
        ['`.cb-hero`', 'Espaciado de portada (96/80px, 64/56px en móvil).'],
        ['`.cb-hero--grid`', 'Agrega la cuadrícula de fondo con máscara radial.'],
        ['`.cb-h1`', 'Titular con `clamp(40px, 7.4vw, 92px)` y tracking -0.06em. `em` lo atenúa.'],
        ['`.cb-lead`', 'Párrafo introductorio, máximo 640px.'],
        ['`.cb-actions`', 'Fila de botones. En móvil ocupan todo el ancho.'],
        ['`.cb-note`', 'Nota pequeña bajo las acciones.'],
        ['`.cb-hero__chips`', 'Margen superior para la fila de chips.'],
        [
          '`cb-grid-bg`',
          'Utilidad: la cuadrícula en cualquier contenedor. Tamaño con `--cb-grid-size`.',
        ],
      ],
      a11y: [
        'Usa un solo `h1` por página.',
        'La cuadrícula es un pseudoelemento decorativo sin contenido.',
      ],
    },
    {
      slug: 'section-header',
      title: 'Encabezado de sección',
      description:
        'Etiqueta numerada, título h2 y párrafo. Es la pieza que da el ritmo editorial a cada sección.',
      examples: [
        {
          title: 'Básico',
          layout: 'block',
          html: `
            <div class="cb-section-head">
              <div class="cb-label"><b>02/</b>Servicios</div>
              <h2 class="cb-h2">Seis servicios.<br>Un solo equipo.</h2>
              <p class="cb-lead">Cada proyecto se construye a la medida, con el mismo estándar de calidad.</p>
            </div>
          `,
        },
        {
          title: 'Centrado',
          layout: 'block',
          html: `
            <div class="cb-section-head cb-section-head--center">
              <div class="cb-label"><b>03/</b>Proceso</div>
              <h2 class="cb-h2">Hecho con cuidado. <em>Pensado para durar.</em></h2>
              <p class="cb-lead">El párrafo se centra solo con el modificador.</p>
            </div>
          `,
        },
        {
          title: 'Sección completa',
          description:
            '`cb-section` da el padding vertical de 110px (80px en móvil) y la línea inferior.',
          layout: 'flush',
          code: `
            <section class="cb-section">
              <div class="cb-wrap">
                <div class="cb-label"><b>04/</b>Contacto</div>
                <h2 class="cb-h2">¿Tienes un proyecto?</h2>
                <p class="cb-lead">Cuéntanos qué necesitas.</p>
              </div>
            </section>
          `,
          html: `
            <section class="cb-section">
              <div class="cb-wrap">
                <div class="cb-label"><b>04/</b>Contacto</div>
                <h2 class="cb-h2">¿Tienes un proyecto?</h2>
                <p class="cb-lead">Cuéntanos qué necesitas.</p>
              </div>
            </section>
          `,
        },
      ],
      classes: [
        [
          '`.cb-section`',
          'Sección con padding vertical y borde inferior. `--flush` quita el borde.',
        ],
        [
          '`.cb-wrap`',
          'Utilidad de contenedor: ancho `--cb-max` y gutter de 24px (16px en móvil).',
        ],
        ['`.cb-section-head--center`', 'Centra el bloque y el párrafo.'],
        [
          '`.cb-label`',
          'Etiqueta en mayúsculas. `b` va en color de acento; la línea se quita con `--plain`.',
        ],
        ['`.cb-h2`', 'Título con `clamp(30px, 4.6vw, 54px)` y tracking -0.05em.'],
        ['`.cb-h3`', 'Título de tarjeta o bloque, 17px.'],
      ],
      a11y: [
        'Respeta el orden de títulos: h1 en el hero, h2 por sección, h3 dentro de cada sección.',
      ],
    },
    {
      slug: 'footer',
      title: 'Footer',
      description: 'Pie con columnas de enlaces, texto gigante decorativo y una fila inferior.',
      examples: [
        {
          title: 'Completo',
          layout: 'flush',
          html: `
            <footer class="cb-footer">
              <div class="cb-wrap">
                <div class="cb-footer__grid">
                  <div>
                    <a href="#" class="cb-logo"><span class="cb-logo__mark" aria-hidden="true">A</span>Acme</a>
                    <p class="cb-footer__text">Software construido con cuidado y mantenido a largo plazo.</p>
                  </div>
                  <div><h4 class="cb-footer__title">Empresa</h4><ul class="cb-footer__links"><li><a href="#">Nosotros</a></li><li><a href="#">Contacto</a></li></ul></div>
                  <div><h4 class="cb-footer__title">Producto</h4><ul class="cb-footer__links"><li><a href="#">Precios</a></li><li><a href="#">Cambios</a></li></ul></div>
                  <div><h4 class="cb-footer__title">Comunidad</h4><ul class="cb-footer__links"><li><a href="#">GitHub ↗</a></li><li><a href="#">YouTube ↗</a></li></ul></div>
                </div>
                <div class="cb-footer__huge" aria-hidden="true">Acme</div>
                <div class="cb-footer__bottom"><span class="cb-footer__credit">© 2026 Oscar Castellanos (<a href="https://trupermax.com">TruperMax</a>) · <a href="https://github.com/OscarCastellanos01/cobalto/blob/main/LICENSE">Licencia MIT</a></span><span>Versión 2.4</span></div>
              </div>
            </footer>
          `,
        },
      ],
      classes: [
        ['`.cb-footer`', 'Padding del pie.'],
        ['`.cb-footer__grid`', 'Columnas 1.6fr + 3. Dos columnas por debajo de 960px.'],
        ['`.cb-footer__text`', 'Descripción bajo el logo.'],
        ['`.cb-footer__title`, `.cb-footer__links`', 'Título y lista de cada columna.'],
        ['`.cb-footer__huge`', 'Texto gigante con contorno, `clamp(64px, 17vw, 230px)`.'],
        ['`.cb-footer__bottom`', 'Fila final con copyright.'],
        ['`.cb-footer__credit`', 'Texto de autoría con enlaces subrayados.'],
      ],
      a11y: [
        'El texto gigante es decorativo: usa `aria-hidden="true"`.',
        'Si el sitio tiene varios `nav`, dale a cada uno un `aria-label` distinto.',
      ],
    },
    {
      slug: 'sidebar-docs',
      title: 'Sidebar de documentación',
      description:
        'Navegación lateral con grupos, enlace activo, selector de versión y tabla de contenidos que sigue el scroll.',
      examples: [
        {
          title: 'Sidebar',
          layout: 'block',
          html: `
            <nav class="cb-sidenav max-w-[260px]" aria-label="Documentación">
              <div class="cb-sidenav__version">
                <div class="cb-select"><select class="cb-input cb-input--sm" aria-label="Versión"><option>v2.1 (actual)</option><option>v1.4</option></select></div>
              </div>
              <div class="cb-sidenav__group">
                <p class="cb-sidenav__title">Empezar</p>
                <ul class="cb-sidenav__list">
                  <li><a class="cb-sidenav__link" href="#">Introducción</a></li>
                  <li><a class="cb-sidenav__link" href="#" aria-current="page">Instalación</a></li>
                  <li><a class="cb-sidenav__link" href="#">Temas <span class="cb-sidenav__badge">Nuevo</span></a></li>
                </ul>
              </div>
            </nav>
          `,
        },
        {
          title: 'Tabla de contenidos',
          description:
            'Con `data-cb-scrollspy` el enlace de la sección visible se marca solo. Es la columna de la derecha en esta página.',
          layout: 'block',
          html: `
            <nav class="cb-toc" aria-label="En esta página" data-cb-scrollspy>
              <p class="cb-toc__title">En esta página</p>
              <a class="cb-toc__link" href="#sidebar">Sidebar</a>
              <a class="cb-toc__link" href="#tabla-de-contenidos">Tabla de contenidos</a>
            </nav>
          `,
        },
      ],
      classes: [
        ['`.cb-sidenav`', 'Columna de grupos. `--sticky` la fija al hacer scroll.'],
        ['`.cb-sidenav__version`', 'Fila del selector de versión.'],
        [
          '`.cb-sidenav__group`, `.cb-sidenav__title`, `.cb-sidenav__list`',
          'Grupo, título y lista.',
        ],
        ['`.cb-sidenav__link`', 'Enlace con línea izquierda; `aria-current="page"` lo marca.'],
        ['`.cb-sidenav__badge`', 'Etiqueta pequeña en color de acento.'],
        ['`.cb-toc`, `.cb-toc__link`', 'Tabla de contenidos de la página.'],
      ],
      attributes: [
        ['`data-cb-scrollspy`', 'Marca el enlace cuya sección está en pantalla.'],
        ['`data-cb-version-select`', 'Al cambiar el `select` navega a la URL del `value`.'],
      ],
      events: [
        ['`cb:change`', 'En el `nav` con scrollspy cuando cambia la sección activa (`detail.id`).'],
      ],
      a11y: [
        'La página actual usa `aria-current="page"`; la sección activa usa `aria-current="true"`.',
        'El `select` de versión necesita una etiqueta, aunque sea `cb-sr-only`.',
      ],
    },
    {
      slug: 'dashboard',
      title: 'Layout de dashboard',
      description:
        'Sidebar fija, topbar y área de contenido. En móvil la sidebar se vuelve un panel lateral.',
      examples: [
        {
          title: 'Estructura',
          description: 'Mira la plantilla completa en `examples/dashboard.html`.',
          layout: 'flush',
          html: `
            <div class="cb-dash min-h-[440px]">
              <aside class="cb-dash__sidebar h-auto static visible translate-x-0 shadow-none" aria-label="Menú del panel">
                <a href="#" class="cb-logo cb-dash__brand"><span class="cb-logo__mark" aria-hidden="true">A</span>Acme</a>
                <nav class="cb-dash__nav">
                  <div class="cb-dash__group">
                    <p class="cb-dash__group-title">General</p>
                    <a class="cb-dash__link" href="#" aria-current="page">${homeIcon}Resumen</a>
                    <a class="cb-dash__link" href="#">${usersIcon}Clientes<span class="cb-badge">12</span></a>
                    <a class="cb-dash__link" href="#">${chartIcon}Reportes</a>
                  </div>
                </nav>
              </aside>
              <div class="cb-dash__main">
                <div class="cb-dash__topbar static"><strong>Resumen</strong></div>
                <div class="cb-dash__content">
                  <div class="cb-stats mt-0"><div class="cb-stat"><strong class="cb-stat__value">Q 48k</strong><span class="cb-stat__label">Ventas del mes</span></div><div class="cb-stat"><strong class="cb-stat__value">312</strong><span class="cb-stat__label">Pedidos</span></div></div>
                </div>
              </div>
            </div>
          `,
          code: `
            <div class="cb-dash">
              <aside class="cb-dash__sidebar" id="sidebar" data-cb-dash-sidebar aria-label="Menú del panel">
                <a href="#" class="cb-logo cb-dash__brand">...</a>
                <nav class="cb-dash__nav">
                  <div class="cb-dash__group">
                    <p class="cb-dash__group-title">General</p>
                    <a class="cb-dash__link" href="#" aria-current="page">Resumen</a>
                  </div>
                </nav>
              </aside>
              <div class="cb-dash__scrim" data-cb-dash-scrim="sidebar"></div>
              <div class="cb-dash__main">
                <header class="cb-dash__topbar">
                  <button class="cb-icon-btn cb-dash__toggle" type="button" data-cb-dash-toggle="sidebar" aria-label="Menú">...</button>
                  <div class="cb-dash__topbar-actions">...</div>
                </header>
                <main class="cb-dash__content">...</main>
              </div>
            </div>
          `,
        },
      ],
      classes: [
        ['`.cb-dash`', 'Grilla sidebar + contenido. El ancho se cambia con `--cb-dash-sidebar`.'],
        ['`.cb-dash__sidebar`', 'Columna fija. Por debajo de 960px es un panel fuera de pantalla.'],
        ['`.cb-dash__scrim`', 'Fondo oscuro detrás de la sidebar en móvil.'],
        ['`.cb-dash__link`', 'Enlace con icono; `aria-current="page"` marca la línea de acento.'],
        ['`.cb-dash__topbar`', 'Barra superior fija del contenido.'],
        ['`.cb-dash__toggle`', 'Botón visible solo en móvil.'],
        [
          '`.cb-dash__content`, `.cb-dash__header`, `.cb-dash__title`',
          'Área principal y su encabezado.',
        ],
        [
          '`.cb-panel`, `.cb-panel__head`, `.cb-panel__body`',
          'Caja con borde para agrupar contenido.',
        ],
      ],
      attributes: [
        ['`data-cb-dash-sidebar`', 'Marca la sidebar. Necesita `id`.'],
        ['`data-cb-dash-toggle="id"`', 'Botón que la abre en móvil.'],
        ['`data-cb-dash-scrim="id"`', 'Fondo que la cierra al hacer clic.'],
      ],
      events: [['`cb:open` / `cb:close`', 'En la sidebar al abrirse o cerrarse en móvil.']],
      a11y: [
        'En móvil la sidebar atrapa el foco y se cierra con Esc.',
        'Usa `main` para el contenido y `aria-label` en la sidebar.',
      ],
    },
  ],
};
