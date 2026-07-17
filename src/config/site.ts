import type { Locale } from './i18n';

export const siteConfig = {
  name: 'Astro Narrow',
  shortName: 'Astro Narrow',
  description: 'A content-focused Astro theme inspired by Hugo Narrow.',
  author: {
    name: 'Astro Narrow',
    title: {
      'zh-cn': '一个干净克制的 Astro 主题'
    },
    description: {
      'zh-cn': '写作、项目与笔记 —— 一个保持克制、注重结构感的内容空间。'
    },
    avatar: '/favicon.svg',
    social: [
      { name: '哔哩哔哩', url: 'https://space.bilibili.com/3706970171247569', icon: 'simple-icons:bilibili' },
      { name: '小红书', url: 'https://xhslink.com/m/3ITvrI6Uxex', icon: 'simple-icons:xiaohongshu' },
      { name: '企鹅群', url: 'https://github.com/', icon: 'simple-icons:qq' }
    ]
  },
  contentWidth: '60rem',
  ui: {
    navbar: {
      sticky: true
    },
    dock: {
      enabled: true
    }
  },
  nav: ['home', 'posts', 'series', 'archives', 'credits', 'about'],
  footerNav: [],
  comments: {
    enabled: false,
    provider: 'giscus',
    giscus: {
      repo: '',
      repoId: '',
      category: '',
      categoryId: '',
      mapping: 'pathname',
      strict: '0',
      reactionsEnabled: '1',
      emitMetadata: '0',
      inputPosition: 'bottom',
      theme: 'preferred_color_scheme'
    }
  },
  analytics: {
    enabled: false,
    provider: 'umami',
    umami: {
      src: '',
      websiteId: '',
      domains: ''
    }
  },
  gallery: {
    enabled: true,
    defaultLayout: 'justified',
    gap: 10,
    targetRowHeight: 220,
    lastRowBehavior: 'center',
    columnWidth: 220,
    columns: 'auto'
  },
  lightbox: {
    enabled: true
  },
  post: {}
} satisfies {
  name: string;
  shortName: string;
  description: string;
  author: {
    name: string;
    title: Record<Locale, string>;
    description: Record<Locale, string>;
    avatar: string;
    social: Array<{ name: string; url: string; icon: string }>;
  };
  contentWidth: `${number}rem`;
  ui: {
    navbar: {
      sticky: boolean;
    };
    dock: {
      enabled: boolean;
    };
  };
  nav: Array<string | { label: Record<Locale, string>; href: string; icon: string }>;
  footerNav: Array<string | { label: Record<Locale, string>; href: string; icon: string }>;
  comments: Record<string, any>;
  analytics: Record<string, any>;
  gallery: Record<string, any>;
  lightbox: Record<string, any>;
  post: Record<string, any>;
};
