import { gsap } from 'gsap';
import { DURATION, EASE } from './motion';

export function initFollowPreview() {
  const triggers = document.querySelectorAll<HTMLElement>('[data-preview-trigger]');
  if (triggers.length === 0) return;

  triggers.forEach((trigger) => {
    const thumb = trigger.querySelector<HTMLElement>('[data-preview-thumb]');
    if (!thumb) return;

    const xTo = gsap.quickTo(thumb, 'x', { duration: DURATION.base, ease: EASE.out });
    const yTo = gsap.quickTo(thumb, 'y', { duration: DURATION.base, ease: EASE.out });

    gsap.set(thumb, { opacity: 0, scale: 0.85, pointerEvents: 'none' });

    trigger.addEventListener('mousemove', (e) => {
      const r = trigger.getBoundingClientRect();
      xTo(e.clientX - r.left);
      yTo(e.clientY - r.top);
    });

    trigger.addEventListener('mouseenter', () => {
      gsap.to(thumb, { opacity: 1, scale: 1, duration: DURATION.base, ease: EASE.spring });
    });

    trigger.addEventListener('mouseleave', () => {
      gsap.to(thumb, { opacity: 0, scale: 0.85, duration: DURATION.fast, ease: EASE.out });
    });
  });
}
