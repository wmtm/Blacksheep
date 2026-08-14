import { initSmoothScroll, destroySmoothScroll } from './lenis-setup';
import { initCursor, refreshCursorTargets } from './cursor';
import { initReveals } from './reveals';
import { initPageTransitions } from './transitions';
import { initNav } from './nav';
import { initWorkFilter } from './work-filter';
import { initFollowPreview } from './follow-preview';
import { initClock } from './clock';
import { initTilt } from './tilt';
import { initBeforeAfter } from './before-after';

function boot() {
  initSmoothScroll();
  initCursor();
  initReveals();
  initNav();
  initWorkFilter();
  initFollowPreview();
  initClock();
  initTilt();
  initBeforeAfter();
}

initPageTransitions();

document.addEventListener('astro:page-load', () => {
  boot();
});

document.addEventListener('astro:before-swap', () => {
  destroySmoothScroll();
});

// Re-attach cursor targets whenever content changes without a full nav
// (e.g. work filter reflow adding/removing cards)
document.addEventListener('daneva:refresh-cursor', () => {
  refreshCursorTargets();
});
