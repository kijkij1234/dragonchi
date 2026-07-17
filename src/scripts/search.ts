import Fuse from 'fuse.js';

type SearchItem = {
  title: string;
  description?: string;
  url: string;
  lang: string;
  type: string;
  tags?: string[];
  categories?: string[];
  cover?: string;
  date?: string;
  content?: string;
};

const modal = document.getElementById('search-modal');
const overlay = document.getElementById('search-overlay');
const input = document.getElementById('search-input') as HTMLInputElement | null;
const closeButton = document.getElementById('search-close');
const empty = document.getElementById('search-empty');
const loading = document.getElementById('search-loading');
const noResults = document.getElementById('search-no-results');
const results = document.getElementById('search-results');
const locale = modal?.dataset.locale || 'zh-cn';
const base = import.meta.env.BASE_URL || '/';
let fuse: Fuse<SearchItem> | null = null;
let indexPromise: Promise<SearchItem[]> | null = null;

function show(element: HTMLElement | null) {
  element?.classList.remove('hidden');
}

function hide(element: HTMLElement | null) {
  element?.classList.add('hidden');
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function assetPath(path: string) {
  if (!path) return '';
  if (/^(https?:)?\/\//.test(path) || path.startsWith('data:')) return path;
  return `${base.replace(/\/?$/, '/')}${path.replace(/^\//, '')}`;
}

function formatDate(value?: string) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
}

function openSearch() {
  modal?.classList.remove('pointer-events-none', 'opacity-0', 'scale-95');
  modal?.classList.add('opacity-100', 'scale-100');
  modal?.setAttribute('aria-hidden', 'false');
  overlay?.classList.remove('pointer-events-none', 'opacity-0');
  overlay?.classList.add('opacity-100');
  document.body.style.overflow = 'hidden';
  window.setTimeout(() => input?.focus(), 30);
  ensureIndex();
}

function closeSearch() {
  modal?.classList.add('pointer-events-none', 'opacity-0', 'scale-95');
  modal?.classList.remove('opacity-100', 'scale-100');
  modal?.setAttribute('aria-hidden', 'true');
  overlay?.classList.add('pointer-events-none', 'opacity-0');
  overlay?.classList.remove('opacity-100');
  document.body.style.overflow = '';
}

async function ensureIndex() {
  if (!indexPromise) {
    hide(empty);
    show(loading);
    indexPromise = fetch(`${base}api/search.json`).then((response) => response.json());
  }
  const data = await indexPromise;
  if (!fuse) {
    fuse = new Fuse(data.filter((item) => item.lang === locale), {
      keys: ['title', 'description', 'tags', 'categories', 'content'],
      threshold: 0.35,
      ignoreLocation: true
    });
  }
  hide(loading);
  show(empty);
}

function renderSearch(query: string) {
  if (!results) return;
  results.innerHTML = '';
  hide(empty);
  hide(noResults);

  if (!query.trim()) {
    show(empty);
    return;
  }

  const items = fuse?.search(query).slice(0, 12) || [];
  if (items.length === 0) {
    show(noResults);
    return;
  }

  for (const { item } of items) {
    const link = document.createElement('a');
    link.href = item.url;
    link.className = 'search-bookshelf-link group';
    const cover = assetPath(item.cover || '');
    const coverMarkup = cover
      ? `<img src="${escapeHtml(cover)}" alt="" class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />`
      : `<div class="flex h-full w-full items-center justify-center bg-muted text-primary">
          <span class="text-lg">${item.type === 'series' ? '集' : item.type === 'pages' ? '页' : '书'}</span>
        </div>`;
    link.innerHTML = `
      <div class="search-bookshelf-cover">${coverMarkup}</div>
      <div class="search-bookshelf-meta">
        ${item.date ? `<time class="search-bookshelf-date" datetime="${escapeHtml(item.date)}">${escapeHtml(formatDate(item.date))}</time>` : '<span class="search-bookshelf-date"></span>'}
        <div class="search-bookshelf-title">${escapeHtml(item.title)}</div>
      </div>
    `;
    results.appendChild(link);
  }
}

document.addEventListener('click', (event) => {
  const target = event.target as HTMLElement;
  if (target.closest('[data-search-open]')) openSearch();
});

document.addEventListener('keydown', (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    openSearch();
  }
  if (event.key === 'Escape') closeSearch();
});

closeButton?.addEventListener('click', closeSearch);
overlay?.addEventListener('click', closeSearch);
input?.addEventListener('input', async () => {
  await ensureIndex();
  renderSearch(input.value);
});
