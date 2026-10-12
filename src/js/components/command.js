import {
  bind,
  emit,
  ensureId,
  escapeHtml,
  lockScroll,
  message,
  pushLayer,
  queryAll,
  resolveTarget,
  trapFocus,
  unlockScroll,
} from '../core.js';

const instances = new Set();
let hotkeyListening = false;

function normalize(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim();
}

function isMac() {
  const platform = navigator.userAgentData?.platform || navigator.platform || '';
  return /mac|iphone|ipad/i.test(platform);
}

function readItems(el) {
  const source = el.querySelector('script[data-cb-command-items]');
  if (!source) return [];
  try {
    return JSON.parse(source.textContent);
  } catch {
    return [];
  }
}

function matches(item, query) {
  if (!query) return true;
  const haystack = normalize(`${item.label} ${item.group || ''} ${item.keywords || ''}`);
  return query.split(/\s+/).every((word) => haystack.includes(word));
}

function listenHotkey() {
  if (hotkeyListening) return;
  hotkeyListening = true;
  document.addEventListener('keydown', (event) => {
    if (!(event.metaKey || event.ctrlKey) || event.altKey) return;
    instances.forEach((instance) => {
      if (event.key.toLowerCase() !== instance.hotkey) return;
      event.preventDefault();
      instance.toggle();
    });
  });
}

function createInstance(el) {
  const panel = el.querySelector('.cb-command__panel') || el.firstElementChild;
  const input = el.querySelector('[data-cb-command-input]') || el.querySelector('input');
  const results =
    el.querySelector('[data-cb-command-results]') || el.querySelector('.cb-command__results');
  if (!panel || !input || !results) return null;

  const listId = ensureId(results, 'cb-command-list');
  let items = readItems(el);
  let shown = [];
  let active = 0;
  let release = null;
  let removeLayer = null;

  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-modal', 'true');
  results.setAttribute('role', 'listbox');
  input.setAttribute('role', 'combobox');
  input.setAttribute('aria-controls', listId);
  input.setAttribute('aria-expanded', 'true');
  input.setAttribute('aria-autocomplete', 'list');
  input.setAttribute('autocomplete', 'off');
  input.setAttribute('spellcheck', 'false');

  function optionId(index) {
    return `${listId}-${index}`;
  }

  function renderEmpty() {
    results.innerHTML = `<div class="cb-command__empty" role="presentation">${escapeHtml(message('commandEmpty', { el, attr: 'data-cb-command-empty' }))} “${escapeHtml(input.value)}”</div>`;
    input.removeAttribute('aria-activedescendant');
  }

  function renderOption(item, index) {
    const selected = index === active;
    const tag = item.href ? 'a' : 'div';
    const href = item.href ? ` href="${escapeHtml(item.href)}"` : '';
    const hint = escapeHtml(item.hint || '↵');
    return `<${tag}${href} id="${optionId(index)}" role="option" tabindex="-1" data-index="${index}" aria-selected="${selected}" class="cb-command__item${selected ? ' is-active' : ''}">${escapeHtml(item.label)}<small class="cb-command__hint" aria-hidden="true">${hint}</small></${tag}>`;
  }

  function render() {
    const query = normalize(input.value);
    shown = items.filter((item) => matches(item, query));
    if (!shown.length) {
      renderEmpty();
      return;
    }
    active = Math.min(active, shown.length - 1);
    let html = '';
    let lastGroup = null;
    shown.forEach((item, index) => {
      if (item.group && item.group !== lastGroup) {
        html += `<div class="cb-command__group" role="presentation">${escapeHtml(item.group)}</div>`;
        lastGroup = item.group;
      }
      html += renderOption(item, index);
    });
    results.innerHTML = html;
    input.setAttribute('aria-activedescendant', optionId(active));
  }

  function setActive(index) {
    if (!shown.length) return;
    active = (index + shown.length) % shown.length;
    results.querySelectorAll('[role="option"]').forEach((option) => {
      const selected = Number(option.dataset.index) === active;
      option.classList.toggle('is-active', selected);
      option.setAttribute('aria-selected', String(selected));
      if (selected) option.scrollIntoView({ block: 'nearest' });
    });
    input.setAttribute('aria-activedescendant', optionId(active));
  }

  function select(index) {
    const item = shown[index];
    if (!item) return;
    const event = emit(el, 'select', { item });
    close();
    if (event.defaultPrevented || !item.href) return;
    if (item.href.startsWith('#')) window.location.hash = item.href;
    else window.location.assign(item.href);
  }

  function isOpen() {
    return el.classList.contains('is-open');
  }

  function open() {
    if (isOpen() || emit(el, 'open').defaultPrevented) return;
    el.classList.add('is-open');
    input.value = '';
    active = 0;
    render();
    lockScroll();
    release = trapFocus(panel, { initialFocus: input });
    removeLayer = pushLayer(close);
  }

  function close() {
    if (!isOpen()) return;
    el.classList.remove('is-open');
    unlockScroll();
    if (removeLayer) removeLayer();
    if (release) release();
    removeLayer = null;
    release = null;
    emit(el, 'close');
  }

  function toggle() {
    if (isOpen()) close();
    else open();
  }

  function setItems(next) {
    items = Array.isArray(next) ? next : [];
    if (isOpen()) render();
  }

  input.addEventListener('input', () => {
    active = 0;
    render();
  });

  input.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActive(active + 1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActive(active - 1);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      select(active);
    }
  });

  results.addEventListener('mousemove', (event) => {
    const option = event.target.closest('[role="option"]');
    if (option && Number(option.dataset.index) !== active) setActive(Number(option.dataset.index));
  });

  results.addEventListener('click', (event) => {
    const option = event.target.closest('[role="option"]');
    if (!option) return;
    event.preventDefault();
    select(Number(option.dataset.index));
  });

  el.addEventListener('mousedown', (event) => {
    if (event.target === el) close();
  });

  const hotkey = el.hasAttribute('data-cb-command-hotkey')
    ? (el.getAttribute('data-cb-command-hotkey') || 'k').toLowerCase()
    : null;

  return { el, hotkey, open, close, toggle, isOpen, setItems };
}

