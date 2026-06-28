import { pluginCollapsibleSections } from '@expressive-code/plugin-collapsible-sections';

/** @type {import('astro-expressive-code').AstroExpressiveCodeOptions} */
export default {
  // First theme is the default (light); the dark theme activates under `.dark`.
  themes: ['github-light', 'github-dark'],
  // Dark mode is class-based (`.dark` on <html>), not the OS media query.
  useDarkModeMediaQuery: false,
  themeCssSelector: (theme) => (theme.name === 'github-dark' ? '.dark' : ':root:not(.dark)'),
  styleOverrides: {
    borderRadius: 'var(--radius-panel)',
    borderColor: 'var(--color-border)',
    codeFontSize: '0.875rem',
    frames: {
      editorActiveTabIndicatorBottomColor: 'var(--color-primary)'
    }
  },
  plugins: [pluginCollapsibleSections()]
};
