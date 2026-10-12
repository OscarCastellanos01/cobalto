export default {
  key: 'acciones',
  components: [
    {
      slug: 'botones',
      examples: [
        {
          id: 'variantes',
          html: `
            <button class="cb-btn cb-btn--primary" type="button">Primario ↗</button>
            <button class="cb-btn cb-btn--outline" type="button">Outline</button>
            <button class="cb-btn cb-btn--ghost" type="button">Ghost</button>
            <button class="cb-btn cb-btn--soft" type="button">Soft</button>
            <button class="cb-btn cb-btn--danger" type="button">Eliminar</button>
            <a class="cb-btn cb-btn--link" href="#">Enlace</a>
          `,
        },
        {
          id: 'tamanos',
          html: `
            <button class="cb-btn cb-btn--primary cb-btn--sm" type="button">Pequeño</button>
            <button class="cb-btn cb-btn--primary" type="button">Mediano</button>
            <button class="cb-btn cb-btn--primary cb-btn--lg" type="button">Grande</button>
          `,
        },
        {
          id: 'con-icono',
          html: `
            <button class="cb-btn cb-btn--primary" type="button"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>Nuevo</button>
            <button class="cb-btn cb-btn--outline" type="button">Descargar<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 4v12m0 0-5-5m5 5 5-5M4 20h16"/></svg></button>
            <button class="cb-btn cb-btn--outline cb-btn--icon" type="button" aria-label="Más opciones"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/></svg></button>
            <button class="cb-icon-btn" type="button" aria-label="Editar"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 20h4L19 9l-4-4L4 16z"/></svg></button>
          `,
        },
        {
          id: 'deshabilitado-y-cargando',
          html: `
            <button class="cb-btn cb-btn--primary" type="button" disabled>Deshabilitado</button>
            <a class="cb-btn cb-btn--outline" aria-disabled="true">Enlace inactivo</a>
            <button class="cb-btn cb-btn--primary" type="button" aria-busy="true"><span>Guardando</span></button>
            <button class="cb-btn cb-btn--outline" type="button" aria-busy="true"><span>Cargando</span></button>
          `,
        },
        {
          id: 'grupo-de-acciones',
          layout: 'block',
          html: `
            <div class="cb-actions mt-0">
              <a href="#" class="cb-btn cb-btn--primary">Cotizar ↗</a>
              <a href="#" class="cb-btn cb-btn--outline">Ver servicios</a>
            </div>
          `,
        },
      ],
    },
    {
      slug: 'chips-tags',
      examples: [
        {
          id: 'chips',
          html: `
            <div class="cb-chips">
              <a class="cb-chip" href="#"><i class="cb-chip__swatch" style="--cb-chip-color: var(--cb-accent-800)"></i>Laravel</a>
              <a class="cb-chip" href="#"><i class="cb-chip__swatch" style="--cb-chip-color: var(--cb-accent-600)"></i>React Native</a>
              <a class="cb-chip" href="#"><i class="cb-chip__swatch"></i>Kotlin</a>
              <a class="cb-chip" href="#"><i class="cb-chip__swatch" style="--cb-chip-color: var(--cb-accent-300)"></i>Docker</a>
              <button class="cb-chip" type="button" aria-pressed="true"><i class="cb-chip__swatch" style="--cb-chip-color: var(--cb-success)"></i>Filtro activo</button>
            </div>
          `,
        },
        {
          id: 'tags-de-estado',
          html: `
            <span class="cb-tag">Por proyecto</span>
            <span class="cb-tag cb-tag--live">Activo</span>
            <span class="cb-tag cb-tag--success">Pagado</span>
            <span class="cb-tag cb-tag--warning">Pendiente</span>
            <span class="cb-tag cb-tag--danger">Vencido</span>
            <span class="cb-tag cb-tag--info">Borrador</span>
          `,
        },
        {
          id: 'atajos-de-teclado',
          html: `
            <span class="text-cb-sm text-cb-muted">Buscar <kbd>⌘</kbd> <kbd>K</kbd> · Cerrar <kbd>Esc</kbd> · Navegar <kbd>↑</kbd> <kbd>↓</kbd></span>
          `,
        },
      ],
    },
    {
      slug: 'badge-avatar',
      examples: [
        {
          id: 'badges',
          html: `
            <span class="cb-badge">12</span>
            <span class="cb-badge cb-badge--accent">Nuevo</span>
            <span class="cb-badge cb-badge--success">Pagado</span>
            <span class="cb-badge cb-badge--warning">3 días</span>
            <span class="cb-badge cb-badge--danger">99+</span>
            <span class="cb-badge cb-badge--solid">Pro</span>
            <span class="cb-badge cb-badge--dot cb-badge--success" role="img" aria-label="En línea"></span>
          `,
        },
        {
          id: 'avatares',
          html: `
            <span class="cb-avatar cb-avatar--sm">AB</span>
            <span class="cb-avatar">CD</span>
            <span class="cb-avatar cb-avatar--lg cb-avatar--accent">EF<span class="cb-avatar__status cb-avatar__status--online" role="img" aria-label="En línea"></span></span>
            <span class="cb-avatar cb-avatar--xl cb-avatar--square">GH</span>
          `,
        },
        {
          id: 'grupo-y-usuario',
          html: `
            <div class="cb-avatar-group" aria-label="5 colaboradores">
              <span class="cb-avatar">AR</span><span class="cb-avatar cb-avatar--accent">JM</span><span class="cb-avatar">LP</span><span class="cb-avatar">+2</span>
            </div>
            <div class="cb-user">
              <span class="cb-avatar">LM</span>
              <span><span class="cb-user__name">Lucía Morales</span><span class="cb-user__meta">Administrador</span></span>
            </div>
          `,
        },
      ],
    },
    {
      slug: 'dropdown',
      examples: [
        {
          id: 'menu-de-acciones',
          layout: 'tall',
          html: `
            <div class="cb-dropdown self-start" data-cb-dropdown>
              <button class="cb-btn cb-btn--outline" type="button" data-cb-dropdown-trigger>Acciones <svg class="cb-nav__chevron" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M2 3.5 5 6.5 8 3.5"/></svg></button>
              <div class="cb-dropdown__panel" role="menu" aria-label="Acciones">
                <p class="cb-dropdown__label">Documento</p>
                <button class="cb-dropdown__item" type="button" role="menuitem" data-value="edit"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 20h4L19 9l-4-4L4 16z"/></svg>Editar<span class="cb-dropdown__shortcut">E</span></button>
                <button class="cb-dropdown__item" type="button" role="menuitem" data-value="download"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 4v12m0 0-5-5m5 5 5-5M4 20h16"/></svg>Descargar<span class="cb-dropdown__shortcut">D</span></button>
                <hr class="cb-dropdown__divider">
                <button class="cb-dropdown__item cb-dropdown__item--danger" type="button" role="menuitem" data-value="delete"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/></svg>Eliminar</button>
              </div>
            </div>
          `,
        },
        {
          id: 'alineado-a-la-derecha',
          layout: 'tall',
          html: `
            <div class="cb-dropdown ml-auto self-start" data-cb-dropdown>
              <button class="cb-btn cb-btn--outline cb-btn--icon" type="button" aria-label="Más opciones" data-cb-dropdown-trigger><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/></svg></button>
              <div class="cb-dropdown__panel cb-dropdown__panel--end" role="menu" aria-label="Opciones">
                <a class="cb-dropdown__item" href="#" role="menuitem">Perfil</a>
                <a class="cb-dropdown__item" href="#" role="menuitem">Configuración</a>
                <hr class="cb-dropdown__divider">
                <a class="cb-dropdown__item" href="#" role="menuitem">Cerrar sesión</a>
              </div>
            </div>
          `,
        },
      ],
      snippets: [
        {
          code: `
            document.querySelector('#acciones').addEventListener('cb:select', (event) => {
              console.log(event.detail.value);
            });
          `,
        },
      ],
    },
    {
      slug: 'breadcrumb',
      examples: [
        {
          id: 'basico',
          html: `
            <nav aria-label="Ruta">
              <ol class="cb-breadcrumb">
                <li class="cb-breadcrumb__item"><a href="#">Inicio</a></li>
                <li class="cb-breadcrumb__item"><a href="#">Clientes</a></li>
                <li class="cb-breadcrumb__item"><span aria-current="page">María Ramírez</span></li>
              </ol>
            </nav>
          `,
        },
      ],
    },
    {
      slug: 'paginacion',
      examples: [
        {
          id: 'basica',
          html: `
            <nav aria-label="Paginación">
              <ul class="cb-pagination">
                <li><a class="cb-pagination__item" href="#" aria-label="Página anterior">←<span class="cb-pagination__label">&nbsp;Anterior</span></a></li>
                <li><a class="cb-pagination__item" href="#">1</a></li>
                <li><a class="cb-pagination__item" href="#" aria-current="page">2</a></li>
                <li><a class="cb-pagination__item" href="#">3</a></li>
                <li class="cb-pagination__ellipsis" aria-hidden="true">…</li>
                <li><a class="cb-pagination__item" href="#">12</a></li>
                <li><a class="cb-pagination__item" href="#" aria-label="Página siguiente"><span class="cb-pagination__label">Siguiente&nbsp;</span>→</a></li>
              </ul>
            </nav>
          `,
        },
      ],
    },
  ],
};
