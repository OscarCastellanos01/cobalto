import { bind, emit, focusableWhenScrollable, message, queryAll } from '../core.js';

const COLLATOR = new Intl.Collator('es', { numeric: true, sensitivity: 'base' });

function normalize(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim();
}

function cellValue(row, index) {
  const cell = row.cells[index];
  if (!cell) return '';
  return cell.getAttribute('data-value') ?? cell.textContent.trim();
}

function toNumber(value) {
  const parsed = parseFloat(String(value).replace(/[^\d.-]/g, ''));
  return Number.isNaN(parsed) ? -Infinity : parsed;
}

function compare(type, a, b) {
  if (type === 'number') return toNumber(a) - toNumber(b);
  if (type === 'date') return (Date.parse(a) || 0) - (Date.parse(b) || 0);
  return COLLATOR.compare(a, b);
}

function pageList(page, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = new Set([1, total, page, page - 1, page + 1]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
  const result = [];
  sorted.forEach((p, i) => {
    if (i && p - sorted[i - 1] > 1) result.push('...');
    result.push(p);
  });
  return result;
}

function pageButton(label, page, { current = false, disabled = false, aria = '' } = {}) {
  const attrs = [
    'type="button"',
    'class="cb-pagination__item"',
    `data-page="${page}"`,
    current ? 'aria-current="page"' : '',
    disabled ? 'disabled' : '',
    aria ? `aria-label="${aria}"` : '',
  ];
  return `<li><button ${attrs.filter(Boolean).join(' ')}>${label}</button></li>`;
}

function renderPagination(page, total, el) {
  const label = (key, attr, vars) => message(key, { el, attr, vars });
  const prev = label('paginationPrev', 'data-cb-pagination-prev');
  const next = label('paginationNext', 'data-cb-pagination-next');
  const items = [pageButton('←', page - 1, { disabled: page <= 1, aria: prev })];
  pageList(page, total).forEach((p) => {
    if (p === '...') {
      items.push('<li class="cb-pagination__ellipsis" aria-hidden="true">…</li>');
      return;
    }
    const aria = label('paginationPage', 'data-cb-pagination-page', { page: p });
    items.push(pageButton(p, p, { current: p === page, aria }));
  });
  items.push(pageButton('→', page + 1, { disabled: page >= total, aria: next }));
  return `<ul class="cb-pagination">${items.join('')}</ul>`;
}

function createInstance(el) {
  const table = el.querySelector('table');
  const body = table?.tBodies[0];
  if (!body) return null;

  const rows = Array.from(body.rows);
  const columns = table.tHead ? table.tHead.rows[0].cells.length : rows[0]?.cells.length || 1;
  const search = el.querySelector('[data-cb-table-search]');
  const filters = Array.from(el.querySelectorAll('[data-cb-table-filter]'));
  const selectAll = el.querySelector('[data-cb-table-select-all]');
  const status = el.querySelector('[data-cb-table-status]');
  const pagination = el.querySelector('[data-cb-table-pagination]');
  const pageSize = Number(el.getAttribute('data-cb-page-size')) || 0;
  const state = { sortIndex: -1, sortDir: 'none', page: 1, visible: rows, pageRows: rows };

  const emptyRow = document.createElement('tr');
  emptyRow.innerHTML = `<td class="cb-table__empty" colspan="${columns}"></td>`;
  emptyRow.cells[0].textContent = message('tableEmpty', { el, attr: 'data-cb-table-empty' });

  function matchesFilters(row) {
    const query = normalize(search?.value);
    if (query && !normalize(row.textContent).includes(query)) return false;
    return filters.every((filter) => {
      const value = filter.value;
      if (!value) return true;
      return row.getAttribute(`data-${filter.getAttribute('data-cb-table-filter')}`) === value;
    });
  }

  function sortedRows() {
    if (state.sortIndex === -1) return rows;
    const th = table.tHead.rows[0].cells[state.sortIndex];
    const type = th.getAttribute('data-cb-sort') || 'text';
    const direction = state.sortDir === 'descending' ? -1 : 1;
    return [...rows].sort(
      (a, b) =>
        compare(type, cellValue(a, state.sortIndex), cellValue(b, state.sortIndex)) * direction
    );
  }

  function selectedRows() {
    return rows.filter((row) => row.getAttribute('aria-selected') === 'true');
  }

  function updateSelectAll() {
    if (!selectAll) return;
    const visible = state.pageRows.filter((row) => row.querySelector('[data-cb-table-select]'));
    const checked = visible.filter((row) => row.getAttribute('aria-selected') === 'true');
    selectAll.checked = visible.length > 0 && checked.length === visible.length;
    selectAll.indeterminate = checked.length > 0 && checked.length < visible.length;
  }

  function updateStatus(start, end) {
    if (!status) return;
    const total = state.visible.length;
    const selected = selectedRows().length;
    const vars = { start: start + 1, end, total, count: selected };
    const range = total
      ? message('tableStatus', { el, attr: 'data-cb-table-status-text', vars })
      : message('tableEmpty', { el, attr: 'data-cb-table-empty' });
    const count = message('tableSelected', { el, attr: 'data-cb-table-selected-text', vars });
    status.textContent = selected ? `${range} · ${count}` : range;
  }

  function render() {
    const ordered = sortedRows();
    state.visible = ordered.filter(matchesFilters);
    const pages = pageSize ? Math.max(1, Math.ceil(state.visible.length / pageSize)) : 1;
    state.page = Math.min(Math.max(1, state.page), pages);
    const start = pageSize ? (state.page - 1) * pageSize : 0;
    const end = pageSize ? Math.min(start + pageSize, state.visible.length) : state.visible.length;
    state.pageRows = state.visible.slice(start, end);
    const onPage = new Set(state.pageRows);

    ordered.forEach((row) => {
      row.hidden = !onPage.has(row);
      body.appendChild(row);
    });
    if (!state.visible.length) body.appendChild(emptyRow);
    else emptyRow.remove();

    if (pagination) pagination.innerHTML = pages > 1 ? renderPagination(state.page, pages, el) : '';
    updateSelectAll();
    updateStatus(start, end);
  }

  function sortBy(index) {
    const headers = Array.from(table.tHead.rows[0].cells);
    const next =
      state.sortIndex === index && state.sortDir === 'ascending' ? 'descending' : 'ascending';
    headers.forEach(
      (th) => th.hasAttribute('data-cb-sort') && th.setAttribute('aria-sort', 'none')
    );
    headers[index].setAttribute('aria-sort', next);
    state.sortIndex = index;
    state.sortDir = next;
    render();
    emit(el, 'sort', { column: index, direction: next });
  }

  function setRowSelected(row, selected) {
    row.setAttribute('aria-selected', String(selected));
    const checkbox = row.querySelector('[data-cb-table-select]');
    if (checkbox) checkbox.checked = selected;
  }

  function goTo(page) {
    state.page = page;
    render();
    emit(el, 'page', { page: state.page });
  }

  if (table.tHead) {
    Array.from(table.tHead.rows[0].cells).forEach((th, index) => {
      if (!th.hasAttribute('data-cb-sort')) return;
      th.setAttribute('aria-sort', 'none');
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'cb-table__sort';
      button.append(...th.childNodes);
      th.appendChild(button);
      button.addEventListener('click', () => sortBy(index));
    });
  }

  search?.addEventListener('input', () => {
    state.page = 1;
    render();
    emit(el, 'filter', { query: search.value });
  });

  filters.forEach((filter) =>
    filter.addEventListener('change', () => {
      state.page = 1;
      render();
      emit(el, 'filter', { [filter.getAttribute('data-cb-table-filter')]: filter.value });
    })
  );

  body.addEventListener('change', (event) => {
    const checkbox = event.target.closest('[data-cb-table-select]');
    if (!checkbox) return;
    setRowSelected(checkbox.closest('tr'), checkbox.checked);
    render();
    emit(el, 'select', { rows: selectedRows() });
  });

  selectAll?.addEventListener('change', () => {
    state.pageRows.forEach((row) => setRowSelected(row, selectAll.checked));
    render();
    emit(el, 'select', { rows: selectedRows() });
  });

  pagination?.addEventListener('click', (event) => {
    const button = event.target.closest('[data-page]');
    if (button && !button.disabled) goTo(Number(button.dataset.page));
  });

  rows.forEach((row) => {
    if (row.querySelector('[data-cb-table-select]')) {
      setRowSelected(row, row.querySelector('[data-cb-table-select]').checked);
    }
  });
  render();

  return { el, render, sortBy, goTo, selectedRows };
}

/**
 * Inicializa las tablas [data-cb-table]: orden, busqueda, filtros, paginacion y seleccion.
 * @param {ParentNode} [root]
 */
export function init(root = document) {
  queryAll(root, '.cb-table-scroll').forEach((scroller) => {
    if (bind(scroller, 'table-scroll')) focusableWhenScrollable(scroller);
  });
  queryAll(root, '[data-cb-table]').forEach((el) => {
    if (!bind(el, 'table')) return;
    const instance = createInstance(el);
    if (instance) el.cbTable = instance;
  });
}

export default { init };
