import type { Locale } from './i18n';

export const siteConfig = {
  name: 'Dragonchicken',
  shortName: 'Dragonchi',
  description: '平平无奇的网站而已',
  author: {
    name: '神龙鸡汉化组',
    title: {
      'zh-cn': '转转有惊喜'
    },
    description: {
      'zh-cn': '你在期待什么'
    },
    avatar: '/icon.png',
    social: [
      { name: '哔哩哔哩', url: 'https://space.bilibili.com/3706970171247569', icon: 'simple-icons:bilibili' },
      { name: '小红书', url: 'https://xhslink.com/m/3ITvrI6Uxex', icon: 'simple-icons:xiaohongshu' },
      { name: '企鹅交流群', url: 'https://qun.qq.com/universal-share/share?ac=1&authKey=q4gobiIV%2Bx1JWbZZl2f36mlMQdq8Aw927FI9gX%2B9Si1Cx7X52OUcj9kJB0YQMHYs&busi_data=eyJncm91cENvZGUiOiI3Nzk1MDE4MzUiLCJ0b2tlbiI6IjdvNlYwRnNyWUpPOStIMmtoemZmNmY5U00vTXhEUlVUKzBFWTdHOHA3R3dLT2RBeHNqVXBZdHhaUlVBYVRLbisiLCJ1aW4iOiIyMTUyNTczODYifQ%3D%3D&data=QPi4RL938fL179PCUvqwm3GTLc1VvSXEUx-bduyNgear-ocmKuF2LFg-HoZmZySgeocBwj2_Gl2ecxtvvyleGw&svctype=4&tempid=h5_group_info', icon: 'simple-icons:qq' }
    ]
  },
  contentWidth: '55rem',
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
