
# Performance e Core Web Vitals

## LCP (Largest Contentful Paint)

- **Uma única** imagem LCP por página: `loading="eager"` + `fetchpriority="high"` + `decoding="async"`.
- Usar `astro:assets` com `widths` + `sizes` para srcset responsivo.
- Raster (AVIF/WebP) preferido ao SVG para fotos/hero em produção.
- `width` e `height` explícitos em toda imagem (anti-CLS).
- Preload opcional no `Layout.astro` para a imagem LCP.

```astro
<Image
  src={heroImage}
  alt="Descrição real do conteúdo"
  widths={[480, 800, 1200]}
  sizes="(min-width: 768px) 50vw, 100vw"
  loading="eager"
  fetchpriority="high"
  decoding="async"
/>
```

## Demais imagens

- `loading="lazy"` (default do Astro para não-LCP).
- Nunca mais de uma imagem com `fetchpriority="high"`.

## JavaScript

| Diretiva Astro | Quando usar |
|----------------|-------------|
| `client:visible` | Carrosséis, mapas, formulários com validação JS |
| `client:idle` | Menu mobile, toggles secundários |
| `client:media` | JS só em viewport específico (ex: mobile menu) |
| `client:load` | **Evitar** — só se crítico para UX imediata |

- Scripts de terceiros (analytics): `requestIdleCallback` ou após primeira interação.
- Preferir `<script>` como módulo no componente; `is:inline` só para snippets mínimos.

## CSS e fontes

- `inlineStylesheets: 'auto'` já configurado — manter.
- Fontes: `font-display: swap`, subset WOFF2, `preconnect` no `Layout.astro`.
- Não importar CSS de animações em componentes above-the-fold.

## Build (`astro.config.mjs`)

- Manter `compressHTML: true`, `output: 'static'`.
- Não desabilitar minificação CSS/JS sem motivo.

## Code-splitting

- Above-the-fold: `Header`, `Hero` — import estático.
- Below-the-fold: `Testimonials`, seções pesadas — `import()` dinâmico ou island `client:visible`.
- Uma rota = um chunk (padrão Astro); evitar barrel imports globais.
