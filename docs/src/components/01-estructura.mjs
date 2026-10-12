export default {
  key: 'estructura',
  components: [
    {
      slug: 'topbar',
      examples: [
        {
          id: 'con-estado',
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
          id: 'estados-de-color',
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
    },
    {
      slug: 'navbar',
      examples: [
        {
          id: 'completa',
          layout: 'flush',
          html: `
            <header class="cb-nav static">
              <div class="cb-nav__inner">
                <a href="#" class="cb-logo"><span class="cb-logo__mark" aria-hidden="true">A</span>Acme</a>
                <nav aria-label="Principal">
                  <ul class="cb-nav__menu">
                    <li class="cb-nav__item"><a class="cb-nav__link" href="#" aria-current="page">Inicio</a></li>
                    <li class="cb-nav__item cb-dropdown" data-cb-dropdown data-cb-dropdown-hover>
                      <button class="cb-nav__link" type="button" data-cb-dropdown-trigger>Productos <svg class="cb-nav__chevron" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M2 3.5 5 6.5 8 3.5"/></svg></button>
                      <div class="cb-dropdown__panel cb-dropdown__panel--wide">
                        <a class="cb-dropdown__item cb-dropdown__item--rich" href="#"><span class="cb-dropdown__num">01</span><span><strong class="cb-dropdown__title">Facturación</strong><span class="cb-dropdown__desc">Emite y controla tus documentos.</span></span></a>
                        <a class="cb-dropdown__item cb-dropdown__item--rich" href="#"><span class="cb-dropdown__num">02</span><span><strong class="cb-dropdown__title">Inventario</strong><span class="cb-dropdown__desc">Existencias en tiempo real.</span></span></a>
                      </div>
                    </li>
                    <li class="cb-nav__item"><a class="cb-nav__link" href="#">Precios</a></li>
                  </ul>
                </nav>
                <div class="cb-nav__actions">
                  <button class="cb-search-btn" type="button" aria-label="Buscar"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg><span class="cb-search-btn__text">Buscar</span><kbd data-cb-kbd-mod="K">⌘K</kbd></button>
                  <button class="cb-icon-btn" type="button" data-cb-theme-toggle aria-label="Cambiar tema"><svg class="cb-theme-toggle__moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg><svg class="cb-theme-toggle__sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg></button>
                  <a href="#" class="cb-btn cb-btn--primary cb-nav__collapse-sm">Empezar ↗</a>
                </div>
              </div>
            </header>
          `,
        },
      ],
    },
    {
      slug: 'menu-movil',
      examples: [
        {
          id: 'boton-y-panel',
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
    },
    {
      slug: 'hero',
      examples: [
        {
          id: 'con-cuadricula',
          layout: 'flush',
          html: `
            <section class="cb-section cb-hero cb-hero--grid border-b-0">
              <div class="cb-wrap">
                <div class="cb-label"><b>01/</b>Plataforma</div>
                <h1 class="cb-h1">Facturación clara<br>para tu <em>negocio.</em></h1>
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
          id: 'centrado-y-sin-cuadricula',
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
    },
    {
      slug: 'section-header',
      examples: [
        {
          id: 'basico',
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
          id: 'centrado',
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
          id: 'seccion-completa',
          layout: 'flush',
          html: `
            <section class="cb-section">
              <div class="cb-wrap">
                <div class="cb-label"><b>04/</b>Contacto</div>
                <h2 class="cb-h2">¿Tienes un proyecto?</h2>
                <p class="cb-lead">Cuéntanos qué necesitas.</p>
              </div>
            </section>
          `,
          code: `
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
    },
    {
      slug: 'footer',
      examples: [
        {
          id: 'completo',
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
    },
    {
      slug: 'sidebar-docs',
      examples: [
        {
          id: 'sidebar',
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
          id: 'tabla-de-contenidos',
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
    },
    {
      slug: 'dashboard',
      examples: [
        {
          id: 'estructura',
          layout: 'flush',
          html: `
            <div class="cb-dash min-h-[440px]">
              <aside class="cb-dash__sidebar h-auto static visible translate-x-0 shadow-none" aria-label="Menú del panel">
                <a href="#" class="cb-logo cb-dash__brand"><span class="cb-logo__mark" aria-hidden="true">A</span>Acme</a>
                <nav class="cb-dash__nav">
                  <div class="cb-dash__group">
                    <p class="cb-dash__group-title">General</p>
                    <a class="cb-dash__link" href="#" aria-current="page"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 11 12 4l9 7v9H3z"/></svg>Resumen</a>
                    <a class="cb-dash__link" href="#"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="9" cy="8" r="4"/><path d="M2 21a7 7 0 0 1 14 0M17 4a4 4 0 0 1 0 8M22 21a7 7 0 0 0-4-6.3"/></svg>Clientes<span class="cb-badge">12</span></a>
                    <a class="cb-dash__link" href="#"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>Reportes</a>
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
    },
  ],
};
