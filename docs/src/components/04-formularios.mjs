const people = [
  ['María Ramírez', 'Ventas', 'activo', '48210', '2026-09-14'],
  ['José López', 'Soporte', 'activo', '12900', '2026-08-02'],
  ['Ana Pérez', 'Operaciones', 'pausado', '30500', '2026-07-21'],
  ['Luis Gómez', 'Ventas', 'activo', '8700', '2026-10-01'],
  ['Carla Méndez', 'Finanzas', 'inactivo', '0', '2026-03-11'],
  ['Pedro Castillo', 'Soporte', 'activo', '15420', '2026-09-30'],
  ['Sofía Herrera', 'Operaciones', 'activo', '22100', '2026-06-18'],
  ['Diego Morales', 'Ventas', 'pausado', '5300', '2026-05-05'],
];

const statusTag = { activo: 'cb-tag--success', pausado: 'cb-tag--warning', inactivo: '' };

function personRow([name, area, status, amount, date]) {
  const formatted = Number(amount).toLocaleString('es');
  return `<tr data-estado="${status}">
                    <td><input class="cb-checkbox" type="checkbox" data-cb-table-select aria-label="Seleccionar a ${name}"></td>
                    <td class="cb-table__strong">${name}</td>
                    <td>${area}</td>
                    <td><span class="cb-tag ${statusTag[status]}">${status}</span></td>
                    <td class="cb-table__num" data-value="${amount}">Q ${formatted}</td>
                    <td data-value="${date}">${date}</td>
                  </tr>`;
}

export default {
  title: 'Formularios y datos',
  components: [
    {
      slug: 'formularios',
      title: 'Formularios',
      description:
        'Input, textarea, select, checkbox, radio, switch y archivo, con texto de ayuda y estados de error y éxito.',
      examples: [
        {
          title: 'Campos de texto',
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
          title: 'Error y éxito',
          description:
            'El estado de error se activa con `aria-invalid="true"` en el input o con `cb-field--error`. El mensaje solo se muestra en estado de error o éxito.',
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
          title: 'Checkbox, radio y switch',
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
          title: 'Archivo y tamaños',
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
      classes: [
        ['`.cb-field`', 'Agrupa etiqueta, control, ayuda y mensaje.'],
        ['`.cb-field__label`, `.cb-field__optional`', 'Etiqueta y marca de opcional.'],
        ['`.cb-field__hint`', 'Texto de ayuda.'],
        ['`.cb-field__message`', 'Mensaje visible solo con error o éxito.'],
        [
          '`.cb-field--error`, `.cb-field--success`',
          'Estados. El error también se activa con `aria-invalid="true"`.',
        ],
        ['`.cb-input`', 'Input, select o textarea. `--sm` y `--lg` para tamaños.'],
        ['`.cb-textarea`', 'Altura automática y redimensión vertical.'],
        ['`.cb-select`', 'Envoltorio del `select` con flecha propia.'],
        ['`.cb-input-group`, `.cb-input-group__addon`', 'Input con prefijo o sufijo.'],
        [
          '`.cb-check`, `.cb-check__text`, `.cb-check__hint`',
          'Etiqueta clicable para checkbox, radio y switch.',
        ],
        [
          '`.cb-checkbox`, `.cb-radio`, `.cb-switch`',
          'Controles con estilo propio, nativos por debajo.',
        ],
        ['`.cb-file`', 'Input de archivo.'],
        ['`.cb-fieldset`, `.cb-fieldset__legend`', 'Grupo de opciones.'],
      ],
      a11y: [
        'Cada control necesita un `label` asociado o `aria-label`.',
        'Relaciona ayuda y errores con `aria-describedby`.',
        'El switch es un checkbox con `role="switch"`: funciona con teclado sin JS.',
        'El color no es la única señal de error: el mensaje lo explica en texto.',
      ],
    },
    {
      slug: 'tabla',
      title: 'Tabla de datos',
      description:
        'Tabla con orden por columna, búsqueda, filtro, paginación y selección de filas. Sin JS se ve como una tabla normal.',
      examples: [
        {
          title: 'Completa',
          description:
            'Prueba ordenar por monto o fecha, buscar, filtrar por estado y seleccionar filas.',
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
                  ${people.map(personRow).join('\n                  ')}
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
          title: 'Simple',
          description: 'Sin `data-cb-table` es solo estilo. `cb-table--compact` reduce el padding.',
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
      classes: [
        ['`.cb-table-wrap`', 'Caja con borde.'],
        [
          '`.cb-table-toolbar`, `.cb-table-toolbar__filters`',
          'Barra superior con búsqueda y filtros.',
        ],
        ['`.cb-table-scroll`', 'Scroll horizontal en pantallas chicas.'],
        ['`.cb-table`', 'Tabla. `--compact` reduce el espaciado.'],
        [
          '`.cb-table__strong`, `.cb-table__num`, `.cb-table__check`',
          'Celda destacada, numérica (alineada a la derecha) y de selección.',
        ],
        ['`.cb-table__sort`', 'Botón de orden que el JS crea dentro del `th`.'],
        ['`.cb-table-footer`', 'Pie con estado y paginación.'],
      ],
      attributes: [
        ['`data-cb-table`', 'Activa el comportamiento.'],
        ['`data-cb-page-size="n"`', 'Filas por página. Sin él no hay paginación.'],
        [
          '`data-cb-sort` / `data-cb-sort="number|date"`',
          'En un `th`, permite ordenar esa columna.',
        ],
        ['`data-value`', 'En una celda, valor usado para ordenar en lugar del texto.'],
        ['`data-cb-table-search`', 'Input que busca en todas las columnas (ignora tildes).'],
        [
          '`data-cb-table-filter="clave"`',
          'Select que compara su valor con `data-clave` de cada fila.',
        ],
        [
          '`data-cb-table-select` / `data-cb-table-select-all`',
          'Checkboxes de fila y de encabezado.',
        ],
        [
          '`data-cb-table-status`, `data-cb-table-pagination`',
          'Dónde escribir el estado y la paginación.',
        ],
        ['`data-cb-table-empty`', 'Texto cuando no hay resultados.'],
      ],
      events: [
        ['`cb:sort`', 'Al ordenar (`detail.column`, `detail.direction`).'],
        ['`cb:filter`', 'Al buscar o filtrar.'],
        ['`cb:page`', 'Al cambiar de página (`detail.page`).'],
        ['`cb:select`', 'Al cambiar la selección (`detail.rows`).'],
      ],
      snippets: [
        {
          title: 'Leer las filas seleccionadas:',
          code: `
            const table = document.querySelector('[data-cb-table]');
            table.addEventListener('cb:select', (event) => {
              const ids = event.detail.rows.map((row) => row.dataset.id);
            });
          `,
        },
      ],
      a11y: [
        'Los encabezados ordenables reciben `aria-sort` y un botón para usarlos con teclado.',
        'Las filas seleccionadas llevan `aria-selected="true"`.',
        'El estado ("Mostrando 1–5 de 8") está en una región `aria-live`.',
        'Cada checkbox de fila necesita `aria-label` con el nombre del registro.',
      ],
    },
  ],
};
