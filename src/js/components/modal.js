import { bind, createDialog, queryAll, resolveTarget } from '../core.js';

/**
 * Inicializa los [data-cb-modal]. Se abren con [data-cb-open="id"].
 * @param {ParentNode} [root]
 */
export function init(root = document) {
  queryAll(root, '[data-cb-modal]').forEach((el) => {
    if (!bind(el, 'modal')) return;
    createDialog(el, { panel: '.cb-modal__panel', title: '.cb-modal__title' });
  });
}

/**
 * @param {string | HTMLElement} target id o elemento
 */
export function open(target) {
  const el = typeof target === 'string' ? resolveTarget(target) : target;
  el?.cbDialog?.open();
}

/**
 * @param {string | HTMLElement} target id o elemento
 */
export function close(target) {
  const el = typeof target === 'string' ? resolveTarget(target) : target;
  el?.cbDialog?.close();
}

export default { init, open, close };
