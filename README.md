# BlackSheep

Mathieu Maigrot's portfolio/blog-style site — built with [Astro](https://astro.build), GSAP, Lenis and Tailwind CSS v4. The site itself is meant to read as a BlackSheep piece: animated, colourful, editorial, with a "smart" navigation system instead of plain tabs (fullscreen overlay menu, animated filter pills with FLIP reflow, a floating section index on case studies, a cursor-following "next project" preview).

## Stack

- **Astro 7** (static output) with content collections for projects
- **Tailwind CSS v4** (CSS-first `@theme`, no config file needed)
- **GSAP** (+ ScrollTrigger, Flip) for scroll reveals, the filter reflow, magnetic buttons, the custom cursor
- **Lenis** for smooth scroll
- Astro's `ClientRouter` (View Transitions) for instant page navigation + a custom colour-wipe transition
- **@fontsource-variable** — Bricolage Grotesque (display) + Inter (body), self-hosted, no external font requests

## Getting started

```bash
npm install
npm run dev      # http://localhost:4321/daneva/
npm run build    # outputs to ./dist
npm run preview  # preview the production build
```

## Project structure

```
src/
  content/projects/*.md   — one file per project (see schema in src/content.config.ts)
  lib/categories.ts        — the 6 work categories, their accent colours & taglines
  lib/social.ts             — social links + contact email
  components/               — Header, FullscreenMenu, ProjectCard, Placeholder, etc.
  scripts/                  — cursor, smooth-scroll, reveals, nav, work-filter, transitions
  pages/
    index.astro              — home (hero + selected/featured work)
    work/index.astro          — full archive with smart category filter
    work/[slug].astro         — case study template
    about.astro, contact.astro, 404.astro
```

## Adding or editing a project

Add a new markdown file to `src/content/projects/`. Frontmatter fields are validated by `src/content.config.ts` — required fields: `title`, `year`, `category` (one of `branding`, `motion`, `digital`, `illustration`, `editorial`, `experiments`), `summary`, `excerpt`, `accent` (hex colour), `cover`. The markdown body becomes the case-study "Story" section.

Set `featured: true` to include a project in the homepage's "Selected work" grid, and `order` to control sort position everywhere.

## Swapping in real media

Every image/video slot on the site currently renders `<Placeholder>` (`src/components/Placeholder.astro`) — a styled, on-brand gradient box with a text label (e.g. `"LOGO ANIMATIONS — REEL"`) instead of a real asset, so the full layout, hover states, motion and aspect ratios are already correct.

Once the Drive folder is ready:

1. Drop files into `public/media/<project-slug>/`.
2. In the project's frontmatter, replace the `cover` / `gallery` placeholder objects with real paths, and swap `<Placeholder ratio={...} kind={...} label={...} accent={...} />` in `src/pages/work/[slug].astro` (and `ProjectCard.astro`) for an `<img>` or `<video>` tag using the same `ratio` wrapper class for consistent cropping.

No layout changes should be needed — placeholders were sized to the exact aspect ratios (`16:9`, `4:5`, `1:1`, `full`) the final media should use.

## Before you launch

A few things were placeholders by necessity and should be confirmed/replaced before going live:

- **Social links** (`src/lib/social.ts`) — Behance is real; YouTube, LinkedIn and Instagram URLs are guesses marked `todo: true`. Update or remove.
- **Contact email** — currently `hello@blacksheep.design`; update in `src/lib/social.ts` if that domain isn't secured, or swap for a real inbox.
- **Portrait photo** — the About/Home placeholder expects a real headshot.
- **OG/social preview image** — not yet added; drop a `public/og.jpg` and reference it in `BaseLayout.astro`'s `<meta property="og:image">` once you have one.

## Deploying to GitHub Pages

A workflow at `.github/workflows/deploy.yml` builds and deploys to GitHub Pages on every push to `main`. One-time setup in the repo: **Settings → Pages → Source → GitHub Actions**.

By default the site is configured for the project URL `https://gaelledardanne-code.github.io/daneva/` (see `astro.config.mjs` — `base: '/daneva'`). If you attach a custom domain (e.g. `blacksheep.design`) later:

1. Add a `public/CNAME` file containing the domain.
2. Set the `CUSTOM_DOMAIN=true` environment variable in the GitHub Actions workflow (or update `astro.config.mjs` directly) so `base` becomes `/` instead of `/daneva`.

## Accessibility & performance notes

- Respects `prefers-reduced-motion`: smooth scroll, the custom cursor, scroll reveals and marquees all fall back to instant/static states.
- The custom cursor only activates on fine-pointer (mouse) devices — touch devices get the normal system cursor.
- All interactive elements are real `<a>`/`<button>` tags with visible focus states, so keyboard navigation works throughout.
