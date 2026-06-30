
# SEO Base — Boilerplate Corporativo

Landing pages estáticas para pequenos negócios. Leia `AGENTS.md` e `docs/PLANO-BOILERPLATE-CORPORATIVO.md` para visão completa.

## Stack

- **Astro 5** (`output: 'static'`) + **TypeScript** + **Tailwind CSS 3**
- **Content Collections** com schemas **Zod** (`apps/*/src/content/config.ts`)
- **Decap CMS** em `apps/*/public/admin/` (conteúdo editável via Git)
- **Sharp** para otimização de imagens (`astro:assets`)
- **Bun** como package manager (compatível com npm/pnpm)

## Estrutura atual (monorepo Turborepo)

- **Apps** em `apps/` — cada landing de cliente (referência: `apps/template-landing/`)
- **Pacotes** em `packages/` — `@repo/ui`, `@repo/seo`, `@repo/testing`
- Código legado na raiz (`src/`, `public/`) foi migrado — não recriar

## Metas obrigatórias (quality gates)

| Métrica | Alvo |
|---------|------|
| Lighthouse (Performance, A11y, Best Practices, SEO) | ≥ 95 cada |
| LCP | ≤ 1.8s |
| CLS | ≤ 0.02 |
| INP | ≤ 150ms |
| WCAG | 2.2 Nível AA |
| axe-core em e2e | 0 violações |

## Princípios inegociáveis

1. **Separação conteúdo × visual** — Textos em JSON/Markdown; estilos via hooks CSS (`.hero__title`, `.header__cta`) no Design System do cliente.
2. **Progressive enhancement** — Site funcional sem JS; interatividade via islands ou `<script>` não bloqueante.
3. **Zero regressão** — Toda feature nova exige teste e2e e passagem em axe-core (quando a suíte existir).
4. **Semântica preservada** — Nunca quebrar landmarks, headings ou JSON-LD ao aplicar visual do cliente.

## O que NÃO fazer

- Adicionar `<script>` bloqueante no `<head>` ou `client:load` sem justificativa
- Hardcodar textos de negócio em `.astro` (usar Content Collections)
- Remover skip link, `aria-*` ou `prefers-reduced-motion`
- Usar SVG como OG image em produção (usar JPG/WebP 1200×630)
- Criar commits sem o usuário pedir explicitamente
