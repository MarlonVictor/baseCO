# Componentes Astro

## Estrutura de arquivo

1. Bloco de comentário JSDoc (propósito, a11y, hooks do DS).
2. Imports + `export interface Props` tipada.
3. Destructuring de props com defaults sensatos.
4. Template HTML semântico.
5. Comentários `DESIGN SYSTEM HOOK` e `ANIMAÇÃO` no final.
6. `<script>` apenas se necessário — como módulo, não `is:inline`.

## Nomenclatura de classes (hooks do Design System)

Padrão BEM simplificado — **classes vazias no boilerplate**, estilizadas pelo DS do cliente:

| Componente | Exemplos de hooks                                                    |
| ---------- | -------------------------------------------------------------------- |
| Hero       | `.hero`, `.hero__title`, `.hero__cta`, `.hero__cta--primary`         |
| Header     | `.header`, `.header__brand`, `.header__link`, `.header__menu-toggle` |
| Features   | `.features`, `.features__item`, `.features__icon`                    |
| Contact    | `.contact`, `.contact__form`, `.contact__field`                      |

Não aplicar cores/tipografia definitivas nos componentes base — reservar para `global.css` (bloco DESIGN SYSTEM OVERRIDES) ou CSS externo.

## Props

- Exportar `export interface Props` (e sub-tipos quando necessário).
- CTAs: `{ label: string; href: string; ariaLabel?: string }`.
- Dados de negócio vêm de Content Collections, não hardcoded em props default de produção.

## Imagens

- Sempre `astro:assets` (`import x from '~/assets/...'` + `<Image />`).
- `alt` descritivo; `alt=""` só se puramente decorativa.

## Páginas (`src/pages/`)

- Compor com `Layout` + sequência semântica: Header → main → Footer.
- SEO e JSON-LD configurados via props do `Layout`.
- Consumir conteúdo com `getCollection()` — ver regra `31-content-collections`.

## Novo componente — checklist

Ver checklist completo em **`70-new-page-component.md`**. Resumo:

- [ ] Section com `aria-labelledby` + heading com `id`
- [ ] Hooks CSS `.componente__*` reservados
- [ ] Props tipadas
- [ ] Comentários DS HOOK / ANIMAÇÃO
- [ ] Sem JS bloqueante; island só se interativo
- [ ] `bun run lint` + `bun run check`
