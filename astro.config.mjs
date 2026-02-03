// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import bun from '@nurodev/astro-bun';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://tomodevelops.com',
  integrations: [
    react(),
    sitemap({
      i18n: {
        defaultLocale: 'ja',
        locales: {
          ja: 'ja-JP',
          en: 'en-US',
        },
      },
    }),
  ],
  output: 'server',
  adapter: bun(),
  vite: {
    plugins: [tailwindcss()]
  }
});
