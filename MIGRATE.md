# Astro Narrow Migration Plan

This project is an Astro-native reimplementation of the Hugo Narrow theme. The
Hugo theme in `reference/hugo-narrow` is a visual and behavioral reference only.
Do not preserve Hugo template APIs, shortcodes, params shape, render hooks, or
frontmatter compatibility unless the same behavior is also the recommended Astro
approach.

## Principles

- Build with Astro-native patterns first: Astro components, layouts, content
  collections, dynamic routes, integrations, and remark/rehype plugins.
- Do not implement a Hugo compatibility layer.
- Keep frontmatter minimal and Astro-oriented. Preserve only fields needed for
  routing, rendering, metadata, taxonomy, search, and feature toggles.
- Prefer mature libraries for domain-specific functionality.
- Use `pnpm` for package management.
- Use `astro-icon` with Iconify icon sets:
  - `lucide:*` for general UI icons.
  - `simple-icons:*` for brand icons.
- Use Tailwind CSS for typography and UI styling instead of porting Hugo Narrow's
  hand-written prose CSS.
- Do not introduce shadcn/ui as a component dependency. Reuse the token idea and
  CSS variable model where useful, but keep components Astro-native.
- Keep the implementation elegant, modular, and easy to extend.

## Reference Theme Findings

Hugo Narrow is organized around:

- `layouts/baseof.html` as the global shell.
- `layouts/_partials/navigation/*`, `layouts/_partials/ui/*`, and
  `layouts/_partials/content/*` for reusable UI.
- `layouts/_markup/*` render hooks for headings, links, images, code blocks,
  blockquotes, and Mermaid.
- `assets/js/search.js`, `toc.js`, `gallery.js`, `gallery-lightbox.js`,
  `theme-init.js`, `dock.js`, and `ui.js` for client behavior.
- `assets/css/themes.css` for OKLCH token-based color schemes and dark variants.
- `layouts/index.json` for the client-side search index.
- `layouts/timeline.html`, which turns H2 sections in normal Markdown content
  into timeline entries.

These files guide the desired behavior, not the implementation shape.

## Astro Documentation Notes

Use Astro's recommended APIs:

- Content collections with `defineCollection()` and schema validation.
- `getCollection()`, `getEntry()`, and `render()` from `astro:content`.
- Static dynamic routes via `getStaticPaths()`.
- Astro i18n routing for English and Simplified Chinese.
- Markdown customization through `markdown.processor` with remark/rehype plugins
  when needed.
- Astro integrations for features that already have official or stable
  integrations, such as `astro-expressive-code`.

## Package And Tooling

- Package manager: `pnpm`.
- Dev server must be started with background mode:

  ```bash
  astro dev --background
  ```

- Manage the background server with:

  ```bash
  astro dev status
  astro dev logs
  astro dev stop
  ```

- Existing dependencies already include:
  - `astro`
  - `astro-icon`
  - `astro-expressive-code`
  - `smart-gallery`

Expected additional dependencies include:

- `tailwindcss` and Astro/Tailwind setup as appropriate for the installed Astro
  version.
- `fuse.js` for search.
- `remark-math` and `rehype-katex` or an equivalent mature math pipeline.
- A Mermaid integration strategy based on rehype/remark or client enhancement.

## URL And i18n

Support two languages first:

- `en`
- `zh-cn`

Use locale values:

- `en`
- `zh-CN`

Recommended routing:

- Default locale is English.
- Default English URLs are unprefixed, for example `/posts/example/`.
- Chinese URLs are prefixed, for example `/zh-cn/posts/example/`.

Use Astro i18n configuration instead of Hugo's multilingual filename suffixes.

## Content Model

Use Astro content collections. Recommended collections:

- `posts`
- `projects`
- `pages`

Recommended content organization:

```text
src/content/posts/en/
src/content/posts/zh-cn/
src/content/projects/en/
src/content/projects/zh-cn/
src/content/pages/en/
src/content/pages/zh-cn/
```

Keep schema fields minimal. A post/page/project should only define fields that
the Astro implementation uses directly.

Suggested shared fields:

- `title`
- `description`
- `pubDate`
- `updatedDate`
- `draft`
- `cover`
- `tags`
- `categories`
- `series`
- `lang`
- `toc`
- `comments`
- `math`
- `mermaid`
- `gallery`
- `lightbox`

Do not preserve Hugo-specific frontmatter names or behavior when Astro-native
fields are clearer.

## Routing

Implement routes with Astro dynamic pages and `getStaticPaths()`.

Expected routes:

- Home page.
- Posts list.
- Post detail.
- Projects list.
- Project detail.
- Generic content pages.
- Archives.
- Tag pages.
- Category pages.
- Series pages.
- Search data endpoint or static JSON page.
- RSS and sitemap if added by Astro integrations or simple native generation.

Taxonomies should be derived from content collection data instead of configured
as Hugo-style taxonomy types.

## Layout And Components

Build global UI as Astro components:

