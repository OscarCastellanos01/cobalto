import { bind, canHover, emit, ensureId, getFocusable, pushLayer, queryAll } from '../core.js';

const HOVER_CLOSE_DELAY = 120;
const instances = new Set();
let documentListening = false;

function listenDocument() {
  if (documentListening) return;
  documentListening = true;
  document.addEventListener('click', (event) => {
    instances.forEach((instance) => {
      if (instance.isOpen() && !instance.el.contains(event.target)) instance.close();
    });
  });
}

function getItems(panel) {
  const menuItems = panel.querySelectorAll('[role^="menuitem"]:not([aria-disabled="true"])');
  return menuItems.length ? Array.from(menuItems) : getFocusable(panel);
}

function focusItem(panel, index) {
  const items = getItems(panel);
  if (!items.length) return;
  const next = (index + items.length) % items.length;
  items[next].focus();
}

function createInstance(el) {
  const trigger = el.querySelector('[data-cb-dropdown-trigger]') || el.querySelector('button');
  const panel =
    el.querySelector('[data-cb-dropdown-panel]') || el.querySelector('.cb-dropdown__panel');
  if (!trigger || !panel) return null;

  const isMenu = panel.getAttribute('role') === 'menu';
  let removeLayer = null;
  let hoverTimer = 0;
  let openedByHover = false;

  trigger.setAttribute('aria-expanded', 'false');
  trigger.setAttribute('aria-controls', ensureId(panel, 'cb-dropdown'));
  if (isMenu) trigger.setAttribute('aria-haspopup', 'menu');

  function isOpen() {
    return el.classList.contains('is-open');
  }

  function open({ focus = false } = {}) {
    if (isOpen()) return;
    if (emit(el, 'open').defaultPrevented) return;
    instances.forEach((other) => other !== instance && other.close());
    el.classList.add('is-open');
    trigger.setAttribute('aria-expanded', 'true');
    removeLayer = pushLayer(() => close({ returnFocus: true }));
    if (focus) focusItem(panel, 0);
  }

  function close({ returnFocus = false } = {}) {
    openedByHover = false;
    if (!isOpen()) return;
    el.classList.remove('is-open');
    trigger.setAttribute('aria-expanded', 'false');
    if (removeLayer) removeLayer();
    removeLayer = null;
    if (returnFocus) trigger.focus();
    emit(el, 'close');
  }

  function toggle() {
    if (isOpen()) close();
    else open();
  }

  trigger.addEventListener('click', (event) => {
    event.preventDefault();
    // con hover ya esta abierto cuando llega el clic, y sin esto el clic lo cerraria
    if (openedByHover) {
      openedByHover = false;
      return;
    }
    toggle();
  });

  trigger.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      open();
      focusItem(panel, event.key === 'ArrowDown' ? 0 : -1);
    }
  });

  panel.addEventListener('keydown', (event) => {
    const items = getItems(panel);
    const index = items.indexOf(document.activeElement);
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      focusItem(panel, index + 1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      focusItem(panel, index - 1);
    } else if (event.key === 'Home') {
      event.preventDefault();
      focusItem(panel, 0);
    } else if (event.key === 'End') {
      event.preventDefault();
      focusItem(panel, -1);
    }
  });

  panel.addEventListener('click', (event) => {
    const item = event.target.closest('[role^="menuitem"], a[href], [data-cb-dropdown-close]');
    if (!item) return;
    if (item.getAttribute('role') === 'menuitem') {
      emit(el, 'select', { item, value: item.getAttribute('data-value') });
    }
    close({ returnFocus: isMenu });
  });

  el.addEventListener('focusout', (event) => {
    if (isOpen() && event.relatedTarget && !el.contains(event.relatedTarget)) close();
  });

  if (el.hasAttribute('data-cb-dropdown-hover')) {
    el.addEventListener('mouseenter', () => {
      if (!canHover()) return;
      clearTimeout(hoverTimer);
      if (isOpen()) return;
      open();
      openedByHover = true;
    });
    el.addEventListener('mouseleave', () => {
      if (!canHover()) return;
      clearTimeout(hoverTimer);
      hoverTimer = setTimeout(close, HOVER_CLOSE_DELAY);
    });
  }

  const instance = { el, open, close, toggle, isOpen };
  return instance;
}

/**
 * Inicializa los [data-cb-dropdown] dentro de root.
 * @param {ParentNode} [root]
 */
export function init(root = document) {
  listenDocument();
  queryAll(root, '[data-cb-dropdown]').forEach((el) => {
    if (!bind(el, 'dropdown')) return;
    const instance = createInstance(el);
    if (!instance) return;
    instances.add(instance);
    el.cbDropdown = instance;
  });
  instances.forEach((instance) => {
    if (!instance.el.isConnected) instances.delete(instance);
  });
}

export default { init };
