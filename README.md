# Prizrak-Core docs

Documentation of [Prizrak-Core](https://github.com/legiz-ru/Prizrak-Core), the mihomo-based proxy core of Prizrak-Box, in English and Russian.

The content is the [MetaCubeX/Meta-Docs](https://github.com/MetaCubeX/Meta-Docs) documentation of mihomo, checked against the Prizrak-Core code, plus Prizrak-Core's own options. Options and pages that exist only in Prizrak-Core are marked with 👻. The design follows the [Prizrak-Box docs](https://docs.prizrak.app/).

Built with [Astro](https://astro.build/) and [Starlight](https://starlight.astro.build/).

## Layout

| Path | Content |
|---|---|
| `src/content/docs/` | English pages (the default locale) |
| `src/content/docs/ru/` | Russian pages, same paths |
| `src/content/docs/prizrak-core/` | Prizrak-Core features (👻) |
| `src/content/docs/remnawave/` | Remnawave host mapper integration |
| `sidebar.mjs` | The sidebar, with labels for both languages |
| `src/components/`, `src/styles/` | The Prizrak-Box design: page frame, sidebar, tokens |
| `public/img/` | Images of the mihomo pages |

Pages link to each other by absolute paths (`/config/dns/`, `/ru/config/dns/`). `astro.config.mjs` prefixes them with the site base, so the same files work on a custom domain and under `https://<owner>.github.io/<repo>/`.

## Local preview

Node.js 22.12 or newer.

```bash
npm ci
npm run dev       # http://localhost:4321
npm run build     # static site in dist/
npm run preview   # serve dist/
```

## Deploy

`.github/workflows/deploy.yml` builds the site with [withastro/action](https://github.com/withastro/action) and publishes it to GitHub Pages on every push to `main` (pull requests only build). The site is served at https://core.prizrak.app. In the repository settings **Pages → Source** must be **GitHub Actions**, and the custom domain stays in **Pages → Custom domain** (no `CNAME` file is needed with Actions). The base path comes from `actions/configure-pages`, so without the custom domain the same build works under `https://<owner>.github.io/<repo>/`.
