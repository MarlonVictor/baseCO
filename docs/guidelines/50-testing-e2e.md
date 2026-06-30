
# Testes E2E

> Suíte planejada na Fase 1 do roadmap. Ao criar ou editar testes, siga estes padrões.

## Stack

- **Playwright** — runner, multi-browser (Chromium + mobile)
- **@axe-core/playwright** — 0 violações WCAG 2.2 AA
- Helpers compartilhados em `packages/testing/` (pós-monorepo) ou `e2e/fixtures/` (atual)

## Estrutura

```
e2e/
├── fixtures/          # page objects, helpers de teclado
├── a11y/              # axe-core + keyboard-nav
├── seo/               # meta-tags, JSON-LD
└── flows/             # navegação, formulário
```

## Cenários obrigatórios por landing

| Área | O que testar |
|------|--------------|
| SEO | `title`, `meta description`, `script[type="application/ld+json"]` |
| A11y | axe-core 0 violações em `/` |
| Teclado | Skip link → `#main-content`; menu mobile Escape |
| Landmarks | 1× `main`, 1× `h1`, `nav[aria-label]` |
| Smoke | Nenhum recurso 4xx/5xx |

## Padrão axe-core

```typescript
import AxeBuilder from '@axe-core/playwright';

const results = await new AxeBuilder({ page })
  .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
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
bun run build && bun run preview   # servir dist
bun run test:e2e                   # quando configurado
```

Não mergear features interativas sem teste e2e correspondente.
