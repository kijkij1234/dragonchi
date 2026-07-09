import { getCollection, type CollectionEntry } from 'astro:content';
import { getLocaleFromId, getLocalePath, stripLocaleFromId, type Locale } from '../../config/i18n';
import { contentTypes, type TaxonomyConfig } from '../../config/content';

export type ContentType = 'posts' | 'projects' | 'pages';

export function entryLocale(entry: CollectionEntry<ContentType>) {
  return entry.data.lang || getLocaleFromId(entry.id);
}

export function entrySlug(entry: CollectionEntry<ContentType>) {
  return stripLocaleFromId(entry.id).replace(/\/index$/, '');
}

export function entryDate(entry: CollectionEntry<ContentType>) {
  return entry.data.pubDate || entry.data.updatedDate || new Date(0);
}

export function isPublished(entry: CollectionEntry<ContentType>) {
  return !entry.data.draft;
}

export async function getLocalizedEntries<T extends ContentType>(collection: T, locale: Locale) {
  const entries = await getCollection(collection, ({ data }) => !data.draft);
  return entries
    .filter((entry) => entryLocale(entry as CollectionEntry<ContentType>) === locale)
    .sort((a, b) => entryDate(b as CollectionEntry<ContentType>).getTime() - entryDate(a as CollectionEntry<ContentType>).getTime());
}

export function localizedEntryPath(collection: ContentType, entry: CollectionEntry<ContentType>) {
  const slug = entrySlug(entry);
  const locale = entryLocale(entry);
  const base = collection === 'pages' ? '' : `/${collection}`;
  const path = `${base}/${slug}/`.replace(/\/+/g, '/');
  return getLocalePath(locale, path);
}

export function formatDate(date: Date | undefined, locale: Locale) {
  if (!date) return '';
  return new Intl.DateTimeFormat(locale === 'zh-cn' ? 'zh-CN' : 'en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

export function uniqueTerms(entries: Array<CollectionEntry<'posts'>>, field: 'tags') {
  const terms = new Map<string, number>();
  for (const entry of entries) {
    for (const term of entry.data[field] || []) {
      terms.set(term, (terms.get(term) || 0) + 1);
    }
  }
  return [...terms.entries()]
    .map(([name, count]) => ({ name, count, slug: slugTerm(name) }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * 通用分类法词条收集：从条目数组中提取指定字段的所有唯一值并统计数量。
 * 替代 uniqueTerms，适用于任意内容类型和分类法字段。
 */
export function getTerms<T extends ContentType>(entries: Array<CollectionEntry<T>>, field: string) {
  const terms = new Map<string, number>();
  for (const entry of entries) {
    const values = (entry.data as Record<string, unknown>)[field];
    if (!Array.isArray(values)) continue;
    for (const value of values) {
      if (typeof value !== 'string') continue;
      terms.set(value, (terms.get(value) || 0) + 1);
    }
  }
  return [...terms.entries()]
    .map(([name, count]) => ({ name, count, slug: slugTerm(name) }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * 按词条 slug 获取分类法词条元数据（title、description、cover 等）。
 * 返回 TaxonomyTermMeta 或 undefined（tag 这类无预定义元数据的词条）。
 */
export function getTermMeta(taxonomy: TaxonomyConfig, slug: string) {
  return taxonomy.terms?.[slug];
}

/**
 * 获取某个内容类型上注册的所有分类法配置。
 */
export function getContentTypeTaxonomies(typeId: string) {
  const config = contentTypes[typeId as keyof typeof contentTypes];
  return config?.taxonomies ?? {};
}

export function adjacentEntries<T extends ContentType>(entries: Array<CollectionEntry<T>>, current: CollectionEntry<T>) {
  const index = entries.findIndex((entry) => entry.id === current.id);
  return {
    previous: index >= 0 ? entries[index + 1] : undefined,
    next: index > 0 ? entries[index - 1] : undefined
  };
}

export function relatedPosts(posts: Array<CollectionEntry<'posts'>>, current: CollectionEntry<'posts'>, limit = 3) {
  const currentTerms = new Set(current.data.tags || []);

  return posts
    .filter((entry) => entry.id !== current.id)
    .map((entry) => {
      const score = (entry.data.tags || []).filter((term) => currentTerms.has(term)).length;

      return { entry, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || entryDate(b.entry as any).getTime() - entryDate(a.entry as any).getTime())
    .slice(0, limit)
    .map((item) => item.entry);
}

export function seriesPosts(posts: Array<CollectionEntry<'posts'>>, seriesSlug: string) {
  return posts
    .filter((entry) => entry.data.series?.includes(seriesSlug))
    .sort((a, b) => {
      const orderA = a.data.seriesOrder ?? Infinity;
      const orderB = b.data.seriesOrder ?? Infinity;
      if (orderA !== orderB) return orderA - orderB;
      return entryDate(a as CollectionEntry<ContentType>).getTime() - entryDate(b as CollectionEntry<ContentType>).getTime();
    });
}

export function slugTerm(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-|-$/g, '');
}
