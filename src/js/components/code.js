import { bind, emit, focusableWhenScrollable, queryAll, resolveTarget } from '../core.js';

const RESET_DELAY = 1600;

async function writeClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }
  // sin https ni localhost no hay API de portapapeles, se usa el metodo viejo
  const area = document.createElement('textarea');
  area.value = text;
  area.setAttribute('readonly', '');
  area.style.position = 'fixed';
  area.style.opacity = '0';
  document.body.appendChild(area);
  area.select();
  document.execCommand('copy');
  area.remove();
}

function sourceFor(button) {
  const ref = button.getAttribute('data-cb-copy');
  if (ref) {
    const target = resolveTarget(ref);
    if (target) return target;
    return { textContent: ref };
  }
  return button.closest('.cb-code')?.querySelector('pre, code');
}

function setLabel(button, text) {
  const label = button.querySelector('[data-cb-copy-label]');
  if (label) label.textContent = text;
}

/**
 * Conecta los botones [data-cb-copy]. Sin valor copian el bloque .cb-code donde estan;
 * con un id o selector copian ese elemento; con cualquier otro texto copian el texto.
 * @param {ParentNode} [root]
 */
export function init(root = document) {
  queryAll(root, '.cb-code__pre').forEach((pre) => {
    if (bind(pre, 'code-scroll')) focusableWhenScrollable(pre);
  });
  queryAll(root, '[data-cb-copy]').forEach((button) => {
    if (!bind(button, 'copy')) return;
    const label = button.querySelector('[data-cb-copy-label]');
    const original = label?.textContent || '';
    let timer = 0;

    button.addEventListener('click', async () => {
      const source = sourceFor(button);
      if (!source) return;
      const text = 'value' in source ? source.value : source.textContent;
      try {
        await writeClipboard(text.replace(/\n$/, ''));
      } catch {
        setLabel(button, 'Error');
        return;
      }
      clearTimeout(timer);
      button.classList.add('is-copied');
      setLabel(button, button.getAttribute('data-cb-copy-done') || 'Copiado');
      emit(button, 'copy', { text });
      timer = setTimeout(() => {
        button.classList.remove('is-copied');
        setLabel(button, original);
      }, RESET_DELAY);
    });
  });
}

export default { init };
