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

    // Letters explode outward from the word's centre rather than jittering
    // randomly — reads as one coherent, spacious motion instead of noise.
    const center = (letters.length - 1) / 2;
    const scatter = () =>
      letters.map((_, i) => {
        const dir = center === 0 ? 0 : (i - center) / center;
        return {
          x: dir * gsap.utils.random(55, 85) + gsap.utils.random(-6, 6),
          y: gsap.utils.random(-10, 10),
          rotation: gsap.utils.random(-10, 10) + dir * gsap.utils.random(-3, 3),
          scale: gsap.utils.random(0.9, 0.96),
        };
      });

    function play() {
      const states = scatter();
      const tl = gsap.timeline();

      letters.forEach((letter, i) => {
        tl.fromTo(
          letter,
          { ...states[i], color: 'transparent', opacity: 0.7 },
          {
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1,
            opacity: 1,
            color: 'var(--color-paper)',
            duration: 2.3,
            ease: 'power3.out',
          },
          i * 0.16
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
      gsap.delayedCall(3.1, () => (hovering = false));
    });
  });
}
