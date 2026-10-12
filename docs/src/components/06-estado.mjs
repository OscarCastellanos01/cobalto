const close =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>';
const icons = {
  info: '<svg class="cb-alert__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></svg>',
  success:
    '<svg class="cb-alert__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/></svg>',
  warning:
    '<svg class="cb-alert__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 3 2 20h20L12 3z"/><path d="M12 10v4M12 17h.01"/></svg>',
  danger:
    '<svg class="cb-alert__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="m9 9 6 6M15 9l-6 6"/></svg>',
};

export default {
  title: 'Interacción y estado',
  components: [
    {
      slug: 'tabs',
      title: 'Tabs',
      description:
        'Pestañas con navegación por flechas, Home y End. Dos estilos: línea y pastillas.',
      examples: [
        {
          title: 'Línea',
          layout: 'block',
          html: `
            <div class="cb-tabs" data-cb-tabs>
              <div class="cb-tabs__list" aria-label="Detalle del cliente">
                <button class="cb-tabs__tab" type="button">Resumen</button>
                <button class="cb-tabs__tab" type="button">Facturas<span class="cb-tabs__count">12</span></button>
                <button class="cb-tabs__tab" type="button">Notas</button>
                <button class="cb-tabs__tab" type="button" disabled>Archivo</button>
              </div>
              <div class="cb-tabs__panel"><p class="text-cb-muted">Datos generales del cliente.</p></div>
              <div class="cb-tabs__panel"><p class="text-cb-muted">Doce facturas emitidas este año.</p></div>
              <div class="cb-tabs__panel"><p class="text-cb-muted">Sin notas todavía.</p></div>
              <div class="cb-tabs__panel"></div>
            </div>
          `,
        },
        {
          title: 'Pastillas',
          layout: 'block',
          html: `
            <div class="cb-tabs cb-tabs--pills" data-cb-tabs>
              <div class="cb-tabs__list" aria-label="Periodo">
                <button class="cb-tabs__tab" type="button">Semana</button>
                <button class="cb-tabs__tab" type="button" aria-selected="true">Mes</button>
                <button class="cb-tabs__tab" type="button">Año</button>
              </div>
              <div class="cb-tabs__panel"><p class="text-cb-muted">Ventas de la semana.</p></div>
              <div class="cb-tabs__panel"><p class="text-cb-muted">Ventas del mes.</p></div>
              <div class="cb-tabs__panel"><p class="text-cb-muted">Ventas del año.</p></div>
            </div>
          `,
        },
      ],
      classes: [
        ['`.cb-tabs`', 'Contenedor. `--pills` cambia al estilo de pastillas.'],
        ['`.cb-tabs__list`', 'Fila de pestañas con scroll horizontal si no caben.'],
        ['`.cb-tabs__tab`', 'Pestaña; `aria-selected="true"` la marca.'],
        ['`.cb-tabs__count`', 'Contador dentro de la pestaña.'],
        ['`.cb-tabs__panel`', 'Panel; se empareja con la pestaña por orden.'],
      ],
      attributes: [
        ['`data-cb-tabs`', 'Activa el componente.'],
        ['`data-cb-tabs-manual`', 'Las flechas solo mueven el foco; Enter o Espacio activan.'],
      ],
      events: [
        ['`cb:change`', 'Al cambiar de pestaña (`detail.index`, `detail.tab`, `detail.panel`).'],
      ],
      snippets: [{ code: `document.querySelector('[data-cb-tabs]').cbTabs.select(2);` }],
      a11y: [
        'El JS agrega `role="tablist|tab|tabpanel"`, `aria-controls` y `aria-labelledby`.',
        'Solo la pestaña activa está en el orden de tabulación (roving tabindex).',
        'Las pestañas deshabilitadas se saltan al navegar con flechas.',
      ],
    },
    {
      slug: 'accordion',
      title: 'Accordion / FAQ',
      description:
        'Basado en `details` y `summary`: funciona sin JS. El JS agrega el modo de un solo elemento abierto y eventos.',
      examples: [
        {
          title: 'Preguntas frecuentes',
          layout: 'block',
          html: `
            <div class="cb-accordion" data-cb-accordion="single">
              <details class="cb-accordion__item" open>
                <summary class="cb-accordion__trigger"><span><span class="cb-accordion__num">01</span>¿Cuánto tarda un proyecto?</span><span class="cb-accordion__icon" aria-hidden="true"></span></summary>
                <div class="cb-accordion__content">Entre cuatro y doce semanas, según el alcance. Entregamos avances cada una o dos semanas.</div>
              </details>
              <details class="cb-accordion__item">
                <summary class="cb-accordion__trigger"><span><span class="cb-accordion__num">02</span>¿El código es mío?</span><span class="cb-accordion__icon" aria-hidden="true"></span></summary>
                <div class="cb-accordion__content">Sí. Entregamos el repositorio completo con documentación.</div>
              </details>
              <details class="cb-accordion__item">
                <summary class="cb-accordion__trigger"><span><span class="cb-accordion__num">03</span>¿Dan soporte después?</span><span class="cb-accordion__icon" aria-hidden="true"></span></summary>
                <div class="cb-accordion__content">Sí, con planes mensuales y tiempos de respuesta claros.</div>
              </details>
            </div>
          `,
        },
      ],
      classes: [
        ['`.cb-accordion`', 'Contenedor con línea superior.'],
        [
          '`.cb-accordion__item`',
          'Cada `details`. La altura se anima en navegadores con `::details-content`.',
        ],
        ['`.cb-accordion__trigger`', 'El `summary`.'],
        ['`.cb-accordion__num`, `.cb-accordion__icon`', 'Número opcional e icono +/−.'],
        ['`.cb-accordion__content`', 'Contenido.'],
      ],
      attributes: [
        [
          '`data-cb-accordion="single"`',
          'Al abrir uno se cierran los demás. Sin valor, todos son independientes.',
        ],
      ],
      events: [['`cb:open` / `cb:close`', 'En cada `details` al abrirse o cerrarse.']],
      a11y: [
        '`details`/`summary` ya son accesibles con teclado y lectores de pantalla.',
        'El icono es decorativo (`aria-hidden`); el estado lo anuncia el navegador.',
      ],
    },
    {
      slug: 'toast',
      title: 'Toast',
      description:
        'Notificaciones temporales con la API `cobalto.toast()`. Se pausan con hover o foco.',
      examples: [
        {
          title: 'Variantes',
          description:
            'Los botones usan `data-cb-toast` con la configuración en JSON, para probar sin escribir JS.',
          html: `
            <button class="cb-btn cb-btn--outline" type="button" data-cb-toast='{"title": "Cambios guardados", "variant": "success"}'>Éxito</button>
            <button class="cb-btn cb-btn--outline" type="button" data-cb-toast='{"title": "Sincronizando", "message": "Puede tardar unos segundos.", "variant": "info"}'>Info</button>
            <button class="cb-btn cb-btn--outline" type="button" data-cb-toast='{"title": "Factura por vencer", "message": "Vence en 3 días.", "variant": "warning"}'>Aviso</button>
            <button class="cb-btn cb-btn--outline" type="button" data-cb-toast='{"title": "No se pudo guardar", "message": "Revisa tu conexión.", "variant": "danger", "duration": 0}'>Error fijo</button>
            <button class="cb-btn cb-btn--outline" type="button" data-cb-toast="Mensaje simple">Texto</button>
          `,
        },
      ],
      classes: [
        ['`.cb-toaster`', 'Contenedor fijo. `--top` y `--left` para otras esquinas.'],
        ['`.cb-toast`', 'Notificación con línea lateral de color.'],
        ['`.cb-toast--success|warning|danger|info`', 'Variantes.'],
        [
          '`.cb-toast__icon`, `.cb-toast__title`, `.cb-toast__message`, `.cb-toast__action`, `.cb-toast__close`',
          'Partes.',
        ],
      ],
      attributes: [['`data-cb-toast`', 'En un botón: JSON con las opciones o un texto simple.']],
      events: [['`cb:open` / `cb:close`', 'En el toast al aparecer y al cerrarse.']],
      snippets: [
        {
          title: 'API completa:',
          code: `
            const notice = cobalto.toast({
              title: 'Cliente creado',
              message: 'María Ramírez ya puede iniciar sesión.',
              variant: 'success', // default, info, success, warning, danger
              duration: 5000, // 0 para que no se cierre sola
              position: 'bottom-right', // bottom-left, top-right, top-left
              action: { label: 'Deshacer', onClick: () => deshacer() },
            });

            notice.close();
          `,
        },
        {
          title: 'Desde Livewire, con un evento del navegador:',
          code: `
            window.addEventListener('toast', (event) => cobalto.toast(event.detail));
          `,
        },
      ],
      a11y: [
        'Los toasts usan `role="status"`; los de error, `role="alert"` para anunciarse de inmediato.',
        'El tiempo se pausa con hover y con foco, para dar tiempo a leer o usar la acción.',
        'Para mensajes importantes usa `duration: 0` y deja que la persona lo cierre.',
      ],
    },
    {
      slug: 'alert',
      title: 'Alert y banner',
      description:
        'Mensajes en línea con cuatro tonos y banners de ancho completo. Se pueden cerrar y recordar.',
      examples: [
        {
          title: 'Alertas',
          layout: 'block',
          html: `
            <div class="flex flex-col gap-3">
              <div class="cb-alert cb-alert--info" role="status">${icons.info}<div class="cb-alert__body"><p class="cb-alert__title">Nueva versión disponible</p><p class="cb-alert__text">Actualiza para usar los temas de color. <a href="#">Ver cambios</a></p></div></div>
              <div class="cb-alert cb-alert--success" role="status">${icons.success}<div class="cb-alert__body"><p class="cb-alert__title">Pago recibido</p></div><button class="cb-alert__close" type="button" data-cb-dismiss aria-label="Cerrar">${close}</button></div>
              <div class="cb-alert cb-alert--warning" role="status">${icons.warning}<div class="cb-alert__body"><p class="cb-alert__title">Tu plan vence en 3 días</p><div class="cb-alert__actions"><button class="cb-btn cb-btn--outline cb-btn--sm" type="button">Renovar</button></div></div></div>
              <div class="cb-alert cb-alert--danger" role="alert">${icons.danger}<div class="cb-alert__body"><p class="cb-alert__title">No se pudo emitir la factura</p><p class="cb-alert__text">El NIT del cliente no es válido.</p></div></div>
            </div>
          `,
        },
        {
          title: 'Banner',
          description: 'Con `data-cb-dismiss-key` se recuerda que ya se cerró (en `localStorage`).',
          layout: 'flush',
          html: `
            <div class="cb-banner" data-cb-dismiss-key="demo-banner">
              <span>Cobalto 0.1 ya está disponible. <a href="#">Leer anuncio ↗</a></span>
              <button class="cb-banner__close" type="button" data-cb-dismiss aria-label="Cerrar anuncio">${close}</button>
            </div>
            <div class="cb-banner cb-banner--subtle">Modo de prueba activo · <a href="#">Ir a producción</a></div>
          `,
        },
      ],
      classes: [
        ['`.cb-alert`', 'Alerta con borde y fondo del tono.'],
        ['`.cb-alert--info|success|warning|danger`', 'Tonos (por defecto, acento).'],
        [
          '`.cb-alert__icon`, `.cb-alert__title`, `.cb-alert__text`, `.cb-alert__actions`, `.cb-alert__close`',
          'Partes.',
        ],
        ['`.cb-banner`', 'Franja de ancho completo en color de acento. `--subtle` la hace neutra.'],
        ['`.is-dismissed`', 'Oculta el elemento cerrado.'],
      ],
      attributes: [
        ['`data-cb-dismiss`', 'Botón que cierra la alerta o banner que lo contiene.'],
        ['`data-cb-dismissible`', 'Marca otro contenedor como cerrable.'],
        ['`data-cb-dismiss-key="clave"`', 'Recuerda el cierre en `localStorage`.'],
      ],
      events: [['`cb:close`', 'En el contenedor antes de ocultarlo; cancelable.']],
      a11y: [
        'Usa `role="alert"` solo para errores urgentes; para el resto, `role="status"`.',
        'El botón de cerrar necesita `aria-label`.',
      ],
    },
    {
      slug: 'progress',
      title: 'Progress bar',
      description: 'Barra de progreso determinada o indeterminada, con etiqueta y valor.',
      examples: [
        {
          title: 'Con etiqueta',
          layout: 'block',
          html: `
            <div class="flex max-w-[520px] flex-col gap-6">
              <div class="cb-progress">
                <div class="cb-progress__head"><span class="cb-progress__label" id="p1">Subiendo archivo</span><span class="cb-progress__value">64%</span></div>
                <div class="cb-progress__track" role="progressbar" aria-labelledby="p1" aria-valuenow="64" aria-valuemin="0" aria-valuemax="100"><div class="cb-progress__bar" style="--cb-progress: 64%"></div></div>
              </div>
              <div class="cb-progress cb-progress--success cb-progress--sm">
                <div class="cb-progress__head"><span class="cb-progress__label" id="p2">Almacenamiento</span><span class="cb-progress__value">2.1 de 10 GB</span></div>
                <div class="cb-progress__track" role="progressbar" aria-labelledby="p2" aria-valuenow="21" aria-valuemin="0" aria-valuemax="100"><div class="cb-progress__bar" style="--cb-progress: 21%"></div></div>
              </div>
              <div class="cb-progress cb-progress--indeterminate">
                <div class="cb-progress__head"><span class="cb-progress__label" id="p3">Procesando</span></div>
                <div class="cb-progress__track" role="progressbar" aria-labelledby="p3"><div class="cb-progress__bar"></div></div>
              </div>
            </div>
          `,
        },
      ],
      classes: [
        ['`.cb-progress`', 'Contenedor.'],
        ['`.cb-progress__head`, `.cb-progress__label`, `.cb-progress__value`', 'Fila superior.'],
        [
          '`.cb-progress__track`, `.cb-progress__bar`',
          'Pista y barra. El ancho sale de `--cb-progress`.',
        ],
        ['`.cb-progress--success|warning|danger`', 'Colores.'],
        ['`.cb-progress--sm|lg`', 'Grosor.'],
        ['`.cb-progress--indeterminate`', 'Animación sin valor conocido.'],
      ],
      snippets: [
        {
          title: 'Actualizar desde JS:',
          code: `
            track.setAttribute('aria-valuenow', 80);
            track.firstElementChild.style.setProperty('--cb-progress', '80%');
          `,
        },
      ],
      a11y: [
        'La pista lleva `role="progressbar"` con `aria-valuenow`, `aria-valuemin` y `aria-valuemax`.',
        'En el modo indeterminado omite `aria-valuenow`.',
      ],
    },
    {
      slug: 'skeleton-spinner',
      title: 'Skeleton y spinner',
      description: 'Placeholders de carga y un spinner que toma el color del texto o del acento.',
      examples: [
        {
          title: 'Skeleton',
          layout: 'block',
          html: `
            <div class="cb-card cb-card--compact max-w-[360px]" role="status" aria-busy="true" aria-label="Cargando">
              <div class="flex items-center gap-3"><span class="cb-skeleton cb-skeleton--circle"></span><span class="cb-skeleton cb-skeleton--title"></span></div>
              <span class="cb-skeleton cb-skeleton--block"></span>
              <div class="cb-skeleton-stack"><span class="cb-skeleton cb-skeleton--text"></span><span class="cb-skeleton cb-skeleton--text"></span><span class="cb-skeleton cb-skeleton--text"></span></div>
            </div>
          `,
        },
        {
          title: 'Spinner',
          html: `
            <span class="cb-spinner cb-spinner--sm" role="status" aria-label="Cargando"></span>
            <span class="cb-spinner" role="status" aria-label="Cargando"></span>
            <span class="cb-spinner cb-spinner--lg" role="status" aria-label="Cargando"></span>
            <span class="cb-loading" role="status"><span class="cb-spinner" aria-hidden="true"></span>Cargando resultados</span>
          `,
        },
      ],
      classes: [
        ['`.cb-skeleton`', 'Bloque que parpadea suavemente.'],
        ['`.cb-skeleton--text|title|circle|block`', 'Formas comunes.'],
        ['`.cb-skeleton-stack`', 'Líneas de texto apiladas; la última es más corta.'],
        ['`.cb-spinner`', 'Spinner circular. `--sm` y `--lg` para tamaños.'],
        ['`.cb-loading`', 'Spinner con texto.'],
      ],
      a11y: [
        'Marca el contenedor que carga con `aria-busy="true"`.',
        'Un spinner solo necesita `role="status"` y `aria-label`.',
        'Las animaciones se detienen con `prefers-reduced-motion`.',
      ],
    },
    {
      slug: 'stepper',
      title: 'Stepper',
      description: 'Pasos de un proceso, horizontal o vertical. En móvil el horizontal se apila.',
      examples: [
        {
          title: 'Horizontal',
          layout: 'block',
          html: `
            <ol class="cb-stepper">
              <li class="cb-stepper__step is-complete"><span class="cb-stepper__marker">✓</span><span class="cb-stepper__body"><span class="cb-stepper__label">Cuenta</span><span class="cb-stepper__desc">Datos básicos</span></span></li>
              <li class="cb-stepper__step" aria-current="step"><span class="cb-stepper__marker">2</span><span class="cb-stepper__body"><span class="cb-stepper__label">Empresa</span><span class="cb-stepper__desc">NIT y dirección</span></span></li>
              <li class="cb-stepper__step"><span class="cb-stepper__marker">3</span><span class="cb-stepper__body"><span class="cb-stepper__label">Pago</span><span class="cb-stepper__desc">Plan y tarjeta</span></span></li>
            </ol>
          `,
        },
        {
          title: 'Vertical',
          layout: 'block',
          html: `
            <ol class="cb-stepper cb-stepper--vertical">
              <li class="cb-stepper__step is-complete"><span class="cb-stepper__marker">✓</span><span class="cb-stepper__body"><span class="cb-stepper__label">Pedido recibido</span><span class="cb-stepper__desc">12 oct, 09:14</span></span></li>
              <li class="cb-stepper__step" aria-current="step"><span class="cb-stepper__marker">2</span><span class="cb-stepper__body"><span class="cb-stepper__label">En preparación</span><span class="cb-stepper__desc">Estimado: hoy</span></span></li>
              <li class="cb-stepper__step"><span class="cb-stepper__marker">3</span><span class="cb-stepper__body"><span class="cb-stepper__label">Entregado</span></span></li>
            </ol>
          `,
        },
      ],
      classes: [
        ['`.cb-stepper`', 'Lista de pasos. `--vertical` para la versión vertical.'],
        [
          '`.cb-stepper__step`',
          'Paso. `.is-complete` lo marca hecho; `aria-current="step"` es el actual.',
        ],
        ['`.cb-stepper__marker`', 'Número o marca.'],
        ['`.cb-stepper__label`, `.cb-stepper__desc`', 'Texto del paso.'],
      ],
      a11y: [
        'Usa `ol` y `aria-current="step"` en el paso actual.',
        'Si el marcador de completado es "✓", agrega texto oculto como "completado" en `cb-sr-only`.',
      ],
    },
  ],
};