- Base layout.
- SEO/head component.
- Header/navigation.
- Language switcher.
- Theme switcher.
- Dark mode switcher.
- Footer.
- Dock.
- Breadcrumbs.
- Post metadata.
- Related posts.
- License block.
- Search modal.
- TOC.
- Gallery.
- Lightbox.
- Comments.
- Analytics.

Keep component APIs small and typed. Prefer passing resolved data into
components over reading global config from many places.

## Home Page

Hugo Narrow's home page supports many configurable sections through Hugo
partials and `home.contentOrder`. The Astro migration does not need to preserve
that API.

Design the home page as an Astro-native page assembled from focused components.
It should expose a clear default composition and can be customized later through
typed config or direct component edits. Do not implement Hugo-style dynamic
partial lookup or section-name compatibility.

## Configuration

Use TypeScript configuration modules instead of Hugo YAML params:

```text
src/config/site.ts
src/config/i18n.ts
src/config/theme.ts
src/config/navigation.ts
```

Configuration should be explicit, typed, and easy to import from pages,
components, and build helpers.

## Theme System

Fully implement Hugo Narrow's color schemes in Astro:

- `default`
- `claude`
- `bumblebee`
- `emerald`
- `nord`
- `sunset`
- `abyss`
- `dracula`
- `amethyst`
- `slate`
- `twitter`
- `minimal`

Use CSS variables and OKLCH values. Keep light/dark as a separate axis from the
selected color scheme:

- `data-theme="<scheme>"` on `html`.
- `.dark` on `html` for dark mode.

Persist both settings in `localStorage`. Inline a small theme initialization
script in the document head to avoid flash of incorrect theme.

## Markdown Pipeline

Implement enhanced Markdown using Astro's markdown processor and remark/rehype
plugins where possible.

Required behavior:

- Heading IDs and visible anchor links.
- GitHub-style alert blockquotes.
- External link handling when useful.
- Math rendering.
- Mermaid rendering.
- Gallery grouping for consecutive Markdown images.
- Timeline transformation for timeline pages.

Do not implement Hugo shortcodes.

## Gallery And Lightbox

Preserve the core authoring behavior:

- Multiple consecutive Markdown images with no blank content between them are
  treated as one gallery.
- A single image remains a normal figure.
- Gallery layout uses the installed `smart-gallery` package.
- Lightbox is implemented in this project.

Prefer build-time structure generation through a rehype plugin over client-side
DOM scanning. The rendered HTML should already express whether a group is a
single figure or gallery. Client JavaScript should focus on layout hydration and
lightbox interaction.

Gallery layout modes:

- `justified`
- `masonry`
- `grid`

Lightbox requirements:

- Open image from gallery or single figure when enabled.
- Previous/next navigation for gallery images.
- Escape to close.
- Arrow key navigation.
- Click outside to close.
- Restore focus after close.
- Accessible dialog semantics.

## Search

Use `fuse.js`.

Build a static search index from content collections. Include enough data for a
useful client search experience:

- title
- description
- excerpt or plain text body summary
- URL
- language
- collection/type
- tags/categories/series
- dates

The search UI should be language-aware and keyboard accessible. Use `Cmd/Ctrl+K`
to open search.

## Code Blocks

Use `astro-expressive-code`.

Do not port Hugo Narrow's custom Chroma or Hugo render-codeblock logic. Implement
copy/collapse behavior only if it fits cleanly with Expressive Code or a small
Astro-native enhancement.

## TOC

Match Hugo Narrow's two TOC presentation modes:

- Center dropdown mode.
- Side indicator mode.

Generate TOC data from Astro-rendered headings. Use client-side
`IntersectionObserver` for active section highlighting.

## Timeline

Timeline is a normal content page mode. Authors write normal Markdown, and each
H2 starts a timeline item.

Implement this with an Astro-native transformation or component pipeline. Do not
copy Hugo's string-splitting implementation.

## Comments And Analytics

Implement a unified provider interface first, but only ship these providers in
the initial migration:

- Comments: `giscus`
- Analytics: `umami`

Leave the interface open for later providers. Do not port all Hugo Narrow
providers in the first implementation.

## First Implementation Scope

The first full rewrite should deliver:

- Astro content collections and schemas.
- i18n routing for `en` and `zh-cn`.
- Global layout and navigation.
- Full theme color scheme system.
- Dark mode.
- Home page.
- Post list and detail pages.
- Project list and detail pages.
- Generic pages.
- Archives and taxonomy pages.
- Search index and search modal with Fuse.js.
- Markdown heading anchors, alerts, math, Mermaid, gallery, and timeline.
- Smart-gallery integration.
- Custom lightbox.
- TOC center and side modes.
- Giscus comments through a provider abstraction.
- Umami analytics through a provider abstraction.

## Non-Goals

- Hugo compatibility.
- Hugo shortcodes.
- Hugo params schema compatibility.
- Hugo frontmatter compatibility beyond coincidental shared field names.
- Porting all comment and analytics providers from Hugo Narrow.
- Introducing shadcn/ui components.
- Copying Hugo template structure one-to-one.
