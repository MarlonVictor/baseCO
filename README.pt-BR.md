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
  <a href="./README.md">🇺🇸 English</a>
</p>

<p align="center">
 <a href="#about">Sobre</a> •
 <a href="#quality-gates">Quality Gates</a> •
 <a href="#seo">SEO</a> •
 <a href="#performance">Performance</a> •
 <a href="#accessibility">Acessibilidade</a> •
 <a href="#testing">Testes</a> •
 <a href="#technologies">Stack</a> •
 <a href="#structure">Estrutura</a> •
 <a href="#started">Getting Started</a> •
 <a href="#docs">Documentação</a> •
 <a href="#deploy">Deploy</a> •
 <a href="#license">Licença</a>
</p>

<p align="center">
  <b>Boilerplate técnico de landing pages estáticas — SEO, performance, acessibilidade e testes automatizados desde o primeiro commit.</b>
</p>

<p align="center">
  Base de engenharia a partir da qual meus futuros produtos e sites de clientes são desenvolvidos: copio este repositório, customizo conteúdo e visual, e mantenho os mesmos padrões de qualidade.
</p>

<p align="center">
  <b>Prioridade de decisão:</b> SEO → performance → acessibilidade → estética
</p>

---

<h2 id="about">📌 Sobre</h2>

**baseCO** é um **template copiável** — um app Astro na raiz do repositório, duplicado por projeto ou cliente, com pipelines de qualidade já configurados.

| Princípio                       | Descrição                                                            |
| ------------------------------- | -------------------------------------------------------------------- |
| **Template copiável**           | Um repositório por cliente — duplique e customize                    |
| **Separação conteúdo × visual** | Textos em Content Collections (Zod); visual via hooks CSS            |
| **Progressive enhancement**     | Site funcional sem JS; islands só quando necessário                  |
| **Zero regressão**              | Toda entrega passa por `bun run quality`                             |
| **IA-ready**                    | `AGENTS.md` + `docs/guidelines/` para consistência em novos projetos |

Este README documenta **como a base garante qualidade técnica** — não showcase de layout, rotas, APIs ou design de interface.

---

<h2 id="quality-gates">🎯 Quality Gates</h2>

Metas obrigatórias em todo projeto derivado desta base:

| Gate                      | Alvo                    | Ferramenta               |
| ------------------------- | ----------------------- | ------------------------ |
| Lighthouse Performance    | ≥ 95                    | Lighthouse CI            |
| Lighthouse Accessibility  | ≥ 95                    | Lighthouse CI + axe-core |
| Lighthouse Best Practices | ≥ 95                    | Lighthouse CI            |
| Lighthouse SEO            | ≥ 95                    | Lighthouse CI + e2e      |
| LCP (lab)                 | ≤ 1.8s                  | Lighthouse CI            |
| CLS                       | ≤ 0.02                  | Lighthouse CI            |
| INP                       | ≤ 150ms                 | Budget + islands mínimos |
| axe-core (e2e)            | 0 violações WCAG 2.2 AA | Playwright               |
| pa11y-ci                  | 0 erros                 | pós-build                |
| ESLint + jsx-a11y         | 0 erros                 | pre-commit + CI          |
| astro check               | 0 erros                 | CI                       |

Pipeline unificado:

```bash
bun run quality   # lint + check + build + e2e + a11y + lighthouse
```

CI em [`.github/workflows/quality.yml`](./.github/workflows/quality.yml) (GitHub Actions + Bun).

---

<h2 id="seo">🔍 SEO</h2>

Configuração pronta para **SEO local** e indexação:

- **JSON-LD** `LocalBusiness` dinâmico (`src/seo/LocalBusinessJsonLd.astro`)
- **Meta-tags** centralizadas no `Layout.astro` — `title`, `description`, `canonical`, Open Graph, Twitter Card
- **`robots.txt`** + **`sitemap.xml`** automático (`@astrojs/sitemap`)
- **OG image** raster 1200×630 (`public/og-default.jpg`)
- **Descoberta automática de rotas** — novas páginas estáticas entram nos testes e no Lighthouse sem config manual

