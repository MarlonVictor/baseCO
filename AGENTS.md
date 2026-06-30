# AGENTS.md — Instruções para Agentes de IA

Este arquivo é o **ponto de entrada** para assistentes de IA ou novos contribuidores que trabalhem neste repositório. Leia-o antes de qualquer implementação.

## Propósito

Boilerplate de **landing pages estáticas** para pequenos negócios, evoluindo para **monorepo corporativo de alta performance**.

**Prioridade de decisão:** performance → acessibilidade → SEO → estética.

## Documentação essencial

| Arquivo | Conteúdo |
|---------|----------|
| [`docs/PLANO-BOILERPLATE-CORPORATIVO.md`](docs/PLANO-BOILERPLATE-CORPORATIVO.md) | Roadmap completo, arquitetura alvo, quality gates |
| [`docs/NEW-LANDING-GUIDE.md`](docs/NEW-LANDING-GUIDE.md) | Passo a passo para nova landing de cliente |
| [`docs/GUIA-DOS-ARQUIVOS.md`](docs/GUIA-DOS-ARQUIVOS.md) | Índice rápido — para que serve cada arquivo |
| [`docs/guidelines/`](docs/guidelines/) | Padrões por área (performance, a11y, SEO, componentes) |
| [`docs/templates/`](docs/templates/) | Templates copiáveis para componentes e testes |

## Stack

- Astro 5 (estático) + TypeScript + Tailwind CSS 3
- Turborepo + Bun workspaces
- Content Collections + Zod (`apps/*/src/content/config.ts`)
- Decap CMS (`apps/*/public/admin/`)
- Sharp (`astro:assets`)
- Bun (package manager)

## Metas de qualidade

| Gate | Alvo |
|------|------|
| Lighthouse (4 categorias) | ≥ 95 |
| LCP | ≤ 1.8s |
| CLS | ≤ 0.02 |
| WCAG | 2.2 AA |
| axe-core (e2e) | 0 violações |

## Padrões do projeto (`docs/guidelines/`)

Consulte o arquivo correspondente à área que você está alterando:

| Guideline | Escopo | Arquivo |
|-----------|--------|---------|
| Contexto global | Sempre ler primeiro | `00-project-context.md` |
| Performance / CWV | `*.{astro,ts,tsx,mjs}` | `10-performance-cwv.md` |
| Acessibilidade | `*.{astro,tsx,html,css}` | `20-accessibility.md` |
| Componentes Astro | `*.astro` | `30-astro-components.md` |
| Content Collections | `apps/*/src/content/**` | `31-content-collections.md` |
| SEO local | layouts, seo, pages | `40-seo-local.md` |
| Testes e2e | `e2e/**` | `50-testing-e2e.md` |
| Nova landing | Novo cliente | `60-new-landing.md` |

## Estrutura do repositório

```
seo-base/
├── apps/
│   └── template-landing/     # Landing de referência
│       ├── src/              # layouts, pages, content, styles
│       ├── public/           # admin CMS, assets, og-default.jpg
│       └── e2e/              # Playwright (SEO + a11y)
├── packages/
│   ├── ui/                   # @repo/ui — Header, Hero, Features, etc.
│   ├── seo/                  # @repo/seo — LocalBusinessJsonLd, types
│   └── testing/              # @repo/testing — axe-setup helpers
├── docs/
│   ├── guidelines/           # Padrões de desenvolvimento
│   └── templates/
├── turbo.json
└── eslint.config.js
```

## Antes de codar

1. Identifique se altera **app** (`apps/`) ou **pacote compartilhado** (`packages/`).
2. Componentes reutilizáveis → `@repo/ui`; SEO/JSON-LD → `@repo/seo`.
3. Consulte `docs/guidelines/` para a área afetada.
4. Não hardcodar conteúdo de negócio — usar Content Collections.

## Ao criar componente Astro

1. Se reutilizável → `packages/ui/src/`; se específico do app → `apps/<app>/src/`.
2. Importar nos apps via `@repo/ui/Componente.astro`.
3. Seguir estrutura: JSDoc → Props tipadas → HTML semântico → hooks DS.

## Ao criar landing de cliente

1. Seguir `docs/NEW-LANDING-GUIDE.md` e `docs/guidelines/60-new-landing.md`.
2. Atualizar `astro.config.mjs` (`site`), conteúdo JSON, `config.yml` do CMS.
3. Aplicar visual via `global.css` (bloco DESIGN SYSTEM OVERRIDES).
4. OG image: JPG/WebP 1200×630 (não SVG).
5. Rodar quality gates antes de considerar pronto.

## Ao adicionar interatividade

- Menu mobile: `aria-expanded`, focus trap, Escape fecha.
- Formulários: labels, `aria-invalid`, `aria-describedby` em erros.
- Adicionar teste e2e de teclado + axe-core quando a suíte existir.

## Comandos

```bash
bun install
bun run dev          # turbo dev (apps/template-landing)
bun run build        # turbo build
bun run lint         # ESLint monorepo
bun run test:e2e     # Playwright + axe-core
bun run preview      # turbo preview

# App isolado:
cd apps/template-landing && bun run dev
```

## O que evitar

- Commits sem solicitação explícita do usuário
- JS bloqueante no critical path
- Quebrar semântica HTML ao aplicar CSS do cliente
- Bibliotecas pesadas em componentes above-the-fold
- `z.any()` em schemas Zod
- SVG como OG image em produção

## Componentes existentes (referência)

| Componente | Pacote | Responsabilidade |
|------------|--------|------------------|
| `Layout.astro` | app | `<head>`, SEO, OG, skip link |
| `LocalBusinessJsonLd.astro` | `@repo/seo` | Schema.org JSON-LD |
| `Header.astro` | `@repo/ui` | Nav + menu mobile ARIA |
| `Hero.astro` | `@repo/ui` | LCP, CTAs, hooks `.hero__*` |
| `Features.astro` | `@repo/ui` | Grid de serviços/diferenciais |
| `Testimonials.astro` | `@repo/ui` | Depoimentos semânticos |
| `Contact.astro` | `@repo/ui` | Formulário acessível + info |
| `Footer.astro` | `@repo/ui` | Links e metadados legais |

---

*Mantenha este arquivo atualizado quando novas convenções forem adotadas.*