function labelModifierKeys(root) {
  const label = isMac() ? '⌘' : 'Ctrl ';
  queryAll(root, '[data-cb-kbd-mod]').forEach((el) => {
    el.textContent = `${label}${el.getAttribute('data-cb-kbd-mod') || ''}`;
  });
}

/**
 * Inicializa las paletas [data-cb-command] y los botones [data-cb-command-open].
 * @param {ParentNode} [root]
 */
export function init(root = document) {
  listenHotkey();
  queryAll(root, '[data-cb-command]').forEach((el) => {
    if (!bind(el, 'command')) return;
    const instance = createInstance(el);
    if (!instance) return;
    el.cbCommand = instance;
    instances.add(instance);
  });
  queryAll(root, '[data-cb-command-open]').forEach((button) => {
    if (!bind(button, 'command-open')) return;
    button.addEventListener('click', () => {
      const target = resolveTarget(button.getAttribute('data-cb-command-open'));
      const command = target?.cbCommand || instances.values().next().value;
      command?.open();
    });
  });
  instances.forEach((instance) => {
    if (!instance.el.isConnected) instances.delete(instance);
  });
  labelModifierKeys(root);
}

/**
 * Cambia la lista de resultados de una paleta.
 * @param {HTMLElement | string} target elemento o id
 * @param {Array<{label: string, href?: string, group?: string, keywords?: string, hint?: string}>} items
 */
export function setItems(target, items) {
  const el = typeof target === 'string' ? resolveTarget(target) : target;
  el?.cbCommand?.setItems(items);
}

export default { init, setItems };
