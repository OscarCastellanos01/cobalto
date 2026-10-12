import { onReady, theme } from './core.js';
import themeControls from './components/theme.js';
import dropdown from './components/dropdown.js';
import mobileMenu from './components/mobile-menu.js';
import command from './components/command.js';
import reveal from './components/reveal.js';

export const components = {
  theme: themeControls,
  dropdown,
  mobileMenu,
  command,
  reveal,
};

let autoStarted = false;

/**
 * Inicializa todos los componentes dentro de root. Se puede llamar
 * las veces que haga falta: lo ya inicializado se salta.
 * @param {ParentNode} [root]
 */
export function init(root = document) {
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
 * @param {{ observe?: boolean }} [options]
 */
export function autoInit(options = {}) {
  if (autoStarted) return;
  autoStarted = true;
  theme.restore();
  onReady(() => {
    init(document);
    if (options.observe !== false) observeMutations();
  });
  // wire:navigate reemplaza el body sin recargar, hay que volver a pasar por todo
  document.addEventListener('livewire:navigated', () => init(document));
}

export { theme };
export * as core from './core.js';

export default {
  init,
  autoInit,
  theme,
  components,
};
