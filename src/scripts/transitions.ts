import { gsap } from 'gsap';
import { DURATION, EASE, STAGGER } from './motion';

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function getPanels() {
  return document.querySelectorAll<HTMLElement>('[data-transition-panel]');
}

function wipeIn(panels: NodeListOf<HTMLElement>) {
  const tl = gsap.timeline();
  tl.set(panels, { transformOrigin: 'bottom' });
  tl.to(panels, {
    scaleY: 1,
    duration: DURATION.slow,
    ease: EASE.inOut,
    stagger: STAGGER.tight,
  });
  return tl;
}

export function initPageTransitions() {
  document.addEventListener('astro:before-preparation', (event) => {
    const anyEvent = event as unknown as { loader: () => Promise<void> };
    const panels = getPanels();
    if (reduced() || panels.length === 0) return;

    const originalLoader = anyEvent.loader;
    anyEvent.loader = async () => {
      await Promise.all([wipeIn(panels).then(), originalLoader()]);
    };
  });

  document.addEventListener('astro:after-swap', () => {
    window.scrollTo(0, 0);
  });

  // Links to self-contained static sites (playground toys) carry
  // data-astro-reload to force a real navigation, which skips Astro's
  // ClientRouter entirely and with it the astro:before-preparation hook
  // above. Play the same wipe manually before handing off to the browser.
  document.addEventListener('click', (event) => {
    const link = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[data-astro-reload]');
    const panels = getPanels();
    if (!link || panels.length === 0 || reduced()) return;
    if (event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (link.target && link.target !== '_self') return;

    event.preventDefault();
    wipeIn(panels).then(() => {
      window.location.href = link.href;
    });
  });

  document.addEventListener('astro:page-load', () => {
    const panels = getPanels();
    if (panels.length === 0) return;
    if (reduced()) {
      gsap.set(panels, { scaleY: 0 });
      return;
    }
    const tl = gsap.timeline({ delay: STAGGER.tight });
    tl.set(panels, { transformOrigin: 'top' });
    tl.to(panels, {
      scaleY: 0,
      duration: DURATION.slow,
      ease: EASE.inOut,
      stagger: STAGGER.tight,
    });
  });
}
