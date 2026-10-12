import { bind, queryAll } from '../core.js';

let observer = null;

function getObserver() {
  if (observer) return observer;
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.classList.add('is-in');
        observer.unobserve(el);
        // el retraso solo sirve para la entrada, si se queda hace lentos los hover
        el.addEventListener('transitionend', () => (el.style.transitionDelay = ''), { once: true });
      });
    },
    { threshold: 0.12 }
  );
  return observer;
}

/**
 * Anima la entrada de los .cb-reveal cuando aparecen en pantalla.
 * El retraso se escalona en grupos de seis, igual que en el diseno original.
 * @param {ParentNode} [root]
 */
export function init(root = document) {
  const elements = queryAll(root, '.cb-reveal').filter((el) => bind(el, 'reveal'));
  if (!('IntersectionObserver' in window)) {
    elements.forEach((el) => el.classList.add('is-in'));
    return;
  }
  elements.forEach((el, index) => {
    if (!el.style.transitionDelay) {
      el.style.transitionDelay = `calc(var(--cb-reveal-step) * ${index % 6})`;
    }
    getObserver().observe(el);
  });
}

export default { init };
