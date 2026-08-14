import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';

gsap.registerPlugin(Flip);

export function initWorkFilter() {
  const root = document.querySelector<HTMLElement>('[data-work-filter]');
  if (!root) return;

  const pills = root.querySelectorAll<HTMLElement>('[data-filter]');
  const grid = document.querySelector<HTMLElement>('[data-work-grid]');
  const cards = grid ? Array.from(grid.querySelectorAll<HTMLElement>('[data-card]')) : [];
  const countEl = document.querySelector<HTMLElement>('[data-filter-count]');
  const indicator = root.querySelector<HTMLElement>('[data-filter-indicator]');
  const track = root.querySelector<HTMLElement>('[data-filter-track]') ?? root;

  if (!grid || cards.length === 0) return;

  function positionIndicator(target: HTMLElement) {
    if (!indicator) return;
    const rootRect = track.getBoundingClientRect();
    const rect = target.getBoundingClientRect();
    gsap.to(indicator, {
      x: rect.left - rootRect.left,
      width: rect.width,
      duration: 0.45,
      ease: 'power3.out',
    });
  }

  function applyFilter(value: string, initial = false) {
    const state = Flip.getState(cards);

    let visibleCount = 0;
    cards.forEach((card) => {
      const cats = (card.dataset.category ?? '').split(',');
      const match = value === 'all' || cats.includes(value);
      card.classList.toggle('hidden', !match);
      if (match) visibleCount += 1;
    });

    if (countEl) countEl.textContent = String(visibleCount).padStart(2, '0');

    if (!initial) {
      Flip.from(state, {
        duration: 0.6,
        ease: 'power3.inOut',
        stagger: 0.03,
        absolute: true,
      });
      document.dispatchEvent(new CustomEvent('blacksheep:refresh-cursor'));
    }
  }

  pills.forEach((pill) => {
    pill.addEventListener('click', () => {
      pills.forEach((p) => p.removeAttribute('data-active'));
      pill.setAttribute('data-active', 'true');
      positionIndicator(pill);
      const value = pill.dataset.filter ?? 'all';
      applyFilter(value);
      const url = new URL(window.location.href);
      if (value === 'all') url.searchParams.delete('cat');
      else url.searchParams.set('cat', value);
      window.history.replaceState({}, '', url);
    });
  });

  const params = new URLSearchParams(window.location.search);
  const initialValue = params.get('cat') ?? 'all';
  const initialPill =
    Array.from(pills).find((p) => p.dataset.filter === initialValue) ?? pills[0];

  if (initialPill) {
    pills.forEach((p) => p.removeAttribute('data-active'));
    initialPill.setAttribute('data-active', 'true');
    requestAnimationFrame(() => positionIndicator(initialPill));
  }
  applyFilter(initialValue, true);

  window.addEventListener('resize', () => {
    const active = root.querySelector<HTMLElement>('[data-filter][data-active]');
    if (active) positionIndicator(active);
  });
}
