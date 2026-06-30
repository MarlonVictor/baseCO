
# Nova Landing Page de Cliente

Use ao iniciar projeto para um novo cliente. Guia completo: `docs/NEW-LANDING-GUIDE.md`.

## 0. Duplicar o boilerplate

- [ ] Criar novo repositório a partir deste template (GitHub “Use this template” ou cópia)
- [ ] Atualizar `package.json` (`name`, `description`)

## 1. Configuração base

- [ ] Atualizar `astro.config.mjs` → `site: 'https://dominio-cliente.com.br'`
- [ ] Configurar `public/admin/config.yml` → `backend.repo` e `branch`

## 2. Conteúdo

- [ ] Preencher `src/content/homepage/home.json` (hero, services, contact)
- [ ] Ajustar `localBusiness` em `src/pages/index.astro`
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

- [ ] `bun run quality` (lint + build + e2e + a11y + lighthouse)
- [ ] axe-core e pa11y: 0 violações
- [ ] Testes de teclado em `e2e/a11y/keyboard-nav.spec.ts` passando
- [ ] Checklist manual de a11y (contraste, skip link, formulário) — ver `NEW-LANDING-GUIDE.md` §5

## Referência

Guia completo: `docs/NEW-LANDING-GUIDE.md`
