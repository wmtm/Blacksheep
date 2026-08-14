// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Deploying to GitHub Pages as a project site (gaelledardanne-code/daneva)
// until a custom domain is attached — see README for how to switch.
const usingCustomDomain = process.env.CUSTOM_DOMAIN === 'true';

export default defineConfig({
  site: usingCustomDomain
    ? 'https://blacksheep.design'
    : 'https://gaelledardanne-code.github.io',
  base: usingCustomDomain ? '/' : '/Daneva',
  trailingSlash: 'always',
  vite: {
    plugins: [tailwindcss()],
  },
});
