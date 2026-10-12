export default {
  key: 'overlays',
  components: [
    {
      slug: 'modal',
      examples: [
        {
          id: 'confirmacion',
          html: `
            <button class="cb-btn cb-btn--primary" type="button" data-cb-open="demo-modal">Abrir modal</button>

            <div class="cb-modal" id="demo-modal" data-cb-modal>
              <div class="cb-modal__panel">
                <div class="cb-modal__head">
                  <div>
                    <h2 class="cb-modal__title">¿Archivar el proyecto?</h2>
                    <p class="cb-modal__desc">Podrás restaurarlo durante 30 días.</p>
                  </div>
                  <button class="cb-modal__close" type="button" data-cb-close aria-label="Cerrar"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button>
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
          id: 'tamanos-y-estatico',
          html: `
            <button class="cb-btn cb-btn--outline" type="button" data-cb-open="demo-modal-lg">Modal grande</button>

            <div class="cb-modal cb-modal--lg cb-modal--center" id="demo-modal-lg" data-cb-modal data-cb-static>
              <div class="cb-modal__panel">
                <div class="cb-modal__head">
                  <h2 class="cb-modal__title">Términos del servicio</h2>
                  <button class="cb-modal__close" type="button" data-cb-close aria-label="Cerrar"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button>
                </div>
                <div class="cb-modal__body"><p>Este modal solo se cierra con los botones o con Esc.</p></div>
                <div class="cb-modal__foot"><button class="cb-btn cb-btn--primary" type="button" data-cb-close>Aceptar</button></div>
              </div>
            </div>
          `,
        },
      ],
      snippets: [
        {
          code: `
            cobalto.modal.open('demo-modal');
            cobalto.modal.close('demo-modal');
          `,
        },
        {
          code: `
            window.addEventListener('abrir-modal', (event) => cobalto.modal.open(event.detail.id));
          `,
        },
      ],
    },
    {
      slug: 'drawer',
      examples: [
        {
          id: 'lados',
          html: `
            <button class="cb-btn cb-btn--outline" type="button" data-cb-open="demo-drawer">Derecha</button>
            <button class="cb-btn cb-btn--outline" type="button" data-cb-open="demo-drawer-left">Izquierda</button>
            <button class="cb-btn cb-btn--outline" type="button" data-cb-open="demo-drawer-bottom">Abajo</button>

            <div class="cb-drawer" id="demo-drawer" data-cb-drawer>
              <div class="cb-drawer__panel">
                <div class="cb-drawer__head">
                  <div><h2 class="cb-drawer__title">Filtros</h2><p class="cb-drawer__desc">Ajusta lo que ves en la tabla.</p></div>
                  <button class="cb-drawer__close" type="button" data-cb-close aria-label="Cerrar"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button>
                </div>
                <div class="cb-drawer__body">
                  <div class="cb-field"><label class="cb-field__label" for="drawer-q">Buscar</label><input class="cb-input" id="drawer-q"></div>
                </div>
                <div class="cb-drawer__foot"><button class="cb-btn cb-btn--outline" type="button" data-cb-close>Limpiar</button><button class="cb-btn cb-btn--primary" type="button" data-cb-close>Aplicar</button></div>
              </div>
            </div>

            <div class="cb-drawer cb-drawer--left" id="demo-drawer-left" data-cb-drawer>
              <div class="cb-drawer__panel">
                <div class="cb-drawer__head"><h2 class="cb-drawer__title">Menú</h2><button class="cb-drawer__close" type="button" data-cb-close aria-label="Cerrar"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div>
                <div class="cb-drawer__body"><p>Panel desde la izquierda.</p></div>
              </div>
            </div>

            <div class="cb-drawer cb-drawer--bottom" id="demo-drawer-bottom" data-cb-drawer>
              <div class="cb-drawer__panel">
                <div class="cb-drawer__head"><h2 class="cb-drawer__title">Compartir</h2><button class="cb-drawer__close" type="button" data-cb-close aria-label="Cerrar"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div>
                <div class="cb-drawer__body"><p>Útil en móvil como hoja inferior.</p></div>
              </div>
            </div>
          `,
        },
      ],
      snippets: [
        {
          code: `cobalto.drawer.open('demo-drawer');`,
        },
      ],
    },
    {
      slug: 'command-palette',
      examples: [
        {
          id: 'paleta',
          html: `
            <button class="cb-search-btn" type="button" data-cb-command-open="demo-command"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg><span>Abrir paleta</span></button>

            <div class="cb-command" id="demo-command" data-cb-command data-cb-command-empty="Nada para">
              <div class="cb-command__panel" aria-label="Buscar">
                <div class="cb-command__head">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
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
      snippets: [
        {
          code: `
            cobalto.components.command.setItems('demo-command', [
              { group: 'Clientes', label: 'María Ramírez', href: '/clientes/12' },
            ]);
          `,
        },
      ],
    },
    {
      slug: 'tooltip-popover',
      examples: [
        {
          id: 'tooltip',
          html: `
            <button class="cb-btn cb-btn--outline" type="button" data-cb-tooltip="Guarda los cambios (⌘S)">Arriba</button>
            <button class="cb-btn cb-btn--outline" type="button" data-cb-tooltip="Aparece abajo" data-cb-tooltip-placement="bottom">Abajo</button>
            <button class="cb-btn cb-btn--outline" type="button" data-cb-tooltip="A la derecha" data-cb-tooltip-placement="right">Derecha</button>
            <button class="cb-icon-btn" type="button" aria-label="Información" data-cb-tooltip="El NIT debe incluir el guion"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></svg></button>
          `,
        },
        {
          id: 'popover',
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
    },
  ],
};
