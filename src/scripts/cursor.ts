import { gsap } from 'gsap';
import { DURATION, EASE } from './motion';

let dot: HTMLElement | null = null;
let ring: HTMLElement | null = null;
let bound = false;
let xTo: gsap.QuickToFunc | null = null;
let yTo: gsap.QuickToFunc | null = null;
let ringXTo: gsap.QuickToFunc | null = null;
let ringYTo: gsap.QuickToFunc | null = null;

const isFinePointer = () =>
  window.matchMedia('(pointer: fine)').matches &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function setRingState(state: { scale?: number; bg?: string; border?: string; text?: string }) {
  if (!ring) return;
  gsap.to(ring, {
    width: state.scale ? 44 * state.scale : 44,
    height: state.scale ? 44 * state.scale : 44,
    marginTop: state.scale ? (-22 * state.scale) : -22,
    marginLeft: state.scale ? (-22 * state.scale) : -22,
    backgroundColor: state.bg ?? 'transparent',
    borderColor: state.border ?? 'color-mix(in srgb, var(--color-paper) 55%, transparent)',
    duration: DURATION.fast,
    ease: EASE.snap,
  });
  ring.textContent = state.text ?? '';
}

export function initCursor() {
  if (!isFinePointer()) {
    document.documentElement.classList.remove('cursor-ready');
    return;
  }

  dot = document.querySelector('[data-cursor-dot]');
  ring = document.querySelector('[data-cursor-ring]');
  if (!dot || !ring) return;

  document.documentElement.classList.add('cursor-ready');

  xTo = gsap.quickTo(dot, 'x', { duration: DURATION.instant, ease: EASE.out });
  yTo = gsap.quickTo(dot, 'y', { duration: DURATION.instant, ease: EASE.out });
  ringXTo = gsap.quickTo(ring, 'x', { duration: DURATION.base, ease: EASE.out });
  ringYTo = gsap.quickTo(ring, 'y', { duration: DURATION.base, ease: EASE.out });

  if (!bound) {
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', () => gsap.to(dot, { scale: 0.6, duration: DURATION.fast, ease: EASE.out }));
    window.addEventListener('mouseup', () => gsap.to(dot, { scale: 1, duration: DURATION.fast, ease: EASE.spring }));
    bound = true;
  }

  attachHoverTargets();
}

function onMove(e: MouseEvent) {
  xTo?.(e.clientX);
  yTo?.(e.clientY);
  ringXTo?.(e.clientX);
  ringYTo?.(e.clientY);
}

function attachHoverTargets() {
  // Guarded per-element like tilt.ts/mascot.ts: without this, elements that
  // survive navigation (transition:persist, e.g. the header) or get
  // re-scanned without remounting (the work-filter's FLIP reflow calling
  // refreshCursorTargets) would pick up another full set of listeners every
  // time, instead of being skipped as already-bound.
  const targets = document.querySelectorAll<HTMLElement>('[data-cursor]');
  targets.forEach((el) => {
    if (el.dataset.cursorBound) return;
    el.dataset.cursorBound = 'true';

    const type = el.dataset.cursor;
    const text = el.dataset.cursorText ?? '';

    el.addEventListener('mouseenter', () => {
      if (type === 'view') setRingState({ scale: 1.7, bg: 'var(--color-paper)', text });
      else if (type === 'drag') setRingState({ scale: 1.9, bg: 'var(--color-brand-coral)', text: text || 'DRAG' });
      else if (type === 'link') setRingState({ scale: 1.3, border: 'var(--color-paper)' });
      else if (type === 'close') setRingState({ scale: 1.4, bg: 'var(--color-paper)', text: '' });
      if (ring) ring.style.color = 'var(--color-ink)';
    });
    el.addEventListener('mouseleave', () => setRingState({}));
  });

  // magnetic buttons
  const magnets = document.querySelectorAll<HTMLElement>('[data-magnetic]');
  magnets.forEach((el) => {
    if (el.dataset.magneticBound) return;
    el.dataset.magneticBound = 'true';

    const strength = Number(el.dataset.magnetic) || 0.35;
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const relX = e.clientX - (r.left + r.width / 2);
      const relY = e.clientY - (r.top + r.height / 2);
      gsap.to(el, { x: relX * strength, y: relY * strength, duration: DURATION.base, ease: EASE.out });
    });
    el.addEventListener('mouseleave', () => {
      gsap.to(el, { x: 0, y: 0, duration: DURATION.slow, ease: EASE.bouncy });
    });
  });
}

export function refreshCursorTargets() {
  if (!isFinePointer()) return;
  attachHoverTargets();
}
