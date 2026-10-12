import { bind, emit, queryAll } from '../core.js';

function items(el) {
  return Array.from(el.querySelectorAll(':scope > details'));
}

/**
 * Inicializa los [data-cb-accordion]. Con el valor "single" solo queda un item abierto.
 * Se apoya en details/summary, asi que sin JS sigue funcionando.
 * @param {ParentNode} [root]
 */
export function init(root = document) {
  queryAll(root, '[data-cb-accordion]').forEach((el) => {
    if (!bind(el, 'accordion')) return;
    const single = el.getAttribute('data-cb-accordion') === 'single';
    // toggle no burbujea, por eso se escucha en fase de captura
    el.addEventListener(
      'toggle',
      (event) => {
        const item = event.target;
        if (!(item instanceof HTMLDetailsElement) || item.parentElement !== el) return;
        if (item.open && single) {
          items(el).forEach((other) => other !== item && (other.open = false));
        }
        emit(item, item.open ? 'open' : 'close');
      },
      true
    );
  });
}

export default { init };
