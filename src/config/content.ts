import type { Locale } from './i18n';

export type ContentCollection = 'posts' | 'pages';
export type EntryCardStyle = 'article' | 'showcase' | 'compact';
export type EntryListLayout = 'stack' | 'grid';
export type EntryGridColumns = 1 | 2 | 3;
export type HomeSectionConfig = {
  enabled: boolean;
  limit: number;
  featuredOnly?: boolean;
  title: Record<Locale, string>;
};

export const contentTypes = {
  posts: {
    collection: 'posts',
    path: '/posts/',
    icon: 'lucide:book-open',
    label: {
      'zh-cn': '作品'
    },
    showMeta: true,
    cardStyle: 'article',
    listLayout: 'stack',
    gridColumns: 1,
    home: {
      enabled: true,
      limit: 5,
      title: {
        'zh-cn': '最近发布'
      }
    }
  }
} satisfies Record<string, {
  collection: ContentCollection;
  path: string;
  icon: string;
  label: Record<Locale, string>;
  showMeta: boolean;
  cardStyle: EntryCardStyle;
  listLayout: EntryListLayout;
  gridColumns: EntryGridColumns;
  home?: HomeSectionConfig;
}>;

export type ContentTypeId = keyof typeof contentTypes;
