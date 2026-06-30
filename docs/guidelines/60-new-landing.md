
# Nova Landing Page de Cliente

Use ao iniciar projeto para um novo cliente. Guia completo: `docs/NEW-LANDING-GUIDE.md`.

## 1. Configuração base

- [ ] Atualizar `apps/<app>/astro.config.mjs` → `site: 'https://dominio-cliente.com.br'`
- [ ] Configurar `apps/<app>/public/admin/config.yml` → `backend.repo` e `branch`

## 2. Conteúdo

- [ ] Preencher `apps/<app>/src/content/homepage/home.json` (hero, services, contact)
- [ ] Ajustar `localBusiness` em `apps/<app>/src/pages/index.astro`
- [ ] Substituir textos default de `pageTitle` e `pageDescription`
- [ ] Adicionar imagens do cliente em `public/assets/` e `src/assets/`

## 3. Visual (Design System)

- [ ] Aplicar CSS do cliente no bloco **DESIGN SYSTEM OVERRIDES** de `src/styles/global.css`
- [ ] Configurar fontes no bloco **FONTS** de `Layout.astro` (preconnect + preload WOFF2)
- [ ] Manter hooks `.hero__*`, `.header__*` etc. — não renomear classes semânticas

## 4. SEO e mídia

- [ ] Trocar `og-default.jpg` pela imagem do cliente (1200×630)
- [ ] Atualizar `favicon` do cliente
- [ ] Validar JSON-LD no Google Rich Results Test

## 5. Quality gates (antes de entregar)

- [ ] `bun run build` sem erros
- [ ] Lighthouse ≥ 95 nas 4 categorias (mobile)
- [ ] axe-core: 0 violações
- [ ] Testes e2e passando (quando suíte existir)
- [ ] Navegação por teclado validada manualmente

## 6. Pós-monorepo (futuro)

```bash
pnpm scaffold:landing --name cliente-x
pnpm quality --filter=cliente-x
```

## Referência

Guia completo: `docs/NEW-LANDING-GUIDE.md`
