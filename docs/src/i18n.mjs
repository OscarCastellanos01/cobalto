import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const DIR = resolve('docs/i18n');
export const LOCALES = ['es', 'en'];

function load(lang) {
  return JSON.parse(readFileSync(resolve(DIR, `${lang}.json`), 'utf8'));
}

const es = load('es');

export function availableLocales() {
  return LOCALES.filter((lang) => lang === 'es' || load(lang).meta?.ready === true);
}

export function lookup(dictionary, key) {
  return key.split('.').reduce((node, part) => (node == null ? undefined : node[part]), dictionary);
}

/**
 * Texto en espanol de una clave. Falla si no existe, para que ningun texto
 * visible quede fuera de docs/i18n.
 */
export function t(key) {
  const value = lookup(es, key);
  if (typeof value !== 'string') throw new Error(`falta la clave i18n "${key}" en es.json`);
  return value;
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

// el mismo formato existe en docs/js/i18n.js; si cambia aqui, hay que cambiarlo alla
export function format(text, vars = {}) {
  const filled = text.replace(/\{(\w+)\}/g, (match, name) =>
    name in vars ? String(vars[name]) : match
  );
  return filled
    .split(/(`[^`]+`)/)
    .map((part) =>
      part.startsWith('`') && part.endsWith('`') && part.length > 1
        ? `<code>${escapeHtml(part.slice(1, -1))}</code>`
        : inline(part)
    )
    .join('');
}

export function plain(key, vars = {}) {
  return t(key)
    .replace(/\{(\w+)\}/g, (match, name) => (name in vars ? String(vars[name]) : match))
    .replace(/[`*]/g, '');
}

function varsAttr(vars) {
  return Object.keys(vars).length ? ` data-i18n-vars='${escapeHtml(JSON.stringify(vars))}'` : '';
}

/**
 * Elemento con texto traducible: <p class="x" data-i18n="clave">texto</p>
 */
export function tr(tag, key, attrs = '', vars = {}) {
  const space = attrs ? ` ${attrs}` : '';
  return `<${tag}${space} data-i18n="${key}"${varsAttr(vars)}>${format(t(key), vars)}</${tag}>`;
}

/**
 * Atributos traducibles: { 'aria-label': 'ui.search.label' }
 */
export function attrs(map) {
  const pairs = Object.entries(map);
  const values = pairs.map(([name, key]) => `${name}="${escapeHtml(plain(key))}"`).join(' ');
  const spec = pairs.map(([name, key]) => `${name}:${key}`).join(';');
  return `${values} data-i18n-attr="${spec}"`;
}
