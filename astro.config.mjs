import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';
import { sidebar } from './sidebar.mjs';

// The site lives on the custom domain core.prizrak.app. The workflow passes
// the Pages base path (empty with a custom domain, /<repo> without one);
// SITE can override the origin. Locally both are unset.
const site = process.env.SITE || 'https://core.prizrak.app';
const base = (process.env.BASE_PATH || '/').replace(/\/?$/, '/');

/**
 * Pages link to each other by absolute paths (/config/dns/). Astro does not
 * prefix those with `base`, so this rehype step does, for links and images.
 */
function rehypePrefixBase() {
  const prefix = base.replace(/\/$/, '');
  const fix = (url) =>
    typeof url === 'string' && prefix && url.startsWith('/') && !url.startsWith('//') && !url.startsWith(prefix + '/')
      ? prefix + url
      : url;
  const walk = (node) => {
    if (node.type === 'element') {
      if (node.tagName === 'a') node.properties.href = fix(node.properties.href);
      if (node.tagName === 'img') node.properties.src = fix(node.properties.src);
    }
    // <LinkCard href="/…"> and other components in MDX
    if ((node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement') && node.attributes) {
      for (const attr of node.attributes) {
        if (attr.type === 'mdxJsxAttribute' && attr.name === 'href') attr.value = fix(attr.value);
      }
    }
    if (node.children) node.children.forEach(walk);
  };
  return (tree) => walk(tree);
}

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  markdown: {
    rehypePlugins: [rehypePrefixBase],
  },
  integrations: [
    starlight({
      title: 'Prizrak-Core',
      description: 'Prizrak-Core documentation: a mihomo-based proxy core with Xray compatibility.',
      // The app's design tokens and their mapping onto Starlight (from the
      // Prizrak-Box docs); see the comments at the top of each file.
      customCss: ['./src/styles/tokens.css', './src/styles/theme.css'],
      expressiveCode: {
        themes: ['github-dark', 'github-light'],
        useStarlightUiThemeColors: true,
        styleOverrides: {
          borderRadius: '8px',
          borderColor: 'var(--border)',
          codeBackground: 'var(--input-bg)',
          frames: {
            shadowColor: 'transparent',
            editorTabBarBackground: 'var(--panel-soft)',
            editorActiveTabBackground: 'var(--input-bg)',
            terminalTitlebarBackground: 'var(--panel-soft)',
            terminalBackground: 'var(--input-bg)',
          },
        },
      },
      defaultLocale: 'root',
      locales: {
        root: { label: 'English', lang: 'en' },
        ru: { label: 'Русский', lang: 'ru' },
      },
      logo: {
        src: './src/assets/appicon.png',
        alt: 'Prizrak-Core',
      },
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/legiz-ru/Prizrak-Core' },
        { icon: 'telegram', label: 'Telegram', href: 'https://t.me/legiz_trashbag' },
      ],
      sidebar,
      editLink: {
        baseUrl: 'https://github.com/legiz-ru/prizrak-core-go-docs/edit/main/',
      },
      lastUpdated: true,
      components: {
        PageFrame: './src/components/PageFrame.astro',
        Header: './src/components/Header.astro',
        SiteTitle: './src/components/SiteTitle.astro',
        Sidebar: './src/components/CustomSidebar.astro',
        TwoColumnContent: './src/components/TwoColumnContent.astro',
        ThemeSelect: './src/components/ThemeSelect.astro',
        LanguageSelect: './src/components/LanguageSelect.astro',
      },
    }),
  ],
});
