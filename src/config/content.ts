import type { Locale } from './i18n';

export type ContentCollection = 'posts' | 'projects' | 'pages';
export type EntryCardStyle = 'article' | 'showcase' | 'compact';
export type EntryListLayout = 'stack' | 'grid';
export type EntryGridColumns = 1 | 2 | 3;

export const contentTypes = {
  posts: {
    collection: 'posts',
    path: '/posts/',
    icon: 'lucide:file-text',
    label: {
      en: 'Posts',
      'zh-cn': '文章'
    },
    showMeta: true,
    cardStyle: 'article',
    listLayout: 'stack',
    gridColumns: 1
  },
  projects: {
    collection: 'projects',
    path: '/projects/',
    icon: 'lucide:layers',
    label: {
      en: 'Projects',
      'zh-cn': '项目'
    },
    showMeta: true,
    cardStyle: 'showcase',
    listLayout: 'grid',
    gridColumns: 3
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
}>;

export type ContentTypeId = keyof typeof contentTypes;
