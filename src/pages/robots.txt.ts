import type { APIRoute } from 'astro';
import { withBase } from '@/lib/paths';

// Served relative to the deployed base path, same as every other route.
// On the current wmtm.github.io/Blacksheep/ project-site deployment, that
// means this lands at /Blacksheep/robots.txt rather than the true domain
// root crawlers check by default -- a known GitHub Pages project-site
// limitation, not something Astro's `base` config can route around. It
// becomes fully effective the moment CUSTOM_DOMAIN=true ships (see
// astro.config.mjs / README), at which point this same file is correct
// with no changes needed. Until then, submit the sitemap URL directly in
// Search Console rather than relying on robots.txt discovery.
export const GET: APIRoute = ({ site }) => {
  const sitemapUrl = new URL(withBase('/sitemap-index.xml'), site);
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemapUrl}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
