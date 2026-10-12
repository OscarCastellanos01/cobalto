import { bind, emit, ensureId, queryAll } from '../core.js';

function createInstance(el) {
  const list = el.querySelector(':scope > [role="tablist"], :scope > .cb-tabs__list');
  if (!list) return null;
  const tabs = Array.from(list.querySelectorAll('[role="tab"], .cb-tabs__tab'));
  const panels = Array.from(
    el.querySelectorAll(':scope > [role="tabpanel"], :scope > .cb-tabs__panel')
  );
  const manual = el.hasAttribute('data-cb-tabs-manual');

  list.setAttribute('role', 'tablist');
  tabs.forEach((tab, index) => {
    const panel = panels[index];
    tab.setAttribute('role', 'tab');
    if (tab.tagName === 'BUTTON') tab.setAttribute('type', 'button');
    if (!panel) return;
    panel.setAttribute('role', 'tabpanel');
    tab.setAttribute('aria-controls', ensureId(panel, 'cb-tabpanel'));
    panel.setAttribute('aria-labelledby', ensureId(tab, 'cb-tab'));
  });

  function enabledTabs() {
    return tabs.filter((tab) => !tab.disabled && tab.getAttribute('aria-disabled') !== 'true');
  }

  function select(index, { focus = false, silent = false } = {}) {
    const tab = tabs[index];
    if (!tab) return;
    tabs.forEach((item, i) => {
      const selected = i === index;
      item.setAttribute('aria-selected', String(selected));
      item.setAttribute('tabindex', selected ? '0' : '-1');
      if (panels[i]) panels[i].hidden = !selected;
    });
    if (
      panels[index] &&
      !panels[index].querySelector('[tabindex], a, button, input, select, textarea')
    ) {
      panels[index].setAttribute('tabindex', '0');
    }
    if (focus) tab.focus();
    if (!silent) emit(el, 'change', { index, tab, panel: panels[index] });
  }

  function move(from, step) {
    const enabled = enabledTabs();
    const position = enabled.indexOf(tabs[from]);
    const next = enabled[(position + step + enabled.length) % enabled.length];
    return tabs.indexOf(next);
  }

  list.addEventListener('click', (event) => {
    const tab = event.target.closest('[role="tab"]');
    if (!tab || !tabs.includes(tab)) return;
    select(tabs.indexOf(tab));
  });

  list.addEventListener('keydown', (event) => {
    const current = tabs.indexOf(document.activeElement);
    if (current === -1) return;
    const keys = {
      ArrowRight: () => move(current, 1),
      ArrowLeft: () => move(current, -1),
      Home: () => tabs.indexOf(enabledTabs()[0]),
      End: () => tabs.indexOf(enabledTabs().at(-1)),
    };
    if (keys[event.key]) {
      event.preventDefault();
      const next = keys[event.key]();
      if (manual) tabs[next].focus();
      else select(next, { focus: true });
    } else if (manual && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      select(current);
    }
  });

  const initial = tabs.findIndex((tab) => tab.getAttribute('aria-selected') === 'true');
  select(initial === -1 ? 0 : initial, { silent: true });

  return { el, select };
}

/**
 * Inicializa los [data-cb-tabs].
 * @param {ParentNode} [root]
 */
export function init(root = document) {
  queryAll(root, '[data-cb-tabs]').forEach((el) => {
    if (!bind(el, 'tabs')) return;
    const instance = createInstance(el);
    if (instance) el.cbTabs = instance;
  });
}

export default { init };
