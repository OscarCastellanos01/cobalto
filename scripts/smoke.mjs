import { chromium } from 'playwright-core';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const browserPath = [
  process.env.CB_BROWSER,
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  '/usr/bin/google-chrome',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
].find((path) => path && existsSync(path));

const results = [];
const browser = await chromium.launch({ executablePath: browserPath });

function check(name, ok, detail = '') {
  results.push({ name, ok });
  console.log(`${ok ? 'ok' : 'x '} ${name}${detail ? ` (${detail})` : ''}`);
}

async function open(path, width = 1280) {
  const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
  page.errors = [];
  page.on('pageerror', (error) => page.errors.push(error.message));
  await page.goto(pathToFileURL(resolve(path)).href);
  await page.waitForFunction(() => window.cobalto);
  await page.waitForTimeout(150);
  return page;
}

const focused = (page) =>
  page.evaluate(() => document.activeElement?.outerHTML.slice(0, 120) || '');
const hasClass = (locator, name) => locator.evaluate((el, n) => el.classList.contains(n), name);

async function tabs() {
  const page = await open('docs/componentes/tabs.html');
  const tabsEl = page.locator('[data-cb-tabs]').first();
  const tabList = tabsEl.locator('[role="tab"]');
  await tabList.nth(0).focus();
  await page.keyboard.press('ArrowRight');
  check(
    'tabs: flecha derecha activa la siguiente',
    (await tabList.nth(1).getAttribute('aria-selected')) === 'true'
  );
  await page.keyboard.press('End');
  check(
    'tabs: End salta la deshabilitada',
    (await tabList.nth(2).getAttribute('aria-selected')) === 'true'
  );
  const panels = tabsEl.locator(':scope > [role="tabpanel"]');
  check(
    'tabs: solo un panel visible',
    (await panels.evaluateAll((els) => els.filter((e) => !e.hidden).length)) === 1
  );
  check('tabs: sin errores', page.errors.length === 0, page.errors.join('; '));
  await page.close();
}

async function accordion() {
  const page = await open('docs/componentes/accordion.html');
  const items = page.locator('.cb-accordion__item');
  await items.nth(1).locator('summary').click();
  await page.waitForTimeout(50);
  const states = await items.evaluateAll((els) => els.map((e) => e.open));
  check(
    'accordion: modo single deja uno abierto',
    states.filter(Boolean).length === 1 && states[1]
  );
  await page.close();
}

async function modal() {
  const page = await open('docs/componentes/modal.html');
  const trigger = page.locator('[data-cb-open="demo-modal"]');
  await trigger.click();
  const el = page.locator('#demo-modal');
  check('modal: abre', await hasClass(el, 'is-open'));
  check(
    'modal: foco dentro',
    await page.evaluate(() => !!document.activeElement.closest('#demo-modal'))
  );
  for (let i = 0; i < 6; i += 1) await page.keyboard.press('Tab');
  check(
    'modal: foco atrapado',
    await page.evaluate(() => !!document.activeElement.closest('#demo-modal'))
  );
  check(
    'modal: body bloqueado',
    (await page.evaluate(() => document.body.style.overflow)) === 'hidden'
  );
  await page.keyboard.press('Escape');
  check('modal: Esc cierra', !(await hasClass(el, 'is-open')));
  check('modal: foco vuelve al boton', (await focused(page)).includes('data-cb-open="demo-modal"'));
  await trigger.click();
  await page.waitForTimeout(50);
  await page.mouse.click(10, 10);
  check('modal: clic en fondo cierra', !(await hasClass(el, 'is-open')));
  await page.locator('[data-cb-open="demo-modal-lg"]').click();
  await page.mouse.click(10, 10);
  check(
    'modal: data-cb-static ignora el fondo',
    await hasClass(page.locator('#demo-modal-lg'), 'is-open')
  );
  await page.locator('#demo-modal-lg [data-cb-close]').last().click();
  check(
    'modal: data-cb-close cierra',
    !(await hasClass(page.locator('#demo-modal-lg'), 'is-open'))
  );
  await page.close();
}

