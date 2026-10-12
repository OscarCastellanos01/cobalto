import { bind, emit, message, queryAll } from '../core.js';

const ICONS = {
  default: '<path d="M12 8v4M12 16h.01"/><circle cx="12" cy="12" r="9"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
  success: '<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>',
  warning: '<path d="M12 3 2 20h20L12 3z"/><path d="M12 10v4M12 17h.01"/>',
  danger: '<circle cx="12" cy="12" r="9"/><path d="m9 9 6 6M15 9l-6 6"/>',
};
const CLOSE_ICON = '<path d="M6 6l12 12M18 6 6 18"/>';
const toasters = new Map();

function svg(paths, className) {
  return `<svg class="${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">${paths}</svg>`;
}

function getToaster(position) {
  const existing = toasters.get(position);
  if (existing?.isConnected) return existing;
  const toaster = document.createElement('section');
  toaster.className = 'cb-toaster';
  if (position.includes('top')) toaster.classList.add('cb-toaster--top');
  if (position.includes('left')) toaster.classList.add('cb-toaster--left');
  toaster.setAttribute('aria-label', message('toastRegion'));
  document.body.appendChild(toaster);
  toasters.set(position, toaster);
  return toaster;
}

function buildToast(options, variant) {
  const el = document.createElement('div');
  el.className = `cb-toast${variant !== 'default' ? ` cb-toast--${variant}` : ''}`;
  // los errores interrumpen al lector de pantalla, el resto espera su turno
  el.setAttribute('role', variant === 'danger' ? 'alert' : 'status');
  el.innerHTML = `${svg(ICONS[variant] || ICONS.default, 'cb-toast__icon')}<div class="cb-toast__body"></div>`;
  const body = el.querySelector('.cb-toast__body');

  if (options.title) {
    const title = document.createElement('p');
    title.className = 'cb-toast__title';
    title.textContent = options.title;
    body.appendChild(title);
  }
  if (options.message) {
    const message = document.createElement('p');
    message.className = 'cb-toast__message';
    message.textContent = options.message;
    body.appendChild(message);
  }
  return { el, body };
}

/**
 * Muestra una notificacion.
 * @param {object | string} options texto o configuracion
 * @param {string} [options.title]
 * @param {string} [options.message]
 * @param {'default' | 'info' | 'success' | 'warning' | 'danger'} [options.variant]
 * @param {number} [options.duration] milisegundos, 0 para que no se cierre sola
 * @param {{ label: string, onClick?: (event: Event) => void }} [options.action]
 * @param {boolean} [options.dismissible]
 * @param {'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'} [options.position]
 * @param {string} [options.closeLabel] aria-label del boton de cerrar
 * @returns {{ el: HTMLElement, close: () => void }}
 */
export function toast(options = {}) {
  const config = typeof options === 'string' ? { message: options } : options;
  const variant = config.variant || 'default';
  const duration = config.duration ?? 5000;
  const toaster = getToaster(config.position || 'bottom-right');
  const { el, body } = buildToast(config, variant);
  let timer = 0;
  let remaining = duration;
  let startedAt = 0;

  function close() {
    clearTimeout(timer);
    if (!el.isConnected) return;
    el.classList.remove('is-visible');
    emit(el, 'close');
    setTimeout(() => el.remove(), 220);
  }

  function start() {
    if (!remaining) return;
    startedAt = Date.now();
    timer = setTimeout(close, remaining);
  }

  function pause() {
    if (!remaining) return;
    clearTimeout(timer);
    remaining = Math.max(0, remaining - (Date.now() - startedAt));
  }

  if (config.action?.label) {
    const action = document.createElement('button');
    action.type = 'button';
    action.className = 'cb-toast__action';
    action.textContent = config.action.label;
    action.addEventListener('click', (event) => {
      config.action.onClick?.(event);
      close();
    });
    body.appendChild(action);
  }

  if (config.dismissible !== false) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'cb-toast__close';
    button.setAttribute('aria-label', config.closeLabel || message('toastClose'));
    button.innerHTML = svg(CLOSE_ICON, '');
    button.addEventListener('click', close);
    el.appendChild(button);
  }

  el.addEventListener('mouseenter', pause);
  el.addEventListener('mouseleave', start);
  el.addEventListener('focusin', pause);
  el.addEventListener('focusout', start);

  toaster.appendChild(el);
  requestAnimationFrame(() => el.classList.add('is-visible'));
  start();
  emit(el, 'open', { options: config });
  return { el, close };
}

/**
 * Conecta botones con data-cb-toast='{"title": "..."}' para lanzar toasts sin escribir JS.
 * @param {ParentNode} [root]
 */
export function init(root = document) {
  queryAll(root, '[data-cb-toast]').forEach((button) => {
    if (!bind(button, 'toast')) return;
    button.addEventListener('click', () => {
      const raw = button.getAttribute('data-cb-toast');
      try {
        toast(raw.trim().startsWith('{') ? JSON.parse(raw) : { message: raw });
      } catch {
        toast({ message: raw });
      }
    });
  });
}

export default { init, toast };
