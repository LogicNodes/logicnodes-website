// astro.config.mjs

import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import svgr from 'vite-plugin-svgr';
import { fileURLToPath } from 'url';
import path from 'path';

import react from '@astrojs/react';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  integrations: [tailwind(), react()],
  vite: { 
    plugins: [svgr()],
    resolve: { 
      alias: { 
        '@': path.resolve(__dirname, './src')
      } 
    }
  }
});