const close =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>';
const searchIcon =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>';
const info =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></svg>';

export default {
  title: 'Overlays',
  components: [
    {
      slug: 'modal',
      title: 'Modal',
      description:
        'Diálogo centrado con foco atrapado, cierre con Esc, clic en el fondo y botones `data-cb-close`.',
      examples: [
        {
          title: 'Confirmación',
          html: `
            <button class="cb-btn cb-btn--primary" type="button" data-cb-open="demo-modal">Abrir modal</button>

            <div class="cb-modal" id="demo-modal" data-cb-modal>
              <div class="cb-modal__panel">
                <div class="cb-modal__head">
                  <div>
                    <h2 class="cb-modal__title">¿Archivar el proyecto?</h2>
                    <p class="cb-modal__desc">Podrás restaurarlo durante 30 días.</p>
                  </div>
                  <button class="cb-modal__close" type="button" data-cb-close aria-label="Cerrar">${close}</button>
                </div>
                <div class="cb-modal__body">
                  <div class="cb-field">
                    <label class="cb-field__label" for="modal-reason">Motivo</label>
                    <input class="cb-input" id="modal-reason" placeholder="Opcional">
                  </div>
                </div>
                <div class="cb-modal__foot">
                  <button class="cb-btn cb-btn--outline" type="button" data-cb-close>Cancelar</button>
                  <button class="cb-btn cb-btn--danger" type="button" data-cb-close>Archivar</button>
                </div>
              </div>
            </div>
          `,
        },
        {
          title: 'Tamaños y estático',
          description:
            'Con `data-cb-static` el clic en el fondo no lo cierra. `cb-modal--center` lo centra verticalmente.',
          html: `
            <button class="cb-btn cb-btn--outline" type="button" data-cb-open="demo-modal-lg">Modal grande</button>

            <div class="cb-modal cb-modal--lg cb-modal--center" id="demo-modal-lg" data-cb-modal data-cb-static>
              <div class="cb-modal__panel">
                <div class="cb-modal__head">
                  <h2 class="cb-modal__title">Términos del servicio</h2>
                  <button class="cb-modal__close" type="button" data-cb-close aria-label="Cerrar">${close}</button>
                </div>
                <div class="cb-modal__body"><p>Este modal solo se cierra con los botones o con Esc.</p></div>
                <div class="cb-modal__foot"><button class="cb-btn cb-btn--primary" type="button" data-cb-close>Aceptar</button></div>
              </div>
            </div>
          `,
        },
      ],
      classes: [
        ['`.cb-modal`', 'Fondo con desenfoque. `.is-open` lo muestra.'],
        ['`.cb-modal--sm`, `.cb-modal--lg`', 'Anchos de 400 y 760px (por defecto 520).'],
        ['`.cb-modal--center`', 'Centrado vertical.'],
        ['`.cb-modal__panel`', 'Caja del diálogo.'],
        [
          '`.cb-modal__head`, `.cb-modal__title`, `.cb-modal__desc`',
          'Cabecera, título y descripción.',
        ],
        ['`.cb-modal__close`', 'Botón de cerrar.'],
        ['`.cb-modal__body`, `.cb-modal__foot`', 'Contenido y acciones.'],
      ],
      attributes: [
        ['`data-cb-modal`', 'Activa el modal. Necesita `id`.'],
        ['`data-cb-open="id"`', 'En cualquier botón, abre ese modal o drawer.'],
        ['`data-cb-close`', 'Dentro del modal, lo cierra.'],
        ['`data-cb-static`', 'Ignora el clic en el fondo.'],
        ['`data-cb-open-on-load`', 'Lo abre al cargar.'],
        ['`data-cb-role="alertdialog"`', 'Cambia el rol para confirmaciones críticas.'],
      ],
      events: [
        ['`cb:open`', 'Antes de abrir. Se puede cancelar con `preventDefault()`.'],
        ['`cb:close`', 'Antes de cerrar. También se puede cancelar.'],
      ],
      snippets: [
        {
          title: 'Abrir y cerrar desde JS:',
          code: `
            cobalto.modal.open('demo-modal');
            cobalto.modal.close('demo-modal');
          `,
        },
        {
          title:
            'Con Livewire, abre el modal desde el servidor despachando un evento del navegador:',
          code: `
            window.addEventListener('abrir-modal', (event) => cobalto.modal.open(event.detail.id));
          `,
        },
      ],
      a11y: [
        'El panel recibe `role="dialog"`, `aria-modal="true"` y `aria-labelledby` apuntando al título.',
        'El foco entra al primer control (o al que tenga `autofocus`), queda atrapado y vuelve al botón al cerrar.',
        'Esc cierra solo el overlay de más arriba si hay varios abiertos.',
        'El scroll del body se bloquea mientras está abierto.',
      ],
    },
    {
      slug: 'drawer',
      title: 'Drawer',
      description:
        'Panel lateral (derecha, izquierda o abajo) con el mismo comportamiento que el modal.',
      examples: [
        {
          title: 'Lados',
          html: `
            <button class="cb-btn cb-btn--outline" type="button" data-cb-open="demo-drawer">Derecha</button>
            <button class="cb-btn cb-btn--outline" type="button" data-cb-open="demo-drawer-left">Izquierda</button>
            <button class="cb-btn cb-btn--outline" type="button" data-cb-open="demo-drawer-bottom">Abajo</button>

            <div class="cb-drawer" id="demo-drawer" data-cb-drawer>
              <div class="cb-drawer__panel">
                <div class="cb-drawer__head">
                  <div><h2 class="cb-drawer__title">Filtros</h2><p class="cb-drawer__desc">Ajusta lo que ves en la tabla.</p></div>
                  <button class="cb-drawer__close" type="button" data-cb-close aria-label="Cerrar">${close}</button>
                </div>
                <div class="cb-drawer__body">
                  <div class="cb-field"><label class="cb-field__label" for="drawer-q">Buscar</label><input class="cb-input" id="drawer-q"></div>
                </div>
                <div class="cb-drawer__foot"><button class="cb-btn cb-btn--outline" type="button" data-cb-close>Limpiar</button><button class="cb-btn cb-btn--primary" type="button" data-cb-close>Aplicar</button></div>
              </div>
            </div>

            <div class="cb-drawer cb-drawer--left" id="demo-drawer-left" data-cb-drawer>
              <div class="cb-drawer__panel">
                <div class="cb-drawer__head"><h2 class="cb-drawer__title">Menú</h2><button class="cb-drawer__close" type="button" data-cb-close aria-label="Cerrar">${close}</button></div>
                <div class="cb-drawer__body"><p>Panel desde la izquierda.</p></div>
              </div>
            </div>

            <div class="cb-drawer cb-drawer--bottom" id="demo-drawer-bottom" data-cb-drawer>
              <div class="cb-drawer__panel">
                <div class="cb-drawer__head"><h2 class="cb-drawer__title">Compartir</h2><button class="cb-drawer__close" type="button" data-cb-close aria-label="Cerrar">${close}</button></div>
                <div class="cb-drawer__body"><p>Útil en móvil como hoja inferior.</p></div>
              </div>
            </div>
          `,
        },
      ],
      classes: [
        ['`.cb-drawer`', 'Fondo. `.is-open` lo muestra.'],
        ['`.cb-drawer--left`, `.cb-drawer--bottom`', 'Lado del panel (por defecto, derecha).'],
        ['`.cb-drawer__panel`', 'Panel de 420px (máximo el ancho de pantalla menos 48px).'],
        [
          '`.cb-drawer__head`, `.cb-drawer__title`, `.cb-drawer__desc`, `.cb-drawer__close`',
          'Cabecera.',
        ],
        ['`.cb-drawer__body`, `.cb-drawer__foot`', 'Contenido con scroll y acciones.'],
      ],
      attributes: [
        ['`data-cb-drawer`', 'Activa el drawer. Necesita `id`.'],
        ['`data-cb-open="id"`, `data-cb-close`, `data-cb-static`', 'Igual que en el modal.'],
      ],
      events: [['`cb:open` / `cb:close`', 'Antes de abrir o cerrar; ambos se pueden cancelar.']],
      snippets: [{ code: `cobalto.drawer.open('demo-drawer');` }],
      a11y: [
        'Mismo comportamiento que el modal: rol de diálogo, foco atrapado, Esc y retorno del foco.',
      ],
    },
    {
      slug: 'command-palette',
      title: 'Command palette',
      description:
        'Búsqueda ⌘K con grupos, navegación con flechas y búsqueda que ignora tildes. Es la misma que usa esta documentación.',
      examples: [
        {
          title: 'Paleta',
          description:
            'Los resultados se leen de un `script type="application/json"` dentro de la paleta.',
          html: `
            <button class="cb-search-btn" type="button" data-cb-command-open="demo-command">${searchIcon}<span>Abrir paleta</span></button>

            <div class="cb-command" id="demo-command" data-cb-command data-cb-command-empty="Nada para">
              <div class="cb-command__panel" aria-label="Buscar">
                <div class="cb-command__head">
                  ${searchIcon}
                  <input class="cb-command__input" data-cb-command-input placeholder="Buscar..." aria-label="Buscar">
                  <kbd>Esc</kbd>
                </div>
                <div class="cb-command__results" data-cb-command-results></div>
                <div class="cb-command__foot"><span><kbd>↑</kbd> <kbd>↓</kbd> navegar</span><span><kbd>↵</kbd> abrir</span><span><kbd>Esc</kbd> cerrar</span></div>
              </div>
              <script type="application/json" data-cb-command-items>
                [
                  { "group": "Páginas", "label": "Inicio", "href": "#paleta" },
                  { "group": "Páginas", "label": "Facturación", "href": "#paleta", "keywords": "nit factura" },
                  { "group": "Acciones", "label": "Crear cliente", "hint": "C" }
                ]
              </script>
            </div>
          `,
        },
      ],
      classes: [
        ['`.cb-command`', 'Fondo. `.is-open` lo muestra.'],
        ['`.cb-command__panel`', 'Caja de la paleta.'],
        ['`.cb-command__head`, `.cb-command__input`', 'Cabecera con el campo de búsqueda.'],
        [
          '`.cb-command__results`, `.cb-command__group`, `.cb-command__item`',
          'Lista, títulos de grupo y resultados (`.is-active` el seleccionado).',
        ],
        [
          '`.cb-command__hint`, `.cb-command__empty`, `.cb-command__foot`',
          'Indicador, estado vacío y pie con atajos.',
        ],
      ],
      attributes: [
        ['`data-cb-command`', 'Activa la paleta.'],
        ['`data-cb-command-hotkey="k"`', 'Atajo con ⌘ o Ctrl. Sin valor usa K.'],
        ['`data-cb-command-open="id"`', 'Botón que la abre.'],
        ['`data-cb-command-items`', 'JSON con `label`, `href`, `group`, `keywords` y `hint`.'],
        ['`data-cb-command-empty`', 'Texto cuando no hay resultados.'],
      ],
      events: [
        ['`cb:open` / `cb:close`', 'Al abrir o cerrar.'],
        [
          '`cb:select`',
          'Al elegir un resultado (`detail.item`). Cancelable para manejar la navegación tú mismo.',
        ],
      ],
      snippets: [
        {
          title: 'Cargar resultados desde JS (por ejemplo, desde una API):',
          code: `
            cobalto.components.command.setItems('demo-command', [
              { group: 'Clientes', label: 'María Ramírez', href: '/clientes/12' },
            ]);
          `,
        },
      ],
      a11y: [
        'El input es un `combobox` con `aria-activedescendant` apuntando al resultado activo.',
        'Los resultados forman un `listbox` con opciones `aria-selected`.',
        'Foco atrapado dentro de la paleta; Esc la cierra y devuelve el foco.',
      ],
    },
    {
      slug: 'tooltip-popover',
      title: 'Tooltip y popover',
      description:
        'Tooltip de texto con hover y foco, y popover con contenido interactivo que se abre con clic.',
      examples: [
        {
          title: 'Tooltip',
          description:
            'Con `data-cb-tooltip-placement` eliges el lado; si no cabe, se voltea solo.',
          html: `
            <button class="cb-btn cb-btn--outline" type="button" data-cb-tooltip="Guarda los cambios (⌘S)">Arriba</button>
            <button class="cb-btn cb-btn--outline" type="button" data-cb-tooltip="Aparece abajo" data-cb-tooltip-placement="bottom">Abajo</button>
            <button class="cb-btn cb-btn--outline" type="button" data-cb-tooltip="A la derecha" data-cb-tooltip-placement="right">Derecha</button>
            <button class="cb-icon-btn" type="button" aria-label="Información" data-cb-tooltip="El NIT debe incluir el guion">${info}</button>
          `,
        },
        {
          title: 'Popover',
          layout: 'tall',
          html: `
            <div class="cb-popover self-start" data-cb-popover>
              <button class="cb-btn cb-btn--outline" type="button">Compartir</button>
              <div class="cb-popover__panel" aria-label="Compartir enlace">
                <p class="cb-popover__title">Compartir enlace</p>
                <p class="mb-3">Cualquiera con el enlace podrá verlo.</p>
                <div class="cb-input-group"><input class="cb-input cb-input--sm" value="https://ejemplo.com/p/42" aria-label="Enlace" readonly><button class="cb-btn cb-btn--primary cb-btn--sm" type="button" data-cb-copy="https://ejemplo.com/p/42"><span data-cb-copy-label>Copiar</span></button></div>
              </div>
            </div>
          `,
        },
      ],
      classes: [
        ['`.cb-tooltip`', 'Globo de texto que el JS crea en el `body`.'],
        ['`.cb-popover`, `.cb-popover__panel`', 'Contenedor y panel. `--end` alinea a la derecha.'],
        ['`.cb-popover__title`', 'Título del panel.'],
      ],
      attributes: [
        ['`data-cb-tooltip="texto"`', 'Texto del tooltip.'],
        ['`data-cb-tooltip-placement="top|bottom|left|right"`', 'Lado preferido.'],
        ['`data-cb-popover`', 'Activa el popover.'],
        ['`data-cb-popover-trigger`', 'Botón que abre (por defecto, el primer `button`).'],
      ],
      events: [['`cb:open` / `cb:close`', 'En el popover al abrir o cerrar.']],
      a11y: [
        'El tooltip se enlaza con `aria-describedby` mientras está visible y se cierra con Esc (WCAG 1.4.13).',
        'No pongas información esencial solo en un tooltip: no se ve en pantallas táctiles.',
        'El panel del popover tiene `role="dialog"` y el botón `aria-expanded`.',
      ],
    },
  ],
};
