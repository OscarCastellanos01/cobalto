(function () {
  const BASE = {
    dark: {
      bg: ['#08080a', 6],
      'bg-2': ['#0f0f12', 8],
      'bg-3': ['#16161a', 10],
      line: ['#212126', 14],
      'line-2': ['#2e2e35', 18],
      text: ['#ededef', 4],
      muted: ['#a1a1aa', 14],
      dim: ['#8a8a94', 14],
    },
    light: {
      bg: ['#f7f7f8', 4],
      'bg-2': ['#efeff1', 6],
      'bg-3': ['#e4e4e7', 9],
      line: ['#d8d8dc', 12],
      'line-2': ['#c4c4ca', 16],
      text: ['#0f0f12', 10],
      muted: ['#52525b', 18],
      dim: ['#5e5e68', 18],
    },
  };
  const DEFAULT_NEUTRALS = {
    dark: { bg: '#060b18', 'bg-2': '#0b1326', 'bg-3': '#111c35', text: '#e8eeff', dim: '#6f7fab' },
    light: { bg: '#f3f6fd', 'bg-2': '#e9eefa', 'bg-3': '#dde5f6', text: '#0a1430', dim: '#5c6a8d' },
  };
  const WHITE = '#ffffff';
  const AA = 4.5;

  function hexToRgb(hex) {
    const clean = hex.replace('#', '');
    const full = clean.length === 3 ? clean.replace(/./g, '$&$&') : clean;
    return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16) / 255);
  }

  function rgbToHex(rgb) {
    return `#${rgb
      .map((c) =>
        Math.round(Math.min(1, Math.max(0, c)) * 255)
          .toString(16)
          .padStart(2, '0')
      )
      .join('')}`;
  }

  function toLinear(c) {
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  }

  function fromLinear(c) {
    return c <= 0.0031308 ? c * 12.92 : 1.055 * c ** (1 / 2.4) - 0.055;
  }

  function toOklab(hex) {
    const [r, g, b] = hexToRgb(hex).map(toLinear);
    const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
    const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
    const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
    return [
      0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
      1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
      0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
    ];
  }

  function fromOklab([L, a, b]) {
    const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
    const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
    const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
    const rgb = [
      4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
      -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
      -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
    ];
    return rgbToHex(rgb.map((c) => fromLinear(Math.min(1, Math.max(0, c)))));
  }

  function mix(colorA, colorB, weightA) {
    const a = toOklab(colorA);
    const b = toOklab(colorB);
    return fromOklab(a.map((v, i) => v * weightA + b[i] * (1 - weightA)));
  }

  function luminance(hex) {
    const [r, g, b] = hexToRgb(hex).map(toLinear);
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }

  function contrast(a, b) {
    const [x, y] = [luminance(a), luminance(b)].sort((p, q) => q - p);
    return (x + 0.05) / (y + 0.05);
  }

  // mueve el color hacia blanco o negro hasta que tenga contraste con todos los fondos
  function ensureContrast(color, backgrounds, towards) {
    let result = color;
    for (let step = 0; step <= 40; step += 1) {
      if (backgrounds.every((bg) => contrast(result, bg) >= AA + 0.1)) return result;
      result = mix(color, towards, 1 - step * 0.025);
    }
    return result;
  }

  function neutrals(accent, mode, tinted) {
    if (!tinted) return null;
    const values = {};
    Object.entries(BASE[mode]).forEach(([name, [base, amount]]) => {
      values[name] = mix(accent, base, amount / 100);
    });
    return values;
  }

  function buildTheme(input, tinted) {
    const theme = {};
    ['dark', 'light'].forEach((mode) => {
      const n = neutrals(input, mode, tinted) || DEFAULT_NEUTRALS[mode];
      const towards = mode === 'dark' ? WHITE : '#000000';
      const accent = ensureContrast(input, [n.bg, n['bg-2'], n['bg-3']], towards);
      // en oscuro el relleno se oscurece igual que en tokens.css
      const fill = mode === 'dark' ? mix(accent, '#000000', 0.86) : accent;
      const ink = contrast(WHITE, fill) >= AA ? WHITE : n.bg;
      theme[mode] = { neutrals: tinted ? n : null, accent, ink, fill, base: n };
    });
    return theme;
  }

  function cssFor(theme) {
    const lines = [':root {'];
    ['dark', 'light'].forEach((mode, index) => {
      const t = theme[mode];
      if (index) lines.push('');
      if (t.neutrals) {
        Object.entries(t.neutrals).forEach(([name, value]) =>
          lines.push(`  --cb-${mode}-${name}: ${value};`)
        );
      }
      lines.push(`  --cb-${mode}-accent: ${t.accent};`);
      lines.push(`  --cb-${mode}-accent-ink: ${t.ink};`);
    });
    lines.push('}');
    return lines.join('\n');
  }

  function variablesFor(theme) {
    const vars = {};
    ['dark', 'light'].forEach((mode) => {
      const t = theme[mode];
      vars[`--cb-${mode}-accent`] = t.accent;
      vars[`--cb-${mode}-accent-ink`] = t.ink;
      Object.keys(BASE[mode]).forEach((name) => {
        vars[`--cb-${mode}-${name}`] = t.neutrals ? t.neutrals[name] : '';
      });
    });
    return vars;
  }

  // las etiquetas de las filas vienen del HTML traducido, aqui solo van los numeros
  const CHECKS = [
    (t) => contrast(t.base.text, t.base.bg),
    (t) => contrast(t.base.dim, t.base['bg-2']),
    (t) => contrast(t.accent, t.base['bg-3']),
    (t) => contrast(t.ink, t.fill),
  ];

  function ratioTag(value) {
    const ok = value >= AA;
    const tone = ok ? 'cb-tag--success' : 'cb-tag--danger';
    return `<span class="cb-tag ${tone}">${value.toFixed(1)}:1 ${ok ? '✓' : '✗'}</span>`;
  }

  function fillContrast(table, theme) {
    table.querySelectorAll('[data-cz-row]').forEach((row) => {
      const check = CHECKS[Number(row.getAttribute('data-cz-row'))];
      row.querySelector('[data-cz-dark]').innerHTML = ratioTag(check(theme.dark));
      row.querySelector('[data-cz-light]').innerHTML = ratioTag(check(theme.light));
    });
  }

  function setupCustomizer(root) {
    const picker = root.querySelector('#cz-color');
    const hex = root.querySelector('#cz-hex');
    const tint = root.querySelector('#cz-tint');
    const output = document.getElementById('cz-output');
    const table = document.getElementById('cz-contrast');
    const reset = root.querySelector('#cz-reset');
    const html = document.documentElement;
    let active = false;

    function render(apply) {
      const value = /^#[0-9a-f]{6}$/i.test(hex.value) ? hex.value : picker.value;
      const theme = buildTheme(value, tint.checked);
      output.textContent = cssFor(theme);
      fillContrast(table, theme);
      if (!apply) return;
      active = true;
      // el estilo inline gana sobre data-cb-accent, por eso se limpia el tema guardado
      if (html.hasAttribute('data-cb-accent')) window.cobalto?.theme.setAccent('cobalto');
      Object.entries(variablesFor(theme)).forEach(([name, val]) => {
        if (val) html.style.setProperty(name, val);
        else html.style.removeProperty(name);
      });
    }

    function clear() {
      active = false;
      Array.from(html.style)
        .filter((name) => name.startsWith('--cb-'))
        .forEach((name) => html.style.removeProperty(name));
    }

    picker.addEventListener('input', () => {
      hex.value = picker.value;
      render(true);
    });
    hex.addEventListener('input', () => {
      if (!/^#[0-9a-f]{6}$/i.test(hex.value)) return;
      picker.value = hex.value;
      render(true);
    });
    tint.addEventListener('change', () => render(true));
    reset.addEventListener('click', () => {
      clear();
      picker.value = '#3b82f6';
      hex.value = '#3b82f6';
      tint.checked = false;
      render(false);
    });
    document.addEventListener('cb:accent', (event) => {
      if (active && event.detail.accent !== 'cobalto') {
        clear();
        render(false);
      }
    });
    render(false);
  }

  function start() {
    const customizer = document.querySelector('[data-docs-customizer]');
    if (customizer) setupCustomizer(customizer);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
