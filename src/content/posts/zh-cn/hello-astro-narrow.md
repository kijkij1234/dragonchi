---
title: "你好，Astro Narrow"
description: "用于检查排版、图库、数学公式、Mermaid、封面图和分类法的完整 Markdown 示例。"
pubDate: 2026-06-27
cover: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80"
tags: ["Astro", "主题", "Markdown"]
categories: ["开发"]
series: "迁移"
toc: "side"
math: true
mermaid: true
gallery: true
lightbox: true
---

## 为什么选择 Astro

Astro Narrow 使用内容集合、Astro 组件和 Markdown 管线来实现主题能力，不保留
Hugo 的模板兼容层。路由由集合生成，Markdown 由 remark/rehype 增强，交互只在
需要的地方加载。

> [!NOTE]
> 这个提示块使用 GitHub 风格的引用语法书写。

## 排版

内容页面需要稳定的阅读节奏。这段文字包含一个[内部链接](/zh-cn/posts/)，
也可以用来检查浅色和深色模式下的行高、换行和对比度。

### 列表

- 内容集合提供 typed frontmatter。
- Astro 组件让布局边界更清晰。
- 少量客户端脚本处理搜索、主题切换、图库和目录。

1. 编写 Markdown。
2. 让 Astro 渲染内容。
3. 只增强需要交互的部分。

### 表格

| 功能 | 实现方式 |
| --- | --- |
| 搜索 | 基于静态 JSON 索引的 Fuse.js |
| 代码块 | Astro Expressive Code |
| 图库 | 构建期 Markdown 分组加 smart-gallery |
| 主题 | CSS 变量，颜色方案和明暗模式分离 |

## 代码

```ts title="theme.ts" {5} ins={2} del={3}
type ThemeMode = 'light' | 'dark';
const defaultMode: ThemeMode = 'light';
const defaultMode: ThemeMode = 'auto';

export function setTheme(mode: ThemeMode) {
  document.documentElement.classList.toggle('dark', mode === 'dark');
}
```

```astro title="AuthorCard.astro" {6-8}
---
const title = 'Astro 组件';
---

<section class="surface-card">
  <h2>{title}</h2>
  <slot />
</section>
```

```diff lang="ts" title="content-schema.diff"
 const posts = defineCollection({
-  schema: oldPostSchema
+  loader: glob({ base: './src/content/posts', pattern: '**/*.{md,mdx}' }),
+  schema: postSchema
 })
```

```bash title="terminal"
pnpm install
pnpm build
```

```json title="theme.json" {2-3}
{
  "theme": "default",
  "colorMode": "dark",
  "features": ["search", "toc", "gallery"]
}
```

```css title="tokens.css" {2}
:root {
  --radius: 0.75rem;
  --color-background: oklch(1 0 0);
}
```

```ts title="collapsible-example.ts" collapse={1-6, 20-24}
import { getCollection } from 'astro:content';
import { siteConfig } from '../config/site';
import { formatDate } from '../lib/content/entries';

const posts = await getCollection('posts');
const locale = 'zh-cn';

export function summarize() {
  return posts.map((post) => ({
    title: post.data.title,
    description: post.data.description,
    date: formatDate(post.data.pubDate, locale),
    site: siteConfig.name
  }));
}

console.log(summarize());

function unusedDebugHelper() {
  console.log('这一段默认折叠。');
  console.log('可以用来检查长代码块。');
  console.log('Expressive Code 会保持阅读节奏紧凑。');
}
```

## 单图

![单张风景图](https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80 "单图说明")

## 图库

下面这些图片在 Markdown 中连续书写，因此会被构建成同一个图库。

![图片一](https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80 "安静的风景")
![图片二](https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1200&q=80 "绿色森林")
![图片三](https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80 "湖泊与山")

## 数学

行内公式：$E = mc^2$。

$$
\int_0^1 x^2 dx = \frac{1}{3}
$$

## Mermaid

```mermaid
flowchart LR
  A[Markdown] --> B[Astro 渲染]
  B --> C[组件]
  C --> D[静态页面]
```

## 提示块

> [!TIP]
> 需要图库时，只要连续书写多张 Markdown 图片，不需要自定义语法。

> [!WARNING]
> 外部图片的尺寸不一定能在构建期获取，因此图库会在浏览器加载图片前使用保守默认值。
