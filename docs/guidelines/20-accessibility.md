
# Acessibilidade (WCAG 2.2 AA)

## HTML semântico

- Landmarks: `<header role="banner">`, `<nav aria-label="...">`, `<main id="main-content">`, `<footer>`.
- **Um** `<h1>` por página; hierarquia h1 → h2 → h3 sem pular níveis.
- Sections com `aria-labelledby` apontando para o `id` do heading.
- Listas de navegação/itens: `<ul>` + `<li>`.

## Skip link

Já existe em `Layout.astro` — nunca remover. Deve focar `#main-content` ao ativar.

## Interação

- Navegação: `<a href="...">`. Ações: `<button type="button">`.
- Ícones decorativos: `aria-hidden="true"`.
- Ícones informativos: texto alternativo ou `aria-label`.
- Links com texto descritivo — evitar "clique aqui".

## Menu mobile (`Header.astro`)

- `aria-expanded`, `aria-controls`, `aria-label` no botão toggle.
- Ao abrir: focus trap dentro do menu; **Escape** fecha e devolve foco ao botão.
- `aria-current="page"` no link ativo quando aplicável.

## Formulários (`Contact.astro`)

- Todo `<input>`/`<textarea>` com `<label for="id">` associado.
- Campos obrigatórios: `required` + `aria-required="true"`.
- Erros: `aria-invalid="true"` + `aria-describedby` apontando para mensagem.
- Agrupamentos: `<fieldset>` + `<legend>` quando fizer sentido.
- `autocomplete` adequado (`name`, `email`, `tel`).

## Foco e movimento

- `:focus-visible` definido em `global.css` — nunca remover outline sem substituto.
- Respeitar `prefers-reduced-motion: reduce` (já em `global.css`).
- Contraste mínimo: **4.5:1** texto normal, **3:1** texto grande.

## Ao adicionar interatividade nova

1. Testar fluxo completo via **Tab** (ordem lógica).
2. Adicionar teste e2e de teclado em `e2e/a11y/` (quando existir).
3. Garantir 0 violações axe-core WCAG 2.2 AA.
