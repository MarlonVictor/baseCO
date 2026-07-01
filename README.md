<h1 align="center" style="font-weight: bold;">
  <img src="./public/favicon.svg" width="120px" alt="baseCO">
</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Astro-5-BC52EE?style=for-the-badge&logo=astro&logoColor=white&labelColor=09090A" alt="Astro 5" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white&labelColor=09090A" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Playwright-E2E-2EAD33?style=for-the-badge&logo=playwright&logoColor=white&labelColor=09090A" alt="Playwright" />
  <img src="https://img.shields.io/badge/WCAG-2.2_AA-005A9C?style=for-the-badge&logo=w3c&logoColor=white&labelColor=09090A" alt="WCAG 2.2 AA" />
  <img src="https://img.shields.io/github/last-commit/MarlonVictor/baseCO?style=for-the-badge&logo=git&logoColor=white&labelColor=09090A&color=ff4d1d" alt="last commit" />
</p>

<p align="center">
  <a href="./README.pt-BR.md">🇧🇷 Português (pt-BR)</a>
</p>

<p align="center">
 <a href="#about">About</a> •
 <a href="#quality-gates">Quality Gates</a> •
 <a href="#seo">SEO</a> •
 <a href="#performance">Performance</a> •
 <a href="#accessibility">Accessibility</a> •
 <a href="#testing">Testing</a> •
 <a href="#technologies">Stack</a> •
 <a href="#structure">Structure</a> •
 <a href="#started">Getting Started</a> •
 <a href="#docs">Documentation</a> •
 <a href="#deploy">Deploy</a> •
 <a href="#license">License</a>
</p>

<p align="center">
  <b>Technical boilerplate for static landing pages — SEO, performance, accessibility, and automated testing from day one.</b>
</p>

<p align="center">
  The engineering base behind my future products and client sites: I copy this repository, customize content and visuals, and keep the same quality standards.
</p>

<p align="center">
  <b>Decision priority:</b> SEO → performance → accessibility → aesthetics
</p>

---

<h2 id="about">📌 About</h2>

**baseCO** is a **copyable template** — a single Astro app at the repo root, duplicated per project or client, with quality pipelines already wired in.

| Principle                       | Description                                                      |
| ------------------------------- | ---------------------------------------------------------------- |
| **Copyable template**           | One repository per client — duplicate and customize              |
| **Content × visual separation** | Copy in Content Collections (Zod); styling via CSS hooks         |
| **Progressive enhancement**     | Works without JS; islands only when needed                       |
| **Zero regression**             | Every delivery runs through `bun run quality`                    |
| **AI-ready**                    | `AGENTS.md` + `docs/guidelines/` for consistency across projects |

This README documents **how the base enforces technical quality** — not layout showcases, routes, APIs, or UI design.

---

<h2 id="quality-gates">🎯 Quality Gates</h2>

Mandatory targets for every project built from this base:

| Gate                      | Target                   | Tool                     |
| ------------------------- | ------------------------ | ------------------------ |
| Lighthouse Performance    | ≥ 95                     | Lighthouse CI            |
| Lighthouse Accessibility  | ≥ 95                     | Lighthouse CI + axe-core |
| Lighthouse Best Practices | ≥ 95                     | Lighthouse CI            |
| Lighthouse SEO            | ≥ 95                     | Lighthouse CI + e2e      |
| LCP (lab)                 | ≤ 1.8s                   | Lighthouse CI            |
| CLS                       | ≤ 0.02                   | Lighthouse CI            |
| INP                       | ≤ 150ms                  | Budget + minimal islands |
| axe-core (e2e)            | 0 WCAG 2.2 AA violations | Playwright               |
| pa11y-ci                  | 0 errors                 | post-build               |
| ESLint + jsx-a11y         | 0 errors                 | pre-commit + CI          |
| astro check               | 0 errors                 | CI                       |

Unified pipeline:

```bash
bun run quality   # lint + check + build + e2e + a11y + lighthouse
```

