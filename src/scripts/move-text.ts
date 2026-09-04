import { gsap } from 'gsap';

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// "MOVE." deconstructs into scattered, outline-only letters, then snaps
// together and fills solid — a small, cheap kinetic-type moment that reads
// as motion-design signature rather than a generic hover effect. Replays
// on hover so it rewards a second look without looping unprompted.
export function initMoveText() {
  const words = document.querySelectorAll<HTMLElement>('[data-move-text]');
  if (words.length === 0) return;

  words.forEach((word) => {
    const letters = Array.from(word.querySelectorAll<HTMLElement>('[data-move-letter]'));
    if (letters.length === 0) return;

    if (reduced()) {
      gsap.set(letters, { color: 'var(--color-paper)', x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 });
      return;
    }

    const scatter = () =>
      letters.map(() => ({
        x: gsap.utils.random(-36, 36),
        y: gsap.utils.random(-26, 26),
        rotation: gsap.utils.random(-50, 50),
        scale: gsap.utils.random(0.6, 0.85),
      }));

    function play() {
      const states = scatter();
      const tl = gsap.timeline();

      letters.forEach((letter, i) => {
        tl.fromTo(
          letter,
          { ...states[i], color: 'transparent', opacity: 0.55 },
          {
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1,
            opacity: 1,
            color: 'var(--color-paper)',
            duration: 0.85,
            ease: 'elastic.out(1, 0.65)',
          },
          i * 0.05
        );
      });
    }

    // Initial build-in, timed to land just after the line-reveal settles
    // (the parent line takes ~0.96s to slide up per reveals.ts' timing).
    gsap.set(letters, { opacity: 0 });
    gsap.delayedCall(1.05, play);

    let hovering = false;
    word.addEventListener('mouseenter', () => {
      if (hovering) return;
      hovering = true;
      play();
      gsap.delayedCall(1, () => (hovering = false));
    });
  });
}
