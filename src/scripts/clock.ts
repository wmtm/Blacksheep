export function initClock() {
  const els = document.querySelectorAll<HTMLElement>('[data-clock]');
  if (els.length === 0) return;

  const update = () => {
    const time = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Indian/Mauritius',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date());
    els.forEach((el) => (el.textContent = time));
  };

  update();
  window.setInterval(update, 30_000);
}
