import { gsap } from 'gsap';

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

interface TrackState {
  setX: (v: number) => void;
  loopWidth: number;
  baseSpeed: number;
  x: number;
}

let tracked: TrackState[] = [];
let tickerAdded = false;
let lastScrollY = window.scrollY;
let velocity = 0;

function tick(_time: number, deltaMs: number) {
  const dt = Math.min(deltaMs, 50) / 1000;
  if (dt <= 0) return;

  const scrollY = window.scrollY;
  const scrollSpeed = (scrollY - lastScrollY) / dt; // px/sec, +down / -up
  lastScrollY = scrollY;
  velocity += (scrollSpeed - velocity) * 0.12;
  const boost = gsap.utils.clamp(-400, 400, velocity * 0.8);

  tracked.forEach((s) => {
    s.x -= (s.baseSpeed + boost) * dt;
    if (s.x <= -s.loopWidth) s.x += s.loopWidth;
    if (s.x > 0) s.x -= s.loopWidth;
    s.setX(s.x);
  });
}

// Scroll-reactive marquee: the base loop never stops, but scrolling down
// gives it a shove forward and scrolling up can briefly reverse it, the
// same way loose type on a page drags with the page underneath it. Runs on
// a single shared ticker (added once, module-level) rather than one per
// track; the CSS keyframe loop in Marquee.astro stays in charge for
// prefers-reduced-motion and keeps the marquee moving if this never runs.
export function initMarquee() {
  if (reduced()) return;

  const trackEls = document.querySelectorAll<HTMLElement>('.marquee-track');
  tracked = Array.from(trackEls)
    .map((track): TrackState | null => {
      const loopWidth = track.scrollWidth / 2;
      if (!loopWidth) return null;
      track.style.animation = 'none';
      const wrapper = track.closest<HTMLElement>('.marquee');
      const speedSec = parseFloat(wrapper?.style.getPropertyValue('--speed') || '28') || 28;
      return {
        setX: gsap.quickSetter(track, 'x', 'px') as (v: number) => void,
        loopWidth,
        baseSpeed: loopWidth / speedSec,
        x: 0,
      };
    })
    .filter((s): s is TrackState => s !== null);

  if (tracked.length > 0 && !tickerAdded) {
    gsap.ticker.add(tick);
    tickerAdded = true;
  }
}
