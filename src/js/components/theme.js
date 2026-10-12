import { bind, queryAll, theme } from '../core.js';

let documentListening = false;

function syncControls() {
  const resolved = theme.resolved();
  const current = theme.get();
  const accent = theme.getAccent();
  document.querySelectorAll('[data-cb-theme-toggle]').forEach((button) => {
    button.setAttribute('aria-pressed', String(resolved === 'light'));
  });
  document.querySelectorAll('[data-cb-theme-set]').forEach((button) => {
    button.setAttribute(
      'aria-pressed',
      String(button.getAttribute('data-cb-theme-set') === current)
    );
  });
  document.querySelectorAll('[data-cb-accent-set]').forEach((button) => {
    button.setAttribute(
      'aria-pressed',
      String(button.getAttribute('data-cb-accent-set') === accent)
    );
  });
}

function listenDocument() {
  if (documentListening) return;
  documentListening = true;
  document.addEventListener('cb:theme', syncControls);
  document.addEventListener('cb:accent', syncControls);
  window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', syncControls);
}

/**
 * Conecta botones con data-cb-theme-toggle, data-cb-theme-set y data-cb-accent-set.
 * @param {ParentNode} [root]
 */
export function init(root = document) {
  listenDocument();
  queryAll(root, '[data-cb-theme-toggle]').forEach((button) => {
    if (!bind(button, 'theme-toggle')) return;
    button.addEventListener('click', () => theme.toggle());
  });
  queryAll(root, '[data-cb-theme-set]').forEach((button) => {
    if (!bind(button, 'theme-set')) return;
    button.addEventListener('click', () => theme.set(button.getAttribute('data-cb-theme-set')));
  });
  queryAll(root, '[data-cb-accent-set]').forEach((button) => {
    if (!bind(button, 'accent-set')) return;
    button.addEventListener('click', () =>
      theme.setAccent(button.getAttribute('data-cb-accent-set'))
    );
  });
  syncControls();
}

export { theme };
export default { init, theme };
