import { bind, canHover, pushLayer, queryAll } from '../core.js';

const GAP = 8;
const EDGE = 8;
const SHOW_DELAY = 120;
let tooltip = null;
let current = null;
let showTimer = 0;
let removeLayer = null;

function getTooltip() {
  if (tooltip?.isConnected) return tooltip;
  tooltip = document.createElement('div');
  tooltip.className = 'cb-tooltip';
  tooltip.id = 'cb-tooltip';
  tooltip.setAttribute('role', 'tooltip');
  document.body.appendChild(tooltip);
  return tooltip;
}

function fits(placement, rect, box) {
  if (placement === 'top') return rect.top - box.height - GAP >= EDGE;
  if (placement === 'bottom') return rect.bottom + box.height + GAP <= window.innerHeight - EDGE;
  if (placement === 'left') return rect.left - box.width - GAP >= EDGE;
  return rect.right + box.width + GAP <= window.innerWidth - EDGE;
}

function coordinates(placement, rect, box) {
  const centerX = rect.left + rect.width / 2 - box.width / 2;
  const centerY = rect.top + rect.height / 2 - box.height / 2;
  if (placement === 'top') return { x: centerX, y: rect.top - box.height - GAP };
  if (placement === 'bottom') return { x: centerX, y: rect.bottom + GAP };
  if (placement === 'left') return { x: rect.left - box.width - GAP, y: centerY };
  return { x: rect.right + GAP, y: centerY };
}

const OPPOSITE = { top: 'bottom', bottom: 'top', left: 'right', right: 'left' };

function position(trigger) {
  const el = getTooltip();
  const rect = trigger.getBoundingClientRect();
  const box = el.getBoundingClientRect();
  const preferred = trigger.getAttribute('data-cb-tooltip-placement') || 'top';
  const placement = fits(preferred, rect, box) ? preferred : OPPOSITE[preferred];
  const { x, y } = coordinates(placement, rect, box);
  const left = Math.min(Math.max(EDGE, x), window.innerWidth - box.width - EDGE);
  const top = Math.min(Math.max(EDGE, y), window.innerHeight - box.height - EDGE);
  el.style.transform = `translate(${Math.round(left)}px, ${Math.round(top)}px)`;
  el.dataset.placement = placement;
}

function show(trigger) {
  clearTimeout(showTimer);
  const el = getTooltip();
  current = trigger;
  el.textContent = trigger.getAttribute('data-cb-tooltip');
  trigger.setAttribute('aria-describedby', el.id);
  position(trigger);
  el.classList.add('is-visible');
  if (!removeLayer) removeLayer = pushLayer(hide);
}

function hide() {
  clearTimeout(showTimer);
  if (removeLayer) removeLayer();
  removeLayer = null;
  if (!current) return;
  current.removeAttribute('aria-describedby');
  getTooltip().classList.remove('is-visible');
  current = null;
}

/**
 * Inicializa los elementos con data-cb-tooltip="texto".
 * Se muestra con hover y con foco, y se cierra con Esc.
 * @param {ParentNode} [root]
 */
export function init(root = document) {
  queryAll(root, '[data-cb-tooltip]').forEach((trigger) => {
    if (!bind(trigger, 'tooltip')) return;
    trigger.addEventListener('mouseenter', () => {
      if (!canHover()) return;
      clearTimeout(showTimer);
      showTimer = setTimeout(() => show(trigger), SHOW_DELAY);
    });
    trigger.addEventListener('mouseleave', hide);
    trigger.addEventListener('focus', () => show(trigger));
    trigger.addEventListener('blur', hide);
  });
  window.addEventListener('scroll', hide, { passive: true, capture: true });
}

export default { init };