async function drawerAndNesting() {
  const page = await open('docs/componentes/drawer.html');
  await page.locator('[data-cb-open="demo-drawer"]').click();
  check('drawer: abre', await hasClass(page.locator('#demo-drawer'), 'is-open'));
  await page.keyboard.press('Control+k');
  check('drawer: paleta encima', await hasClass(page.locator('#docs-search'), 'is-open'));
  await page.keyboard.press('Escape');
  check(
    'drawer: Esc cierra solo la capa de arriba',
    !(await hasClass(page.locator('#docs-search'), 'is-open')) &&
      (await hasClass(page.locator('#demo-drawer'), 'is-open'))
  );
  await page.keyboard.press('Escape');
  check(
    'drawer: segundo Esc cierra el drawer',
    !(await hasClass(page.locator('#demo-drawer'), 'is-open'))
  );
  check(
    'drawer: scroll liberado',
    (await page.evaluate(() => document.body.style.overflow)) === ''
  );
  await page.close();
}

async function toast() {
  const page = await open('docs/componentes/toast.html');
  await page.locator('[data-cb-toast]').first().click();
  await page.waitForTimeout(50);
  check('toast: aparece', (await page.locator('.cb-toast').count()) === 1);
  check('toast: role status', (await page.locator('.cb-toast').getAttribute('role')) === 'status');
  await page.locator('[data-cb-toast]').nth(3).click();
  check(
    'toast: error con role alert',
    (await page.locator('.cb-toast--danger').getAttribute('role')) === 'alert'
  );
  await page.locator('.cb-toast--danger .cb-toast__close').click();
  await page.waitForTimeout(300);
  check('toast: se cierra', (await page.locator('.cb-toast--danger').count()) === 0);
  const fromApi = await page.evaluate(() => {
    const t = window.cobalto.toast({ title: 'API', duration: 0 });
    return t.el.textContent.includes('API');
  });
  check('toast: API cobalto.toast()', fromApi);
  await page.close();
}

async function table() {
  const page = await open('docs/componentes/tabla.html');
  const wrap = page.locator('[data-cb-table]').first();
  const names = () => wrap.locator('tbody tr:not([hidden]) td:nth-child(2)').allTextContents();
  check('tabla: pagina de 5', (await names()).length === 5);
  await wrap.locator('th', { hasText: 'Monto' }).locator('button').click();
  const asc = await wrap.locator('tbody tr:not([hidden]) td:nth-child(5)').allTextContents();
  check('tabla: orden ascendente por numero', asc[0].includes('0'), asc[0]);
  check(
    'tabla: aria-sort',
    (await wrap.locator('th', { hasText: 'Monto' }).getAttribute('aria-sort')) === 'ascending'
  );
  await wrap.locator('[data-cb-table-search]').fill('mendez');
  check('tabla: busqueda ignora tildes', (await names()).join() === 'Carla Méndez');
  await wrap.locator('[data-cb-table-search]').fill('');
  await wrap.locator('[data-cb-table-filter]').selectOption('pausado');
  check('tabla: filtro por estado', (await names()).length === 2);
  await wrap.locator('[data-cb-table-filter]').selectOption('');
  await wrap.locator('[data-cb-table-pagination] [data-page="2"]').first().click();
  check('tabla: pagina 2', (await names()).length === 3);
  await wrap.locator('[data-cb-table-select-all]').check();
  const status = await wrap.locator('[data-cb-table-status]').textContent();
  check('tabla: seleccionar visibles', status.includes('3 selected'), status);
  await page.close();
}

async function overlaysSmall() {
  const page = await open('docs/componentes/tooltip-popover.html');
  await page.locator('[data-cb-tooltip]').first().focus();
  check('tooltip: aparece con foco', (await page.locator('.cb-tooltip.is-visible').count()) === 1);
  check(
    'tooltip: aria-describedby',
    (await page.locator('[data-cb-tooltip]').first().getAttribute('aria-describedby')) ===
      'cb-tooltip'
  );
  await page.keyboard.press('Escape');
  check('tooltip: Esc lo oculta', (await page.locator('.cb-tooltip.is-visible').count()) === 0);
  const pop = page.locator('[data-cb-popover]').first();
  await pop.locator('button').first().click();
  check('popover: abre', await hasClass(pop, 'is-open'));
  await page.mouse.click(5, 600);
  check('popover: clic fuera cierra', !(await hasClass(pop, 'is-open')));
  await page.close();
}

