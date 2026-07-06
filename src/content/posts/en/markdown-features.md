---
title: "Markdown Features in Astro Narrow"
description: "A tour of the Markdown-native features Astro Narrow supports out of the box: alerts, tabs, math, Mermaid, and galleries."
pubDate: 2026-06-28
tags: ["Astro", "Markdown"]
toc: "side"
series: ["theme-guide"]
seriesOrder: 2
---

This post continues the theme guide by walking through the Markdown-native features Astro Narrow ships with, without any Hugo shortcode compatibility layer.

## Alerts

> [!TIP]
> GitHub-style blockquote alerts are transformed at build time into styled callouts.

## Tabs

Tabs use `remark-directive` syntax and are driven by a small client-side script that handles click and keyboard navigation.

## Math and Mermaid

Inline math renders as $a^2 + b^2 = c^2$, and fenced ` ```mermaid ` blocks render as diagrams.

## Galleries

Consecutive Markdown images are grouped into a justified gallery with lightbox support.
