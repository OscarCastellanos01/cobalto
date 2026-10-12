import { bind, emit, queryAll, storage } from '../core.js';

const STORAGE_PREFIX = 'cb-dismissed:';

function findTarget(button) {
  return button.closest('[data-cb-dismissible], .cb-alert, .cb-banner');
}

function dismiss(target) {
  if (emit(target, 'close').defaultPrevented) return;
  target.classList.add('is-dismissed');
  const key = target.getAttribute('data-cb-dismiss-key');
  if (key) storage.set(STORAGE_PREFIX + key, '1');
}

/**
 * Conecta los botones [data-cb-dismiss] para cerrar alertas y banners.
 * Con data-cb-dismiss-key en el contenedor, se recuerda que ya se cerro.
 * @param {ParentNode} [root]
 */
export function init(root = document) {
  queryAll(root, '[data-cb-dismiss-key]').forEach((target) => {
    if (storage.get(STORAGE_PREFIX + target.getAttribute('data-cb-dismiss-key'))) {
      target.classList.add('is-dismissed');
    }
  });
  queryAll(root, '[data-cb-dismiss]').forEach((button) => {
    if (!bind(button, 'dismiss')) return;
    button.addEventListener('click', () => {
      const target = findTarget(button);
      if (target) dismiss(target);
    });
  });
}

export default { init };
