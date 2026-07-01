# AGENTS.md — baseCO · Instruções para Agentes de IA

Este arquivo é o **ponto de entrada** para assistentes de IA ou novos contribuidores que trabalhem neste repositório. Leia-o antes de qualquer implementação.

## Propósito

**Template copiável** de landing page estática para pequenos negócios — copie este repositório inteiro para um novo projeto por cliente e customize conteúdo + visual.

**Prioridade de decisão:** SEO → performance → acessibilidade → estética.

## Documentação essencial

| Arquivo                                                                          | Conteúdo                                               |
| -------------------------------------------------------------------------------- | ------------------------------------------------------ |
| [`docs/NEW-LANDING-GUIDE.md`](docs/NEW-LANDING-GUIDE.md)                         | Passo a passo ao iniciar projeto de cliente            |
| [`docs/GUIA-DOS-ARQUIVOS.md`](docs/GUIA-DOS-ARQUIVOS.md)                         | Índice rápido — para que serve cada arquivo            |
| [`docs/guidelines/`](docs/guidelines/)                                           | Padrões por área (performance, a11y, SEO, componentes) |
| [`docs/templates/`](docs/templates/)                                             | Templates copiáveis para componentes e testes          |
| [`docs/PLANO-BOILERPLATE-CORPORATIVO.md`](docs/PLANO-BOILERPLATE-CORPORATIVO.md) | Roadmap técnico (fases, CWV, a11y, testes)             |

## Stack

- Astro 5 (estático) + TypeScript + Tailwind CSS 3
- Content Collections + Zod (`src/content/config.ts`)
- Decap CMS (`public/admin/`)
- Sharp (`astro:assets`)
- Bun (package manager)
- Playwright + axe-core + Lighthouse CI + pa11y-ci

## Metas de qualidade

| Gate                      | Alvo        |
| ------------------------- | ----------- |
| Lighthouse (4 categorias) | ≥ 95        |
| LCP                       | ≤ 1.8s      |
| CLS                       | ≤ 0.02      |
| WCAG                      | 2.2 AA      |
| axe-core (e2e)            | 0 violações |

## Padrões do projeto (`docs/guidelines/`)

| Guideline              | Escopo                          | Arquivo                     |
| ---------------------- | ------------------------------- | --------------------------- |
| Contexto global        | Sempre ler primeiro             | `00-project-context.md`     |
| Performance / CWV      | `*.{astro,ts,mjs}`              | `10-performance-cwv.md`     |
| Acessibilidade         | `*.{astro,html,css}`            | `20-accessibility.md`       |
| Componentes Astro      | `*.astro`                       | `30-astro-components.md`    |
| Content Collections    | `src/content/**`                | `31-content-collections.md` |
| SEO local              | layouts, seo, pages             | `40-seo-local.md`           |
| Testes e2e             | `e2e/**`                        | `50-testing-e2e.md`         |
| Novo cliente           | Copiar template                 | `60-new-landing.md`         |
| Nova página/componente | **Sempre** antes de implementar | `70-new-page-component.md`  |

## Ao adicionar página ou componente

1. Ler **`docs/guidelines/70-new-page-component.md`** (checklist completo).
2. Copiar template de `docs/templates/` (`page.astro.template` ou `component.astro.template`).
3. Conteúdo → Content Collections; visual → hooks CSS em `global.css`.
4. Rotas estáticas novas são validadas **automaticamente** por `e2e/a11y/all-routes.spec.ts`, `e2e/seo/all-routes.spec.ts`, Lighthouse e pa11y.
5. Interatividade nova → teste de teclado em `e2e/a11y/`.
6. Rodar `bun run quality` antes de merge/entrega.

## Estrutura do repositório

```
baseCO/                         # copiar este repo para cada cliente
├── src/
│   ├── components/             # Header, Hero, Features, primitives/, islands/
│   ├── seo/                    # LocalBusinessJsonLd, types
│   ├── layouts/                # Layout.astro
│   ├── pages/                  # Rotas
│   ├── content/                # JSON + Zod (Decap CMS)
│   ├── styles/                 # global.css, a11y.css
│   └── assets/                 # Imagens otimizadas (astro:assets)
├── e2e/                        # Playwright + helpers axe/teclado/SEO
├── testing/                    # discover-routes, lighthouse-budget
├── public/                     # admin CMS, og-default.jpg, favicon
├── scripts/                    # lighthouse, validate-a11y
├── docs/guidelines/            # Padrões para IA e devs
├── astro.config.mjs
├── playwright.config.ts
└── package.json
```

## Antes de codar

1. Componentes de seção → `src/components/`; SEO/JSON-LD → `src/seo/`.
2. Conteúdo de negócio → Content Collections (`src/content/`), nunca hardcoded em `.astro`.
3. Visual do cliente → bloco **DESIGN SYSTEM OVERRIDES** em `src/styles/global.css`.
4. Consulte `docs/guidelines/` para a área afetada.

## Novo cliente

1. **Duplicar** este repositório (GitHub “Use this template” ou `cp -r`).
2. Seguir `docs/NEW-LANDING-GUIDE.md` e `docs/guidelines/60-new-landing.md`.
3. Atualizar `astro.config.mjs` (`site`), conteúdo JSON, `public/admin/config.yml`.
4. Rodar `bun run quality` antes de entregar.

## Comandos

```bash
bun install
bun run dev          # servidor local :4321
bun run build        # build estática → dist/
bun run lint         # ESLint (jsx-a11y em .astro e .ts)
bun run check        # astro check (tipos)
bun run test:e2e     # Playwright + axe-core (todas as rotas)
bun run lighthouse   # Lighthouse CI (todas as rotas do dist/)
bun run a11y         # pa11y-ci pós-build (todas as rotas)
bun run quality      # pipeline completo
bun run preview      # servir dist/
```

## Componentes existentes

| Componente                  | Local                        | Responsabilidade               |
| --------------------------- | ---------------------------- | ------------------------------ |
| `Layout.astro`              | `src/layouts/`               | `<head>`, SEO, OG, skip link   |
| `SkipLink.astro`            | `src/components/primitives/` | Pular para `#main-content`     |
| `VisuallyHidden.astro`      | `src/components/primitives/` | Texto só para leitores de tela |
| `Button.astro`              | `src/components/primitives/` | `<button>` vs `<a>`, disabled  |
| `Dialog.astro`              | `src/components/primitives/` | Modal `<dialog>` + Escape      |
| `LocalBusinessJsonLd.astro` | `src/seo/`                   | Schema.org JSON-LD             |
| `Header.astro`              | `src/components/`            | Nav + menu mobile ARIA         |
| `Hero.astro`                | `src/components/`            | LCP, CTAs, hooks `.hero__*`    |
| `Features.astro`            | `src/components/`            | Grid de serviços               |
| `Testimonials.astro`        | `src/components/`            | Depoimentos semânticos         |
| `Contact.astro`             | `src/components/`            | Formulário acessível           |
| `Footer.astro`              | `src/components/`            | Links e metadados legais       |

## O que evitar

- Commits sem solicitação explícita do usuário
- JS bloqueante no critical path
- Quebrar semântica HTML ao aplicar CSS do cliente
- SVG como OG image em produção
- `z.any()` em schemas Zod

---

_Mantenha este arquivo atualizado quando novas convenções forem adotadas._
