# AGENTS.md — Instruções para Agentes de IA

Este arquivo é o **ponto de entrada** para assistentes de IA ou novos contribuidores que trabalhem neste repositório. Leia-o antes de qualquer implementação.

## Propósito

**Template copiável** de landing page estática para pequenos negócios — copie este repositório inteiro para um novo projeto por cliente e customize conteúdo + visual.

**Prioridade de decisão:** performance → acessibilidade → SEO → estética.

## Documentação essencial

| Arquivo | Conteúdo |
|---------|----------|
| [`docs/NEW-LANDING-GUIDE.md`](docs/NEW-LANDING-GUIDE.md) | Passo a passo ao iniciar projeto de cliente |
| [`docs/GUIA-DOS-ARQUIVOS.md`](docs/GUIA-DOS-ARQUIVOS.md) | Índice rápido — para que serve cada arquivo |
| [`docs/guidelines/`](docs/guidelines/) | Padrões por área (performance, a11y, SEO, componentes) |
| [`docs/templates/`](docs/templates/) | Templates copiáveis para componentes e testes |
| [`docs/PLANO-BOILERPLATE-CORPORATIVO.md`](docs/PLANO-BOILERPLATE-CORPORATIVO.md) | Roadmap histórico (referência) |

## Stack

- Astro 5 (estático) + TypeScript + Tailwind CSS 3
- Content Collections + Zod (`src/content/config.ts`)
- Decap CMS (`public/admin/`)
- Sharp (`astro:assets`)
- Bun (package manager)
- Playwright + axe-core + Lighthouse CI + pa11y-ci

## Metas de qualidade

| Gate | Alvo |
|------|------|
| Lighthouse (4 categorias) | ≥ 95 |
| LCP | ≤ 1.8s |
| CLS | ≤ 0.02 |
| WCAG | 2.2 AA |
| axe-core (e2e) | 0 violações |

## Padrões do projeto (`docs/guidelines/`)

| Guideline | Escopo | Arquivo |
|-----------|--------|---------|
| Contexto global | Sempre ler primeiro | `00-project-context.md` |
| Performance / CWV | `*.{astro,ts,mjs}` | `10-performance-cwv.md` |
| Acessibilidade | `*.{astro,html,css}` | `20-accessibility.md` |
| Componentes Astro | `*.astro` | `30-astro-components.md` |
| Content Collections | `src/content/**` | `31-content-collections.md` |
| SEO local | layouts, seo, pages | `40-seo-local.md` |
| Testes e2e | `e2e/**` | `50-testing-e2e.md` |
| Novo cliente | Copiar template | `60-new-landing.md` |

## Estrutura do repositório

```
seo-base/                       # copiar este repo para cada cliente
├── src/
│   ├── components/             # Header, Hero, Features, primitives/, islands/
│   ├── seo/                    # LocalBusinessJsonLd, types
│   ├── layouts/                # Layout.astro
│   ├── pages/                  # Rotas
│   ├── content/                # JSON + Zod (Decap CMS)
│   ├── styles/                 # global.css, a11y.css
│   └── assets/                 # Imagens otimizadas (astro:assets)
├── e2e/                        # Playwright + helpers axe/teclado
├── public/                     # admin CMS, og-default.jpg, favicon
├── scripts/                    # lighthouse, validate-a11y
├── testing/                    # lighthouse-budget.json
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
bun run lint         # ESLint
bun run test:e2e     # Playwright + axe-core
bun run lighthouse   # Lighthouse CI
bun run a11y         # pa11y-ci pós-build
bun run quality      # pipeline completo
bun run preview      # servir dist/
```

## Componentes existentes

| Componente | Local | Responsabilidade |
|------------|-------|------------------|
| `Layout.astro` | `src/layouts/` | `<head>`, SEO, OG, skip link |
| `LocalBusinessJsonLd.astro` | `src/seo/` | Schema.org JSON-LD |
| `Header.astro` | `src/components/` | Nav + menu mobile ARIA |
| `Hero.astro` | `src/components/` | LCP, CTAs, hooks `.hero__*` |
| `Features.astro` | `src/components/` | Grid de serviços |
| `Testimonials.astro` | `src/components/` | Depoimentos semânticos |
| `Contact.astro` | `src/components/` | Formulário acessível |
| `Footer.astro` | `src/components/` | Links e metadados legais |

## O que evitar

- Commits sem solicitação explícita do usuário
- JS bloqueante no critical path
- Quebrar semântica HTML ao aplicar CSS do cliente
- SVG como OG image em produção
- `z.any()` em schemas Zod

---

*Mantenha este arquivo atualizado quando novas convenções forem adotadas.*
