export const defaultLocale = 'en';
export const locales = ['en', 'zh-cn'] as const;

export type Locale = (typeof locales)[number];

export const localeMeta: Record<Locale, { label: string; htmlLang: string; dateLocale: string }> = {
  en: {
    label: 'English',
    htmlLang: 'en',
    dateLocale: 'en'
  },
  'zh-cn': {
    label: '简体中文',
    htmlLang: 'zh-CN',
    dateLocale: 'zh-CN'
  }
};

export function isLocale(value: string | undefined): value is Locale {
  return Boolean(value && locales.includes(value as Locale));
}

export function getLocalePath(locale: Locale, path = '/') {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (locale === defaultLocale) return normalized;
  return `/${locale}${normalized === '/' ? '/' : normalized}`;
}

export function switchLocalePath(targetLocale: Locale, currentPath: string) {
  const normalized = currentPath.startsWith('/') ? currentPath : `/${currentPath}`;
  const segments = normalized.split('/').filter(Boolean);
  const currentLocale = isLocale(segments[0]) ? segments[0] : defaultLocale;
  const rest = currentLocale === defaultLocale ? segments : segments.slice(1);
  const path = `/${rest.join('/')}${rest.length > 0 ? '/' : ''}`.replace(/\/+/g, '/');
  return getLocalePath(targetLocale, path);
}

export function getLocaleFromId(id: string): Locale {
  const firstSegment = id.split('/')[0];
  return isLocale(firstSegment) ? firstSegment : defaultLocale;
}

export function stripLocaleFromId(id: string) {
  const [firstSegment, ...rest] = id.split('/');
  return isLocale(firstSegment) ? rest.join('/') : id;
}
