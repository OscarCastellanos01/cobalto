(function () {
  const STORAGE_KEY = 'cb-docs-lang';
  const BASE_LANG = 'es';
  const root = document.documentElement;
  const basePath = root.getAttribute('data-i18n-base') || '';
  const available = (root.getAttribute('data-i18n-available') || BASE_LANG).split(',');
  const originals = new WeakMap();
  const cache = {};
  let current = BASE_LANG;
  let originalItems = null;

  function storageGet() {
    try {
      return window.localStorage.getItem(STORAGE_KEY);
    } catch {
      return null;
    }
  }

  function storageSet(value) {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      return false;
    }
    return true;
  }

  function lookup(dictionary, key) {
    if (!dictionary) return undefined;
    return key
      .split('.')
      .reduce((node, part) => (node == null ? undefined : node[part]), dictionary);
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function inline(text) {
    return escapeHtml(text)
      .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-cb-text">$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>')
      .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a class="cb-link" href="$2">$1</a>')
      .replace(/\n/g, '<br>');
  }

  function fill(text, vars) {
    return text.replace(/\{(\w+)\}/g, (match, name) => (name in vars ? String(vars[name]) : match));
  }

  // mismo formato que docs/src/i18n.mjs; si cambia alla, hay que cambiarlo aqui
  function format(text, vars) {
    return fill(text, vars)
      .split(/(`[^`]+`)/)
      .map((part) =>
        part.startsWith('`') && part.endsWith('`') && part.length > 1
          ? `<code>${escapeHtml(part.slice(1, -1))}</code>`
          : inline(part)
      )
      .join('');
  }

  function plain(text, vars) {
    return fill(text, vars).replace(/[`*]/g, '');
  }

  function translated(dictionary, key) {
    const value = lookup(dictionary, key);
    return typeof value === 'string' && value ? value : null;
  }

  function remember(el) {
    if (originals.has(el)) return originals.get(el);
    const saved = { html: el.innerHTML, attrs: {} };
    originals.set(el, saved);
    return saved;
  }

  function parseVars(el) {
    try {
      return JSON.parse(el.getAttribute('data-i18n-vars') || '{}');
    } catch {
      return {};
    }
  }

  function applyText(dictionary) {
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const saved = remember(el);
      const value = translated(dictionary, el.getAttribute('data-i18n'));
      el.innerHTML = value ? format(value, parseVars(el)) : saved.html;
    });
  }

  function applyAttributes(dictionary) {
    document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
      const saved = remember(el);
      el.getAttribute('data-i18n-attr')
        .split(';')
        .forEach((pair) => {
          const [name, key] = pair.split(':');
          if (!(name in saved.attrs)) saved.attrs[name] = el.getAttribute(name);
          const value = translated(dictionary, key);
          el.setAttribute(name, value ? plain(value, {}) : saved.attrs[name]);
        });
    });
  }

  function applyTitle(dictionary) {
    const title = document.querySelector('title[data-i18n-title]');
    if (!title) return;
    const saved = remember(title);
    const value = translated(dictionary, title.getAttribute('data-i18n-title'));
    title.textContent = value
      ? `${plain(value, {})}${saved.html.includes(' · Cobalto') ? ' · Cobalto' : ''}`
      : saved.html;
  }

  function applySearch(dictionary) {
    const palette = document.getElementById('docs-search');
    const source = palette?.querySelector('script[data-cb-command-items]');
    if (!source || !window.cobalto) return;
    if (!originalItems) originalItems = JSON.parse(source.textContent);
    const items = originalItems.map((item) => ({
      ...item,
      label: plain(translated(dictionary, item.key) || item.label, {}),
      group: plain(translated(dictionary, item.groupKey) || item.group, {}),
    }));
    window.cobalto.components.command.setItems(palette, items);
  }

  function syncControls() {
    document.querySelectorAll('[data-docs-lang]').forEach((control) => {
      const lang = control.getAttribute('data-docs-lang');
      const isAvailable = available.includes(lang);
      const isCurrent = lang === current;
      if (control.getAttribute('role') === 'menuitemradio') {
        control.setAttribute('aria-checked', String(isCurrent));
        if (isAvailable) control.removeAttribute('aria-disabled');
        else control.setAttribute('aria-disabled', 'true');
      } else {
        control.setAttribute('aria-pressed', String(isCurrent));
        control.disabled = !isAvailable;
      }
      control.querySelectorAll('[data-docs-soon]').forEach((tag) => (tag.hidden = isAvailable));
    });
  }

  async function load(lang) {
    if (lang === BASE_LANG) return null;
    if (cache[lang]) return cache[lang];
    const response = await fetch(`${basePath}i18n/${lang}.json`);
    if (!response.ok) throw new Error(`no se pudo cargar ${lang}.json`);
    cache[lang] = await response.json();
    return cache[lang];
  }

  async function setLanguage(lang) {
    if (!available.includes(lang)) return;
    let dictionary = null;
    try {
      dictionary = await load(lang);
    } catch {
      lang = BASE_LANG;
    }
    current = lang;
    applyText(dictionary);
    applyAttributes(dictionary);
    applyTitle(dictionary);
    applySearch(dictionary);
    root.setAttribute('lang', lang);
    storageSet(lang);
    syncControls();
    document.dispatchEvent(new CustomEvent('cb:lang', { detail: { lang } }));
  }

  function start() {
    syncControls();
    document.addEventListener('click', (event) => {
      const control = event.target.closest('[data-docs-lang]');
      if (!control || control.getAttribute('aria-disabled') === 'true' || control.disabled) return;
      setLanguage(control.getAttribute('data-docs-lang'));
    });
    const saved = storageGet();
    if (saved && saved !== BASE_LANG && available.includes(saved)) setLanguage(saved);
  }

  window.cobaltoDocsI18n = {
    setLanguage,
    available,
    get current() {
      return current;
    },
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
