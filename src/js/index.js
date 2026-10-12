import * as core from './core.js';
import { onReady, setMessages, theme } from './core.js';
import themeControls from './components/theme.js';
import dropdown from './components/dropdown.js';
import mobileMenu from './components/mobile-menu.js';
import command from './components/command.js';
import reveal from './components/reveal.js';
import tabs from './components/tabs.js';
import accordion from './components/accordion.js';
import modal from './components/modal.js';
import drawer from './components/drawer.js';
import toastComponent, { toast } from './components/toast.js';
import dismiss from './components/dismiss.js';
import tooltip from './components/tooltip.js';
import popover from './components/popover.js';
import table from './components/table.js';
import code from './components/code.js';
import sidenav from './components/sidenav.js';
import pricing from './components/pricing.js';
import dashboard from './components/dashboard.js';

export const components = {
  theme: themeControls,
  dropdown,
  mobileMenu,
  command,
  reveal,
  tabs,
  accordion,
  modal,
  drawer,
  toast: toastComponent,
  dismiss,
  tooltip,
  popover,
  table,
  code,
  sidenav,
  pricing,
  dashboard,
};

let autoStarted = false;

/**
 * Inicializa todos los componentes dentro de root. Se puede llamar
 * las veces que haga falta: lo ya inicializado se salta.
 * @param {ParentNode} [root]
 * @param {{ messages?: object }} [options] messages cambia los textos por defecto
 */
export function init(root = document, options = {}) {
  if (options.messages) setMessages(options.messages);
  Object.values(components).forEach((component) => component.init(root));
}

function observeMutations() {
  const pending = new Set();
  let scheduled = false;

  function flush() {
    scheduled = false;
    pending.forEach((node) => node.isConnected && init(node));
    pending.clear();
  }

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) pending.add(node);
      });
    });
    if (pending.size && !scheduled) {
      scheduled = true;
      requestAnimationFrame(flush);
    }
  });
  // se observa html y no body porque wire:navigate cambia el body completo
  observer.observe(document.documentElement, { childList: true, subtree: true });
  return observer;
}

/**
 * Restaura el tema guardado, inicializa la pagina y se reengancha
 * cuando Livewire navega o cuando aparecen nodos nuevos en el DOM.
 * @param {{ observe?: boolean, messages?: object }} [options]
 */
export function autoInit(options = {}) {
  if (autoStarted) return;
  autoStarted = true;
  if (options.messages) setMessages(options.messages);
  theme.restore();
  onReady(() => {
    init(document);
    if (options.observe !== false) observeMutations();
  });
  // wire:navigate reemplaza el body sin recargar, hay que volver a pasar por todo
  document.addEventListener('livewire:navigated', () => init(document));
}

export { theme, toast, modal, drawer, core, setMessages };

export default {
  init,
  autoInit,
  theme,
  toast,
  modal,
  drawer,
  components,
  core,
  setMessages,
};