CI: [`.github/workflows/quality.yml`](./.github/workflows/quality.yml) (GitHub Actions + Bun).

---

<h2 id="seo">🔍 SEO</h2>

Ready for **local SEO** and indexing:

- Dynamic **JSON-LD** `LocalBusiness` (`src/seo/LocalBusinessJsonLd.astro`)
- **Meta tags** in `Layout.astro` — `title`, `description`, `canonical`, Open Graph, Twitter Card
- **`robots.txt`** + automatic **`sitemap.xml`** (`@astrojs/sitemap`)
- Raster **OG image** 1200×630 (`public/og-default.jpg`)
- **Automatic route discovery** — new static pages are picked up by tests and Lighthouse without manual config

Automated checks in `e2e/seo/` (meta tags, canonical, JSON-LD, `robots.txt`, 4xx/5xx smoke).

---

<h2 id="performance">⚡ Performance</h2>

**Core Web Vitals** optimizations and guardrails:

- **Fully static** build (`output: 'static'`) + `compressHTML`
- LCP image with `loading="eager"`, `fetchpriority="high"`, `astro:assets` + Sharp (WebP)
- **`LazySection`** for below-the-fold content
- **Islands** on demand (`client:media` for mobile menu — no JS on desktop)
- **Performance budget** in `testing/lighthouse-budget.json` (JS ≤ 80 KB gzip, etc.)
- **Lighthouse CI** — 3 runs, assertions on every route in `dist/`

---

<h2 id="accessibility">♿ Accessibility</h2>

Target: **WCAG 2.2 Level AA**, enforced in CI.

| Feature        | Implementation                                           |
| -------------- | -------------------------------------------------------- |
| Skip link      | `SkipLink.astro` → `#main-content`                       |
| Landmarks      | Semantic `header`, `nav`, `main`, `footer`               |
| Mobile menu    | `aria-expanded`, focus trap, Escape                      |
| `aria-current` | Hash-based anchor navigation                             |
| Focus visible  | `src/styles/a11y.css` (`:focus-visible`)                 |
| Reduced motion | `prefers-reduced-motion` in global CSS                   |
| Forms          | Labels, `aria-required`, focus order tested              |
| Primitives     | `Button`, `Dialog` (native `<dialog>`), `VisuallyHidden` |

Tools: **eslint-plugin-jsx-a11y**, **@axe-core/playwright**, **pa11y-ci**, keyboard tests in `e2e/a11y/keyboard-nav.spec.ts`.

---

<h2 id="testing">🧪 Testing</h2>

E2E suite with **automatic route discovery** (`testing/discover-routes.ts`):

```
e2e/
├── a11y/       # axe-core on all routes + keyboard
├── seo/        # meta tags, JSON-LD, robots.txt
├── flows/      # anchor navigation, aria-current
├── visual/     # visual regression (chromium)
└── helpers/    # axe-setup, seo-assertions
```

| Command              | Purpose                       |
| -------------------- | ----------------------------- |
| `bun run test:e2e`   | Playwright (desktop + mobile) |
| `bun run a11y`       | pa11y-ci post-build           |
| `bun run lighthouse` | Lighthouse CI                 |
| `bun run lint`       | ESLint + jsx-a11y             |
| `bun run check`      | astro check (types)           |

**Pre-commit:** Husky + lint-staged (ESLint + Prettier on staged files).

Adding a static page under `src/pages/` automatically extends a11y, SEO, Lighthouse, and pa11y coverage.

---

<h2 id="technologies">💻 Stack</h2>

