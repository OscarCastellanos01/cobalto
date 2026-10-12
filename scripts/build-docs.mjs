import { copyFile, mkdir, readdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { codeBlock, layout, table, toc } from '../docs/src/layout.mjs';
import { dedent } from '../docs/src/highlight.mjs';
import { lookup, plain, t, tr } from '../docs/src/i18n.mjs';
import { readFileSync } from 'node:fs';

const DOCS = resolve('docs');
const SOURCES = resolve('docs/src/components');
const PAGES = resolve('docs/src/pages');
const es = JSON.parse(readFileSync(resolve('docs/i18n/es.json'), 'utf8'));

async function importAll(dir) {
  const files = (await readdir(dir)).filter((file) => file.endsWith('.mjs')).sort();
  const modules = await Promise.all(
    files.map((file) => import(pathToFileURL(resolve(dir, file)).href))
  );
  return modules.map((mod) => mod.default);
}

function exampleBlock(component, example) {
  const base = `components.${component.slug}.examples.${example.id}`;
  const variant = example.layout ? ` docs-preview--${example.layout}` : '';
  const preview = dedent(example.html);
  const code = example.code ? dedent(example.code) : preview;
  const description = lookup(es, `${base}.description`)
    ? tr('p', `${base}.description`, 'class="docs-section__desc"')
    : '';
  return {
    id: example.id,
    key: `${base}.title`,
    html: `<section class="docs-section" id="${example.id}">
  ${tr('h2', `${base}.title`, 'class="docs-section__title"')}
  ${description}
  <div class="docs-example">
    <div class="docs-preview${variant}">
${preview}
    </div>
    ${codeBlock(code)}
  </div>
</section>`,
  };
}

function referenceSection(id, key, body) {
  return {
    id,
    key,
    html: `<section class="docs-section" id="${id}">${tr('h2', key, 'class="docs-section__title"')}${body}</section>`,
  };
}

function pairRows(base, list) {
  return (list || []).map((_, i) => [{ key: `${base}.${i}.0` }, { key: `${base}.${i}.1` }]);
}

function componentMain(component, groupKey, index) {
  const base = `components.${component.slug}`;
  const texts = lookup(es, base);
  const sections = component.examples.map((example) => exampleBlock(component, example));

  if (texts.classes?.length) {
    sections.push(
      referenceSection(
        'clases',
        'ui.sections.classes',
        table(
          ['ui.table.class', 'ui.table.description'],
          pairRows(`${base}.classes`, texts.classes)
        )
      )
    );
  }
  if (texts.attributes?.length) {
    sections.push(
      referenceSection(
        'atributos',
        'ui.sections.attributes',
        table(
          ['ui.table.attribute', 'ui.table.description'],
          pairRows(`${base}.attributes`, texts.attributes)
        )
      )
    );
  }
  if (texts.events?.length || component.snippets?.length) {
    const events = table(
      ['ui.table.event', 'ui.table.when'],
      pairRows(`${base}.events`, texts.events)
    );
    const snippets = (component.snippets || [])
      .map((snippet, i) => {
        const titleKey = `${base}.snippets.${i}`;
        const title = lookup(es, titleKey)
          ? tr('p', titleKey, 'class="docs-section__desc mt-6"')
          : '';
        return `${title}${codeBlock(snippet.code, { lang: snippet.lang || 'js' })}`;
      })
      .join('');
    sections.push(referenceSection('javascript', 'ui.sections.javascript', events + snippets));
  }
  if (texts.a11y?.length) {
    const items = texts.a11y.map((_, i) => tr('li', `${base}.a11y.${i}`)).join('');
    sections.push(
      referenceSection('accesibilidad', 'ui.sections.a11y', `<ul class="docs-list">${items}</ul>`)
    );
  }

  const number = String(index + 1).padStart(2, '0');
  const header = `<header class="docs-header">
  <div class="cb-label"><b>${number}/</b>${tr('span', `groups.${groupKey}`)}</div>
  ${tr('h1', `${base}.title`, 'class="cb-h2"')}
  ${tr('p', `${base}.description`, 'class="cb-lead"')}
</header>`;

  return { main: header + sections.map((s) => s.html).join('\n'), sections };
}

function sidebarGroups(groupsData, pages) {
  const start = {
    key: 'ui.start',
    items: pages.map((page) => ({
      slug: page.slug,
      key: `pages.${page.slug}.title`,
      href: `${page.slug}.html`,
    })),
  };
  return [
    start,
    ...groupsData.map((group) => ({
      key: `groups.${group.key}`,
      items: group.components.map((c) => ({
        slug: c.slug,
        key: `components.${c.slug}.title`,
        href: `componentes/${c.slug}.html`,
      })),
    })),
  ];
}

function searchIndex(groupsData, pages) {
  const items = pages.map((page) => ({
    group: plain('ui.search.guides'),
    groupKey: 'ui.search.guides',
    label: plain(`pages.${page.slug}.title`),
    key: `pages.${page.slug}.title`,
    href: `${page.slug}.html`,
    keywords: t(`pages.${page.slug}.keywords`),
  }));
  groupsData.forEach((group) => {
    group.components.forEach((c) => {
      const classes = (lookup(es, `components.${c.slug}.classes`) || [])
        .map((row) => row[0].replace(/`/g, ''))
        .join(' ');
      items.push({
        group: plain(`groups.${group.key}`),
        groupKey: `groups.${group.key}`,
        label: plain(`components.${c.slug}.title`),
        key: `components.${c.slug}.title`,
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
    group.components.map((c) => ({ ...c, groupKey: group.key }))
  );

  await mkdir(resolve(DOCS, 'componentes'), { recursive: true });
  await mkdir(resolve(DOCS, 'assets'), { recursive: true });

  for (const [index, component] of allComponents.entries()) {
    const { main: body, sections } = componentMain(component, component.groupKey, index);
    const html = layout({
      titleKey: `components.${component.slug}.title`,
      descriptionKey: `components.${component.slug}.description`,
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
    });
    const html = layout({
      titleKey: `pages.${page.slug}.title`,
      descriptionKey: `pages.${page.slug}.description`,
      current: page.slug,
      groups,
      search,
      main: content.main,
      toc: content.sections ? toc(content.sections) : '',
    });
    await writeFile(resolve(DOCS, `${page.slug}.html`), html);
  }

  for (const file of ['cobalto.umd.js']) {
    if (existsSync(resolve('dist', file)))
      await copyFile(resolve('dist', file), resolve(DOCS, 'assets', file));
  }
  console.log(`docs: ${allComponents.length} componentes y ${pages.length} paginas`);
}

main();
