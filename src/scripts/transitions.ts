import { gsap } from 'gsap';

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function getPanels() {
  return document.querySelectorAll<HTMLElement>('[data-transition-panel]');
}

export function initPageTransitions() {
  document.addEventListener('astro:before-preparation', (event) => {
    const anyEvent = event as unknown as { loader: () => Promise<void> };
    const panels = getPanels();
    if (reduced() || panels.length === 0) return;

    const originalLoader = anyEvent.loader;
    anyEvent.loader = async () => {
      const tl = gsap.timeline();
      tl.set(panels, { transformOrigin: 'bottom' });
      tl.to(panels, {
        scaleY: 1,
        duration: 0.5,
        ease: 'power4.inOut',
        stagger: 0.05,
      });
      await Promise.all([tl.then(), originalLoader()]);
    };
  });

  document.addEventListener('astro:after-swap', () => {
    window.scrollTo(0, 0);
  });

  document.addEventListener('astro:page-load', () => {
    const panels = getPanels();
    if (panels.length === 0) return;
    if (reduced()) {
      gsap.set(panels, { scaleY: 0 });
      return;
    }
    const tl = gsap.timeline({ delay: 0.05 });
    tl.set(panels, { transformOrigin: 'top' });
    tl.to(panels, {
      scaleY: 0,
      duration: 0.6,
      ease: 'power4.inOut',
      stagger: 0.05,
    });
  });
}
