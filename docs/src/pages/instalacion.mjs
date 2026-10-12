export default {
  slug: 'instalacion',
  title: 'Instalación',
  order: 2,
  description:
    'Cómo instalar Cobalto con npm y Tailwind CSS v4, desde un CDN sin build o en Laravel con Vite y Livewire.',
  keywords: 'npm cdn laravel vite livewire alpine blade fuente instalar',
  render({ codeBlock, table }) {
    const sections = [
      { id: 'tailwind', title: 'Con Tailwind (recomendado)' },
      { id: 'cdn', title: 'Sin build, desde CDN' },
      { id: 'laravel', title: 'Laravel + Vite' },
      { id: 'livewire', title: 'Livewire y Alpine' },
      { id: 'fuente', title: 'Fuente' },
      { id: 'paquete', title: 'Qué incluye el paquete' },
    ];
    const main = `
<header class="docs-header">
  <div class="cb-label"><b>02/</b>Empezar</div>
  <h1 class="cb-h2">Instalación</h1>
  <p class="cb-lead">Dos formas de uso: como fuente para tu build de Tailwind CSS v4, o precompilado desde un CDN.</p>
</header>

<section class="docs-section" id="tailwind">
  <h2 class="docs-section__title">Con Tailwind (recomendado)</h2>
  <p class="docs-section__desc">Así puedes usar las utilidades \`bg-cb-bg\`, \`text-cb-muted\` o \`dark:\` en tu propio HTML y solo se genera el CSS que usas.</p>
  ${codeBlock('npm install cobalto tailwindcss @tailwindcss/vite', { lang: 'bash', file: 'Terminal' })}
  <p class="docs-section__desc mt-6">Importa Cobalto justo después de Tailwind:</p>
  ${codeBlock(
    `
    @import "tailwindcss";
    @import "cobalto/tailwind";
  `,
    { lang: 'css', file: 'app.css' }
  )}
  <p class="docs-section__desc mt-6">Y el JavaScript, si usas componentes interactivos:</p>
  ${codeBlock(
    `
    import cobalto from 'cobalto';

    cobalto.autoInit();
  `,
    { lang: 'js', file: 'app.js' }
  )}
  <p class="docs-section__desc mt-6">\`autoInit()\` restaura el tema guardado, inicializa la página y vigila el DOM para inicializar lo que se agregue después. Si prefieres control manual, llama a \`cobalto.init(elemento)\`. También puedes importar componentes sueltos:</p>
  ${codeBlock(
    `
    import { init as initTabs } from 'cobalto/components/tabs';

    initTabs(document);
  `,
    { lang: 'js' }
  )}
</section>

<section class="docs-section" id="cdn">
  <h2 class="docs-section__title">Sin build, desde CDN</h2>
  <p class="docs-section__desc">El CSS precompilado incluye el reset de Tailwind, los tokens y todos los componentes. El script UMD se inicializa solo; agrega \`data-cb-manual\` para evitarlo.</p>
  ${codeBlock(`
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/cobalto@0.1.0/dist/cobalto.min.css">
    <script src="https://cdn.jsdelivr.net/npm/cobalto@0.1.0/dist/cobalto.umd.min.js" defer></script>
  `)}
  <p class="docs-section__desc mt-6">Con CDN no tienes utilidades de Tailwind arbitrarias, solo las clases \`cb-*\`, \`cb-wrap\` y las utilidades que usan los propios componentes.</p>
</section>

<section class="docs-section" id="laravel">
  <h2 class="docs-section__title">Laravel + Vite</h2>
  <p class="docs-section__desc">Laravel 11+ ya trae Tailwind v4 con Vite. No hace falta configurar nada más.</p>
  ${codeBlock('npm install cobalto', { lang: 'bash', file: 'Terminal' })}
  <div class="mt-4">
  ${codeBlock(
    `
    @import "tailwindcss";
    @import "cobalto/tailwind";

    @source "../views";
  `,
    { lang: 'css', file: 'resources/css/app.css' }
  )}
  </div>
  <div class="mt-4">
  ${codeBlock(
    `
    import cobalto from 'cobalto';

    window.cobalto = cobalto;
    cobalto.autoInit();
  `,
    { lang: 'js', file: 'resources/js/app.js' }
  )}
  </div>
  <p class="docs-section__desc mt-6">En el layout, agrega este script en el \`head\` para aplicar el tema guardado antes del primer pintado y evitar el parpadeo:</p>
  ${codeBlock(
    `
    <script>
      try {
        var t = localStorage.getItem('cb-theme');
        var a = localStorage.getItem('cb-accent');
        if (t) document.documentElement.setAttribute('data-cb-theme', t);
        if (a) document.documentElement.setAttribute('data-cb-accent', a);
      } catch (e) {}
    </script>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
  `,
    { lang: 'html', file: 'resources/views/layouts/app.blade.php' }
  )}
</section>

<section class="docs-section" id="livewire">
  <h2 class="docs-section__title">Livewire y Alpine</h2>
  <ul class="docs-list">
    <li>\`autoInit()\` escucha \`livewire:navigated\` y vuelve a inicializar después de cada \`wire:navigate\`.</li>
    <li>Un \`MutationObserver\` inicializa los componentes que Livewire o Alpine agregan al DOM. Lo ya inicializado no se duplica.</li>
    <li>Cobalto solo usa atributos \`data-cb-*\` y clases \`cb-*\`, así que no choca con \`x-*\` ni \`wire:*\`.</li>
    <li>Si Livewire re-renderiza un componente abierto (modal, dropdown), envuélvelo en \`wire:ignore.self\` para conservar su estado.</li>
    <li>Para abrir un modal o lanzar un toast desde PHP, despacha un evento del navegador con \`$this->dispatch(...)\` y escúchalo con \`window.addEventListener\`.</li>
  </ul>
  <div class="mt-6">
  ${codeBlock(
    `
    // en el componente Livewire
    $this->dispatch('toast', title: 'Guardado', variant: 'success');
  `,
    { lang: 'js', file: 'app/Livewire/EditarCliente.php' }
  )}
  </div>
  <div class="mt-4">
  ${codeBlock(
    `
    window.addEventListener('toast', (event) => cobalto.toast(event.detail));
  `,
    { lang: 'js', file: 'resources/js/app.js' }
  )}
  </div>
</section>

<section class="docs-section" id="fuente">
  <h2 class="docs-section__title">Fuente</h2>
  <p class="docs-section__desc">Cobalto no carga ninguna fuente por su cuenta. Si no agregas nada, usa la monoespaciada del sistema. Para JetBrains Mono desde Google Fonts:</p>
  ${codeBlock(`
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  `)}
  <p class="docs-section__desc mt-6">Para alojarla tú mismo (sin peticiones a Google), instala \`@fontsource-variable/jetbrains-mono\` o declara tu propio \`@font-face\`, y si quieres otra familia cambia el token:</p>
  ${codeBlock(
    `
    @import "@fontsource-variable/jetbrains-mono";

    :root {
      --font-cb-mono: "JetBrains Mono Variable", ui-monospace, monospace;
      --font-cb-sans: "Inter", system-ui, sans-serif;
    }
  `,
    { lang: 'css' }
  )}
</section>

<section class="docs-section" id="paquete">
  <h2 class="docs-section__title">Qué incluye el paquete</h2>
  ${table(
    ['Import', 'Archivo', 'Uso'],
    [
      ['`cobalto`', '`dist/cobalto.js`', 'JS completo (ESM).'],
      ['`cobalto/tailwind`', '`src/cobalto.css`', 'Fuente CSS para importar después de Tailwind.'],
      [
        '`cobalto/tokens.css`',
        '`src/tokens.css`',
        'Solo tokens, temas y variantes `dark:`/`light:`.',
      ],
      ['`cobalto/css`', '`dist/cobalto.css`', 'CSS precompilado (también `dist/cobalto.min.css`).'],
      ['`cobalto/components/*`', '`src/js/components/*.js`', 'JS de un componente suelto.'],
      ['CDN', '`dist/cobalto.umd.min.js`', 'Script para `<script>` que expone `window.cobalto`.'],
    ]
  )}
</section>
`;
    return { main, sections };
  },
};
