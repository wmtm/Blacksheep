// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Deploying to GitHub Pages as a project site (wmtm/Blacksheep)
// until a custom domain is attached — see README for how to switch.
// NOTE: GitHub Pages paths are case-sensitive and must match the repo's
// exact name casing ("Blacksheep", capital B) or assets 404.
const usingCustomDomain = process.env.CUSTOM_DOMAIN === 'true';

export default defineConfig({
  site: usingCustomDomain
    ? 'https://blacksheep.design'
    : 'https://wmtm.github.io',
  base: usingCustomDomain ? '/' : '/Blacksheep',
  trailingSlash: 'always',
  vite: {
    plugins: [tailwindcss()],
  },
});
