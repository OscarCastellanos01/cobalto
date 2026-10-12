export default {
  key: 'estado',
  components: [
    {
      slug: 'tabs',
      examples: [
        {
          id: 'linea',
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
          id: 'pastillas',
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
      snippets: [
        {
          code: `document.querySelector('[data-cb-tabs]').cbTabs.select(2);`,
        },
      ],
    },
    {
      slug: 'accordion',
      examples: [
        {
          id: 'preguntas-frecuentes',
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
    },
    {
      slug: 'toast',
      examples: [
        {
          id: 'variantes',
          html: `
            <button class="cb-btn cb-btn--outline" type="button" data-cb-toast='{"title": "Cambios guardados", "variant": "success"}'>Éxito</button>
            <button class="cb-btn cb-btn--outline" type="button" data-cb-toast='{"title": "Sincronizando", "message": "Puede tardar unos segundos.", "variant": "info"}'>Info</button>
            <button class="cb-btn cb-btn--outline" type="button" data-cb-toast='{"title": "Factura por vencer", "message": "Vence en 3 días.", "variant": "warning"}'>Aviso</button>
            <button class="cb-btn cb-btn--outline" type="button" data-cb-toast='{"title": "No se pudo guardar", "message": "Revisa tu conexión.", "variant": "danger", "duration": 0}'>Error fijo</button>
            <button class="cb-btn cb-btn--outline" type="button" data-cb-toast="Mensaje simple">Texto</button>
          `,
        },
      ],
      snippets: [
        {
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
          code: `
            window.addEventListener('toast', (event) => cobalto.toast(event.detail));
          `,
        },
      ],
    },
    {
      slug: 'alert',
      examples: [
        {
          id: 'alertas',
          layout: 'block',
          html: `
            <div class="flex flex-col gap-3">
              <div class="cb-alert cb-alert--info" role="status"><svg class="cb-alert__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></svg><div class="cb-alert__body"><p class="cb-alert__title">Nueva versión disponible</p><p class="cb-alert__text">Actualiza para usar los temas de color. <a href="#">Ver cambios</a></p></div></div>
              <div class="cb-alert cb-alert--success" role="status"><svg class="cb-alert__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/></svg><div class="cb-alert__body"><p class="cb-alert__title">Pago recibido</p></div><button class="cb-alert__close" type="button" data-cb-dismiss aria-label="Cerrar"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div>
              <div class="cb-alert cb-alert--warning" role="status"><svg class="cb-alert__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 3 2 20h20L12 3z"/><path d="M12 10v4M12 17h.01"/></svg><div class="cb-alert__body"><p class="cb-alert__title">Tu plan vence en 3 días</p><div class="cb-alert__actions"><button class="cb-btn cb-btn--outline cb-btn--sm" type="button">Renovar</button></div></div></div>
              <div class="cb-alert cb-alert--danger" role="alert"><svg class="cb-alert__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="m9 9 6 6M15 9l-6 6"/></svg><div class="cb-alert__body"><p class="cb-alert__title">No se pudo emitir la factura</p><p class="cb-alert__text">El NIT del cliente no es válido.</p></div></div>
            </div>
          `,
        },
        {
          id: 'banner',
          layout: 'flush',
          html: `
            <div class="cb-banner" data-cb-dismiss-key="demo-banner">
              <span>Cobalto 0.1 ya está disponible. <a href="#">Leer anuncio ↗</a></span>
              <button class="cb-banner__close" type="button" data-cb-dismiss aria-label="Cerrar anuncio"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button>
            </div>
            <div class="cb-banner cb-banner--subtle">Modo de prueba activo · <a href="#">Ir a producción</a></div>
          `,
        },
      ],
    },
    {
      slug: 'progress',
      examples: [
        {
          id: 'con-etiqueta',
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
      snippets: [
        {
          code: `
            track.setAttribute('aria-valuenow', 80);
            track.firstElementChild.style.setProperty('--cb-progress', '80%');
          `,
        },
      ],
    },
    {
      slug: 'skeleton-spinner',
      examples: [
        {
          id: 'skeleton',
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
          id: 'spinner',
          html: `
            <span class="cb-spinner cb-spinner--sm" role="status" aria-label="Cargando"></span>
            <span class="cb-spinner" role="status" aria-label="Cargando"></span>
            <span class="cb-spinner cb-spinner--lg" role="status" aria-label="Cargando"></span>
            <span class="cb-loading" role="status"><span class="cb-spinner" aria-hidden="true"></span>Cargando resultados</span>
          `,
        },
      ],
    },
    {
      slug: 'stepper',
      examples: [
        {
          id: 'horizontal',
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
          id: 'vertical',
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
    },
  ],
};
