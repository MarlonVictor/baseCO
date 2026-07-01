# Testes E2E

> Suíte ativa no template. Ao criar ou editar testes, siga estes padrões.

## Stack

- **Playwright** — runner, multi-browser (Chromium + mobile)
- **@axe-core/playwright** — 0 violações WCAG 2.2 AA
- Helpers em `e2e/helpers/` (`axe-setup.ts`, `seo-assertions.ts`)

## Estrutura

```
e2e/
├── helpers/           # axe-setup, seo-assertions
├── a11y/              # all-routes, keyboard-nav
├── seo/               # all-routes, robots
├── flows/             # navigation
└── visual/            # regression (chromium)
```

## Descoberta automática de rotas

Toda rota estática em `src/pages/` é detectada por `testing/discover-routes.ts` e testada em:

| Suíte                     | Arquivo                       |
| ------------------------- | ----------------------------- |
| axe-core (todas as rotas) | `e2e/a11y/all-routes.spec.ts` |
| SEO base (todas as rotas) | `e2e/seo/all-routes.spec.ts`  |
| Lighthouse CI             | `scripts/run-lighthouse.ts`   |
| pa11y-ci                  | `scripts/validate-a11y.ts`    |

Ao criar página nova estática, **não é necessário** registrar a rota manualmente nesses gates.

Rotas dinâmicas (`[slug].astro`) exigem specs dedicados — ver `docs/guidelines/70-new-page-component.md`.

## Cenários obrigatórios por landing

| Área      | O que testar                                                      |
| --------- | ----------------------------------------------------------------- |
| SEO       | `title`, `meta description`, `script[type="application/ld+json"]` |
| A11y      | axe-core 0 violações em `/`                                       |
| Teclado   | Skip link → `#main-content`; menu mobile Escape                   |
| Landmarks | 1× `main`, 1× `h1`, `nav[aria-label]`                             |
| Smoke     | Nenhum recurso 4xx/5xx                                            |

## Padrão axe-core

```typescript
import AxeBuilder from "@axe-core/playwright";

const results = await new AxeBuilder({ page })
  .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
  .analyze();
expect(results.violations).toEqual([]);
```

## Teclado

Todo componente interativo novo (menu, modal, carrossel, formulário) exige teste de:

- Tab na ordem lógica
- Enter/Space ativa controles
- Escape fecha overlays

## Execução

```bash
bun run test:e2e      # build + preview + Playwright
bun run a11y          # pa11y-ci pós-build
bun run lighthouse    # Lighthouse CI
bun run quality       # lint + build + e2e + a11y + lighthouse
```

Não mergear features interativas sem teste e2e correspondente.
