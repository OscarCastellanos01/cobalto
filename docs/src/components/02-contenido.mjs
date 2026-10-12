export default {
  key: 'contenido',
  components: [
    {
      slug: 'card',
      examples: [
        {
          id: 'con-visual',
          layout: 'block',
          html: `
            <div class="max-w-[360px]">
              <a class="cb-card" href="#">
                <div class="cb-card__top"><span>01</span><span class="cb-tag cb-tag--live">Activo</span></div>
                <svg class="cb-card__go" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>
                <div class="cb-card__visual"><div class="cb-viz cb-viz--rows"><i></i><i></i><i></i><i></i></div></div>
                <h3 class="cb-card__title">Sistemas de gestión</h3>
                <p class="cb-card__text">Inventario, ventas y reportes adaptados a cómo opera tu negocio.</p>
                <div class="cb-card__meta"><span>Laravel</span><span>MySQL</span></div>
              </a>
            </div>
          `,
        },
        {
          id: 'visuales-decorativos',
          layout: 'block',
          html: `
            <div class="cb-grid cb-grid--4 cb-grid--flush">
              <div class="cb-card cb-card--compact"><div class="cb-card__visual"><div class="cb-viz cb-viz--rows"><i></i><i></i><i></i><i></i></div></div><p class="cb-card__text">cb-viz--rows</p></div>
              <div class="cb-card cb-card--compact"><div class="cb-card__visual"><div class="cb-viz cb-viz--bars"><i style="height: 35%"></i><i style="height: 55%"></i><i style="height: 42%"></i><i style="height: 70%"></i><i class="is-accent" style="height: 92%"></i><i style="height: 60%"></i></div></div><p class="cb-card__text">cb-viz--bars</p></div>
              <div class="cb-card cb-card--compact"><div class="cb-card__visual"><div class="cb-viz cb-viz--shop"><i></i><i></i><i></i><i></i><i></i><i></i></div></div><p class="cb-card__text">cb-viz--shop</p></div>
              <div class="cb-card cb-card--compact"><div class="cb-card__visual"><div class="cb-viz cb-viz--phone"></div></div><p class="cb-card__text">cb-viz--phone</p></div>
            </div>
          `,
        },
        {
          id: 'destacada-y-compacta',
          layout: 'block',
          html: `
            <div class="grid gap-4 cb-md:grid-cols-2">
              <div class="cb-card cb-card--featured cb-card--compact">
                <div class="cb-card__top"><span>Plan recomendado</span><span class="cb-tag cb-tag--live">Popular</span></div>
                <h3 class="cb-card__title">Profesional</h3>
                <p class="cb-card__text">El borde y el fondo cambian con el modificador <code>--featured</code>.</p>
              </div>
              <div class="cb-card cb-card--compact">
                <h3 class="cb-card__title">Compacta</h3>
                <p class="cb-card__text">Sin altura mínima de 300px.</p>
              </div>
            </div>
          `,
        },
      ],
    },
    {
      slug: 'grid',
      examples: [
        {
          id: 'tres-columnas',
          layout: 'block',
          html: `
            <div class="cb-grid cb-grid--flush">
              <a class="cb-card" href="#">
                <div class="cb-card__top"><span>01</span><span class="cb-tag cb-tag--live">Activo</span></div>
                <svg class="cb-card__go" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>
                <div class="cb-card__visual"><div class="cb-viz cb-viz--rows"><i></i><i></i><i></i><i></i></div></div>
                <h3 class="cb-card__title">Gestión</h3>
                <p class="cb-card__text">Inventario y ventas.</p>
                <div class="cb-card__meta"><span>Laravel</span></div>
              </a>
              <a class="cb-card" href="#">
                <div class="cb-card__top"><span>02</span><span class="cb-tag cb-tag--live">Activo</span></div>
                <svg class="cb-card__go" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>
                <div class="cb-card__visual"><div class="cb-viz cb-viz--phone"></div></div>
                <h3 class="cb-card__title">Móvil</h3>
                <p class="cb-card__text">Apps para Android e iOS.</p>
                <div class="cb-card__meta"><span>Kotlin</span></div>
              </a>
              <a class="cb-card" href="#">
                <div class="cb-card__top"><span>03</span><span class="cb-tag">Mensual</span></div>
                <svg class="cb-card__go" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>
                <div class="cb-card__visual"><div class="cb-viz cb-viz--bars"><i style="height: 35%"></i><i style="height: 55%"></i><i style="height: 42%"></i><i style="height: 70%"></i><i class="is-accent" style="height: 92%"></i><i style="height: 60%"></i></div></div>
                <h3 class="cb-card__title">Soporte</h3>
                <p class="cb-card__text">Mejoras y atención directa.</p>
                <div class="cb-card__meta"><span>SLA</span></div>
              </a>
            </div>
          `,
        },
        {
          id: 'dos-y-cuatro-columnas',
          layout: 'block',
          html: `
            <div class="cb-grid cb-grid--2 cb-grid--flush">
              <div class="cb-card cb-card--compact"><h3 class="cb-card__title">Uno</h3><p class="cb-card__text">cb-grid--2</p></div>
              <div class="cb-card cb-card--compact"><h3 class="cb-card__title">Dos</h3><p class="cb-card__text">cb-grid--2</p></div>
            </div>
            <div class="cb-grid cb-grid--4 mt-6">
              <div class="cb-card cb-card--compact"><p class="cb-card__text">1</p></div>
              <div class="cb-card cb-card--compact"><p class="cb-card__text">2</p></div>
              <div class="cb-card cb-card--compact"><p class="cb-card__text">3</p></div>
              <div class="cb-card cb-card--compact"><p class="cb-card__text">4</p></div>
            </div>
          `,
        },
      ],
    },
    {
      slug: 'principios',
      examples: [
        {
          id: 'seis-principios',
          layout: 'block',
          html: `
            <ol class="cb-principles mt-0">
              <li class="cb-principles__item"><span class="cb-principles__num">01</span><h3 class="cb-principles__title">A la medida</h3><p class="cb-principles__text">El sistema se adapta a tu operación, no al revés.</p></li>
              <li class="cb-principles__item"><span class="cb-principles__num">02</span><h3 class="cb-principles__title">Código propio</h3><p class="cb-principles__text">Entregamos el código y la documentación.</p></li>
              <li class="cb-principles__item"><span class="cb-principles__num">03</span><h3 class="cb-principles__title">Entregas cortas</h3><p class="cb-principles__text">Avances cada una o dos semanas.</p></li>
            </ol>
          `,
        },
      ],
    },
    {
      slug: 'stats',
      examples: [
        {
          id: 'cuatro-cifras',
          layout: 'block',
          html: `
            <div class="cb-stats mt-0">
              <div class="cb-stat"><strong class="cb-stat__value">24h</strong><span class="cb-stat__label">Tiempo de respuesta</span></div>
              <div class="cb-stat"><strong class="cb-stat__value">100%</strong><span class="cb-stat__label">Código entregado</span></div>
              <div class="cb-stat"><strong class="cb-stat__value">2 sem</strong><span class="cb-stat__label">Ciclo de entregas</span></div>
              <div class="cb-stat"><strong class="cb-stat__value">1:1</strong><span class="cb-stat__label">Soporte directo</span></div>
            </div>
          `,
        },
        {
          id: 'con-variacion',
          layout: 'block',
          html: `
            <div class="cb-stats cb-stats--3 mt-0">
              <div class="cb-stat"><span class="cb-stat__label">Ingresos</span><strong class="cb-stat__value">Q 48,210</strong><span class="cb-stat__delta">+12.4% vs. mes anterior</span></div>
              <div class="cb-stat"><span class="cb-stat__label">Pedidos</span><strong class="cb-stat__value">312</strong><span class="cb-stat__delta">+3.1%</span></div>
              <div class="cb-stat"><span class="cb-stat__label">Devoluciones</span><strong class="cb-stat__value">9</strong><span class="cb-stat__delta cb-stat__delta--down">−2 casos</span></div>
            </div>
          `,
        },
      ],
    },
    {
      slug: 'cta',
      examples: [
        {
          id: 'centrado',
          layout: 'flush',
          html: `
            <section class="cb-section cb-cta border-b-0">
              <div class="cb-wrap">
                <div class="cb-label"><b>04/</b>Contacto</div>
                <h2 class="cb-h2">¿Tienes un proyecto?<br>Hablemos.</h2>
                <p class="cb-lead">Cuéntanos qué necesitas y te enviamos una propuesta con alcance, tiempos y costo.</p>
                <div class="cb-actions">
                  <a href="#" class="cb-btn cb-btn--primary">hola@ejemplo.com ↗</a>
                  <a href="#" class="cb-btn cb-btn--outline">WhatsApp</a>
                </div>
              </div>
            </section>
          `,
        },
      ],
    },
    {
      slug: 'pricing',
      examples: [
        {
          id: 'tres-planes',
          layout: 'block',
          html: `
            <div data-cb-pricing>
              <div class="cb-billing mt-0" role="group" aria-label="Periodo de pago">
                <button class="cb-billing__option" type="button" data-cb-billing="monthly" aria-pressed="true">Mensual</button>
                <button class="cb-billing__option" type="button" data-cb-billing="yearly">Anual −20%</button>
              </div>
              <div class="cb-pricing">
                <div class="cb-price">
                  <div class="cb-price__top"><span class="cb-price__name">Básico</span></div>
                  <div class="cb-price__amount"><span class="cb-price__value">$<span data-cb-price-monthly="9" data-cb-price-yearly="86">9</span></span><span class="cb-price__period"><span data-cb-billing-show="monthly">/ mes</span><span data-cb-billing-show="yearly" hidden>/ año</span></span></div>
                  <p class="cb-price__desc">Para empezar sin complicaciones.</p>
                  <ul class="cb-price__features"><li>1 proyecto</li><li>Soporte por correo</li><li class="is-off">Dominio propio</li></ul>
                  <a href="#" class="cb-btn cb-btn--outline cb-price__cta">Elegir</a>
                </div>
                <div class="cb-price cb-price--featured">
                  <div class="cb-price__top"><span class="cb-price__name">Pro</span><span class="cb-tag cb-tag--live">Popular</span></div>
                  <div class="cb-price__amount"><span class="cb-price__value">$<span data-cb-price-monthly="29" data-cb-price-yearly="278">29</span></span><span class="cb-price__period"><span data-cb-billing-show="monthly">/ mes</span><span data-cb-billing-show="yearly" hidden>/ año</span></span></div>
                  <p class="cb-price__desc">Para equipos que ya están creciendo.</p>
                  <ul class="cb-price__features"><li>10 proyectos</li><li>Soporte prioritario</li><li>Dominio propio</li></ul>
                  <a href="#" class="cb-btn cb-btn--primary cb-price__cta">Elegir Pro ↗</a>
                </div>
                <div class="cb-price">
                  <div class="cb-price__top"><span class="cb-price__name">Empresa</span></div>
                  <div class="cb-price__amount"><span class="cb-price__value">A medida</span></div>
                  <p class="cb-price__desc">Contrato, SLA y facturación local.</p>
                  <ul class="cb-price__features"><li>Proyectos ilimitados</li><li>Soporte dedicado</li><li>SSO</li></ul>
                  <a href="#" class="cb-btn cb-btn--outline cb-price__cta">Hablar con ventas</a>
                </div>
              </div>
            </div>
          `,
        },
      ],
    },
    {
      slug: 'testimonios',
      examples: [
        {
          id: 'en-grilla',
          layout: 'block',
          html: `
            <div class="cb-grid cb-grid--2 cb-grid--flush">
              <figure class="cb-testimonial">
                <blockquote class="cb-testimonial__quote">Pasamos de hojas de cálculo a un sistema que todo el equipo entiende. El cambio se notó en la primera semana.</blockquote>
                <figcaption class="cb-testimonial__author"><span class="cb-avatar cb-avatar--accent">MR</span><span><span class="cb-testimonial__name">María Ramírez</span><span class="cb-testimonial__role">Gerente, Ferretería El Centro</span></span></figcaption>
              </figure>
              <figure class="cb-testimonial">
                <blockquote class="cb-testimonial__quote">Respuestas rápidas y código entregado con documentación. Justo lo que necesitábamos.</blockquote>
                <figcaption class="cb-testimonial__author"><span class="cb-avatar">JL</span><span><span class="cb-testimonial__name">José López</span><span class="cb-testimonial__role">CTO, Logística Norte</span></span></figcaption>
              </figure>
            </div>
          `,
        },
        {
          id: 'grande',
          layout: 'block',
          html: `
            <figure class="cb-testimonial cb-testimonial--large max-w-[760px] p-0">
              <blockquote class="cb-testimonial__quote">El mejor proveedor con el que hemos trabajado. Entienden el negocio antes de escribir una línea de código.</blockquote>
              <figcaption class="cb-testimonial__author"><span class="cb-avatar cb-avatar--lg">AP</span><span><span class="cb-testimonial__name">Ana Pérez</span><span class="cb-testimonial__role">Directora de operaciones</span></span></figcaption>
            </figure>
          `,
        },
      ],
    },
    {
      slug: 'timeline',
      examples: [
        {
          id: 'changelog',
          layout: 'block',
          html: `
            <ol class="cb-timeline">
              <li class="cb-timeline__item is-current">
                <time class="cb-timeline__date" datetime="2026-10-12">12 oct 2026</time>
                <div class="cb-timeline__body">
                  <div class="cb-timeline__head"><h3 class="cb-timeline__title">v0.1.0</h3><span class="cb-tag cb-tag--live">Actual</span></div>
                  <div class="cb-timeline__text">Primera versión pública.<ul><li>36 componentes</li><li>6 temas de color</li></ul></div>
                </div>
              </li>
              <li class="cb-timeline__item">
                <time class="cb-timeline__date" datetime="2026-09-01">1 sep 2026</time>
                <div class="cb-timeline__body">
                  <div class="cb-timeline__head"><h3 class="cb-timeline__title">Beta privada</h3></div>
                  <p class="cb-timeline__text">Pruebas internas con proyectos reales.</p>
                </div>
              </li>
            </ol>
          `,
        },
      ],
    },
    {
      slug: 'empty-state',
      examples: [
        {
          id: 'con-accion',
          layout: 'block',
          html: `
            <div class="cb-empty">
              <div class="cb-empty__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.5 5h13L22 12v7H2v-7z"/></svg></div>
              <h3 class="cb-empty__title">Aún no hay facturas</h3>
              <p class="cb-empty__text">Cuando emitas tu primera factura aparecerá aquí con su estado y fecha.</p>
              <div class="cb-empty__actions"><a href="#" class="cb-btn cb-btn--primary">Crear factura</a><a href="#" class="cb-btn cb-btn--outline">Importar</a></div>
            </div>
          `,
        },
      ],
    },
    {
      slug: 'codigo',
      examples: [
        {
          id: 'con-cabecera',
          layout: 'block',
          html: `
            <div class="cb-code">
              <div class="cb-code__head"><span>resources/css/app.css</span><button class="cb-code__copy" type="button" data-cb-copy><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg><span data-cb-copy-label>Copiar</span></button></div>
              <pre class="cb-code__pre"><code><span class="cb-tok-key">@import</span> <span class="cb-tok-str">"tailwindcss"</span>;
            <span class="cb-tok-key">@import</span> <span class="cb-tok-str">"cobalto/tailwind"</span>;</code></pre>
            </div>
          `,
        },
        {
          id: 'copiar-un-texto',
          html: `
            <code class="cb-code--inline">npm install cobalto</code>
            <button class="cb-btn cb-btn--outline cb-btn--sm" type="button" data-cb-copy="npm install cobalto"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg><span data-cb-copy-label>Copiar comando</span></button>
          `,
        },
      ],
    },
  ],
};
