# Guia dos Arquivos — Para que serve cada um

Referência rápida da documentação e configuração de IA do projeto.

---

## Na raiz do repositório

### `AGENTS.md`

**Para que serve:** Manual de entrada para assistentes de IA ou novos contribuidores. Resume stack, metas de qualidade, estrutura de pastas e o que fazer/evitar.

**Quando usar:** No início de uma conversa nova com IA, ou quando o agente precisa entender o projeto do zero. Basta dizer: _"leia o AGENTS.md"_.

---

### `README.md` / `README.pt-BR.md`

**Para que serve:** Visão geral do projeto (inglês por padrão; português em `README.pt-BR.md`) — quality gates, SEO, performance, a11y, testes e como rodar.

**Quando usar:** Onboarding, referência de comandos (`bun run dev`, `bun run quality`) e link para os demais documentos.

---

## Em `docs/`

### `PLANO-BOILERPLATE-CORPORATIVO.md`

**Para que serve:** Roadmap técnico do boilerplate — arquitetura do template copiável, Core Web Vitals, acessibilidade, testes e2e, CI/CD e fases de implementação com status.

**Quando usar:** Para entender o que já foi feito, o que falta (Fase 4) e as metas de qualidade. Complementa `AGENTS.md` com detalhe técnico.

---

### `DEPLOY.md`

**Para que serve:** Instruções de deploy (Netlify, Cloudflare Pages, Vercel), headers de cache e snippet opcional de RUM/web-vitals.

**Quando usar:** Ao publicar a landing do cliente em produção.

---

### `NEW-LANDING-GUIDE.md`

**Para que serve:** Passo a passo prático para criar ou customizar uma landing de cliente — config, conteúdo JSON, CMS, visual, SEO e checklist de entrega.

**Quando usar:** Sempre que iniciar um projeto novo para um cliente. Ideal para humanos e para IA ao clonar/customizar uma landing.

---

### `GUIA-DOS-ARQUIVOS.md`

**Para que serve:** Este arquivo — índice simples explicando os demais documentos.

**Quando usar:** Quando não souber qual arquivo consultar.

---

### `templates/`

**Para que serve:** Modelos copiáveis para acelerar criação de componentes, testes e collections.

| Template                         | Uso                                           |
| -------------------------------- | --------------------------------------------- |
| `component.astro.template`       | Novo componente de seção                      |
| `page.astro.template`            | Nova página Astro com Layout e SEO            |
| `a11y-spec.ts.template`          | Teste de acessibilidade com axe-core          |
| `seo-spec.ts.template`           | Teste SEO específico de uma rota              |
| `content-collection.ts.template` | Nova Content Collection com Zod               |
| `lazy-section.astro.template`    | Seção abaixo da dobra com carregamento tardio |

**Quando usar:** Ao criar algo novo do zero — copie, renomeie e adapte em vez de começar em branco.

---

## Em `docs/guidelines/`

**Para que serve:** Padrões de desenvolvimento por área — performance, acessibilidade, SEO, componentes Astro, testes e2e e checklist de nova landing.

| Guideline                | Para que serve                                       |
| ------------------------ | ---------------------------------------------------- |
| `00-project-context`     | Contexto geral do projeto                            |
| `10-performance-cwv`     | Core Web Vitals, lazy loading                        |
| `20-accessibility`       | WCAG, ARIA, teclado                                  |
| `30-astro-components`    | Convenções de componentes                            |
| `31-content-collections` | JSON, Zod, Decap CMS                                 |
| `40-seo-local`           | Meta-tags, JSON-LD                                   |
| `50-testing-e2e`         | Playwright, axe-core                                 |
| `60-new-landing`         | Checklist de nova landing                            |
| `70-new-page-component`  | Checklist nova página/componente + gates automáticos |

**Quando usar:** Ao implementar ou revisar código — consulte o guideline da área afetada. Para nova landing de cliente, leia também `NEW-LANDING-GUIDE.md`.

---

## Fluxo rápido — qual arquivo abrir?

```
Nova conversa com IA        →  AGENTS.md
Novo cliente / landing      →  NEW-LANDING-GUIDE.md + guidelines/60-new-landing.md
Planejar evolução técnica    →  PLANO-BOILERPLATE-CORPORATIVO.md
Não sei por onde começar    →  GUIA-DOS-ARQUIVOS.md  (este arquivo)
Rodar o projeto             →  README.md
Criar componente / teste    →  docs/templates/
Consultar padrões           →  docs/guidelines/
```
