const bindings = new WeakMap();
const layers = [];
let scrollLocks = 0;
let idCounter = 0;
let escapeListening = false;

export const FOCUSABLE = [
  'a[href]',
  'area[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'iframe',
  'audio[controls]',
  'video[controls]',
  '[contenteditable]:not([contenteditable="false"])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

/**
 * Busca elementos dentro de root, incluyendo a root si coincide.
 * @param {ParentNode} root
 * @param {string} selector
 * @returns {Element[]}
 */
export function queryAll(root, selector) {
  const scope = root || document;
  const found = Array.from(scope.querySelectorAll(selector));
  if (scope instanceof Element && scope.matches(selector)) found.unshift(scope);
  return found;
}

/**
 * Marca un elemento como inicializado por un componente.
 * Devuelve false si ya lo estaba, asi init() se puede llamar varias veces.
 * @param {Element} el
 * @param {string} name
 * @returns {boolean}
 */
export function bind(el, name) {
  let names = bindings.get(el);
  if (!names) {
    names = new Set();
    bindings.set(el, names);
  }
  if (names.has(name)) return false;
  names.add(name);
  return true;
}

/**
 * Dispara un evento cb:* que burbujea y se puede cancelar.
 * @param {EventTarget} target
 * @param {string} name sin el prefijo cb:
 * @param {object} [detail]
 * @returns {CustomEvent}
 */
export function emit(target, name, detail = {}) {
  const event = new CustomEvent(`cb:${name}`, { bubbles: true, cancelable: true, detail });
  target.dispatchEvent(event);
  return event;
}

/**
 * Genera un id unico para enlazar elementos con aria-*.
 * @param {string} [prefix]
 * @returns {string}
 */
export function uid(prefix = 'cb') {
  idCounter += 1;
  return `${prefix}-${idCounter.toString(36)}`;
}

/**
 * Asegura que el elemento tenga id y lo devuelve.
 * @param {Element} el
 * @param {string} [prefix]
 * @returns {string}
 */
export function ensureId(el, prefix) {
  if (!el.id) el.id = uid(prefix);
  return el.id;
}

export const storage = {
  get(key) {
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch {
      return false;
    }
    return true;
  },
  remove(key) {
    try {
      window.localStorage.removeItem(key);
    } catch {
      return false;
    }
    return true;
  },
};

/**
 * @returns {boolean}
 */
export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * @returns {boolean}
 */
export function canHover() {
  return window.matchMedia('(hover: hover)').matches;
}

/**
 * @param {Element} container
 * @returns {HTMLElement[]}
 */
export function getFocusable(container) {
  return Array.from(container.querySelectorAll(FOCUSABLE)).filter(isTabbable);
}

function isVisible(el) {
  return !el.closest('[hidden], [inert]') && el.getClientRects().length > 0;
}

function isTabbable(el) {
  return el.getAttribute('tabindex') !== '-1' && isVisible(el);
}

/**
 * Mantiene el foco dentro de container hasta que se llame a la funcion devuelta.
 * Al liberar, devuelve el foco al elemento que lo tenia antes.
 * @param {HTMLElement} container
 * @param {{ initialFocus?: HTMLElement | null }} [options]
 * @returns {() => void}
 */
export function trapFocus(container, options = {}) {
  const previous = document.activeElement;

  function onKeydown(event) {
    if (event.key !== 'Tab') return;
    const items = getFocusable(container);
    if (!items.length) {
      event.preventDefault();
      container.focus();
      return;
    }
    // si el foco esta en algo fuera de la lista, como un contenedor con scroll, tambien se envuelve
    const index = items.indexOf(document.activeElement);
    const atStart = index <= 0;
    const atEnd = index === -1 || index === items.length - 1;
    if (event.shiftKey && atStart) {
      event.preventDefault();
      items[items.length - 1].focus();
    } else if (!event.shiftKey && atEnd) {
      event.preventDefault();
      items[0].focus();
    }
  }

  container.addEventListener('keydown', onKeydown);
  const target =
    options.initialFocus || container.querySelector('[autofocus]') || getFocusable(container)[0];
  if (!container.hasAttribute('tabindex')) container.setAttribute('tabindex', '-1');
  (target || container).focus({ preventScroll: true });

  return function release() {
    container.removeEventListener('keydown', onKeydown);
    if (previous instanceof HTMLElement && previous.isConnected)
      previous.focus({ preventScroll: true });
  };
}

/**
 * Registra una capa que se cierra con Esc. Solo se cierra la ultima abierta.
 * @param {() => void} close
 * @returns {() => void} quita la capa sin cerrarla
 */
export function pushLayer(close) {
  listenEscape();
  const layer = { close };
  layers.push(layer);
  return function removeLayer() {
    const index = layers.indexOf(layer);
    if (index !== -1) layers.splice(index, 1);
  };
}

function listenEscape() {
  if (escapeListening) return;
  escapeListening = true;
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || !layers.length || event.defaultPrevented) return;
    event.preventDefault();
    layers[layers.length - 1].close();
  });
}

