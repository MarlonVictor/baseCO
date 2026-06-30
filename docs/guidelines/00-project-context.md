
# SEO Base — Boilerplate Corporativo

Landing pages estáticas para pequenos negócios. Leia `AGENTS.md` e `docs/NEW-LANDING-GUIDE.md` para visão completa.

## Modelo: template copiável

Este repositório é um **boilerplate único** — ao fechar um cliente, **copie o repo inteiro** para um novo repositório e customize lá. Não é monorepo multi-cliente.

## Stack

- **Astro 5** (`output: 'static'`) + **TypeScript** + **Tailwind CSS 3**
- **Content Collections** com schemas **Zod** (`src/content/config.ts`)
- **Decap CMS** em `public/admin/` (conteúdo editável via Git)
- **Sharp** para otimização de imagens (`astro:assets`)
- **Bun** como package manager (compatível com npm/pnpm)
- **Playwright + axe-core**, **Lighthouse CI**, **pa11y-ci**

## Estrutura

- **`src/components/`** — seções reutilizáveis (Header, Hero, etc.)
- **`src/seo/`** — JSON-LD e tipos
- **`src/content/`** — textos do negócio (JSON)
- **`e2e/`** — testes Playwright + helpers
- **`docs/guidelines/`** — regras para IA e devs

## Metas obrigatórias (quality gates)

| Métrica | Alvo |
|---------|------|
| Lighthouse (Performance, A11y, Best Practices, SEO) | ≥ 95 cada |
| LCP | ≤ 1.8s |
| CLS | ≤ 0.02 |
| WCAG | 2.2 Nível AA |
| axe-core em e2e | 0 violações |

## Princípios inegociáveis

1. **Separação conteúdo × visual** — Textos em JSON; estilos via hooks CSS no Design System do cliente.
2. **Progressive enhancement** — Site funcional sem JS; interatividade via islands sob demanda.
3. **Zero regressão** — Toda feature nova exige teste e2e e passagem em axe-core.
4. **Semântica preservada** — Nunca quebrar landmarks, headings ou JSON-LD ao aplicar visual.

## O que NÃO fazer

- Hardcodar textos de negócio em `.astro` (usar Content Collections)
- Remover skip link, `aria-*` ou `prefers-reduced-motion`
- Usar SVG como OG image em produção (usar JPG/WebP 1200×630)
- Criar commits sem o usuário pedir explicitamente
