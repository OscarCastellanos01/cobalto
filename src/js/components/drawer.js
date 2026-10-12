import { bind, createDialog, queryAll, resolveTarget } from '../core.js';

/**
 * Inicializa los [data-cb-drawer]. Se abren con [data-cb-open="id"].
 * @param {ParentNode} [root]
 */
export function init(root = document) {
  queryAll(root, '[data-cb-drawer]').forEach((el) => {
    if (!bind(el, 'drawer')) return;
    createDialog(el, { panel: '.cb-drawer__panel', title: '.cb-drawer__title' });
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
