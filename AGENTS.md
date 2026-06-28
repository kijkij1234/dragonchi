# AGENTS.md

## Project

Astro Narrow is an Astro-native content theme inspired by Hugo Narrow.

Core principles:

- Use Astro-native implementations: content collections, Astro routing, Astro components, and remark/rehype plugins.
- Do not add Hugo compatibility layers or Hugo shortcode compatibility unless explicitly requested.
- Prefer Markdown-native authoring. Add build-time remark/rehype transforms for structured Markdown patterns when needed.
- Keep configuration user-facing and readable. Prefer named keys and typed config over requiring users to import internal code.
- Keep UI changes token-driven and consistent with the narrow content layout.

## Development

Install and build:

```sh
pnpm install
pnpm build
```

When starting the dev server, use background mode:

```sh
astro dev --background
```

Manage the background server with:

```sh
astro dev status
astro dev logs
astro dev stop
```

Do not start a foreground dev server from automation unless explicitly requested.

## Documentation

Full Astro documentation: https://docs.astro.build

Consult these guides before related changes:

- Routing: https://docs.astro.build/en/guides/routing/
- Astro components: https://docs.astro.build/en/basics/astro-components/
- Framework components: https://docs.astro.build/en/guides/framework-components/
- Content collections: https://docs.astro.build/en/guides/content-collections/
- Styling: https://docs.astro.build/en/guides/styling/
- Internationalization: https://docs.astro.build/en/guides/internationalization/

For remark/rehype work, prefer established unified ecosystem packages and keep custom plugins small.

## Important Files

| File | Purpose |
| --- | --- |
| `src/config/site.ts` | Site identity, navigation, UI switches, comments, analytics, gallery, license |
| `src/config/content.ts` | Content type labels, paths, card styles, list layouts, home sections |
| `src/config/i18n.ts` | Locales and localized path helpers |
| `src/config/theme.ts` | Theme switcher options |
| `src/content.config.ts` | Astro content collection schemas |
| `src/lib/markdown/` | remark/rehype plugins |
| `src/styles/global.css` | Global tokens, prose, layout, component CSS |

## Validation

Run `pnpm build` after code, config, routing, content collection, or Markdown pipeline changes.
