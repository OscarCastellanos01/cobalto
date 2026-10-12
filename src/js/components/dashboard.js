import { bind, emit, lockScroll, pushLayer, queryAll, trapFocus, unlockScroll } from '../core.js';

const DESKTOP_QUERY = '(min-width: 960px)';

function createInstance(sidebar) {
  const scrim = document.querySelector(`[data-cb-dash-scrim="${sidebar.id}"]`);
  const toggles = () => document.querySelectorAll(`[data-cb-dash-toggle="${sidebar.id}"]`);
  let release = null;
  let removeLayer = null;

  function isOpen() {
    return sidebar.classList.contains('is-open');
  }

  function setExpanded(value) {
    toggles().forEach((button) => button.setAttribute('aria-expanded', String(value)));
  }

  function open() {
    if (isOpen() || emit(sidebar, 'open').defaultPrevented) return;
    sidebar.classList.add('is-open');
    scrim?.classList.add('is-open');
    setExpanded(true);
    lockScroll();
    release = trapFocus(sidebar);
    removeLayer = pushLayer(close);
  }

  function close() {
    if (!isOpen()) return;
    sidebar.classList.remove('is-open');
    scrim?.classList.remove('is-open');
    setExpanded(false);
    unlockScroll();
    if (removeLayer) removeLayer();
    if (release) release();
    release = null;
    removeLayer = null;
    emit(sidebar, 'close');
  }

  function toggle() {
    if (isOpen()) close();
    else open();
  }

  scrim?.addEventListener('click', close);
  sidebar.addEventListener('click', (event) => {
    if (event.target.closest('a[href]') && !window.matchMedia(DESKTOP_QUERY).matches) close();
  });
  window.matchMedia(DESKTOP_QUERY).addEventListener('change', (event) => {
    if (event.matches) close();
  });

  return { el: sidebar, open, close, toggle, isOpen };
}

/**
 * Inicializa la sidebar del dashboard. En movil se abre con [data-cb-dash-toggle="id"].
 * @param {ParentNode} [root]
 */
export function init(root = document) {
  queryAll(root, '[data-cb-dash-sidebar]').forEach((sidebar) => {
    if (!sidebar.id || !bind(sidebar, 'dash-sidebar')) return;
    sidebar.cbDashSidebar = createInstance(sidebar);
  });
  queryAll(root, '[data-cb-dash-toggle]').forEach((button) => {
    if (!bind(button, 'dash-toggle')) return;
    const id = button.getAttribute('data-cb-dash-toggle');
    button.setAttribute('aria-controls', id);
    button.setAttribute('aria-expanded', 'false');
    button.addEventListener('click', () => document.getElementById(id)?.cbDashSidebar?.toggle());
  });
}

export default { init };
