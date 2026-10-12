import {
  bind,
  emit,
  getFocusable,
  lockScroll,
  pushLayer,
  queryAll,
  unlockScroll,
} from '../core.js';

const DESKTOP_QUERY = '(min-width: 960px)';

function createInstance(menu) {
  const toggles = () => document.querySelectorAll(`[data-cb-mobile-toggle="${menu.id}"]`);
  let removeLayer = null;

  function isOpen() {
    return menu.classList.contains('is-open');
  }

  function setExpanded(value) {
    toggles().forEach((button) => button.setAttribute('aria-expanded', String(value)));
  }

  function open() {
    if (isOpen() || emit(menu, 'open').defaultPrevented) return;
    menu.classList.add('is-open');
    setExpanded(true);
    lockScroll();
    removeLayer = pushLayer(() => close({ returnFocus: true }));
    const first = getFocusable(menu)[0];
    if (first) requestAnimationFrame(() => first.focus({ preventScroll: true }));
  }

  function close({ returnFocus = false } = {}) {
    if (!isOpen()) return;
    menu.classList.remove('is-open');
    setExpanded(false);
    unlockScroll();
    if (removeLayer) removeLayer();
    removeLayer = null;
    if (returnFocus) toggles()[0]?.focus();
    emit(menu, 'close');
  }

  function toggle() {
    if (isOpen()) close();
    else open();
  }

  menu.addEventListener('click', (event) => {
    if (event.target.closest('a[href]')) close();
  });

  window.matchMedia(DESKTOP_QUERY).addEventListener('change', (event) => {
    if (event.matches) close();
  });

  return { el: menu, open, close, toggle, isOpen };
}

/**
 * Inicializa [data-cb-mobile-menu] y sus botones [data-cb-mobile-toggle="id"].
 * @param {ParentNode} [root]
 */
export function init(root = document) {
  queryAll(root, '[data-cb-mobile-menu]').forEach((menu) => {
    if (!menu.id || !bind(menu, 'mobile-menu')) return;
    menu.cbMobileMenu = createInstance(menu);
  });
  queryAll(root, '[data-cb-mobile-toggle]').forEach((button) => {
    if (!bind(button, 'mobile-toggle')) return;
    const id = button.getAttribute('data-cb-mobile-toggle');
    button.setAttribute('aria-controls', id);
    button.setAttribute('aria-expanded', 'false');
    button.addEventListener('click', () => document.getElementById(id)?.cbMobileMenu?.toggle());
  });
}

export default { init };
