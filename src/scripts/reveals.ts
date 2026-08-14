import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function initReveals() {
  ScrollTrigger.getAll().forEach((t) => t.kill());

  if (reduced()) {
    document.querySelectorAll<HTMLElement>('[data-reveal], [data-reveal-lines], [data-parallax]').forEach((el) => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  // Simple fade/rise reveals
  gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
    const delay = Number(el.dataset.revealDelay) || 0;
    gsap.fromTo(
      el,
      { opacity: 0, y: 28 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          once: true,
        },
      }
    );
  });

  // Staggered group reveals
  gsap.utils.toArray<HTMLElement>('[data-reveal-group]').forEach((group) => {
    const items = group.querySelectorAll<HTMLElement>('[data-reveal-item]');
    gsap.fromTo(
      items,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: group,
          start: 'top 85%',
          once: true,
        },
      }
    );
  });

  // Line-by-line text reveal (expects pre-split spans via data-line)
  gsap.utils.toArray<HTMLElement>('[data-reveal-lines]').forEach((el) => {
    const lines = el.querySelectorAll<HTMLElement>('[data-line]');
    gsap.fromTo(
      lines,
      { yPercent: 110 },
      {
        yPercent: 0,
        duration: 0.9,
        ease: 'expo.out',
        stagger: 0.06,
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          once: true,
        },
      }
    );
  });

  // Parallax
  gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
    const amount = Number(el.dataset.parallax) || 40;
    gsap.fromTo(
      el,
      { y: -amount },
      {
        y: amount,
        ease: 'none',
        scrollTrigger: {
          trigger: el.parentElement ?? el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    );
  });

  // Scroll-linked progress bar
  document.querySelectorAll<HTMLElement>('[data-scroll-progress]').forEach((bar) => {
    gsap.fromTo(
      bar,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3,
        },
      }
    );
  });

  // Active section index tracking
  document.querySelectorAll<HTMLElement>('[data-index-nav]').forEach((nav) => {
    const links = nav.querySelectorAll<HTMLElement>('[data-index-link]');
    links.forEach((link) => {
      const id = link.dataset.indexLink;
      const section = id ? document.getElementById(id) : null;
      if (!section) return;
      ScrollTrigger.create({
        trigger: section,
        start: 'top 50%',
        end: 'bottom 50%',
        onToggle: (self) => {
          if (self.isActive) {
            links.forEach((l) => l.removeAttribute('data-active'));
            link.setAttribute('data-active', 'true');
          }
        },
      });
    });
  });

  ScrollTrigger.refresh();
}
