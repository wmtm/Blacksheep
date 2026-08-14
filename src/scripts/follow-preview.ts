import { gsap } from 'gsap';

export function initFollowPreview() {
  const triggers = document.querySelectorAll<HTMLElement>('[data-preview-trigger]');
  if (triggers.length === 0) return;

  triggers.forEach((trigger) => {
    const thumb = trigger.querySelector<HTMLElement>('[data-preview-thumb]');
    if (!thumb) return;

    const xTo = gsap.quickTo(thumb, 'x', { duration: 0.5, ease: 'power3.out' });
    const yTo = gsap.quickTo(thumb, 'y', { duration: 0.5, ease: 'power3.out' });

    gsap.set(thumb, { opacity: 0, scale: 0.85, pointerEvents: 'none' });

    trigger.addEventListener('mousemove', (e) => {
      const r = trigger.getBoundingClientRect();
      xTo(e.clientX - r.left);
      yTo(e.clientY - r.top);
    });

    trigger.addEventListener('mouseenter', () => {
      gsap.to(thumb, { opacity: 1, scale: 1, duration: 0.4, ease: 'power3.out' });
    });

    trigger.addEventListener('mouseleave', () => {
      gsap.to(thumb, { opacity: 0, scale: 0.85, duration: 0.3, ease: 'power3.in' });
    });
  });
}
