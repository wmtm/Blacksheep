export function initBeforeAfter() {
  const sliders = document.querySelectorAll<HTMLElement>('[data-before-after]');

  sliders.forEach((slider) => {
    if (slider.dataset.baBound) return;
    slider.dataset.baBound = 'true';

    const afterLayer = slider.querySelector<HTMLElement>('[data-before-after-after]');
    const handle = slider.querySelector<HTMLElement>('[data-before-after-handle]');
    if (!afterLayer || !handle) return;

    let dragging = false;
    let pct = 50;

    function setPercent(next: number) {
      pct = Math.min(100, Math.max(0, next));
      afterLayer!.style.clipPath = `inset(0 0 0 ${pct}%)`;
      handle!.style.left = `${pct}%`;
      handle!.setAttribute('aria-valuenow', String(Math.round(pct)));
    }

    function setPositionFromClientX(clientX: number) {
      const rect = slider.getBoundingClientRect();
      setPercent(((clientX - rect.left) / rect.width) * 100);
    }

    function onMove(e: PointerEvent) {
      if (!dragging) return;
      setPositionFromClientX(e.clientX);
    }

    slider.addEventListener('pointerdown', (e) => {
      dragging = true;
      slider.setPointerCapture(e.pointerId);
      setPositionFromClientX(e.clientX);
    });
    slider.addEventListener('pointermove', onMove);
    slider.addEventListener('pointerup', () => (dragging = false));
    slider.addEventListener('pointercancel', () => (dragging = false));

    // Keyboard: the handle carries role="slider" + tabindex, so arrow keys
    // (and Home/End for the extremes) are the keyboard-only equivalent of
    // the pointer drag above.
    const STEP = 5;
    handle.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
        e.preventDefault();
        setPercent(pct - STEP);
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
        e.preventDefault();
        setPercent(pct + STEP);
      } else if (e.key === 'Home') {
        e.preventDefault();
        setPercent(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        setPercent(100);
      }
    });
  });
}
