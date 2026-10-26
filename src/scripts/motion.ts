// Shared motion vocabulary. Every script pulls its durations, eases and
// distances from here instead of inventing its own numbers, so the site
// moves with one recognizable personality across reveals, cursor, tilt,
// page transitions, nav and filtering: confident, a little springy, never
// floaty or slow.
//
// The duration scale lines up 1:1 with global.css's --duration-* theme
// tokens (seconds here, the same number in ms there), and EASE.spring is
// the GSAP twin of global.css's --ease-spring, so a GSAP tween and a plain
// Tailwind `transition` read as the same motion system.
//
// Two effects are deliberately NOT migrated onto this scale: the homepage/
// Playground kinetic "MOVE."/"PLAY." text scatter (move-text.ts) and the
// mascot's glitchy colour-swap (mascot.ts). Both are one-off signature set
// pieces built to feel chaotic/bespoke on purpose; forcing them onto a
// shared, smooth vocabulary would blunt the thing that makes them work.

export const DURATION = {
  instant: 0.15,
  fast: 0.3,
  base: 0.45,
  slow: 0.6,
  slower: 0.9,
} as const;

export const EASE = {
  /** Default settle for most reveals/follows: confident, no overshoot. */
  out: 'power3.out',
  /** Heavier ease for large structural moves: page wipes, nav clip-path, FLIP reflow. */
  inOut: 'power4.inOut',
  /** Snappier arrival for things that should feel alive: line reveals, cursor ring state. */
  snap: 'expo.out',
  /**
   * The site's signature springy settle. Used deliberately on a handful of
   * standout moments (magnetic release, hover-lift, CTA arrival) so it still
   * reads as a flourish, not a tic repeated on every single interaction.
   */
  spring: 'back.out(1.7)',
  bouncy: 'elastic.out(1, 0.5)',
} as const;

export const DISTANCE = {
  /** Shared rise distance for data-reveal and data-reveal-group alike. */
  revealY: 26,
  liftY: 8,
} as const;

export const STAGGER = {
  tight: 0.05,
  base: 0.07,
  loose: 0.1,
} as const;
