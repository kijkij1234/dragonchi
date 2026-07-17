import type { Locale } from '../config/i18n';

export const languages: Record<Locale, string> = {
  'zh-cn': '简体中文'
};

export const defaultLang: Locale = 'zh-cn';

export const ui = {
  'zh-cn': {
    'archive.description': '按发布日期排列的全部作品。',
    'archive.filter.all': '全部',
    'archive.filter.categories': '分类',
    'archive.filter.empty': '没有符合筛选条件的作品。',
    'archive.filter.label': '筛选归档作品',
    'archive.filter.tags': '标签',
    'archive.results.prefix': '显示',
    'archive.results.suffix': '篇作品',
    'archive.title': '归档',
    'dock.back': '返回上一页',
    'dock.display': '显示设置',
    'dock.display.close': '关闭显示设置',
    'dock.display.reset': '恢复默认页面宽度',
    'dock.display.width': '页面宽度',
    'dock.home': '首页',
    'dock.top': '返回顶部',
    'home.featuredProjects': '精选项目',
    'home.recentPosts': '最近作品',
    'home.viewAll': '查看全部',
    'nav.colorMode': '切换明暗模式',
    'nav.language': '语言',
    'nav.menu': '菜单',
    'nav.search': '搜索',
    'nav.theme': '主题',
    'notFound.action': '返回首页',
    'notFound.description': '你访问的页面不存在。',
    'notFound.title': '页面未找到',
    'posts.description': '笔记、随笔和技术写作。',
    'posts.title': '作品',
    'postNav.next': '下一篇',
    'postNav.navigation': '作品导航',
    'postNav.previous': '上一篇',
    'series.chapterCount': '篇作品',
    'series.chapters': '章节目录',
    'series.description': '按照明确顺序组织的主题阅读路径。',
    'series.empty': '暂时没有已发布的合集。',
    'series.label': '合集',
    'series.latestChapter': '最近章节',
    'series.navigation': '合集章节导航',
    'series.nextChapter': '下一章',
    'series.previousChapter': '上一章',
    'series.title': '合集',
    'search.close': '关闭搜索',
    'search.empty': '输入关键词开始搜索',
    'search.label': '搜索',
    'search.loading': '正在加载索引',
    'search.noResults': '没有找到结果',
    'search.placeholder': '搜索内容'
  }
} as const satisfies Record<Locale, Record<string, string>>;

export type UiKey = keyof (typeof ui)[typeof defaultLang];
