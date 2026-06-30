
# SEO Local

## Layout (`src/layouts/Layout.astro`)

Toda página usa `Layout` com props obrigatórias:

- `title` — único por página, ≤ 60 caracteres ideal
- `description` — ≤ 160 caracteres
- `canonical` — URL absoluta de produção
- `image` — OG image (JPG/WebP **1200×630** em produção; não SVG)
- `noindex` — só em páginas que não devem indexar
- `localBusiness` — schema LocalBusiness quando aplicável

## JSON-LD (`LocalBusinessJsonLd.astro`)

- Tipo padrão: `LocalBusiness` (extensível para `Restaurant`, `Dentist`, etc.).
- Campos obrigatórios em produção: `name`, `url`, `address`, `telephone`, `geo`.
- Validar com [Google Rich Results Test](https://search.google.com/test/rich-results) antes de entregar.

## Meta-tags

Já gerenciadas pelo Layout — não duplicar `<title>` ou `<meta name="description">` nas páginas.

Checklist por página:
- [ ] `title` e `description` únicos
- [ ] `canonical` aponta para URL de produção (`astro.config.mjs` → `site`)
- [ ] `theme-color` coerente com identidade
- [ ] `robots`: `index, follow` (default) ou `noindex` explícito
- [ ] Twitter Card + Open Graph preenchidos (automático via Layout)

## `astro.config.mjs`

```javascript
site: 'https://dominio-do-cliente.com.br',  // obrigatório em produção
output: 'static',
trailingSlash: 'never',
```

## Futuro (quando implementado)

- `@astrojs/sitemap` para `sitemap.xml` automático
- `robots.txt` em `public/`
- `hreflang` se multilíngue

## Ao criar nova página

1. Definir `pageTitle`, `pageDescription` e `localBusiness` no frontmatter.
2. Passar para `<Layout>` — nunca montar `<head>` manualmente fora do Layout.
