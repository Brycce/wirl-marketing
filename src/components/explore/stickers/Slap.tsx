'use client';

import { useEffect } from 'react';

// Stickers below the fold slap on when their page scrolls into view. Until
// this runs, everything is simply stuck in place, and it never runs for
// reduced motion. It also stays off under automation (navigator.webdriver),
// so full-page screenshots show every page with its stickers on.
export default function Slap() {
  useEffect(() => {
    const root = document.querySelector('.sb');
    if (!root || !('IntersectionObserver' in window)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (navigator.webdriver) return;
    const pages = Array.from(root.querySelectorAll<HTMLElement>('[data-slap]'));
    const fold = window.innerHeight;
    // Pages already on screen at load keep their stickers; only later ones wait.
    const later = pages.filter((p) => p.getBoundingClientRect().top > fold * 0.85);
    if (!later.length) return;
    later.forEach((p) => p.classList.add('sb-wait'));
    root.classList.add('sb-armed');
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      },
      { threshold: 0.3 },
    );
    later.forEach((p) => io.observe(p));
    return () => io.disconnect();
  }, []);
  return null;
}
