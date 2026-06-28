# Astro Narrow

Astro Narrow is a content-focused Astro theme inspired by [Hugo Narrow](https://github.com/tom2almighty/hugo-narrow). It keeps the Narrow reading experience, but the implementation is Astro-native: content collections, Astro routing, Astro components, and remark/rehype markdown extensions.

English is the default language. Simplified Chinese is included as an example locale.

## Quick Start

```sh
pnpm install
pnpm dev
pnpm build
```

Useful paths:

| Path | Purpose |
| --- | --- |
| `src/config/site.ts` | Site identity, navigation, UI switches, comments, analytics, gallery, license |
| `src/config/content.ts` | Content type labels, paths, card style, list layout, home sections |
| `src/config/i18n.ts` | Locales and localized URL helpers |
| `src/config/theme.ts` | Theme switcher options |
| `src/content.config.ts` | Astro content collection schemas |
| `src/content/posts/` | Blog posts |
| `src/content/projects/` | Project entries |
| `src/content/pages/` | Static pages |

## Site Config

Edit `src/config/site.ts`.

| Key | Type | Description |
| --- | --- | --- |
| `name` | `string` | Full site name, used in page titles |
| `shortName` | `string` | Compact name, used in breadcrumbs and compact UI |
| `description` | `string` | Default meta description |
| `author.name` | `string` | Author or site owner |
| `author.title` | `Record<Locale, string>` | Localized subtitle shown on the home profile card |
| `author.description` | `Record<Locale, string>` | Localized home profile copy |
| `author.avatar` | `string` | Avatar URL or public asset path |
| `author.social` | `Array<{ name, url, icon }>` | Social links. Icons use Iconify names |
| `contentWidth` | `string` | Main layout width, for example `56rem` |
| `ui.navbar.sticky` | `boolean` | Make the navbar sticky |
| `ui.dock.enabled` | `boolean` | Show the bottom dock |
| `nav` | `Array<string \| NavItem>` | Header navigation. Built-in keys: `posts`, `projects`, `archives`, `tags` |
| `footerNav` | `Array<string \| NavItem>` | Footer navigation, independent from `nav` |
| `comments.enabled` | `boolean` | Enable comments |
| `comments.provider` | `string` | Current provider key, default `giscus` |
| `comments.giscus.*` | `string` | Giscus configuration |
| `analytics.enabled` | `boolean` | Enable analytics |
| `analytics.provider` | `string` | Current provider key, default `umami` |
| `analytics.umami.*` | `string` | Umami script settings |
| `gallery.*` | `object` | Markdown gallery defaults |
| `lightbox.enabled` | `boolean` | Enable image lightbox |
| `post.relatedCount` | `number` | Number of related posts |
| `post.license.*` | `object` | Post license block |

Custom navigation item:

```ts
nav: [
  'posts',
  'projects',
  { label: { en: 'GitHub', 'zh-cn': 'GitHub' }, href: 'https://github.com/your/name', icon: 'simple-icons:github' }
]
```

## Content Types

Edit `src/config/content.ts`.

| Key | Type | Description |
| --- | --- | --- |
| `collection` | `'posts' \| 'projects' \| 'pages'` | Astro content collection |
| `path` | `string` | Route prefix |
| `icon` | `string` | Iconify icon name |
| `label` | `Record<Locale, string>` | Localized display label |
| `showMeta` | `boolean` | Show date/meta in cards |
| `cardStyle` | `'article' \| 'showcase' \| 'compact'` | Default card style |
| `listLayout` | `'stack' \| 'grid'` | List layout |
| `gridColumns` | `1 \| 2 \| 3` | Grid columns when `listLayout` is `grid` |
| `home.enabled` | `boolean` | Show this content type on home |
| `home.limit` | `number` | Number of entries on home |
| `home.featuredOnly` | `boolean` | Only show entries with `featured: true` |
| `home.title` | `Record<Locale, string>` | Localized home section title |

## Frontmatter

Common fields:

| Field | Required | Description |
| --- | --- | --- |
| `title` | yes | Entry title |
| `description` | no | Entry summary and SEO description |
| `pubDate` | posts: yes | Publication date |
| `updatedDate` | no | Last updated date |
| `draft` | no | Exclude from production lists when `true` |
| `cover` | no | Cover image URL |
| `tags` | no | Tags. Tags are the only taxonomy |
| `lang` | no | Locale override, usually inferred from path |
| `toc` | no | `true`, `false`, `"center"`, or `"side"` |
| `comments` | no | Enable comments for this entry |
| `math` | no | Document hint for math content |
| `mermaid` | no | Document hint for Mermaid diagrams |
| `gallery` | no | Document hint for image galleries |
| `lightbox` | no | Document hint for lightbox |

Project-only fields:

| Field | Type | Description |
| --- | --- | --- |
| `links` | `Array<{ label, url, icon?, variant? }>` | Project actions. Icons use Iconify names |
| `featured` | `boolean` | Show in featured home sections when enabled |

## Markdown Features

Astro Narrow favors markdown-native input and build-time remark/rehype transforms.

| Feature | Syntax |
| --- | --- |
| Alerts | GitHub style blockquotes, e.g. `> [!NOTE]` |
| Code | Fenced code blocks rendered by Expressive Code |
| Math | `$inline$` and `$$block$$` |
| Mermaid | Fenced `mermaid` code blocks |
| Gallery | Consecutive Markdown images |
| Tabs | `::::tabs` with nested `:::tab{title="..."}` directives |

Tabs example:

````md
::::tabs
:::tab{title="site.ts"}
```ts
export const siteConfig = {
  contentWidth: '56rem'
}
```
:::

:::tab{title="content.ts"}
```ts
export const contentTypes = {
  posts: { listLayout: 'stack' }
}
```
:::
::::
````

## Development Notes

- Keep changes Astro-native. Do not add Hugo compatibility layers.
- Prefer Markdown-native authoring and remark/rehype transforms over custom HTML snippets.
- Keep theme behavior in config and tokens where possible.

## 中文说明

Astro Narrow 是受 [Hugo Narrow](https://github.com/tom2almighty/hugo-narrow) 启发的 Astro 主题。它保留 Narrow 的内容阅读体验，但实现方式使用 Astro 原生能力：content collections、Astro 路由、Astro 组件和 remark/rehype Markdown 扩展。

默认语言是英文，简体中文作为示例语言提供。

常用配置文件：

| 文件 | 作用 |
| --- | --- |
| `src/config/site.ts` | 站点信息、导航、UI 开关、评论、统计、图库、版权 |
| `src/config/content.ts` | 内容类型、列表样式、卡片样式、首页区块 |
| `src/config/i18n.ts` | 多语言配置 |
| `src/config/theme.ts` | 主题列表 |
| `src/content.config.ts` | Astro 内容集合 schema |

核心原则：

- 使用 Astro-native 实现，不保留 Hugo 兼容层。
- 尽量使用 Markdown 原生写法输入内容。
- 复杂 Markdown 能力通过 remark/rehype 在构建期转换。
