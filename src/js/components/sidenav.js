import { bind, emit, queryAll } from '../core.js';

function setActive(links, active) {
  links.forEach((link) => {
    const isActive = link === active;
    link.classList.toggle('is-active', isActive);
    if (isActive) link.setAttribute('aria-current', 'true');
    else if (link.getAttribute('aria-current') === 'true') link.removeAttribute('aria-current');
  });
}

function watchSections(nav) {
  const links = Array.from(nav.querySelectorAll('a[href^="#"]')).filter(
    (link) => link.getAttribute('href').length > 1
  );
  const targets = links
    .map((link) => document.getElementById(decodeURIComponent(link.hash.slice(1))))
    .filter(Boolean);
  if (!targets.length) return;

  const visible = new Set();
  // el margen superior deja fuera lo que queda tapado por la navbar fija
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      });
      const first = targets.find((target) => visible.has(target));
      if (!first) return;
      const link = links.find((item) => item.hash === `#${first.id}`);
      setActive(links, link);
      emit(nav, 'change', { id: first.id });
    },
    { rootMargin: '-80px 0px -60% 0px' }
  );
  targets.forEach((target) => observer.observe(target));
}

/**
 * Marca el enlace activo en [data-cb-scrollspy] y navega con [data-cb-version-select].
 * @param {ParentNode} [root]
 */
export function init(root = document) {
  if ('IntersectionObserver' in window) {
    queryAll(root, '[data-cb-scrollspy]').forEach((nav) => {
      if (bind(nav, 'scrollspy')) watchSections(nav);
    });
  }
  queryAll(root, '[data-cb-version-select]').forEach((select) => {
    if (!bind(select, 'version-select')) return;
    select.addEventListener('change', () => {
      if (emit(select, 'change', { value: select.value }).defaultPrevented) return;
      if (select.value) window.location.assign(select.value);
    });
  });
}

export default { init };
