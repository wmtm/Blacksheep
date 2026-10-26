import { gsap } from 'gsap';
import { DURATION, EASE } from './motion';

const isFinePointer = () =>
  window.matchMedia('(pointer: fine)').matches &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function initTilt() {
  if (!isFinePointer()) return;

  const els = document.querySelectorAll<HTMLElement>('[data-tilt]');
  els.forEach((el) => {
    if (el.dataset.tiltBound) return;
    el.dataset.tiltBound = 'true';

    const strength = Number(el.dataset.tilt) || 7;
    gsap.set(el, { transformPerspective: 900 });
    const rx = gsap.quickTo(el, 'rotationX', { duration: DURATION.base, ease: EASE.out });
    const ry = gsap.quickTo(el, 'rotationY', { duration: DURATION.base, ease: EASE.out });

    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      ry(px * strength * 2);
      rx(-py * strength * 2);
    });

    el.addEventListener('mouseleave', () => {
      rx(0);
      ry(0);
    });
  });
}
