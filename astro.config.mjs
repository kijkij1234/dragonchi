// @ts-check
import { defineConfig } from 'astro/config';

import icon from 'astro-icon';

import expressiveCode from 'astro-expressive-code';
import tailwindcss from '@tailwindcss/vite';
import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { remarkReadingTime } from './src/lib/markdown/remark-reading-time.mjs';
import { rehypeHeadingAnchors } from './src/lib/markdown/rehype-heading-anchors.mjs';
import { rehypeAlerts } from './src/lib/markdown/rehype-alerts.mjs';
import { rehypeImageGroups } from './src/lib/markdown/rehype-image-groups.mjs';
import { rehypeMermaid } from './src/lib/markdown/rehype-mermaid.mjs';

// https://astro.build/config
export default defineConfig({
  i18n: {
    locales: ['en', 'zh-cn'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false
    }
  },
  integrations: [icon(), expressiveCode()],
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath, remarkReadingTime],
      rehypePlugins: [rehypeKatex, rehypeHeadingAnchors, rehypeAlerts, rehypeImageGroups, rehypeMermaid]
    })
  },
  vite: {
    plugins: [tailwindcss()]
  }
});
