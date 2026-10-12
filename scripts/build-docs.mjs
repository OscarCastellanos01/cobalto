import { copyFile, mkdir, readdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { codeBlock, layout, table, toc, inlineCode } from '../docs/src/layout.mjs';
import { dedent } from '../docs/src/highlight.mjs';

const DOCS = resolve('docs');
const SOURCES = resolve('docs/src/components');
const PAGES = resolve('docs/src/pages');

function slugify(text) {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

async function importAll(dir) {
  const files = (await readdir(dir)).filter((file) => file.endsWith('.mjs')).sort();
  const modules = await Promise.all(
    files.map((file) => import(pathToFileURL(resolve(dir, file)).href))
  );
  return modules.map((mod) => mod.default);
}

function exampleBlock(example) {
  const id = example.id || slugify(example.title);
  const variant = example.layout ? ` docs-preview--${example.layout}` : '';
  const preview = dedent(example.html);
  const code = example.code ? dedent(example.code) : preview;
  return {
    id,
    title: example.title,
    html: `<section class="docs-section" id="${id}">
  <h2 class="docs-section__title">${example.title}</h2>
  ${example.description ? `<p class="docs-section__desc">${inlineCode(example.description)}</p>` : ''}
  <div class="docs-example">
    <div class="docs-preview${variant}">
${preview}
    </div>
    ${codeBlock(code)}
  </div>
</section>`,
  };
}

function referenceSection(id, title, body) {
  return {
    id,
    title,
    html: `<section class="docs-section" id="${id}"><h2 class="docs-section__title">${title}</h2>${body}</section>`,
  };
}

function componentMain(component, index) {
  const sections = component.examples.map(exampleBlock);

  if (component.classes?.length) {
    sections.push(
      referenceSection(
        'clases',
        'Clases y modificadores',
        table(['Clase', 'Descripción'], component.classes)
      )
    );
  }
  if (component.attributes?.length) {
    sections.push(
      referenceSection(
        'atributos',
        'Atributos data-cb-*',
        table(['Atributo', 'Descripción'], component.attributes)
      )
    );
  }
  if (component.events?.length || component.snippets?.length) {
    const events = table(['Evento', 'Cuándo se dispara'], component.events || []);
    const snippets = (component.snippets || [])
      .map(
        (s) =>
          `${s.title ? `<p class="docs-section__desc mt-6">${inlineCode(s.title)}</p>` : ''}${codeBlock(s.code, { lang: s.lang || 'js' })}`
      )
      .join('');
    sections.push(referenceSection('javascript', 'JavaScript', events + snippets));
  }
  if (component.a11y?.length) {
    const items = component.a11y.map((item) => `<li>${inlineCode(item)}</li>`).join('');
    sections.push(
      referenceSection('accesibilidad', 'Accesibilidad', `<ul class="docs-list">${items}</ul>`)
    );
  }

  const number = String(index + 1).padStart(2, '0');
  const header = `<header class="docs-header">
  <div class="cb-label"><b>${number}/</b>${component.group}</div>
  <h1 class="cb-h2">${component.title}</h1>
  <p class="cb-lead">${inlineCode(component.description)}</p>
</header>`;

  return { main: header + sections.map((s) => s.html).join('\n'), sections };
}

function sidebarGroups(groupsData, pages) {
  const start = {
    title: 'Empezar',
    items: pages.map((page) => ({ slug: page.slug, title: page.title, href: `${page.slug}.html` })),
  };
  return [
    start,
    ...groupsData.map((group) => ({
      title: group.title,
      items: group.components.map((c) => ({
        slug: c.slug,
        title: c.title,
        href: `componentes/${c.slug}.html`,
        badge: c.badge,
      })),
    })),
  ];
}

function searchIndex(groupsData, pages) {
  const items = pages.map((page) => ({
    group: 'Guías',
    label: page.title,
    href: `${page.slug}.html`,
    keywords: page.keywords || '',
  }));
  groupsData.forEach((group) => {
    group.components.forEach((c) => {
      const classes = (c.classes || []).map((row) => row[0].replace(/`/g, '')).join(' ');
      items.push({
        group: group.title,
        label: c.title,
        href: `componentes/${c.slug}.html`,
        keywords: `${c.slug} ${classes}`,
      });
    });
  });
  return items;
}

async function main() {
  const groupsData = await importAll(SOURCES);
  const pages = (await importAll(PAGES)).sort((a, b) => a.order - b.order);
  const groups = sidebarGroups(groupsData, pages);
  const search = searchIndex(groupsData, pages);
  const allComponents = groupsData.flatMap((group) =>
    group.components.map((c) => ({ ...c, group: group.title }))
  );

  await mkdir(resolve(DOCS, 'componentes'), { recursive: true });
  await mkdir(resolve(DOCS, 'assets'), { recursive: true });

  for (const [index, component] of allComponents.entries()) {
    const { main: body, sections } = componentMain(component, index);
    const html = layout({
      title: component.title,
      description: component.description.replace(/`/g, ''),
      current: component.slug,
      prefix: '../',
      groups,
      search,
      main: body,
      toc: toc(sections),
    });
    await writeFile(resolve(DOCS, 'componentes', `${component.slug}.html`), html);
  }

  for (const page of pages) {
    const content = page.render({
      components: allComponents,
      groups: groupsData,
      codeBlock,
      table,
      inlineCode,
    });
    const html = layout({
      title: page.title,
      description: page.description,
      current: page.slug,
      groups,
      search,
      main: content.main,
      toc: content.sections ? toc(content.sections) : '',
    });
    await writeFile(resolve(DOCS, `${page.slug}.html`), html);
  }

  await copyFile(resolve('docs/src/docs.js'), resolve(DOCS, 'assets/docs.js'));
  if (existsSync(resolve('dist/cobalto.umd.js'))) {
    await copyFile(resolve('dist/cobalto.umd.js'), resolve(DOCS, 'assets/cobalto.umd.js'));
  }
  console.log(`docs: ${allComponents.length} componentes y ${pages.length} paginas`);
}

main();
