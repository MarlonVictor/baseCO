# Nova página ou componente

Checklist obrigatório ao adicionar **qualquer** página (`src/pages/`) ou componente de seção (`src/components/`). Copie este arquivo como referência antes de abrir PR ou entregar ao cliente.

> Prioridade: **SEO → performance → acessibilidade → estética**

---

## 1. Antes de codar

- [ ] Ler o guideline da área afetada em `docs/guidelines/` (tabela abaixo)
- [ ] Copiar o template correspondente de `docs/templates/`
- [ ] Conteúdo de negócio → Content Collections (`src/content/`), não hardcoded em `.astro`

| Se você está criando…   | Leia                                                                                |
| ----------------------- | ----------------------------------------------------------------------------------- |
| Página nova             | `40-seo-local.md`, `50-testing-e2e.md`, este arquivo                                |
| Componente de seção     | `30-astro-components.md`, `20-accessibility.md`, `10-performance-cwv.md`            |
| Island / interatividade | `10-performance-cwv.md` (INP), `20-accessibility.md` (teclado), `50-testing-e2e.md` |
| Nova collection         | `31-content-collections.md`                                                         |

---

## 2. Nova página (`src/pages/`)

Use o template: `docs/templates/page.astro.template`

### Estrutura obrigatória

- [ ] `Layout` com `title`, `description` únicos
- [ ] `canonical` automático via Layout (exige `site` correto em `astro.config.mjs`)
- [ ] `<main id="main-content" tabindex="-1">` — **um por página**
- [ ] Exatamente **um** `<h1>` na página
- [ ] `Header` + `Footer` (ou layout compartilhado equivalente)
- [ ] JSON-LD via prop `localBusiness` quando página for landing principal

### Performance

- [ ] Seção above-the-fold: import estático
- [ ] Seções below-the-fold: `LazySection` ou import dinâmico
- [ ] No máximo **1** imagem com `loading="eager"` + `fetchpriority="high"`
- [ ] Demais imagens: `astro:assets` + `loading="lazy"` + dimensões explícitas
- [ ] Sem `<script>` bloqueante no `<head>`

### Testes — automáticos

Novas rotas estáticas em `src/pages/` são detectadas automaticamente por:

| Suíte      | Arquivo                       | O que valida                                           |
| ---------- | ----------------------------- | ------------------------------------------------------ |
| axe-core   | `e2e/a11y/all-routes.spec.ts` | WCAG 2.2 AA em **todas** as rotas                      |
| SEO base   | `e2e/seo/all-routes.spec.ts`  | title, description, canonical, OG, h1, sem 4xx         |
| Lighthouse | `scripts/run-lighthouse.ts`   | ≥ 95 nas 4 categorias em **todas** as rotas do `dist/` |
| pa11y      | `scripts/validate-a11y.ts`    | WCAG2AA em **todas** as rotas do `dist/`               |

### Testes — manuais por página (quando necessário)

Para páginas com comportamento específico, copie e adapte:

- `docs/templates/a11y-spec.ts.template` → `e2e/a11y/<pagina>.spec.ts`
- `docs/templates/seo-spec.ts.template` → `e2e/seo/<pagina>.spec.ts`

Cenários extras obrigatórios se a página tiver:

| Recurso                     | Teste adicional                                    |
| --------------------------- | -------------------------------------------------- |
| Formulário com validação JS | Tab order + `aria-invalid` em `e2e/a11y/`          |
| Modal / dialog              | Escape + focus trap                                |
| Menu ou nav customizado     | Teclado em `keyboard-nav.spec.ts` ou spec dedicado |
| JSON-LD específico          | Assert no `e2e/seo/<pagina>.spec.ts`               |

### Rotas dinâmicas (`[slug].astro`)

Não entram na descoberta automática. Ao criar rota dinâmica:

- [ ] Adicionar testes e2e com URLs de exemplo concretas
- [ ] Documentar URLs de teste neste checklist ou no spec

---

## 3. Novo componente (`src/components/`)

Use o template: `docs/templates/component.astro.template`

### Semântica e a11y

- [ ] `<section>` (ou landmark adequado) com `aria-labelledby` → `id` do heading
- [ ] Heading hierárquico (`h2` em seções; não pular níveis)
- [ ] Listas com `<ul>`/`<li>` quando for lista
- [ ] Ícones decorativos: `aria-hidden="true"`
- [ ] Botões vs links: `<button type="button">` para ações; `<a href>` para navegação

### Design System

- [ ] Hooks CSS `.componente__*` — **sem** cores/tipografia definitivas no boilerplate
- [ ] Comentários `DESIGN SYSTEM HOOK` e `ANIMAÇÃO` no final do arquivo
- [ ] `export interface Props` tipada

### Performance

- [ ] Imagens via `astro:assets` + `<Image />`
- [ ] Interatividade → island em `src/components/islands/` com `client:visible`, `client:idle` ou `client:media` — **nunca** `client:load` sem justificativa documentada no JSDoc

### Lint

- [ ] `bun run lint` — ESLint + `eslint-plugin-jsx-a11y` em `.astro` e `.ts`
- [ ] `bun run check` — TypeScript / Astro check

---

## 4. Quality gates antes de merge/entrega

```bash
bun run quality   # lint + check + build + e2e + a11y + lighthouse
```

| Gate                                      | Alvo        |
| ----------------------------------------- | ----------- |
| ESLint                                    | 0 erros     |
| astro check                               | 0 erros     |
| axe-core (todas as rotas)                 | 0 violações |
| pa11y-ci                                  | 0 erros     |
| Lighthouse (4 categorias, todas as rotas) | ≥ 95        |
| Testes e2e específicos da feature         | passando    |

---

## 5. Referência rápida de arquivos

```
docs/templates/
├── page.astro.template          # nova página
├── component.astro.template     # novo componente
├── a11y-spec.ts.template        # teste axe + landmarks
├── seo-spec.ts.template         # teste SEO específico
├── lazy-section.astro.template  # seção below-fold
└── content-collection.ts.template

e2e/helpers/
├── axe-setup.ts                 # assertNoA11yViolations
└── seo-assertions.ts            # assertBaseSeo, assertNoFailedResources

testing/discover-routes.ts       # descoberta automática de rotas
```

---

## 6. O que nunca fazer

- Hardcodar textos de negócio em `.astro` (usar Content Collections)
- Remover skip link, landmarks ou `prefers-reduced-motion`
- SVG como OG image em produção
- `client:load` em componentes não críticos
- Mergear interatividade sem teste de teclado quando aplicável
- `z.any()` em schemas Zod
