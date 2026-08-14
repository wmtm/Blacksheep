import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;
let rafId: number | null = null;

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function getLenis() {
  return lenis;
}

export function initSmoothScroll() {
  destroySmoothScroll();

  if (prefersReducedMotion()) {
    document.documentElement.classList.remove('has-lenis');
    ScrollTrigger.refresh();
    return;
  }

  lenis = new Lenis({
    duration: 1.15,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  lenis.on('scroll', ScrollTrigger.update);

  const tick = (time: number) => {
    lenis?.raf(time * 1000);
    rafId = requestAnimationFrame(tick);
  };
  rafId = requestAnimationFrame(tick);

  document.documentElement.classList.add('has-lenis');

  ScrollTrigger.defaults({});
  ScrollTrigger.refresh();
}

export function destroySmoothScroll() {
  if (rafId) cancelAnimationFrame(rafId);
  rafId = null;
  lenis?.destroy();
  lenis = null;
}

export function scrollToHash(hash: string) {
  const el = document.querySelector(hash);
  if (!el) return;
  if (lenis) {
    lenis.scrollTo(el as HTMLElement, { offset: -96, duration: 1.2 });
  } else {
    (el as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
