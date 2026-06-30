
# Content Collections

## Arquivos-chave

- `src/content/config.ts` — define collections e schemas Zod
- `src/content/homepage/home.json` — conteúdo da landing
- `public/admin/config.yml` — espelha campos para Decap CMS

## Regras

1. **Todo conteúdo editável pelo cliente** vive em `src/content/`, nunca hardcoded em `.astro`.
2. Ao adicionar campo: atualizar **os três** — schema Zod, JSON de exemplo, `config.yml`.
3. Usar `glob` loader (padrão atual) para JSON em subpastas.
4. Validar tipos estritos no Zod (`z.string()`, `z.array()`, etc.) — evitar `z.any()`.

## Schema atual (`homepage`)

```typescript
hero: { title, subtitle }
services: [{ title, description, icon? }]
contact: { whatsapp, email, address }
```

## Consumo nas páginas

```astro
const homepageList = await getCollection('homepage');
const home = homepageList.find((e) => e.id === 'home') ?? homepageList[0];
const { hero, services, contact } = home.data;
```

## Nova collection

1. Adicionar em `src/content/config.ts` com schema Zod.
2. Criar arquivo de exemplo em `src/content/<nome>/`.
3. Adicionar collection no `public/admin/config.yml`.
4. Documentar campos no comentário do schema.

## Decap CMS

- Backend padrão: `git-gateway` (Netlify) ou `github` — configurar por cliente.
- Uploads de mídia: `public/assets/`.
- Não expor credenciais no repositório.
