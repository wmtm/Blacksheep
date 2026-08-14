import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Makes the word "MOVE." in the hero actually move: a perpetual idle drift
// (so it's always in motion, not just on interaction) plus a skew that
// reacts to scroll velocity — the faster you scroll, the more it leans,
// snapping back to rest. Classic "smart" scroll-linked kinetic type, but
// scoped to a single word instead of the whole page.
export function initMoveText() {
  const els = document.querySelectorAll<HTMLElement>('[data-move-text]');
  if (els.length === 0 || reduced()) return;

  els.forEach((el) => {
    gsap.killTweensOf(el);

    // Perpetual idle drift — a lazy, slightly organic float/tilt loop.
    const idle = gsap.timeline({ repeat: -1, yoyo: true, defaults: { ease: 'sine.inOut' } });
    idle
      .to(el, { y: -7, rotate: -2, duration: 1.6 })
      .to(el, { y: 2, rotate: 1.5, duration: 1.3 }, '<0.1')
      .to(el, { y: -3, rotate: -1, duration: 1.1 });

    // Scroll-velocity skew — the word leans into fast scrolls and springs back.
    const proxy = { skew: 0 };
    const clampSkew = gsap.utils.clamp(-16, 16);
    const applySkew = gsap.quickSetter(el, 'skewX', 'deg');

    ScrollTrigger.create({
      onUpdate(self) {
        const skew = clampSkew(self.getVelocity() / -260);
        if (Math.abs(skew) > Math.abs(proxy.skew)) {
          proxy.skew = skew;
          gsap.to(proxy, {
            skew: 0,
            duration: 0.9,
            ease: 'power3',
            overwrite: true,
            onUpdate: () => applySkew(proxy.skew),
          });
        }
      },
    });
  });
}
