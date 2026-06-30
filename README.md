# SEO Base

Boilerplate / Landing Page base estática com **Astro 5** e **Tailwind CSS**, estruturada com foco em **SEO local avançado**, acessibilidade (WCAG) e alta performance de carregamento, com **Decap CMS** pré-integrado para gestão de conteúdo.

> Projeto base/template para criação acelerada de landing pages de clientes, permitindo acoplar um Design System externo sem necessidade de alterar a estrutura semântica ou as coleções de dados.

### Documentação para IA e padrões do projeto

| Recurso | Descrição |
|---------|-----------|
| [`AGENTS.md`](./AGENTS.md) | Ponto de entrada para agentes de IA — stack, metas, convenções |
| [`docs/guidelines/`](./docs/guidelines/) | Padrões de desenvolvimento por área |
| [`docs/PLANO-BOILERPLATE-CORPORATIVO.md`](./docs/PLANO-BOILERPLATE-CORPORATIVO.md) | Roadmap completo (performance, a11y, monorepo, testes) |
| [`docs/NEW-LANDING-GUIDE.md`](./docs/NEW-LANDING-GUIDE.md) | Passo a passo para nova landing de cliente |
| [`docs/GUIA-DOS-ARQUIVOS.md`](./docs/GUIA-DOS-ARQUIVOS.md) | Índice simples — para que serve cada documento |

---

## Preview

<!-- Adicione as capturas da Landing Page em public/assets/ para os links abaixo funcionarem -->

### Visão geral

| Desktop View | Mobile View |
|:---:|:---:|
| ![Landing Page — Desktop](./apps/template-landing/public/og-default.jpg) | ![Landing Page — Mobile](./apps/template-landing/public/favicon.svg) |
| _Layout estruturado com cabeçalho, hero e seções modulares_ | _Navegação mobile nativa e design responsivo fluido_ |

### Painel de Conteúdo (CMS)

| Interface de Edição | Configuração de Campos |
|:---:|:---:|
| ![Decap CMS — Edição](./public/favicon.svg) | ![Decap CMS — Configuração](./public/favicon.svg) |
| _Edição em tempo real de textos, diferenciais e contato_ | _Coleção estruturada via esquema JSON + Zod_ |

> **Dica:** para ilustrar o README com imagens reais do projeto renderizado, salve capturas de tela em `public/assets/` e atualize os caminhos das imagens acima.

---

## O que o sistema faz

### SEO Local & Otimização de Busca
- **Dados Estruturados**: Schema JSON-LD (`LocalBusiness`) dinâmico e extensível para melhor indexação e exibição de Rich Results (Google Knowledge Panel).
- **Meta-tags Dinâmicas**: Controle completo de títulos, descrições, URL canônica, imagem Open Graph, Twitter Card e diretivas de robots (`index/noindex`) via propriedades do Layout principal.
- **Configurações Prontas**: Otimização de barra do navegador (`theme-color`), favicon vetorial e suporte nativo a tags canônicas automáticas.

