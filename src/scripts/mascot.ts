import { gsap } from 'gsap';

const PALETTE = [
  'var(--color-brand-coral)',
  'var(--color-brand-violet)',
  'var(--color-brand-teal)',
  'var(--color-brand-gold)',
  'var(--color-brand-blue)',
  'var(--color-brand-orange)',
];

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function pickNext(current: number): number {
  let next = Math.floor(Math.random() * PALETTE.length);
  while (next === current) next = Math.floor(Math.random() * PALETTE.length);
  return next;
}

// Hard strobe cut: no crossfade, just a one-frame flash to paper then a snap
// to the new colour, with a stiff little rotation jolt.
function strobeCut(mark: HTMLElement, next: string) {
  gsap.set(mark, { backgroundColor: 'var(--color-paper)', rotate: gsap.utils.random(-6, 6) });
  gsap.delayedCall(0.06, () => {
    gsap.set(mark, { backgroundColor: next, rotate: 0 });
  });
}

// Flicker: several rapid on/off toggles between the current and next colour,
// like a failing tube light, settling hard on the new colour.
function flicker(mark: HTMLElement, current: string, next: string) {
  const ticks = 5;
  let delay = 0;
  for (let i = 0; i < ticks; i++) {
    const color = i % 2 === 0 ? next : current;
    const d = delay;
    gsap.delayedCall(d, () => gsap.set(mark, { backgroundColor: color }));
    delay += 0.045 + i * 0.015;
  }
  gsap.delayedCall(delay, () => gsap.set(mark, { backgroundColor: next }));
}

// RGB-glitch offset: two mis-registered ghost copies in other palette colours
// punch out briefly, then collapse back into a single clean mark.
function glitchOffset(
  mark: HTMLElement,
  ghostA: HTMLElement,
  ghostB: HTMLElement,
  next: string,
  colorA: string,
  colorB: string
) {
  gsap.set(ghostA, { backgroundColor: colorA, opacity: 0.85, x: -6, y: 2 });
  gsap.set(ghostB, { backgroundColor: colorB, opacity: 0.85, x: 5, y: -3 });
  gsap.set(mark, { opacity: 0.4 });

  gsap.delayedCall(0.09, () => {
    gsap.set(ghostA, { x: 4, y: -2 });
    gsap.set(ghostB, { x: -5, y: 3 });
  });

  gsap.delayedCall(0.16, () => {
    gsap.set([ghostA, ghostB], { opacity: 0, x: 0, y: 0 });
    gsap.set(mark, { backgroundColor: next, opacity: 1 });
  });
}

// Hard-edge wipe: a solid panel in the next colour reveals across the mark
// in discrete steps (no smoothing) rather than a soft gradient sweep.
function hardWipe(mark: HTMLElement, wipe: HTMLElement, next: string) {
  gsap.set(wipe, { backgroundColor: next, clipPath: 'inset(0 100% 0 0)' });
  gsap.to(wipe, {
    clipPath: 'inset(0 0% 0 0)',
    duration: 0.4,
    ease: 'steps(6)',
    onComplete: () => {
      gsap.set(mark, { backgroundColor: next });
      gsap.set(wipe, { clipPath: 'inset(0 100% 0 0)' });
    },
  });
}

export function initMascot() {
  const mascots = document.querySelectorAll<HTMLElement>('[data-mascot]');

  mascots.forEach((el) => {
    if (el.dataset.mascotBound) return;
    el.dataset.mascotBound = 'true';

    const mark = el.querySelector<HTMLElement>('[data-mascot-mark]');
    const ghosts = el.querySelectorAll<HTMLElement>('[data-mascot-ghost]');
    const wipe = el.querySelector<HTMLElement>('[data-mascot-wipe]');
    const dot = el.querySelector<HTMLElement>('[data-mascot-dot]');
    if (!mark || !wipe || ghosts.length < 2) return;

    let colorIndex = 0;
    gsap.set(mark, { backgroundColor: PALETTE[colorIndex] });
    if (dot) gsap.set(dot, { backgroundColor: PALETTE[colorIndex] });

    if (prefersReducedMotion()) return;

    let running = true;
    let pending: gsap.core.Tween | null = null;

    function switchColor() {
      if (!running || !document.body.contains(el)) {
        running = false;
        return;
      }
      const nextIndex = pickNext(colorIndex);
      const next = PALETTE[nextIndex];
      const current = PALETTE[colorIndex];
      const mechanic = Math.floor(Math.random() * 4);

      if (mechanic === 0) strobeCut(mark!, next);
      else if (mechanic === 1) flicker(mark!, current, next);
      else if (mechanic === 2) {
        const otherA = PALETTE[pickNext(colorIndex)];
        const otherB = PALETTE[pickNext(colorIndex)];
        glitchOffset(mark!, ghosts[0], ghosts[1], next, otherA, otherB);
      } else hardWipe(mark!, wipe!, next);

      if (dot) gsap.delayedCall(0.3, () => gsap.set(dot, { backgroundColor: next }));

      colorIndex = nextIndex;
      pending = gsap.delayedCall(gsap.utils.random(1.6, 3.6), switchColor);
    }

    pending = gsap.delayedCall(gsap.utils.random(0.8, 2), switchColor);

    el.addEventListener('mouseenter', () => {
      if (!running) return;
      pending?.kill();
      gsap.killTweensOf([mark, ghosts[0], ghosts[1], wipe]);
      switchColor();
    });
  });
}
