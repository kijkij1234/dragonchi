import type { Locale } from './i18n';

export type ContentCollection = 'posts' | 'projects' | 'pages';
export type EntryCardStyle = 'article' | 'showcase' | 'compact';
export type EntryListLayout = 'stack' | 'grid';
export type EntryGridColumns = 1 | 2 | 3;
export type HomeSectionConfig = {
  enabled: boolean;
  limit: number;
  featuredOnly?: boolean;
  title: Record<Locale, string>;
};

/** 分类法展示风格 */
export type TaxonomyStyle = 'cloud' | 'deck' | 'list';

/** 单个分类法词条的元数据（有封面、描述等富信息的词条，如系列） */
export type TaxonomyTermMeta = {
  label: Record<Locale, string>;
  description?: Record<Locale, string>;
  cover?: string;
};

/** 内容类型上注册的分类法字段配置 */
export type TaxonomyConfig = {
  /** frontmatter 中的数组字段名 */
  field: string;
  /** 排序字段（可选，如 seriesOrder） */
  orderField?: string;
  /** 词条列表页的展示风格 */
  listStyle: TaxonomyStyle;
  /** 预定义词条元数据（可选，用于系列等需要富信息展示的分类法） */
  terms?: Record<string, TaxonomyTermMeta>;
  /** 图标 */
  icon?: string;
  /** 分类法列表页的 i18n key 前缀 */
  i18nKey: string;
  /** 导航标签 */
  label: Record<Locale, string>;
};

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
    gridColumns: 1,
    home: {
      enabled: true,
      limit: 5,
      title: {
        en: 'Recent Posts',
        'zh-cn': '最近文章'
      }
    },
    taxonomies: {
      tags: {
        field: 'tags',
        listStyle: 'cloud',
        icon: 'lucide:tags',
        i18nKey: 'taxonomy.tags',
        label: { en: 'Tags', 'zh-cn': '标签' }
      } as TaxonomyConfig,
      series: {
        field: 'series',
        orderField: 'seriesOrder',
        listStyle: 'deck',
        icon: 'lucide:bookmark',
        i18nKey: 'series',
        label: { en: 'Series', 'zh-cn': '系列' },
        terms: {
          'theme-guide': {
            label: { en: 'Theme Guide', 'zh-cn': '主题配置系列' },
            description: {
              en: 'A short series covering how to configure and extend Astro Narrow.',
              'zh-cn': '一个简短的系列，介绍如何配置与扩展 Astro Narrow。'
            },
            cover: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80'
          }
        }
      } as TaxonomyConfig
    }
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
    gridColumns: 3,
    home: {
      enabled: true,
      limit: 3,
      featuredOnly: true,
      title: {
        en: 'Featured Projects',
        'zh-cn': '精选项目'
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
  taxonomies?: Record<string, TaxonomyConfig>;
}>;

export type ContentTypeId = keyof typeof contentTypes;
