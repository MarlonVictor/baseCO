# Deploy — Hospedagem do template

Guia para publicar uma landing gerada a partir deste boilerplate. Atualize `astro.config.mjs` (`site`) e `public/robots.txt` (URL do Sitemap) **antes** do primeiro deploy.

---

## Pré-requisitos comuns

| Item               | Valor                                |
| ------------------ | ------------------------------------ |
| Build command      | `bun run build` (ou `npm run build`) |
| Output directory   | `dist`                               |
| Node/Bun           | Node 18+ ou Bun 1.3+                 |
| Quality gate local | `bun run quality`                    |

Variáveis de ambiente: em geral **não obrigatórias** para site estático. Decap CMS pode exigir configuração de backend no `public/admin/config.yml`.

---

## Netlify (recomendado com Decap CMS)

1. Conecte o repositório do cliente no [Netlify](https://www.netlify.com/).
2. **Build settings:**
   - Build command: `bun run build`
   - Publish directory: `dist`
3. Instale o plugin [Decap CMS / Netlify Identity](https://decapcms.org/docs/netlify-backend/) se o cliente editar conteúdo via `/admin`.
4. Em `public/admin/config.yml`, use `backend: name: git-gateway` ou `github` com o repo do cliente.
5. Domínio customizado + HTTPS automático.
6. Atualize `astro.config.mjs` → `site: 'https://www.cliente.com.br'`.
7. Atualize `public/robots.txt` → `Sitemap: https://www.cliente.com.br/sitemap-index.xml`.

### Headers úteis (`netlify.toml` na raiz)

```toml
[build]
  command = "bun run build"
  publish = "dist"

[[headers]]
  for = "/_assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

---

## Cloudflare Pages

1. **Workers & Pages** → Create project → Connect Git.
2. Framework preset: **Astro** (ou None com build manual).
3. Build command: `bun run build` · Output: `dist`.
4. Variável `NODE_VERSION` ou use Bun via `BUN_VERSION` conforme [docs Cloudflare](https://developers.cloudflare.com/pages/configuration/build-image/).
5. Domínio customizado na aba **Custom domains**.
6. Atualize `site` no Astro e `robots.txt` como acima.

---

## Vercel

1. Import Git repository.
2. Framework: **Astro** (detectado automaticamente).
3. Build: `bun run build` · Output: `dist`.
4. Domínio em **Settings → Domains**.
5. Atualize `site` e `robots.txt`.

---

## Pós-deploy — validação

- [ ] `https://dominio/` responde 200 com HTTPS
- [ ] `https://dominio/sitemap-index.xml` acessível
- [ ] `https://dominio/robots.txt` com Sitemap correto
- [ ] [Google Rich Results Test](https://search.google.com/test/rich-results) no JSON-LD
- [ ] Lighthouse mobile ≥ 95 (ou `bun run lighthouse` local antes do deploy)
- [ ] `/admin` funciona se Decap CMS estiver ativo

---

## Monitoramento RUM (opcional — Fase 4.9)

Para Core Web Vitals em produção, carregue métricas **após** interação ou idle — nunca bloqueie o LCP.

Exemplo com [web-vitals](https://github.com/GoogleChrome/web-vitals) (adicione como `devDependency` ou via CDN analytics):

```html
<!-- Layout.astro — bloco SCRIPTS GLOBAIS, após requestIdleCallback -->
<script type="module">
  function sendToAnalytics({ name, value, id }) {
    // Enviar para Plausible, GA4, Datadog, etc.
    console.debug(name, value, id);
  }

  async function loadWebVitals() {
    const { onLCP, onCLS, onINP } = await import("web-vitals");
    onLCP(sendToAnalytics);
    onCLS(sendToAnalytics);
    onINP(sendToAnalytics);
  }

  if ("requestIdleCallback" in window) {
    requestIdleCallback(() => void loadWebVitals());
  } else {
    setTimeout(() => void loadWebVitals(), 3000);
  }
</script>
```

Não é obrigatório no boilerplate base — ative por cliente quando houver endpoint de analytics.

---

## Referências

- [`NEW-LANDING-GUIDE.md`](NEW-LANDING-GUIDE.md) — checklist antes da entrega
- [`PLANO-BOILERPLATE-CORPORATIVO.md`](PLANO-BOILERPLATE-CORPORATIVO.md) — metas de performance e a11y