async function dropdownMenu() {
  const page = await open('docs/componentes/dropdown.html');
  const dd = page.locator('#menu-de-acciones [data-cb-dropdown]');
  await dd.locator('[data-cb-dropdown-trigger]').focus();
  await page.keyboard.press('ArrowDown');
  check('dropdown: flecha abre y enfoca', (await focused(page)).includes('menuitem'));
  await page.keyboard.press('End');
  check('dropdown: End va al ultimo', (await focused(page)).includes('delete'));
  const selected = page.evaluate(
    () =>
      new Promise((done) =>
        document.addEventListener('cb:select', (e) => done(e.detail.value), { once: true })
      )
  );
  await page.keyboard.press('Enter');
  check('dropdown: cb:select', (await selected) === 'delete');
  check(
    'dropdown: cierra y devuelve el foco',
    !(await hasClass(dd, 'is-open')) && (await focused(page)).includes('data-cb-dropdown-trigger')
  );
  await page.close();
}

async function dismissAndCopy() {
  const page = await open('docs/componentes/alert.html');
  await page.evaluate(() => localStorage.removeItem('cb-dismissed:demo-banner'));
  await page.locator('[data-cb-dismiss-key] [data-cb-dismiss]').click();
  check('banner: se cierra', await hasClass(page.locator('[data-cb-dismiss-key]'), 'is-dismissed'));
  await page.reload();
  await page.waitForFunction(() => window.cobalto);
  await page.waitForTimeout(150);
  check(
    'banner: recuerda el cierre',
    await hasClass(page.locator('[data-cb-dismiss-key]'), 'is-dismissed')
  );
  await page.evaluate(() => localStorage.removeItem('cb-dismissed:demo-banner'));
  await page.close();

  const code = await open('docs/componentes/codigo.html');
  await code
    .context()
    .grantPermissions(['clipboard-read', 'clipboard-write'])
    .catch(() => {});
  const button = code.locator('[data-cb-copy="npm install cobalto"]');
  await button.click();
  await code.waitForTimeout(50);
  check('copiar: estado copiado', await hasClass(button, 'is-copied'));
  await code.close();
}

async function dashboardMobile() {
  const page = await open('examples/dashboard.html', 390);
  const toggle = page.locator('[data-cb-dash-toggle]').first();
  await toggle.click();
  const sidebar = page.locator('[data-cb-dash-sidebar]');
  check('dashboard: sidebar abre en movil', await hasClass(sidebar, 'is-open'));
  await page.keyboard.press('Escape');
  check('dashboard: Esc cierra', !(await hasClass(sidebar, 'is-open')));
  check('dashboard: sin errores', page.errors.length === 0, page.errors.join('; '));
  await page.close();
}

async function reinit() {
  const page = await open('docs/componentes/tabs.html');
  const count = await page.evaluate(async () => {
    const holder = document.createElement('div');
    holder.innerHTML =
      '<div class="cb-tabs" data-cb-tabs><div class="cb-tabs__list"><button class="cb-tabs__tab">A</button><button class="cb-tabs__tab">B</button></div><div class="cb-tabs__panel">1</div><div class="cb-tabs__panel">2</div></div>';
    document.body.appendChild(holder);
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    window.cobalto.init();
    window.cobalto.init();
    let changes = 0;
    holder.firstElementChild.addEventListener('cb:change', () => (changes += 1));
    holder.querySelectorAll('button')[1].click();
    return { changes, role: holder.querySelector('[role="tablist"]') !== null };
  });
  check('reinit: nodos nuevos se inicializan solos', count.role);
  check(
    'reinit: init() repetido no duplica listeners',
    count.changes === 1,
    `eventos: ${count.changes}`
  );
  await page.close();
}

for (const test of [
  tabs,
  accordion,
  modal,
  drawerAndNesting,
  toast,
  table,
  overlaysSmall,
  dropdownMenu,
  dismissAndCopy,
  dashboardMobile,
  reinit,
]) {
  try {
    await test();
  } catch (error) {
    check(`${test.name}: excepcion`, false, error.message.split('\n')[0]);
  }
}

await browser.close();
const failed = results.filter((r) => !r.ok).length;
console.log(`\n${results.length - failed}/${results.length} pruebas ok`);
if (failed) process.exitCode = 1;
