export function initBeforeAfter() {
  const sliders = document.querySelectorAll<HTMLElement>('[data-before-after]');

  sliders.forEach((slider) => {
    if (slider.dataset.baBound) return;
    slider.dataset.baBound = 'true';

    const afterLayer = slider.querySelector<HTMLElement>('[data-before-after-after]');
    const handle = slider.querySelector<HTMLElement>('[data-before-after-handle]');
    if (!afterLayer || !handle) return;

    let dragging = false;

    function setPosition(clientX: number) {
      const rect = slider.getBoundingClientRect();
      const pct = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
      afterLayer!.style.clipPath = `inset(0 0 0 ${pct}%)`;
      handle!.style.left = `${pct}%`;
    }

    function onMove(e: PointerEvent) {
      if (!dragging) return;
      setPosition(e.clientX);
    }

    slider.addEventListener('pointerdown', (e) => {
      dragging = true;
      slider.setPointerCapture(e.pointerId);
      setPosition(e.clientX);
    });
    slider.addEventListener('pointermove', onMove);
    slider.addEventListener('pointerup', () => (dragging = false));
    slider.addEventListener('pointercancel', () => (dragging = false));
  });
}
