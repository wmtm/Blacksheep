/**
 * Prefixes an internal path with the site's base path (e.g. "/Blacksheep/"),
 * so links keep working when the site is deployed under a subpath.
 * Astro's `base` config does not rewrite hardcoded hrefs automatically —
 * only asset URLs it manages itself — so every internal link needs this.
 */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL;
  return base + path.replace(/^\//, '');
}
