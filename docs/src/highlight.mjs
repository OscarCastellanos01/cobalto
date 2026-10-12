export function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function dedent(source) {
  const lines = source.replace(/^\n+|\s+$/g, '').split('\n');
  const indents = lines.filter((line) => line.trim()).map((line) => line.match(/^ */)[0].length);
  const min = Math.min(...indents);
  return lines.map((line) => line.slice(min)).join('\n');
}

function wrap(className, text) {
  return `<span class="${className}">${text}</span>`;
}

function highlightAttributes(attrs) {
  return attrs.replace(
    /([\w:@.-]+)(=)(&quot;[\s\S]*?&quot;)/g,
    (_, name, eq, value) => `${wrap('cb-tok-attr', name)}${eq}${wrap('cb-tok-str', value)}`
  );
}

function highlightHtml(code) {
  return escapeHtml(code)
    .replace(/(&lt;!--[\s\S]*?--&gt;)/g, (match) => wrap('cb-tok-com', match))
    .replace(
      /(&lt;\/?)([\w-]+)([\s\S]*?)(\/?&gt;)/g,
      (_, open, tag, attrs, close) =>
        `${wrap('cb-tok-tag', open + tag)}${highlightAttributes(attrs)}${wrap('cb-tok-tag', close)}`
    );
}

// los tokens se marcan con caracteres de control para no resaltar dentro de lo ya resaltado
function highlightWith(code, rules) {
  const stash = [];
  let result = escapeHtml(code);
  rules.forEach(([pattern, className]) => {
    result = result.replace(pattern, (match) => {
      stash.push(wrap(className, match));
      return `\u0000${stash.length - 1}\u0001`;
    });
  });
  return result.replace(/\u0000(\d+)\u0001/g, (_, index) => stash[index]);
}

const RULES = {
  css: [
    [/\/\*[\s\S]*?\*\//g, 'cb-tok-com'],
    [/&quot;[^\n]*?&quot;/g, 'cb-tok-str'],
    [/@[\w-]+/g, 'cb-tok-key'],
    [/--[\w-]+(?=:)/g, 'cb-tok-attr'],
    [/[.#][\w-]+(?=[^{}\n]*\{)/g, 'cb-tok-tag'],
  ],
  js: [
    [/\/\/[^\n]*/g, 'cb-tok-com'],
    [/'[^'\n]*'|`[^`]*`|&quot;[^\n]*?&quot;/g, 'cb-tok-str'],
    [
      /\b(import|from|export|default|const|let|function|return|await|async|new|if|else)\b/g,
      'cb-tok-key',
    ],
  ],
  php: [
    [/\/\/[^\n]*/g, 'cb-tok-com'],
    [/'[^'\n]*'|&quot;[^\n]*?&quot;/g, 'cb-tok-str'],
    [/\$\w+/g, 'cb-tok-attr'],
    [/\b(function|return|fn|new|use|void)\b/g, 'cb-tok-key'],
  ],
  bash: [
    [/#[^\n]*/g, 'cb-tok-com'],
    [/'[^'\n]*'|&quot;[^\n]*?&quot;/g, 'cb-tok-str'],
    [/^(npm|npx|composer|php|php artisan)\b/gm, 'cb-tok-key'],
  ],
};

export function highlight(code, lang = 'html') {
  if (lang === 'html' || lang === 'blade') return highlightHtml(code);
  return RULES[lang] ? highlightWith(code, RULES[lang]) : escapeHtml(code);
}