Validação automatizada em `e2e/seo/` (meta-tags, canonical, JSON-LD, `robots.txt`, smoke 4xx/5xx).

---

<h2 id="performance">⚡ Performance</h2>

Otimizações e guardrails de **Core Web Vitals**:

- Build **100% estático** (`output: 'static'`) + `compressHTML`
- Imagem LCP com `loading="eager"`, `fetchpriority="high"`, `astro:assets` + Sharp (WebP)
- **`LazySection`** para conteúdo abaixo da dobra
- **Islands** sob demanda (`client:media` no menu mobile — zero JS no desktop)
- **Performance budget** em `testing/lighthouse-budget.json` (JS ≤ 80 KB gzip, etc.)
- **Lighthouse CI** com 3 runs e assertions em todas as rotas do `dist/`

---

<h2 id="accessibility">♿ Acessibilidade</h2>

Alvo: **WCAG 2.2 Nível AA**, validado em CI.

| Recurso        | Implementação                                            |
| -------------- | -------------------------------------------------------- |
| Skip link      | `SkipLink.astro` → `#main-content`                       |
| Landmarks      | `header`, `nav`, `main`, `footer` semânticos             |
| Menu mobile    | `aria-expanded`, focus trap, Escape                      |
| `aria-current` | Navegação por âncoras atualizada por hash                |
| Foco visível   | `src/styles/a11y.css` (`:focus-visible`)                 |
| Reduced motion | `prefers-reduced-motion` em CSS global                   |
| Formulários    | Labels, `aria-required`, ordem de foco testada           |
| Primitivos     | `Button`, `Dialog` (`<dialog>` nativo), `VisuallyHidden` |

Ferramentas: **eslint-plugin-jsx-a11y**, **@axe-core/playwright**, **pa11y-ci**, testes de teclado em `e2e/a11y/keyboard-nav.spec.ts`.

---

<h2 id="testing">🧪 Testes</h2>

Suíte e2e com **descoberta automática de rotas** (`testing/discover-routes.ts`):

```
e2e/
├── a11y/       # axe-core em todas as rotas + teclado
├── seo/        # meta-tags, JSON-LD, robots.txt
├── flows/      # navegação por âncoras, aria-current
├── visual/     # regression visual (chromium)
└── helpers/    # axe-setup, seo-assertions
```

| Comando              | O que faz                     |
| -------------------- | ----------------------------- |
| `bun run test:e2e`   | Playwright (desktop + mobile) |
| `bun run a11y`       | pa11y-ci pós-build            |
| `bun run lighthouse` | Lighthouse CI                 |
| `bun run lint`       | ESLint + jsx-a11y             |
| `bun run check`      | astro check (tipos)           |

**Pre-commit:** Husky + lint-staged (ESLint + Prettier nos arquivos staged).

Ao adicionar página estática em `src/pages/`, os gates de a11y, SEO, Lighthouse e pa11y passam a cobri-la automaticamente.

---

<h2 id="technologies">💻 Stack</h2>

