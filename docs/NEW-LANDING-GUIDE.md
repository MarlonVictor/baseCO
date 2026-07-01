# Guia — Nova Landing Page de Cliente

Passo a passo para iniciar um projeto de cliente a partir do boilerplate **baseCO**.

> **Primeiro passo:** duplique este repositório (GitHub “Use this template” ou cópia local) para um **novo repositório** do cliente. Todo o trabalho abaixo acontece no repo do cliente.

---

## Visão geral do fluxo

```
Duplicar repo → Config base → Conteúdo (JSON + CMS) → Visual (DS) → SEO → Quality gates → Deploy
```

---

## 1. Configuração do projeto

### `astro.config.mjs`

```javascript
export default defineConfig({
  site: "https://www.cliente.com.br", // URL de produção — obrigatório
  output: "static",
  trailingSlash: "never",
  // ... demais configs mantidas
});
```

### `package.json`

Atualizar `name` e `description` para o cliente.

### Decap CMS — `public/admin/config.yml`

```yaml
backend:
  name: github # ou git-gateway (Netlify)
  repo: org/repo-cliente
  branch: main

media_folder: public/assets
public_folder: /assets
```

---

## 2. Conteúdo

### `src/content/homepage/home.json`

Preencher todos os campos validados pelo schema em `src/content/config.ts`:

```json
{
  "hero": {
    "title": "Título principal do cliente",
    "subtitle": "Subtítulo com proposta de valor"
  },
  "services": [
    {
      "title": "Serviço 1",
      "description": "Descrição curta",
      "icon": "star"
    }
  ],
  "contact": {
    "whatsapp": "5511999999999",
    "email": "contato@cliente.com.br",
    "address": "Rua Exemplo, 100 — Cidade/UF"
  }
}
```

### `src/pages/index.astro`

Atualizar:

- `pageTitle` e `pageDescription`
- Objeto `localBusiness` com dados reais (nome, telefone, endereço, geo, horários, `sameAs`)

### Novos campos de conteúdo

Se o cliente precisar de campos extras:

1. Adicionar ao schema Zod em `src/content/config.ts`
2. Atualizar `home.json`
3. Espelhar campos em `public/admin/config.yml`
4. Passar dados para os componentes na página

---

## 3. Visual — Design System do cliente

### Princípio

O boilerplate reserva **hooks CSS** nos componentes (`.hero__title`, `.header__cta`, etc.). O visual do cliente é aplicado **sem alterar HTML semântico**.

### Onde aplicar estilos

1. **`src/styles/global.css`** — bloco `DESIGN SYSTEM OVERRIDES`
2. **`src/layouts/Layout.astro`** — bloco `FONTS` no `<head>`
3. **CSS externo** — `<link rel="stylesheet">` no Layout, após Tailwind

### Fontes

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  rel="preload"
  href="/fonts/marca-regular.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>
```

Sempre `font-display: swap` no `@font-face`.

### Imagens

| Arquivo                 | Uso                   |
| ----------------------- | --------------------- |
| `src/assets/hero.*`     | Imagem LCP do Hero    |
| `public/assets/*`       | Uploads via Decap CMS |
| `public/og-default.jpg` | OG/Twitter (1200×630) |
| `public/favicon.svg`    | Favicon do cliente    |

---

## 4. SEO

### Checklist

- [ ] `site` em `astro.config.mjs` correto
- [ ] `title` único, ~50–60 caracteres
- [ ] `description` única, ~150–160 caracteres
- [ ] `canonical` automático via Layout
- [ ] JSON-LD `LocalBusiness` com endereço e geo reais
- [ ] OG image raster 1200×630 (não SVG)
- [ ] `sameAs` com redes sociais do cliente

### Validar

- [Google Rich Results Test](https://search.google.com/test/rich-results)
- Lighthouse SEO ≥ 95

---

## 5. Acessibilidade

### Checklist manual

- [ ] Tab desde o início: skip link → navegação → conteúdo → formulário → footer
- [ ] Menu mobile: abre/fecha com Enter e Escape
- [ ] Formulário: todos os campos com label visível
- [ ] Contraste de texto ≥ 4.5:1
- [ ] `prefers-reduced-motion` respeitado

### Automatizado

```bash
bun run test:e2e    # axe-core + navegação por teclado (e2e/a11y/)
bun run a11y        # pa11y-ci pós-build
```

---

## 6. Performance

### Checklist

- [ ] Apenas 1 imagem com `loading="eager"` + `fetchpriority="high"` (Hero)
- [ ] Demais imagens com `loading="lazy"` + dimensões explícitas
- [ ] Fontes com preload e `font-display: swap`
- [ ] Sem scripts bloqueantes no `<head>`
- [ ] Lighthouse Performance ≥ 95 (mobile, throttling 4G)

---

## 7. Quality gates antes da entrega

```bash
bun run quality   # lint + build + e2e + a11y + lighthouse
```

| Gate                      | Alvo           |
| ------------------------- | -------------- |
| Build                     | Sem erros      |
| Lighthouse (4 categorias) | ≥ 95           |
| axe-core                  | 0 violações    |
| e2e                       | Todos passando |

---

Deploy em produção: [`docs/DEPLOY.md`](DEPLOY.md).

---

## Templates

Copie e adapte os arquivos em [`docs/templates/`](templates/):

- `component.astro.template` — novo componente de seção
- `a11y-spec.ts.template` — teste axe-core
- `content-collection.ts.template` — nova collection Zod

---

## Referências

- [`AGENTS.md`](../AGENTS.md) — instruções gerais para IA
- [`PLANO-BOILERPLATE-CORPORATIVO.md`](PLANO-BOILERPLATE-CORPORATIVO.md) — roadmap histórico (referência)
- [`docs/guidelines/`](../guidelines/) — padrões de desenvolvimento
