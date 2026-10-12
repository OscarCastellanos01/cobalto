import { readdir, readFile } from 'node:fs/promises';
import { extname, join, relative } from 'node:path';

const ROOTS = ['src', 'scripts', 'docs', 'examples'];
const EXTENSIONS = new Set(['.css', '.js', '.mjs', '.html']);
const SKIP_DIRS = new Set(['node_modules', 'dist', 'assets', '.tmp']);
const ACCENTED = /[áéíóúüñÁÉÍÓÚÜÑ¿¡]/;
const DECORATIVE = /[=*#~-]{4,}/;

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true }).catch(() => []);
  const files = [];
  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) files.push(...(await walk(path)));
    } else if (EXTENSIONS.has(extname(entry.name))) {
      files.push(path);
    }
  }
  return files;
}

function stripStrings(line) {
  return line
    .replace(/`(?:\\.|[^`\\])*`/g, '``')
    .replace(/'(?:\\.|[^'\\])*'/g, "''")
    .replace(/"(?:\\.|[^"\\])*"/g, '""');
}

function extractComments(source, ext) {
  const comments = [];
  const patterns = [/\/\*[\s\S]*?\*\//g];
  if (ext === '.html') patterns.push(/<!--[\s\S]*?-->/g);
  for (const pattern of patterns) {
    for (const match of source.matchAll(pattern)) {
      comments.push({ text: match[0], index: match.index });
    }
  }
  source.split('\n').forEach((line, i) => {
    const code = stripStrings(line);
    const at = code.search(/(^|\s)\/\/(?!\/)/);
    if (at === -1 || /https?:$/.test(code.slice(0, at + 1))) return;
    comments.push({ text: code.slice(at), line: i + 1 });
  });
  return comments;
}

function lineOf(source, index) {
  return source.slice(0, index).split('\n').length;
}

function checkAlignment(line, ext) {
  const code = stripStrings(line).replace(/^\s+/, '');
  if (!code) return null;
  if (ext === '.html') {
    const tags = code.match(/<[a-zA-Z][^>]*>/g) || [];
    return tags.some((tag) => / {2,}\S/.test(stripStrings(tag)))
      ? 'espacios extra entre atributos'
      : null;
  }
  if (/\S {2,}(=|:|\/\/|\/\*)/.test(code)) return 'alineacion antes de = : o comentario';
  if (/[:=] {2,}\S/.test(code)) return 'alineacion despues de = o :';
  return null;
}

async function main() {
  const files = (await Promise.all(ROOTS.map(walk))).flat();
  const problems = [];

  for (const file of files) {
    const source = await readFile(file, 'utf8');
    const ext = extname(file);
    const name = relative(process.cwd(), file);

    source.split('\n').forEach((line, i) => {
      if (line.includes('\t')) problems.push(`${name}:${i + 1} tab encontrado`);
      const indent = line.match(/^ */)[0].length;
      const isCommentBody = /^\s*\*/.test(line);
      if (indent % 2 === 1 && !isCommentBody && ext !== '.html') {
        problems.push(`${name}:${i + 1} indentacion impar`);
      }
      const alignment = checkAlignment(line, ext);
      if (alignment) problems.push(`${name}:${i + 1} ${alignment}`);
    });

    for (const comment of extractComments(source, ext)) {
      const line = comment.line || lineOf(source, comment.index);
      if (ACCENTED.test(comment.text)) problems.push(`${name}:${line} comentario con tilde o enie`);
      if (DECORATIVE.test(comment.text)) problems.push(`${name}:${line} comentario decorativo`);
    }
  }

  if (problems.length) {
    console.log(problems.join('\n'));
    console.log(`\n${problems.length} problema(s) de estilo`);
    process.exitCode = 1;
  } else {
    console.log(`estilo ok (${files.length} archivos)`);
  }
}

main();
