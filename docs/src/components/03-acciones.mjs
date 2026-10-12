const plus =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>';
const download =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 4v12m0 0-5-5m5 5 5-5M4 20h16"/></svg>';
const dots =
  '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/></svg>';
const edit =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 20h4L19 9l-4-4L4 16z"/></svg>';
const trash =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/></svg>';
const chevron =
  '<svg class="cb-nav__chevron" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M2 3.5 5 6.5 8 3.5"/></svg>';

export default {
  title: 'Acciones y etiquetas',
  components: [
    {
      slug: 'botones',
      title: 'Botones',
      description:
        'Cuatro variantes principales, tres tamaños, iconos y estados de deshabilitado y carga.',
      examples: [
        {
          title: 'Variantes',
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
          title: 'Tamaños',
          html: `
            <button class="cb-btn cb-btn--primary cb-btn--sm" type="button">Pequeño</button>
            <button class="cb-btn cb-btn--primary" type="button">Mediano</button>
            <button class="cb-btn cb-btn--primary cb-btn--lg" type="button">Grande</button>
          `,
        },
        {
          title: 'Con icono',
          html: `
            <button class="cb-btn cb-btn--primary" type="button">${plus}Nuevo</button>
            <button class="cb-btn cb-btn--outline" type="button">Descargar${download}</button>
            <button class="cb-btn cb-btn--outline cb-btn--icon" type="button" aria-label="Más opciones">${dots}</button>
            <button class="cb-icon-btn" type="button" aria-label="Editar">${edit}</button>
          `,
        },
        {
          title: 'Deshabilitado y cargando',
          description:
            'Para un enlace deshabilitado usa `aria-disabled="true"`. El estado de carga mantiene el ancho y muestra un spinner; usa `aria-busy="true"` o la clase `is-loading`.',
          html: `
            <button class="cb-btn cb-btn--primary" type="button" disabled>Deshabilitado</button>
            <a class="cb-btn cb-btn--outline" aria-disabled="true">Enlace inactivo</a>
            <button class="cb-btn cb-btn--primary" type="button" aria-busy="true"><span>Guardando</span></button>
            <button class="cb-btn cb-btn--outline" type="button" aria-busy="true"><span>Cargando</span></button>
          `,
        },
        {
          title: 'Grupo de acciones',
          description: '`cb-actions` separa los botones y en móvil los estira a todo el ancho.',
          layout: 'block',
          html: `
            <div class="cb-actions mt-0">
              <a href="#" class="cb-btn cb-btn--primary">Cotizar ↗</a>
              <a href="#" class="cb-btn cb-btn--outline">Ver servicios</a>
            </div>
          `,
        },
      ],
      classes: [
        ['`.cb-btn`', 'Base: 38px de alto, 13px, semibold.'],
        ['`.cb-btn--primary`', 'Relleno de acento con `--cb-accent-bg` y texto `--cb-accent-ink`.'],
        ['`.cb-btn--outline`', 'Borde fino (el "ghost" del diseño original).'],
        ['`.cb-btn--ghost`', 'Sin borde, fondo solo en hover.'],
        ['`.cb-btn--soft`', 'Fondo de acento suave.'],
        ['`.cb-btn--danger`', 'Acción destructiva.'],
        ['`.cb-btn--link`', 'Parece un enlace subrayado.'],
        ['`.cb-btn--sm`, `.cb-btn--lg`', 'Tamaños de 30px y 44px.'],
        ['`.cb-btn--icon`', 'Botón cuadrado solo con icono.'],
        ['`.cb-btn--block`', 'Ancho completo.'],
        ['`.is-loading`', 'Estado de carga (equivale a `aria-busy="true"`).'],
        ['`.cb-icon-btn`', 'Botón de icono con borde de 36px.'],
        ['`.cb-actions`', 'Fila de botones; `--center` los centra.'],
      ],
      a11y: [
        'Los botones solo con icono necesitan `aria-label`.',
        'Usa `button` para acciones y `a` para navegación.',
        '`aria-busy="true"` comunica que la acción está en curso.',
        'El foco visible usa el color de acento con 2px de contorno.',
      ],
    },
    {
      slug: 'chips-tags',
      title: 'Chips y tags',
      description:
        'Chips con muestra de color para filtros o tecnologías, tags de estado y la tecla `kbd`.',
      examples: [
        {
          title: 'Chips',
          description:
            'El color de la muestra sale de `--cb-chip-color`; por defecto es el acento.',
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
          title: 'Tags de estado',
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
          title: 'Atajos de teclado',
          html: `
            <span class="text-cb-sm text-cb-muted">Buscar <kbd>⌘</kbd> <kbd>K</kbd> · Cerrar <kbd>Esc</kbd> · Navegar <kbd>↑</kbd> <kbd>↓</kbd></span>
          `,
        },
      ],
      classes: [
        ['`.cb-chips`', 'Fila de chips con salto de línea.'],
        ['`.cb-chip`', 'Chip redondeado. `.is-active` o `aria-pressed="true"` lo resalta.'],
        ['`.cb-chip__swatch`', 'Muestra de color (`--cb-chip-color`).'],
        ['`.cb-tag`', 'Etiqueta de estado.'],
        ['`.cb-tag--live|accent|success|warning|danger|info`', 'Variantes de color.'],
        ['`kbd`, `.cb-kbd`', 'Tecla de atajo.'],
      ],
      a11y: [
        'Si un chip filtra contenido, hazlo `button` con `aria-pressed`.',
        'Las variantes de tag tienen contraste AA en todos los temas.',
      ],
    },
    {
      slug: 'badge-avatar',
      title: 'Badge y avatar',
      description:
        'Contadores, puntos de estado y avatares con iniciales o imagen, solos o en grupo.',
      examples: [
        {
          title: 'Badges',
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
          title: 'Avatares',
          html: `
            <span class="cb-avatar cb-avatar--sm">AB</span>
            <span class="cb-avatar">CD</span>
            <span class="cb-avatar cb-avatar--lg cb-avatar--accent">EF<span class="cb-avatar__status cb-avatar__status--online" role="img" aria-label="En línea"></span></span>
            <span class="cb-avatar cb-avatar--xl cb-avatar--square">GH</span>
          `,
        },
        {
          title: 'Grupo y usuario',
          html: `
            <div class="cb-avatar-group" aria-label="5 colaboradores">
              <span class="cb-avatar">AR</span><span class="cb-avatar cb-avatar--accent">JM</span><span class="cb-avatar">LP</span><span class="cb-avatar">+2</span>
            </div>
            <div class="cb-user">
              <span class="cb-avatar">OC</span>
              <span><span class="cb-user__name">Oscar Castellanos</span><span class="cb-user__meta">Administrador</span></span>
            </div>
          `,
        },
      ],
      classes: [
        ['`.cb-badge`', 'Contador o etiqueta corta.'],
        ['`.cb-badge--accent|success|warning|danger|info`', 'Tonos suaves.'],
        ['`.cb-badge--solid`', 'Relleno de acento.'],
        ['`.cb-badge--dot`', 'Solo un punto.'],
        ['`.cb-avatar`', 'Avatar de 36px. Acepta texto o `img`.'],
        ['`.cb-avatar--sm|lg|xl`', 'Tamaños de 28, 48 y 64px.'],
        ['`.cb-avatar--square`, `.cb-avatar--accent`', 'Forma cuadrada y tono de acento.'],
        ['`.cb-avatar__status--online|busy|away`', 'Punto de estado.'],
        ['`.cb-avatar-group`', 'Avatares superpuestos.'],
        ['`.cb-user`, `.cb-user__name`, `.cb-user__meta`', 'Avatar con nombre y detalle.'],
      ],
      a11y: [
        'Un punto de estado sin texto necesita `role="img"` y `aria-label`.',
        'Si el avatar es una imagen, su `alt` debe ser el nombre de la persona.',
      ],
    },
    {
      slug: 'dropdown',
      title: 'Dropdown',
      description:
        'Menú desplegable genérico con navegación por teclado, atajos, separadores y acciones destructivas.',
      examples: [
        {
          title: 'Menú de acciones',
          description:
            'Con `role="menu"` en el panel, las flechas recorren los elementos y Home/End van al inicio y al final.',
          layout: 'tall',
          html: `
            <div class="cb-dropdown self-start" data-cb-dropdown>
              <button class="cb-btn cb-btn--outline" type="button" data-cb-dropdown-trigger>Acciones ${chevron}</button>
              <div class="cb-dropdown__panel" role="menu" aria-label="Acciones">
                <p class="cb-dropdown__label">Documento</p>
                <button class="cb-dropdown__item" type="button" role="menuitem" data-value="edit">${edit}Editar<span class="cb-dropdown__shortcut">E</span></button>
                <button class="cb-dropdown__item" type="button" role="menuitem" data-value="download">${download}Descargar<span class="cb-dropdown__shortcut">D</span></button>
                <hr class="cb-dropdown__divider">
                <button class="cb-dropdown__item cb-dropdown__item--danger" type="button" role="menuitem" data-value="delete">${trash}Eliminar</button>
              </div>
            </div>
          `,
        },
        {
          title: 'Alineado a la derecha',
          layout: 'tall',
          html: `
            <div class="cb-dropdown ml-auto self-start" data-cb-dropdown>
              <button class="cb-btn cb-btn--outline cb-btn--icon" type="button" aria-label="Más opciones" data-cb-dropdown-trigger>${dots}</button>
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
      classes: [
        ['`.cb-dropdown`', 'Contenedor relativo.'],
        [
          '`.cb-dropdown__panel`',
          'Panel flotante. `--end` lo alinea a la derecha, `--up` lo abre hacia arriba, `--wide` lo ensancha.',
        ],
        [
          '`.cb-dropdown__item`',
          'Elemento. `--rich` para número + título + descripción; `--danger` para acciones destructivas.',
        ],
        [
          '`.cb-dropdown__num`, `.cb-dropdown__title`, `.cb-dropdown__desc`',
          'Partes del elemento enriquecido.',
        ],
        ['`.cb-dropdown__shortcut`', 'Atajo alineado a la derecha.'],
        ['`.cb-dropdown__label`, `.cb-dropdown__divider`', 'Título de grupo y separador.'],
      ],
      attributes: [
        ['`data-cb-dropdown`', 'Activa el componente.'],
        ['`data-cb-dropdown-trigger`', 'Botón que abre (por defecto, el primer `button`).'],
        ['`data-cb-dropdown-panel`', 'Panel (por defecto, `.cb-dropdown__panel`).'],
        ['`data-cb-dropdown-hover`', 'También abre con hover.'],
        ['`data-cb-dropdown-close`', 'Cualquier elemento dentro del panel que deba cerrarlo.'],
      ],
      events: [
        ['`cb:open` / `cb:close`', 'Al abrir o cerrar. `cb:open` se puede cancelar.'],
        ['`cb:select`', 'Al elegir un `menuitem` (`detail.item`, `detail.value`).'],
      ],
      snippets: [
        {
          title: 'Escuchar la selección:',
          code: `
            document.querySelector('#acciones').addEventListener('cb:select', (event) => {
              console.log(event.detail.value);
            });
          `,
        },
      ],
      a11y: [
        'El botón recibe `aria-expanded`, `aria-controls` y `aria-haspopup="menu"`.',
        'Esc cierra y devuelve el foco al botón; un clic fuera también cierra.',
        'Usa `role="menu"` solo para acciones. Para enlaces de navegación deja el panel sin rol.',
      ],
    },
    {
      slug: 'breadcrumb',
      title: 'Breadcrumb',
      description: 'Ruta de navegación con separadores.',
      examples: [
        {
          title: 'Básico',
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
      classes: [
        ['`.cb-breadcrumb`', 'Lista en fila.'],
        ['`.cb-breadcrumb__item`', 'Elemento; el separador "/" se agrega solo.'],
      ],
      a11y: [
        'Envuélvelo en `nav aria-label="Ruta"`.',
        'Marca la página actual con `aria-current="page"`.',
      ],
    },
    {
      slug: 'paginacion',
      title: 'Paginación',
      description: 'Botones de página con anterior, siguiente y elipsis.',
      examples: [
        {
          title: 'Básica',
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
      classes: [
        ['`.cb-pagination`', 'Lista en fila.'],
        ['`.cb-pagination__item`', 'Página. `aria-current="page"` o `.is-active` la marca.'],
        ['`.cb-pagination__ellipsis`', 'Puntos suspensivos.'],
        ['`.cb-pagination__label`', 'Texto que se oculta en móvil.'],
      ],
      a11y: [
        'Envuélvela en `nav aria-label="Paginación"`.',
        'Las flechas necesitan `aria-label` cuando el texto se oculta.',
      ],
    },
  ],
};
