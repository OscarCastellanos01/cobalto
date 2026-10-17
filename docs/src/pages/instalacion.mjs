import { tr } from '../i18n.mjs';

const P = 'pages.instalacion';

const MESSAGES = [
  ['commandEmpty', 'data-cb-command-empty', 'No results for'],
  ['toastRegion', '', 'Notifications'],
  ['toastClose', 'closeLabel (toast option)', 'Close notification'],
  ['tableEmpty', 'data-cb-table-empty', 'No results'],
  ['tableStatus', 'data-cb-table-status-text', 'Showing {start}–{end} of {total}'],
  ['tableSelected', 'data-cb-table-selected-text', '{count} selected'],
  ['paginationPrev', 'data-cb-pagination-prev', 'Previous page'],
  ['paginationNext', 'data-cb-pagination-next', 'Next page'],
  ['paginationPage', 'data-cb-pagination-page', 'Page {page}'],
  ['copyDone', 'data-cb-copy-done', 'Copied'],
  ['copyError', 'data-cb-copy-error', 'Copy failed'],
];

export default {
  slug: 'instalacion',
  order: 2,
  render({ codeBlock, table }) {
    const desc = (key, extra = '') => tr('p', `${P}.${key}`, `class="docs-section__desc${extra}"`);
    const title = (key) => tr('h2', `${P}.${key}.title`, 'class="docs-section__title"');
    const sections = [
      'tailwind',
      'cdn',
      'laravel',
      'livewire',
      'messages',
      'fuente',
      'paquete',
    ].map((id) => ({
      id,
      key: `${P}.${id}.title`,
    }));
    const livewire = [0, 1, 2, 3].map((i) => tr('li', `${P}.livewire.items.${i}`)).join('\n    ');
    const messageRows = MESSAGES.map(([key, attr, value]) => [
      { code: `\`${key}\`` },
      { code: attr ? `\`${attr}\`` : '—' },
      { code: `\`${value}\`` },
    ]);
    const packageRows = [
      ['`cobalto`', '`dist/cobalto.js`'],
      ['`cobalto/tailwind`', '`src/cobalto.css`'],
      ['`cobalto/tokens.css`', '`src/tokens.css`'],
      ['`cobalto/css`', '`dist/cobalto.css`'],
      ['`cobalto/components/*`', '`src/js/components/*.js`'],
      ['CDN', '`dist/cobalto.umd.min.js`'],
    ].map(([name, file], i) => [{ code: name }, { code: file }, { key: `${P}.paquete.uses.${i}` }]);

    const main = `
<header class="docs-header">
  <div class="cb-label"><b>02/</b>${tr('span', 'ui.start')}</div>
  ${tr('h1', `${P}.title`, 'class="cb-h2"')}
  ${tr('p', `${P}.lead`, 'class="cb-lead"')}
</header>

<section class="docs-section" id="tailwind">
  ${title('tailwind')}
  ${desc('tailwind.desc')}
  ${codeBlock('npm install cobalto tailwindcss @tailwindcss/vite', { lang: 'bash', fileKey: 'ui.code.terminal' })}
  ${desc('tailwind.import', ' mt-6')}
  ${codeBlock(
    `
    @import "tailwindcss";
    @import "cobalto/tailwind";
  `,
    { lang: 'css', file: 'app.css' }
  )}
  ${desc('tailwind.js', ' mt-6')}
  ${codeBlock(
    `
    import cobalto from 'cobalto';

    cobalto.autoInit();
  `,
    { lang: 'js', file: 'app.js' }
  )}
  ${desc('tailwind.auto', ' mt-6')}
  ${codeBlock(
    `
    import { init as initTabs } from 'cobalto/components/tabs';

    initTabs(document);
  `,
    { lang: 'js' }
  )}
</section>

<section class="docs-section" id="cdn">
  ${title('cdn')}
  ${desc('cdn.desc')}
  ${codeBlock(`
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/cobalto@0.1.2/dist/cobalto.min.css">
    <script src="https://cdn.jsdelivr.net/npm/cobalto@0.1.2/dist/cobalto.umd.min.js" defer></script>
  `)}
  ${desc('cdn.note', ' mt-6')}
</section>

<section class="docs-section" id="laravel">
  ${title('laravel')}
  ${desc('laravel.desc')}
  ${codeBlock('npm install cobalto', { lang: 'bash', fileKey: 'ui.code.terminal' })}
  ${desc('laravel.css', ' mt-6')}
  ${codeBlock(
    `
    @import 'tailwindcss';
    @import 'cobalto/tailwind';

    @source '../../vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php';
    @source '../../storage/framework/views/*.php';
    @source '../**/*.blade.php';
    @source '../**/*.js';
  `,
    { lang: 'css', file: 'resources/css/app.css' }
  )}
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
  ${desc('laravel.flash', ' mt-6')}
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
  ${title('livewire')}
  <ul class="docs-list">
    ${livewire}
  </ul>
  ${desc('livewire.php', ' mt-6')}
  ${codeBlock(
    `
    $this->dispatch('toast', title: 'Guardado', variant: 'success');
  `,
    { lang: 'php', file: 'app/Livewire/EditarCliente.php' }
  )}
  ${desc('livewire.listen', ' mt-6')}
  ${codeBlock(
    `
    document.addEventListener('livewire:init', () => {
      Livewire.on('toast', (event) => cobalto.toast(event));
      Livewire.on('abrir-modal', (event) => cobalto.modal.open(event.id));
    });
  `,
    { lang: 'js', file: 'resources/js/app.js' }
  )}
  ${desc('livewire.alpine', ' mt-6')}
  ${codeBlock(`
    <div x-data x-on:toast.window="cobalto.toast($event.detail)"></div>
  `)}
</section>

<section class="docs-section" id="messages">
  ${title('messages')}
  ${desc('messages.desc')}
  ${codeBlock(
    `
    import cobalto from 'cobalto';

    cobalto.autoInit({
      messages: {
        commandEmpty: 'Sin resultados para',
        tableStatus: 'Mostrando {start}–{end} de {total}',
        copyDone: 'Copiado',
      },
    });

    // o en cualquier momento
    cobalto.setMessages({ toastClose: 'Cerrar notificación' });
  `,
    { lang: 'js', file: 'app.js' }
  )}
  ${desc('messages.attrs', ' mt-6')}
  ${codeBlock(`
    <div class="cb-table-wrap" data-cb-table data-cb-table-empty="Sin resultados" data-cb-table-status-text="{start}–{end} de {total}">...</div>
    <button class="cb-code__copy" data-cb-copy data-cb-copy-done="Copiado">...</button>
  `)}
  ${desc('messages.keys', ' mt-6')}
  ${table([`${P}.messages.headers.0`, `${P}.messages.headers.1`, `${P}.messages.headers.2`], messageRows)}
  ${desc('messages.cdn', ' mt-6')}
</section>

<section class="docs-section" id="fuente">
  ${title('fuente')}
  ${desc('fuente.desc')}
  ${codeBlock(`
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  `)}
  ${desc('fuente.self', ' mt-6')}
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
  ${title('paquete')}
  ${table([`${P}.paquete.headers.0`, `${P}.paquete.headers.1`, `${P}.paquete.headers.2`], packageRows)}
</section>
`;
    return { main, sections };
  },
};
