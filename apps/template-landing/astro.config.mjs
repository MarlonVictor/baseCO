// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://exemplo.com.br',
  output: 'static',
  trailingSlash: 'never',
  compressHTML: true,

  build: {
    inlineStylesheets: 'auto',
    assets: '_assets',
  },

  image: {
    service: { entrypoint: 'astro/assets/services/sharp' },
  },

  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
  ],

  vite: {
    build: {
      cssMinify: 'esbuild',
    },
    ssr: {
      noExternal: ['@repo/ui', '@repo/seo'],
    },
  },
});
