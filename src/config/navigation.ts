import { getLocalePath, type Locale } from './i18n';
import { siteConfig } from './site';

export function getNavigation(locale: Locale) {
  return siteConfig.nav.map((item) => ({
    href: getLocalePath(locale, item.href),
    label: item.label[locale],
    icon: item.icon
  }));
}
