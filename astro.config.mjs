// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

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
    sitemap(),
  ],

  vite: {
    build: {
      cssMinify: 'esbuild',
    },
  },
});
