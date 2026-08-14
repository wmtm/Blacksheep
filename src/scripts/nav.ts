import { gsap } from 'gsap';

let isOpen = false;

export function initNav() {
  const toggle = document.querySelector<HTMLElement>('[data-nav-toggle]');
  const menu = document.querySelector<HTMLElement>('[data-nav-menu]');
  const links = menu?.querySelectorAll<HTMLElement>('[data-nav-link]');
  const closeTargets = document.querySelectorAll<HTMLElement>('[data-nav-close]');

  if (!toggle || !menu) return;

  isOpen = false;
  gsap.set(menu, { display: 'none' });
  document.documentElement.classList.remove('nav-open');

  const open = () => {
    isOpen = true;
    document.documentElement.classList.add('nav-open');
    toggle.setAttribute('aria-expanded', 'true');
    gsap.set(menu, { display: 'flex' });
    gsap.fromTo(
      menu,
      { clipPath: 'inset(0% 0% 100% 0%)' },
      { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.7, ease: 'power4.inOut' }
    );
    if (links) {
      gsap.fromTo(
        links,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.06, delay: 0.25, ease: 'power3.out' }
      );
    }
  };

  const close = () => {
    if (!isOpen) return;
    isOpen = false;
    document.documentElement.classList.remove('nav-open');
    toggle.setAttribute('aria-expanded', 'false');
    gsap.to(menu, {
      clipPath: 'inset(0% 0% 100% 0%)',
      duration: 0.55,
      ease: 'power4.inOut',
      onComplete: () => gsap.set(menu, { display: 'none' }),
    });
  };

  toggle.addEventListener('click', () => (isOpen ? close() : open()));
  closeTargets.forEach((el) => el.addEventListener('click', close));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });

  document.addEventListener('astro:before-swap', close);
}
