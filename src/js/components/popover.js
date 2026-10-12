import { bind, queryAll } from '../core.js';
import { createDisclosure, forgetDisconnected } from './dropdown.js';

/**
 * Inicializa los [data-cb-popover]. El panel puede tener contenido interactivo.
 * @param {ParentNode} [root]
 */
export function init(root = document) {
  queryAll(root, '[data-cb-popover]').forEach((el) => {
    if (!bind(el, 'popover')) return;
    const trigger = el.querySelector('[data-cb-popover-trigger]') || el.querySelector('button');
    const panel = el.querySelector('.cb-popover__panel');
    if (panel && !panel.hasAttribute('role')) panel.setAttribute('role', 'dialog');
    const instance = createDisclosure(el, { trigger, panel, arrows: false });
    if (instance) el.cbPopover = instance;
  });
  forgetDisconnected();
}

export default { init };
