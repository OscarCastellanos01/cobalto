export default {
  key: 'formularios',
  components: [
    {
      slug: 'formularios',
      examples: [
        {
          id: 'campos-de-texto',
          layout: 'block',
          html: `
            <div class="grid max-w-[640px] gap-5 cb-sm:grid-cols-2">
              <div class="cb-field">
                <label class="cb-field__label" for="f-name">Nombre</label>
                <input class="cb-input" id="f-name" placeholder="María Ramírez" autocomplete="name">
              </div>
              <div class="cb-field">
                <label class="cb-field__label" for="f-email">Correo <span class="cb-field__optional">(opcional)</span></label>
                <input class="cb-input" id="f-email" type="email" placeholder="maria@ejemplo.com" aria-describedby="f-email-hint">
                <p class="cb-field__hint" id="f-email-hint">Solo para enviarte la factura.</p>
              </div>
              <div class="cb-field">
                <label class="cb-field__label" for="f-plan">Plan</label>
                <div class="cb-select"><select class="cb-input" id="f-plan"><option>Básico</option><option>Pro</option><option>Empresa</option></select></div>
              </div>
              <div class="cb-field">
                <label class="cb-field__label" for="f-site">Sitio web</label>
                <div class="cb-input-group"><span class="cb-input-group__addon">https://</span><input class="cb-input" id="f-site" placeholder="ejemplo.com"></div>
              </div>
              <div class="cb-field cb-sm:col-span-2">
                <label class="cb-field__label" for="f-msg">Mensaje</label>
                <textarea class="cb-input cb-textarea" id="f-msg" placeholder="Cuéntanos qué necesitas"></textarea>
              </div>
            </div>
          `,
        },
        {
          id: 'error-y-exito',
          layout: 'block',
          html: `
            <div class="grid max-w-[640px] gap-5 cb-sm:grid-cols-2">
              <div class="cb-field">
                <label class="cb-field__label" for="f-nit">NIT</label>
                <input class="cb-input" id="f-nit" value="12345" aria-invalid="true" aria-describedby="f-nit-msg">
                <p class="cb-field__message" id="f-nit-msg">El NIT no es válido.</p>
              </div>
              <div class="cb-field cb-field--success">
                <label class="cb-field__label" for="f-user">Usuario</label>
                <input class="cb-input" id="f-user" value="maria.r" aria-describedby="f-user-msg">
                <p class="cb-field__message" id="f-user-msg">Disponible.</p>
              </div>
            </div>
          `,
        },
        {
          id: 'checkbox-radio-y-switch',
          layout: 'block',
          html: `
            <div class="flex flex-wrap gap-10">
              <fieldset class="cb-fieldset">
                <legend class="cb-fieldset__legend">Notificaciones</legend>
                <label class="cb-check"><input class="cb-checkbox" type="checkbox" checked>Correo</label>
                <label class="cb-check"><input class="cb-checkbox" type="checkbox">SMS</label>
                <label class="cb-check"><input class="cb-checkbox" type="checkbox" disabled>WhatsApp</label>
              </fieldset>
              <fieldset class="cb-fieldset">
                <legend class="cb-fieldset__legend">Frecuencia</legend>
                <label class="cb-check"><input class="cb-radio" type="radio" name="freq" checked>Diaria</label>
                <label class="cb-check"><input class="cb-radio" type="radio" name="freq">Semanal</label>
              </fieldset>
              <fieldset class="cb-fieldset">
                <legend class="cb-fieldset__legend">Preferencias</legend>
                <label class="cb-check"><input class="cb-switch" type="checkbox" role="switch" checked><span class="cb-check__text">Modo compacto<span class="cb-check__hint">Reduce el espaciado.</span></span></label>
                <label class="cb-check"><input class="cb-switch" type="checkbox" role="switch">Beta</label>
              </fieldset>
            </div>
          `,
        },
        {
          id: 'archivo-y-tamanos',
          layout: 'block',
          html: `
            <div class="flex max-w-[520px] flex-col gap-4">
              <div class="cb-field">
                <label class="cb-field__label" for="f-file">Adjuntar comprobante</label>
                <input class="cb-file" id="f-file" type="file">
              </div>
              <input class="cb-input cb-input--sm" placeholder="Pequeño" aria-label="Pequeño">
              <input class="cb-input" placeholder="Mediano" aria-label="Mediano">
              <input class="cb-input cb-input--lg" placeholder="Grande" aria-label="Grande">
            </div>
          `,
        },
      ],
    },
    {
      slug: 'tabla',
      examples: [
        {
          id: 'completa',
          layout: 'flush',
          html: `
            <div class="cb-table-wrap rounded-none border-0" data-cb-table data-cb-page-size="5">
              <div class="cb-table-toolbar">
                <div class="cb-table-toolbar__filters">
                  <input class="cb-input cb-input--sm" type="search" placeholder="Buscar..." aria-label="Buscar en la tabla" data-cb-table-search>
                  <div class="cb-select"><select class="cb-input cb-input--sm" aria-label="Filtrar por estado" data-cb-table-filter="estado"><option value="">Todos los estados</option><option value="activo">Activo</option><option value="pausado">Pausado</option><option value="inactivo">Inactivo</option></select></div>
                </div>
                <button class="cb-btn cb-btn--outline cb-btn--sm" type="button">Exportar</button>
              </div>
              <div class="cb-table-scroll">
                <table class="cb-table">
                  <thead>
                    <tr>
                      <th class="cb-table__check"><input class="cb-checkbox" type="checkbox" data-cb-table-select-all aria-label="Seleccionar todo"></th>
                      <th scope="col" data-cb-sort>Nombre</th>
                      <th scope="col" data-cb-sort>Área</th>
                      <th scope="col">Estado</th>
                      <th scope="col" class="cb-table__num" data-cb-sort="number">Monto</th>
                      <th scope="col" data-cb-sort="date">Última compra</th>
                    </tr>
                  </thead>
                  <tbody>
                  <tr data-estado="activo">
                    <td><input class="cb-checkbox" type="checkbox" data-cb-table-select aria-label="Seleccionar a María Ramírez"></td>
                    <td class="cb-table__strong">María Ramírez</td>
                    <td>Ventas</td>
                    <td><span class="cb-tag cb-tag--success">activo</span></td>
                    <td class="cb-table__num" data-value="48210">Q 48.210</td>
                    <td data-value="2026-09-14">2026-09-14</td>
                  </tr>
                  <tr data-estado="activo">
                    <td><input class="cb-checkbox" type="checkbox" data-cb-table-select aria-label="Seleccionar a José López"></td>
                    <td class="cb-table__strong">José López</td>
                    <td>Soporte</td>
                    <td><span class="cb-tag cb-tag--success">activo</span></td>
                    <td class="cb-table__num" data-value="12900">Q 12.900</td>
                    <td data-value="2026-08-02">2026-08-02</td>
                  </tr>
                  <tr data-estado="pausado">
                    <td><input class="cb-checkbox" type="checkbox" data-cb-table-select aria-label="Seleccionar a Ana Pérez"></td>
                    <td class="cb-table__strong">Ana Pérez</td>
                    <td>Operaciones</td>
                    <td><span class="cb-tag cb-tag--warning">pausado</span></td>
                    <td class="cb-table__num" data-value="30500">Q 30.500</td>
                    <td data-value="2026-07-21">2026-07-21</td>
                  </tr>
                  <tr data-estado="activo">
                    <td><input class="cb-checkbox" type="checkbox" data-cb-table-select aria-label="Seleccionar a Luis Gómez"></td>
                    <td class="cb-table__strong">Luis Gómez</td>
                    <td>Ventas</td>
                    <td><span class="cb-tag cb-tag--success">activo</span></td>
                    <td class="cb-table__num" data-value="8700">Q 8700</td>
                    <td data-value="2026-10-01">2026-10-01</td>
                  </tr>
                  <tr data-estado="inactivo">
                    <td><input class="cb-checkbox" type="checkbox" data-cb-table-select aria-label="Seleccionar a Carla Méndez"></td>
                    <td class="cb-table__strong">Carla Méndez</td>
                    <td>Finanzas</td>
                    <td><span class="cb-tag ">inactivo</span></td>
                    <td class="cb-table__num" data-value="0">Q 0</td>
                    <td data-value="2026-03-11">2026-03-11</td>
                  </tr>
                  <tr data-estado="activo">
                    <td><input class="cb-checkbox" type="checkbox" data-cb-table-select aria-label="Seleccionar a Pedro Castillo"></td>
                    <td class="cb-table__strong">Pedro Castillo</td>
                    <td>Soporte</td>
                    <td><span class="cb-tag cb-tag--success">activo</span></td>
                    <td class="cb-table__num" data-value="15420">Q 15.420</td>
                    <td data-value="2026-09-30">2026-09-30</td>
                  </tr>
                  <tr data-estado="activo">
                    <td><input class="cb-checkbox" type="checkbox" data-cb-table-select aria-label="Seleccionar a Sofía Herrera"></td>
                    <td class="cb-table__strong">Sofía Herrera</td>
                    <td>Operaciones</td>
                    <td><span class="cb-tag cb-tag--success">activo</span></td>
                    <td class="cb-table__num" data-value="22100">Q 22.100</td>
                    <td data-value="2026-06-18">2026-06-18</td>
                  </tr>
                  <tr data-estado="pausado">
                    <td><input class="cb-checkbox" type="checkbox" data-cb-table-select aria-label="Seleccionar a Diego Morales"></td>
                    <td class="cb-table__strong">Diego Morales</td>
                    <td>Ventas</td>
                    <td><span class="cb-tag cb-tag--warning">pausado</span></td>
                    <td class="cb-table__num" data-value="5300">Q 5300</td>
                    <td data-value="2026-05-05">2026-05-05</td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <div class="cb-table-footer">
                <span data-cb-table-status aria-live="polite"></span>
                <nav data-cb-table-pagination aria-label="Paginación de la tabla"></nav>
              </div>
            </div>
          `,
        },
        {
          id: 'simple',
          layout: 'block',
          html: `
            <div class="cb-table-wrap">
              <table class="cb-table cb-table--compact">
                <thead><tr><th scope="col">Plan</th><th scope="col" class="cb-table__num">Usuarios</th><th scope="col" class="cb-table__num">Precio</th></tr></thead>
                <tbody>
                  <tr><td class="cb-table__strong">Básico</td><td class="cb-table__num">1</td><td class="cb-table__num">$9</td></tr>
                  <tr><td class="cb-table__strong">Pro</td><td class="cb-table__num">10</td><td class="cb-table__num">$29</td></tr>
                </tbody>
              </table>
            </div>
          `,
        },
      ],
      snippets: [
        {
          code: `
            const table = document.querySelector('[data-cb-table]');
            table.addEventListener('cb:select', (event) => {
              const ids = event.detail.rows.map((row) => row.dataset.id);
            });
          `,
        },
      ],
    },
  ],
};
