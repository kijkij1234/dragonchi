import { getLocalePath, type Locale } from './i18n';
import { contentTypes } from './content';
import { siteConfig } from './site';

export type NavigationConfigItem = string | {
  label: Record<Locale, string>;
  href: string;
  icon: string;
};

const systemRoutes = {
  archives: {
    label: { en: 'Archives', 'zh-cn': '归档' },
    href: '/archives/',
    icon: 'lucide:archive'
  },
  resume: {
    label: { en: 'Resume', 'zh-cn': '简历' },
    href: '/resume/',
    icon: 'lucide:file-text'
  }
} satisfies Record<string, {
  label: Record<Locale, string>;
  href: string;
  icon: string;
}>;

// 从 contentTypes 的分类法配置自动派生导航路由
const taxonomyRoutes = Object.fromEntries(
  Object.entries(contentTypes)
    .filter(([, config]) => config.taxonomies)
    .flatMap(([, config]) =>
      Object.entries(config.taxonomies!).map(([taxId, taxConfig]) => [
        taxId,
        {
          label: taxConfig.label,
          href: `/${taxId}/`,
          icon: taxConfig.icon ?? 'lucide:tag'
        }
      ])
    )
);

const routeRegistry = {
  ...Object.fromEntries(Object.entries(contentTypes).map(([id, config]) => [id, {
    label: config.label,
    href: config.path,
    icon: config.icon
  }])),
  ...taxonomyRoutes,
  ...systemRoutes
} as Record<string, {
  label: Record<Locale, string>;
  href: string;
  icon: string;
}>;

function resolveNavigationItem(item: NavigationConfigItem) {
  if (typeof item !== 'string') return item;
  return routeRegistry[item];
}

function resolveHref(locale: Locale, href: string) {
  if (/^(https?:)?\/\//.test(href) || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#')) {
    return href;
  }
  return getLocalePath(locale, href);
}

export function getNavigation(locale: Locale, items: NavigationConfigItem[] = siteConfig.nav) {
  return items
    .map(resolveNavigationItem)
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
    .map((item) => ({
      href: resolveHref(locale, item.href),
      label: item.label[locale],
      icon: item.icon
    }));
}

export function getFooterNavigation(locale: Locale) {
  return getNavigation(locale, siteConfig.footerNav);
}