### Acessibilidade (WCAG)
- **Skip Link**: Link invisível ("Pular para o conteúdo") ativado via teclado para acessibilidade de leitores de tela (critério WCAG 2.4.1).
- **Semântica HTML5**: Uso rigoroso de landmarks estruturais (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<figure>`, `<blockquote>`).
- **Navegação Acessível**: Botão de menu mobile estruturado com padrões `aria-controls` e `aria-expanded` dinâmicos.
- **Design Adaptativo**: Suporte nativo a redução de animações via mídia query `prefers-reduced-motion`.

### Conteúdo Gerenciável (Decap CMS)
- **Local-first CMS**: Interface administrativa estática (`/admin`) usando Decap CMS pré-configurada para carregamento instantâneo.
- **Content Collections**: Validação e parsing automático do conteúdo via Astro Content Collections, utilizando schemas com **Zod** para assegurar a consistência dos dados estruturados.
- **Campos Estruturados**: Configuração pronta para Hero (título, subtítulo), Diferenciais/Serviços (lista com ícones) e Informações de Contato.

### Design System Ready
- **Hooks de Estilização**: Classes CSS vazias como hooks (ex: `.hero__title`, `.features__item`) reservadas no HTML, prontas para receber regras visuais de um Design System externo.
- **Tokens do Tailwind**: Arquivo de configuração preparado para mapear variáveis CSS expostas por fontes, cores e tamanhos globais da identidade visual do cliente.

---

## Arquitetura

```
┌─────────────────────────────────────────────────────────────┐
│                  Decap CMS (Admin Web Interface)            │
│  Acessível via `/admin` · Grava edições no repositório git  │
└──────────────────────────┬──────────────────────────────────┘
                           │ Edições locais / Push Git
┌──────────────────────────▼──────────────────────────────────┐
│            Astro 5 + TypeScript + Tailwind CSS              │
│  Content Collections (Zod) · SSR/Static Compilação (Sharp)  │
└──────────────────────────┬──────────────────────────────────┘
                           │
          ┌────────────────┴────────────────┐
          ▼                                 ▼
┌──────────────────────────┐      ┌──────────────────────────┐
│   Acessibilidade & SEO   │      │  Design System Externo   │
│  Semantic HTML · JSON-LD │      │  Hooks CSS · CSS Custom  │
│  Aria & Skip Link (WCAG) │      │  Custom Tailwind Tokens  │
└──────────────────────────┘      └──────────────────────────┘
```

**Decisões de design:**
- **Estático por Padrão** — Compilação 100% estática (`output: 'static'`) com compressão nativa de HTML e otimização de imagens LCP via `Sharp` para carregamento ultra-rápido.
- **Monorepo Simples** — Estrutura unificada com código fonte e painel administrativo rodando totalmente no client-side, eliminando a necessidade de bancos de dados ativos ou servidores dedicados.
- **Separação de Conteúdo e Visual** — Textos e contatos residem puramente em coleções locais JSON, permitindo que redatores atualizem o site sem mexer em arquivos `.astro` ou regras CSS.

---

## Stack

| Camada | Tecnologias |
|--------|-------------|
| **Core Framework** | Astro 5.1.x |
| **Estilização** | Tailwind CSS 3.4.x |
| **Linguagem** | TypeScript / Javascript ES6+ |
| **Otimização de Mídia** | Sharp 0.33.x |
| **Gerenciador de Pacotes** | Bun 1.3.x (compatível com npm/yarn/pnpm) |
| **CMS** | Decap CMS 3.x (distribuição estática via CDN) |
| **Validação de Conteúdo** | Zod (Astro Content Collections Schema) |
| **Monorepo** | Turborepo 2.x + Bun workspaces |
| **Testes E2E** | Playwright + axe-core |
| **Lint** | ESLint 9 + eslint-plugin-astro + jsx-a11y |

---

## Estrutura do repositório (monorepo)

```
seo-base/
├── apps/
│   └── template-landing/       # App de referência (landing base)
│       ├── src/
│       │   ├── content/        # JSON + Zod (Decap CMS)
│       │   ├── layouts/        # Layout.astro
│       │   ├── pages/          # Rotas Astro
│       │   └── styles/         # global.css
│       ├── public/             # admin/, assets/, og-default.jpg
│       └── e2e/                # Playwright (SEO + a11y)
├── packages/
│   ├── ui/                     # Componentes compartilhados (@repo/ui)
│   ├── seo/                    # JSON-LD e tipos (@repo/seo)
│   ├── testing/                # Helpers axe-core (@repo/testing)
│   └── config/eslint/          # Config ESLint compartilhada
├── docs/
│   ├── guidelines/             # Padrões (performance, a11y, SEO…)
│   ├── templates/
│   └── …
├── turbo.json
├── eslint.config.js
└── package.json                # Scripts raiz (turbo)
```

---

## Como rodar localmente

### Pré-requisitos

- Node.js 18+ ou **Bun** (Recomendado)

### Instalação das dependências

```bash
bun install
# ou se preferir npm:
npm install
```

### Executar servidor de desenvolvimento

```bash
bun run dev
# ou apenas o app template:
cd apps/template-landing && bun run dev
```

Acesse o site em [http://localhost:4321](http://localhost:4321).

Para acessar o painel local do CMS, acesse [http://localhost:4321/admin](http://localhost:4321/admin).

### Compilar, testar e validar

```bash
bun run build       # build de produção (Turborepo)
bun run lint        # ESLint (apps + packages)
bun run test:e2e    # Playwright + axe-core
bun run preview     # preview da build
```

### Compilar versão de produção (app isolado)

```bash
cd apps/template-landing && bun run build
```

O comando de build compila o site em `apps/template-landing/dist/`.

### Visualizar build localmente

```bash
bun run preview
# ou se preferir npm:
npm run preview
```

---

## Variáveis de ambiente e CMS

O painel de controle do Decap CMS por padrão utiliza o `git-gateway`, o qual integra nativamente com serviços como Netlify. 

Caso queira hospedar fora da Netlify, configure o backend no arquivo `public/admin/config.yml` para utilizar outros gateways compatíveis ou autenticação direta com o GitHub:

```yaml
backend:
  name: github
  repo: seu-usuario/seu-repositorio
  branch: main
```

---

## Componentes da aplicação

| Componente | Função e Localização |
|------------|----------------------|
| `Layout.astro` | Gerencia o `<head>` global, metatags de SEO, Twitter, OpenGraph e Skip Link. |
| `LocalBusinessJsonLd.astro` | Converte propriedades de endereço, geo e contato em um script de dados estruturados JSON-LD. |
| `Header.astro` | Barra de navegação com suporte a menu mobile responsivo via tags ARIA acessíveis. |
| `Hero.astro` | Seção principal acima da dobra, exibindo chamada e CTA otimizado com imagens LCP ágeis. |
| `Features.astro` | Grid de diferencias baseado em colunas responsivas, renderizando conteúdo da coleção JSON. |
| `Testimonials.astro` | Seção de depoimentos de clientes marcados semânticamente com tags de citação acessíveis. |
| `Contact.astro` | Formulário de contato acessível integrado a blocos de informações físicas como WhatsApp e endereço. |
| `Footer.astro` | Rodapé com links de navegação, direitos autorais e metadados legais. |

---

## Status do projeto

**Fase 1 concluída:** monorepo Turborepo, pacotes `@repo/ui` e `@repo/seo`, ESLint + jsx-a11y, Playwright + axe-core, OG image JPG.

Próximo passo: Fase 2 (Lighthouse CI, lazy loading, CI/CD) — ver [`docs/PLANO-BOILERPLATE-CORPORATIVO.md`](./docs/PLANO-BOILERPLATE-CORPORATIVO.md).

---

## Licença

Uso interno para projetos de desenvolvimento e freelancers. Distribuição restrita sob critérios do autor.
