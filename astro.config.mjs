// astro.config.mjs

import { defineConfig }  from 'astro/config';
import tailwind          from '@astrojs/tailwind';
import react             from '@astrojs/react';
import svgr              from 'vite-plugin-svgr';
import { fileURLToPath } from 'url';

export default defineConfig({
  integrations: [tailwind(), react()],
  vite: {
    plugins: [svgr()],
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