/**
 * Bloquea el scroll del body. Lleva la cuenta para que dos overlays
 * abiertos a la vez no lo desbloqueen antes de tiempo.
 */
export function lockScroll() {
  scrollLocks += 1;
  if (scrollLocks > 1) return;
  const scrollbar = window.innerWidth - document.documentElement.clientWidth;
  document.body.style.overflow = 'hidden';
  if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
}

export function unlockScroll() {
  scrollLocks = Math.max(0, scrollLocks - 1);
  if (scrollLocks > 0) return;
  document.body.style.overflow = '';
  document.body.style.paddingRight = '';
}

/**
 * Ejecuta fn cuando el DOM esta listo.
 * @param {() => void} fn
 */
export function onReady(fn) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fn, { once: true });
  } else {
    fn();
  }
}

/**
 * Escapa texto para insertarlo como HTML.
 * @param {string} value
 * @returns {string}
 */
export function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Resuelve el elemento al que apunta un trigger, por id o selector.
 * @param {string | null} ref
 * @returns {HTMLElement | null}
 */
export function resolveTarget(ref) {
  if (!ref) return null;
  if (/^[\w-]+$/.test(ref)) return document.getElementById(ref);
  try {
    return document.querySelector(ref);
  } catch {
    return null;
  }
}

/**
 * Espera a que termine la transicion del elemento, con un tope por si nunca dispara.
 * @param {HTMLElement} el
 * @param {() => void} done
 */
export function afterTransition(el, done) {
  const duration = parseFloat(getComputedStyle(el).transitionDuration) * 1000 || 0;
  if (!duration || prefersReducedMotion()) {
    done();
    return;
  }
  let finished = false;
  const finish = () => {
    if (finished) return;
    finished = true;
    el.removeEventListener('transitionend', onEnd);
    done();
  };
  const onEnd = (event) => {
    if (event.target === el) finish();
  };
  el.addEventListener('transitionend', onEnd);
  setTimeout(finish, duration + 80);
}

const THEME_KEY = 'cb-theme';
const ACCENT_KEY = 'cb-accent';
export const ACCENTS = ['cobalto', 'esmeralda', 'ambar', 'rubi', 'violeta', 'grafito'];

function systemTheme() {
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function syncMetaThemeColor() {
  const meta = document.querySelector('meta[name="theme-color"]');
  if (!meta) return;
  // se lee el token y no el fondo del body, que puede estar a mitad de su transicion
  const bg = getComputedStyle(document.documentElement).getPropertyValue('--cb-bg').trim();
  if (bg) meta.setAttribute('content', bg);
}

export const theme = {
  /**
   * Tema guardado: 'light', 'dark' o 'system'.
   * @returns {'light' | 'dark' | 'system'}
   */
  get() {
    const value = document.documentElement.getAttribute('data-cb-theme');
    return value === 'light' || value === 'dark' ? value : 'system';
  },

  /**
   * Tema que se ve en pantalla, resolviendo 'system'.
   * @returns {'light' | 'dark'}
   */
  resolved() {
    const value = theme.get();
    return value === 'system' ? systemTheme() : value;
  },

  /**
   * Cambia el modo y lo recuerda en localStorage.
   * @param {'light' | 'dark' | 'system'} value
   */
  set(value) {
    const root = document.documentElement;
    if (value === 'light' || value === 'dark') {
      root.setAttribute('data-cb-theme', value);
      storage.set(THEME_KEY, value);
    } else {
      root.removeAttribute('data-cb-theme');
      storage.remove(THEME_KEY);
    }
    syncMetaThemeColor();
    emit(document, 'theme', { theme: theme.get(), resolved: theme.resolved() });
  },

  toggle() {
    theme.set(theme.resolved() === 'light' ? 'dark' : 'light');
  },

  /**
   * @returns {string}
   */
  getAccent() {
    return document.documentElement.getAttribute('data-cb-accent') || 'cobalto';
  },

  /**
   * Cambia el tema de acento. Acepta cualquier nombre para temas propios.
   * @param {string} name
   */
  setAccent(name) {
    const root = document.documentElement;
    if (!name || name === 'cobalto') {
      root.removeAttribute('data-cb-accent');
      storage.remove(ACCENT_KEY);
    } else {
      root.setAttribute('data-cb-accent', name);
      storage.set(ACCENT_KEY, name);
    }
    syncMetaThemeColor();
    emit(document, 'accent', { accent: theme.getAccent() });
  },

  /**
   * Aplica lo guardado en localStorage. La eleccion del usuario gana sobre el HTML.
   */
  restore() {
    const root = document.documentElement;
    const savedTheme = storage.get(THEME_KEY);
    const savedAccent = storage.get(ACCENT_KEY);
    if (savedTheme === 'light' || savedTheme === 'dark')
      root.setAttribute('data-cb-theme', savedTheme);
    if (savedAccent) root.setAttribute('data-cb-accent', savedAccent);
    syncMetaThemeColor();
  },
};

const dialogTriggers = { listening: false };

function listenDialogTriggers() {
  if (dialogTriggers.listening) return;
  dialogTriggers.listening = true;
  // delegado en document para que funcione con botones que Livewire o Alpine agregan despues
  document.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-cb-open]');
    if (!trigger) return;
    const target = resolveTarget(trigger.getAttribute('data-cb-open'));
    if (!target?.cbDialog) return;
    event.preventDefault();
    target.cbDialog.open();
  });
}