| Layer               | Technologies                                                                                              |
| ------------------- | --------------------------------------------------------------------------------------------------------- |
| **Framework**       | [Astro 5](https://astro.build/) (static)                                                                  |
| **Language**        | TypeScript                                                                                                |
| **Styling**         | Tailwind CSS 3                                                                                            |
| **Images**          | Sharp (`astro:assets`)                                                                                    |
| **Content**         | Content Collections + [Zod](https://zod.dev/)                                                             |
| **CMS**             | [Decap CMS](https://decapcms.org/) (`/admin`)                                                             |
| **Package manager** | [Bun](https://bun.sh/)                                                                                    |
| **E2E**             | [Playwright](https://playwright.dev/) + [@axe-core/playwright](https://github.com/dequelabs/axe-core-npm) |
| **Performance**     | [@lhci/cli](https://github.com/GoogleChrome/lighthouse-ci)                                                |
| **A11y scan**       | [pa11y-ci](https://github.com/pa11y/pa11y-ci)                                                             |
| **Lint**            | ESLint 9 + eslint-plugin-astro + jsx-a11y                                                                 |
| **CI**              | GitHub Actions                                                                                            |

---

<h2 id="structure">📁 Structure</h2>

```
baseCO/                     # copy for each new product or client
├── src/
│   ├── components/         # sections + primitives/ + islands/
│   ├── seo/                # JSON-LD, types
│   ├── content/            # Zod-validated JSON
│   ├── layouts/            # Layout.astro (head, SEO)
│   └── pages/              # static routes
├── e2e/                    # Playwright + quality helpers
├── scripts/                # lighthouse, validate-a11y
├── testing/                # discover-routes, lighthouse-budget
├── docs/guidelines/        # standards (performance, a11y, SEO…)
├── AGENTS.md               # AI entry point
└── package.json            # quality scripts
```

---

<h2 id="started">🚀 Getting Started</h2>

<h3>Clone</h3>

```bash
git clone https://github.com/MarlonVictor/baseCO.git
cd baseCO
```

<h3>Install</h3>

```bash
bun install
# or: npm install
```

<h3>Development</h3>

```bash
bun run dev
```

Open [http://localhost:4321](http://localhost:4321) · CMS at [http://localhost:4321/admin](http://localhost:4321/admin).

<h3>Run quality checks</h3>

```bash
bun run quality
```

<h3>Production build</h3>

```bash
bun run build    # output → dist/
bun run preview  # serve dist/ locally
```

<h3>New project from this base</h3>

1. Duplicate the repository (GitHub “Use this template” or local copy)
2. Follow [`docs/NEW-LANDING-GUIDE.md`](./docs/NEW-LANDING-GUIDE.md)
3. Run `bun run quality` before delivery

---

<h2 id="docs">📚 Documentation</h2>

| Resource                                                                                 | Content                                             |
| ---------------------------------------------------------------------------------------- | --------------------------------------------------- |
| [`AGENTS.md`](./AGENTS.md)                                                               | AI entry point — stack, goals, conventions          |
| [`docs/guidelines/`](./docs/guidelines/)                                                 | Standards by area (performance, a11y, SEO, testing) |
| [`docs/guidelines/70-new-page-component.md`](./docs/guidelines/70-new-page-component.md) | Checklist for new pages/components                  |
| [`docs/NEW-LANDING-GUIDE.md`](./docs/NEW-LANDING-GUIDE.md)                               | Step-by-step for a new client                       |
| [`docs/PLANO-BOILERPLATE-CORPORATIVO.md`](./docs/PLANO-BOILERPLATE-CORPORATIVO.md)       | Technical roadmap and phases                        |
| [`docs/GUIA-DOS-ARQUIVOS.md`](./docs/GUIA-DOS-ARQUIVOS.md)                               | Documentation index                                 |
| [`docs/templates/`](./docs/templates/)                                                   | Copyable templates (components, pages, tests)       |

---

<h2 id="deploy">🌐 Deploy</h2>

**Netlify**, **Cloudflare Pages**, and **Vercel** — cache headers and optional RUM snippet:

→ [`docs/DEPLOY.md`](./docs/DEPLOY.md)

---

<h2 id="license">📃 License</h2>

Internal use for development and freelance projects. Restricted distribution at the author's discretion.
