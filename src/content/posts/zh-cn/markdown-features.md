---
title: "Astro Narrow 的 Markdown 能力"
description: "介绍 Astro Narrow 内置的 Markdown 原生能力：提示块、tabs、数学公式、Mermaid 和图库。"
pubDate: 2026-06-28
tags: ["Astro", "Markdown"]
toc: "side"
series: ["theme-guide"]
seriesOrder: 2
---

本文延续主题配置系列，介绍 Astro Narrow 内置的 Markdown 原生能力，不依赖任何 Hugo shortcode 兼容层。

## 提示块

> [!TIP]
> GitHub 风格的引用块会在构建期被转换为带样式的提示块。

## Tabs

Tabs 使用 `remark-directive` 语法，由一小段客户端脚本驱动点击与键盘导航。

## 数学公式与 Mermaid

行内公式渲染为 $a^2 + b^2 = c^2$，围栏 ` ```mermaid ` 代码块会渲染为图表。

## 图库

连续的 Markdown 图片会被归为一个两端对齐的图库，并支持 lightbox。
