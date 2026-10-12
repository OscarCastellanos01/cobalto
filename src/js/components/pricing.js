import { bind, emit, queryAll } from '../core.js';

function applyPeriod(el, period) {
  el.querySelectorAll('[data-cb-billing]').forEach((button) => {
    button.setAttribute('aria-pressed', String(button.getAttribute('data-cb-billing') === period));
  });
  el.querySelectorAll(`[data-cb-price-${period}]`).forEach((price) => {
    price.textContent = price.getAttribute(`data-cb-price-${period}`);
  });
  el.querySelectorAll('[data-cb-billing-show]').forEach((node) => {
    node.hidden = node.getAttribute('data-cb-billing-show') !== period;
  });
}

/**
 * Inicializa [data-cb-pricing]: los botones [data-cb-billing="monthly|yearly"]
 * cambian los precios marcados con data-cb-price-monthly y data-cb-price-yearly.
 * @param {ParentNode} [root]
 */
export function init(root = document) {
  queryAll(root, '[data-cb-pricing]').forEach((el) => {
    if (!bind(el, 'pricing')) return;
    const buttons = Array.from(el.querySelectorAll('[data-cb-billing]'));
    const initial = buttons.find((b) => b.getAttribute('aria-pressed') === 'true') || buttons[0];
    if (initial) applyPeriod(el, initial.getAttribute('data-cb-billing'));
    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const period = button.getAttribute('data-cb-billing');
        applyPeriod(el, period);
        emit(el, 'change', { period });
      });
    });
  });
}

export default { init };