| Camada              | Tecnologias                                                                                               |
| ------------------- | --------------------------------------------------------------------------------------------------------- |
| **Framework**       | [Astro 5](https://astro.build/) (estático)                                                                |
| **Linguagem**       | TypeScript                                                                                                |
| **Estilos**         | Tailwind CSS 3                                                                                            |
| **Imagens**         | Sharp (`astro:assets`)                                                                                    |
| **Conteúdo**        | Content Collections + [Zod](https://zod.dev/)                                                             |
| **CMS**             | [Decap CMS](https://decapcms.org/) (`/admin`)                                                             |
| **Package manager** | [Bun](https://bun.sh/)                                                                                    |
| **E2E**             | [Playwright](https://playwright.dev/) + [@axe-core/playwright](https://github.com/dequelabs/axe-core-npm) |
| **Performance**     | [@lhci/cli](https://github.com/GoogleChrome/lighthouse-ci)                                                |
| **A11y scan**       | [pa11y-ci](https://github.com/pa11y/pa11y-ci)                                                             |
| **Lint**            | ESLint 9 + eslint-plugin-astro + jsx-a11y                                                                 |
| **CI**              | GitHub Actions                                                                                            |

---

<h2 id="structure">📁 Estrutura</h2>

```
baseCO/                     # copiar para cada novo produto/cliente
├── src/
│   ├── components/         # seções + primitives/ + islands/
│   ├── seo/                # JSON-LD, types
│   ├── content/            # JSON validado (Zod)
│   ├── layouts/            # Layout.astro (head, SEO)
│   └── pages/              # rotas estáticas
├── e2e/                    # Playwright + quality helpers
├── scripts/                # lighthouse, validate-a11y
├── testing/                # discover-routes, lighthouse-budget
├── docs/guidelines/        # padrões por área (performance, a11y, SEO…)
├── AGENTS.md               # entrada para IA
└── package.json            # scripts quality
```

---

<h2 id="started">🚀 Getting Started</h2>

<h3>Clonar</h3>

```bash
git clone https://github.com/MarlonVictor/baseCO.git
cd baseCO
```

<h3>Instalar</h3>

```bash
bun install
# ou: npm install
```

<h3>Desenvolvimento</h3>

```bash
bun run dev
```

Abra [http://localhost:4321](http://localhost:4321) · CMS em [http://localhost:4321/admin](http://localhost:4321/admin).

<h3>Validar qualidade</h3>

```bash
bun run quality
```

<h3>Build de produção</h3>

```bash
bun run build    # saída em dist/
bun run preview  # servir dist/ localmente
```

<h3>Novo projeto a partir desta base</h3>

1. Duplique o repositório (GitHub “Use this template” ou cópia local)
2. Siga [`docs/NEW-LANDING-GUIDE.md`](./docs/NEW-LANDING-GUIDE.md)
3. Rode `bun run quality` antes de entregar

---

<h2 id="docs">📚 Documentação</h2>

| Recurso                                                                                  | Conteúdo                                            |
| ---------------------------------------------------------------------------------------- | --------------------------------------------------- |
| [`AGENTS.md`](./AGENTS.md)                                                               | Ponto de entrada para IA — stack, metas, convenções |
| [`docs/guidelines/`](./docs/guidelines/)                                                 | Padrões por área (performance, a11y, SEO, testes)   |
| [`docs/guidelines/70-new-page-component.md`](./docs/guidelines/70-new-page-component.md) | Checklist ao criar página/componente                |
| [`docs/NEW-LANDING-GUIDE.md`](./docs/NEW-LANDING-GUIDE.md)                               | Passo a passo para novo cliente                     |
| [`docs/PLANO-BOILERPLATE-CORPORATIVO.md`](./docs/PLANO-BOILERPLATE-CORPORATIVO.md)       | Roadmap técnico e fases                             |
| [`docs/GUIA-DOS-ARQUIVOS.md`](./docs/GUIA-DOS-ARQUIVOS.md)                               | Índice da documentação                              |
| [`docs/templates/`](./docs/templates/)                                                   | Templates copiáveis (componente, página, testes)    |

---

<h2 id="deploy">🌐 Deploy</h2>

Instruções para **Netlify**, **Cloudflare Pages** e **Vercel**, headers de cache e snippet opcional de RUM:

→ [`docs/DEPLOY.md`](./docs/DEPLOY.md)

---

<h2 id="license">📃 Licença</h2>

Uso interno para projetos de desenvolvimento e freelancers. Distribuição restrita sob critérios do autor.