/**
 * Crea el controlador de un overlay con foco atrapado (modal, drawer).
 * @param {HTMLElement} el contenedor con el fondo
 * @param {{ panel: string, title: string }} selectors
 * @returns {{ open: () => void, close: () => void, toggle: () => void, isOpen: () => boolean }}
 */
export function createDialog(el, selectors) {
  listenDialogTriggers();
  const panel = el.querySelector(selectors.panel) || el;
  const title = el.querySelector(`[data-cb-dialog-title], ${selectors.title}`);
  let release = null;
  let removeLayer = null;

  panel.setAttribute('role', el.getAttribute('data-cb-role') || 'dialog');
  panel.setAttribute('aria-modal', 'true');
  if (title && !panel.hasAttribute('aria-label')) {
    panel.setAttribute('aria-labelledby', ensureId(title, 'cb-dialog-title'));
  }

  function isOpen() {
    return el.classList.contains('is-open');
  }

  function open() {
    if (isOpen() || emit(el, 'open').defaultPrevented) return;
    el.classList.add('is-open');
    lockScroll();
    release = trapFocus(panel);
    removeLayer = pushLayer(close);
  }

  function close() {
    if (!isOpen() || emit(el, 'close').defaultPrevented) return;
    el.classList.remove('is-open');
    unlockScroll();
    if (removeLayer) removeLayer();
    if (release) release();
    release = null;
    removeLayer = null;
  }

  function toggle() {
    if (isOpen()) close();
    else open();
  }

  el.addEventListener('mousedown', (event) => {
    if (event.target === el && !el.hasAttribute('data-cb-static')) close();
  });

  el.addEventListener('click', (event) => {
    if (event.target.closest('[data-cb-close]')) close();
  });

  const instance = { el, open, close, toggle, isOpen };
  el.cbDialog = instance;
  if (el.hasAttribute('data-cb-open-on-load')) requestAnimationFrame(open);
  return instance;
}

let scrollObserver = null;

function syncScrollable(el) {
  const overflowing = el.scrollWidth > el.clientWidth || el.scrollHeight > el.clientHeight;
  if (overflowing && !el.hasAttribute('tabindex')) {
    el.setAttribute('tabindex', '0');
    el.setAttribute('data-cb-scrollable', '');
  } else if (!overflowing && el.hasAttribute('data-cb-scrollable')) {
    el.removeAttribute('tabindex');
    el.removeAttribute('data-cb-scrollable');
  }
}

/**
 * Hace enfocable un contenedor con scroll solo mientras desborda,
 * para que se pueda recorrer con el teclado.
 * @param {HTMLElement} el
 */
export function focusableWhenScrollable(el) {
  syncScrollable(el);
  // el contenido cambia de ancho cuando carga la fuente aunque la caja no cambie
  document.fonts?.ready.then(() => syncScrollable(el));
  if (!('ResizeObserver' in window)) return;
  scrollObserver ||= new ResizeObserver((entries) => {
    entries.forEach((entry) => syncScrollable(entry.target));
  });
  scrollObserver.observe(el);
}
