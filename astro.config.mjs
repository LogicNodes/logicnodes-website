// astro.config.mjs

import { defineConfig }  from 'astro/config';
import tailwind          from '@astrojs/tailwind';
import react             from '@astrojs/react';
import sitemap           from '@astrojs/sitemap';
import svgr              from 'vite-plugin-svgr';
import { fileURLToPath } from 'url';

export default defineConfig({
  // MUST be your public, canonical URL
  site: 'https://logicnodes.ai',
  trailingSlash: 'always',      // Consistently use trailing slashes
  integrations: [
    tailwind(),
    react(),
    sitemap({
      /* better XML sitemap */
      lastmod: true,
      i18n: [{ defaultLocale: 'da', alternate: ['en'] }],
    }),
  ],
  vite: {
    plugins: [svgr()],
    build: {
      target: 'es2022',
    },
    resolve: {
      alias: {
        '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
        '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
        '@features': fileURLToPath(new URL('./src/features', import.meta.url)),
        '@lib': fileURLToPath(new URL('./src/lib', import.meta.url)),
      },
    },
  },
});