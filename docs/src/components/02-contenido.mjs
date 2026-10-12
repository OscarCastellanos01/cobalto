const go =
  '<svg class="cb-card__go" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>';
const copyIcon =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>';
const inboxIcon =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.5 5h13L22 12v7H2v-7z"/></svg>';

function card(n, tag, live, visual, title, text, meta) {
  return `<a class="cb-card" href="#">
                <div class="cb-card__top"><span>${n}</span><span class="cb-tag${live ? ' cb-tag--live' : ''}">${tag}</span></div>
                ${go}
                <div class="cb-card__visual">${visual}</div>
                <h3 class="cb-card__title">${title}</h3>
                <p class="cb-card__text">${text}</p>
                <div class="cb-card__meta">${meta.map((m) => `<span>${m}</span>`).join('')}</div>
              </a>`;
}

const rows = '<div class="cb-viz cb-viz--rows"><i></i><i></i><i></i><i></i></div>';
const bars =
  '<div class="cb-viz cb-viz--bars"><i style="height: 35%"></i><i style="height: 55%"></i><i style="height: 42%"></i><i style="height: 70%"></i><i class="is-accent" style="height: 92%"></i><i style="height: 60%"></i></div>';
const shop = '<div class="cb-viz cb-viz--shop"><i></i><i></i><i></i><i></i><i></i><i></i></div>';
const phone = '<div class="cb-viz cb-viz--phone"></div>';

export default {
  title: 'Contenido',
  components: [
    {
      slug: 'card',
      title: 'Card',
      description:
        'Tarjeta plana con visual, etiqueta de estado, texto, meta y una flecha que aparece en hover.',
      examples: [
        {
          title: 'Con visual',
          description:
            'Si la card es un enlace, la flecha `cb-card__go` reemplaza a la etiqueta al pasar el mouse.',
          layout: 'block',
          html: `
            <div class="max-w-[360px]">
              ${card('01', 'Activo', true, rows, 'Sistemas de gestión', 'Inventario, ventas y reportes adaptados a cómo opera tu negocio.', ['Laravel', 'MySQL'])}
            </div>
          `,
        },
        {
          title: 'Visuales decorativos',
          description:
            'Seis mini visuales listos: `rows`, `bars`, `shop`, `phone`, `term` y `nodes`. Todos usan los tokens de color.',
          layout: 'block',
          html: `
            <div class="cb-grid cb-grid--4 cb-grid--flush">
              <div class="cb-card cb-card--compact"><div class="cb-card__visual">${rows}</div><p class="cb-card__text">cb-viz--rows</p></div>
              <div class="cb-card cb-card--compact"><div class="cb-card__visual">${bars}</div><p class="cb-card__text">cb-viz--bars</p></div>
              <div class="cb-card cb-card--compact"><div class="cb-card__visual">${shop}</div><p class="cb-card__text">cb-viz--shop</p></div>
              <div class="cb-card cb-card--compact"><div class="cb-card__visual">${phone}</div><p class="cb-card__text">cb-viz--phone</p></div>
            </div>
          `,
        },
        {
          title: 'Destacada y compacta',
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
      classes: [
        [
          '`.cb-card`',
          'Tarjeta con borde de 1px, sin sombra. Si es `a` o `button` cambia de fondo en hover.',
        ],
        ['`.cb-card--featured`', 'Borde de acento y fondo elevado.'],
        ['`.cb-card--compact`', 'Quita la altura mínima.'],
        ['`.cb-card--hover`', 'Activa el hover en una card que no es enlace.'],
        ['`.cb-card__top`', 'Fila superior con número y etiqueta.'],
        ['`.cb-card__go`', 'Flecha ↗ que aparece en hover y foco.'],
        ['`.cb-card__visual`', 'Caja de 110px para el visual.'],
        ['`.cb-card__title`, `.cb-card__text`', 'Título y descripción.'],
        ['`.cb-card__meta`', 'Etiquetas al pie, empujadas al fondo.'],
        [
          '`.cb-viz--rows|bars|shop|phone|term|nodes`',
          'Visuales decorativos. En `bars`, `i.is-accent` resalta una barra.',
        ],
      ],
      a11y: [
        'Cuando toda la card es enlace, el texto del enlace es todo su contenido: mantén el título corto y claro.',
        'Los visuales son decorativos; no necesitan texto alternativo.',
      ],
    },
    {
      slug: 'grid',
      title: 'Grid de cards',
      description:
        'Grilla con bordes compartidos: el contenedor dibuja arriba e izquierda y cada celda derecha y abajo.',
      examples: [
        {
          title: 'Tres columnas',
          description: 'Pasa a dos columnas por debajo de 960px y a una por debajo de 600px.',
          layout: 'block',
          html: `
            <div class="cb-grid cb-grid--flush">
              ${card('01', 'Activo', true, rows, 'Gestión', 'Inventario y ventas.', ['Laravel'])}
              ${card('02', 'Activo', true, phone, 'Móvil', 'Apps para Android e iOS.', ['Kotlin'])}
              ${card('03', 'Mensual', false, bars, 'Soporte', 'Mejoras y atención directa.', ['SLA'])}
            </div>
          `,
        },
        {
          title: 'Dos y cuatro columnas',
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
      classes: [
        ['`.cb-grid`', 'Tres columnas con bordes compartidos y 56px de margen superior.'],
        ['`.cb-grid--2`, `.cb-grid--4`', 'Dos o cuatro columnas.'],
        ['`.cb-grid--flush`', 'Quita el margen superior.'],
      ],
      a11y: [
        'Si las cards forman una lista, puedes usar `ul` con la clase `cb-grid` y `li` como celdas.',
      ],
    },
    {
      slug: 'principios',
      title: 'Lista de principios',
      description:
        'Lista numerada en tres columnas con línea superior. Sirve para valores, características o pasos.',
      examples: [
        {
          title: 'Seis principios',
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
      classes: [
        ['`.cb-principles`', 'Lista en grilla de 3 columnas (2 y 1 en pantallas chicas).'],
        ['`.cb-principles__item`', 'Elemento con línea superior.'],
        ['`.cb-principles__num`', 'Número en color de acento.'],
        ['`.cb-principles__title`, `.cb-principles__text`', 'Título y texto.'],
      ],
      a11y: ['Usa `ol` para que el orden también se anuncie en lectores de pantalla.'],
    },
    {
      slug: 'stats',
      title: 'Stats',
      description: 'Cifras grandes con etiqueta, en una caja con divisiones de 1px.',
      examples: [
        {
          title: 'Cuatro cifras',
          layout: 'block',
          html: `
            <div class="cb-stats mt-0">
              <div class="cb-stat"><strong class="cb-stat__value">24h</strong><span class="cb-stat__label">Tiempo de respuesta</span></div>
              <div class="cb-stat"><strong class="cb-stat__value">100%</strong><span class="cb-stat__label">Código entregado</span></div>
              <div class="cb-stat"><strong class="cb-stat__value">2 sem</strong><span class="cb-stat__label">Ciclo de entregas</span></div>
              <div class="cb-stat"><strong class="cb-stat__value">GT</strong><span class="cb-stat__label">Equipo local</span></div>
            </div>
          `,
        },
        {
          title: 'Con variación',
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
      classes: [
        [
          '`.cb-stats`',
          'Caja de 4 columnas (2 por debajo de 960px). Las líneas internas no dependen de la cantidad de celdas.',
        ],
        ['`.cb-stats--2`, `.cb-stats--3`', 'Dos o tres columnas.'],
        ['`.cb-stat`', 'Celda.'],
        ['`.cb-stat__value`', 'Cifra con `clamp(28px, 3.4vw, 40px)`.'],
        ['`.cb-stat__label`', 'Etiqueta.'],
        ['`.cb-stat__delta`', 'Variación en verde; `--down` en rojo.'],
      ],
      a11y: ['No dependas solo del color en la variación: incluye el signo o el texto.'],
    },
    {
      slug: 'cta',
      title: 'CTA',
      description: 'Bloque centrado de llamada a la acción para cerrar una página.',
      examples: [
        {
          title: 'Centrado',
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
      classes: [['`.cb-cta`', 'Centra el texto, el `cb-lead` y las `cb-actions` que contiene.']],
      a11y: ['El texto de los enlaces debe decir a dónde llevan, no solo "clic aquí".'],
    },
    {
      slug: 'pricing',
      title: 'Pricing',
      description:
        'Tarjetas de precio con plan destacado, lista de características y cambio entre pago mensual y anual.',
      examples: [
        {
          title: 'Tres planes',
          description:
            'Los botones `data-cb-billing` cambian los precios marcados con `data-cb-price-monthly` y `data-cb-price-yearly`.',
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
      classes: [
        [
          '`.cb-pricing`',
          'Grilla de 3 planes con bordes compartidos. `--2` y `--4` para otras cantidades.',
        ],
        ['`.cb-price`', 'Plan. `--featured` agrega fondo y línea superior de acento.'],
        ['`.cb-price__name`, `.cb-price__value`, `.cb-price__period`', 'Nombre, precio y periodo.'],
        ['`.cb-price__features`', 'Lista con ✓. `li.is-off` la tacha.'],
        ['`.cb-price__cta`', 'Botón empujado al fondo.'],
        ['`.cb-billing`, `.cb-billing__option`', 'Selector de periodo.'],
      ],
      attributes: [
        ['`data-cb-pricing`', 'Contenedor que agrupa selector y precios.'],
        ['`data-cb-billing="monthly|yearly"`', 'Botón que cambia el periodo.'],
        [
          '`data-cb-price-monthly` / `data-cb-price-yearly`',
          'Valores del precio para cada periodo.',
        ],
        ['`data-cb-billing-show="periodo"`', 'Elemento visible solo en ese periodo.'],
      ],
      events: [['`cb:change`', 'En el contenedor al cambiar de periodo (`detail.period`).']],
      a11y: [
        'El selector es un grupo de botones con `aria-pressed`.',
        'Las características desactivadas no deben comunicarse solo con el tachado; usa un texto claro.',
      ],
    },
    {
      slug: 'testimonios',
      title: 'Testimonios',
      description:
        'Citas con autor, cargo y avatar. Se combinan con `cb-grid` para mostrar varias.',
      examples: [
        {
          title: 'En grilla',
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
          title: 'Grande',
          layout: 'block',
          html: `
            <figure class="cb-testimonial cb-testimonial--large max-w-[760px] p-0">
              <blockquote class="cb-testimonial__quote">El mejor proveedor con el que hemos trabajado. Entienden el negocio antes de escribir una línea de código.</blockquote>
              <figcaption class="cb-testimonial__author"><span class="cb-avatar cb-avatar--lg">AP</span><span><span class="cb-testimonial__name">Ana Pérez</span><span class="cb-testimonial__role">Directora de operaciones</span></span></figcaption>
            </figure>
          `,
        },
      ],
      classes: [
        ['`.cb-testimonial`', 'Bloque `figure`. `--large` aumenta la cita.'],
        ['`.cb-testimonial__quote`', 'Cita con comillas de acento.'],
        ['`.cb-testimonial__author`', 'Fila del autor al pie.'],
        ['`.cb-testimonial__name`, `.cb-testimonial__role`', 'Nombre y cargo.'],
      ],
      a11y: ['`figure` + `blockquote` + `figcaption` relacionan la cita con su autor.'],
    },
    {
      slug: 'timeline',
      title: 'Timeline y changelog',
      description:
        'Línea de tiempo con fecha a la izquierda. En móvil la fecha queda arriba de cada entrada.',
      examples: [
        {
          title: 'Changelog',
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
      classes: [
        ['`.cb-timeline`', 'Lista ordenada.'],
        ['`.cb-timeline__item`', 'Entrada con punto y línea. `.is-current` resalta el punto.'],
        ['`.cb-timeline__date`', 'Fecha (usa `time` con `datetime`).'],
        [
          '`.cb-timeline__title`, `.cb-timeline__text`',
          'Título y detalle. Las listas internas usan guiones.',
        ],
      ],
      a11y: ['Usa `time datetime="..."` para que la fecha sea legible por máquinas.'],
    },
    {
      slug: 'empty-state',
      title: 'Empty state',
      description:
        'Estado vacío con icono, texto y acciones para cuando una lista o búsqueda no tiene resultados.',
      examples: [
        {
          title: 'Con acción',
          layout: 'block',
          html: `
            <div class="cb-empty">
              <div class="cb-empty__icon">${inboxIcon}</div>
              <h3 class="cb-empty__title">Aún no hay facturas</h3>
              <p class="cb-empty__text">Cuando emitas tu primera factura aparecerá aquí con su estado y fecha.</p>
              <div class="cb-empty__actions"><a href="#" class="cb-btn cb-btn--primary">Crear factura</a><a href="#" class="cb-btn cb-btn--outline">Importar</a></div>
            </div>
          `,
        },
      ],
      classes: [
        ['`.cb-empty`', 'Caja con borde punteado y contenido centrado.'],
        ['`.cb-empty__icon`', 'Icono enmarcado.'],
        ['`.cb-empty__title`, `.cb-empty__text`', 'Título y explicación.'],
        ['`.cb-empty__actions`', 'Botones.'],
      ],
      a11y: [
        'Si el estado vacío aparece después de filtrar, anúncialo con una región `aria-live`.',
      ],
    },
    {
      slug: 'codigo',
      title: 'Bloque de código',
      description: 'Código con cabecera, botón de copiar y colores de sintaxis que siguen el tema.',
      examples: [
        {
          title: 'Con cabecera',
          layout: 'block',
          html: `
            <div class="cb-code">
              <div class="cb-code__head"><span>resources/css/app.css</span><button class="cb-code__copy" type="button" data-cb-copy>${copyIcon}<span data-cb-copy-label>Copiar</span></button></div>
              <pre class="cb-code__pre"><code><span class="cb-tok-key">@import</span> <span class="cb-tok-str">"tailwindcss"</span>;
            <span class="cb-tok-key">@import</span> <span class="cb-tok-str">"cobalto/tailwind"</span>;</code></pre>
            </div>
          `,
        },
        {
          title: 'Copiar un texto',
          description: 'Con un valor, `data-cb-copy` copia ese texto o el elemento con ese id.',
          html: `
            <code class="cb-code--inline">npm install cobalto</code>
            <button class="cb-btn cb-btn--outline cb-btn--sm" type="button" data-cb-copy="npm install cobalto">${copyIcon}<span data-cb-copy-label>Copiar comando</span></button>
          `,
        },
      ],
      classes: [
        ['`.cb-code`', 'Contenedor del bloque.'],
        ['`.cb-code__head`', 'Cabecera con nombre de archivo y botón.'],
        [
          '`.cb-code__copy`',
          'Botón de copiar. `.is-copied` lo pinta de verde. `--floating` lo pone encima del código.',
        ],
        ['`.cb-code__pre`', 'Área con scroll horizontal.'],
        ['`.cb-code--inline`', 'Código en línea.'],
        ['`.cb-tok-tag|attr|str|com|key`', 'Colores de sintaxis basados en tokens.'],
      ],
      attributes: [
        [
          '`data-cb-copy`',
          'Sin valor copia el `pre` del bloque; con id o selector copia ese elemento; con otro texto, el texto.',
        ],
        ['`data-cb-copy-label`', 'Elemento cuyo texto cambia a "Copiado".'],
        ['`data-cb-copy-done`', 'Texto alternativo para el estado copiado.'],
      ],
      events: [['`cb:copy`', 'En el botón después de copiar (`detail.text`).']],
      a11y: [
        'El botón cambia su texto a "Copiado", que los lectores de pantalla anuncian al tener foco.',
        'Sin HTTPS usa un método alternativo para copiar.',
      ],
    },
  ],
};
