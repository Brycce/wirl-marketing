'use client';

// The sun/moon button in the nav: day or night, remembered.
//
// The theme itself is set before the first paint by the head script in
// src/app/layout.tsx, as data-theme on <html>. This button only flips that
// attribute and stores the choice under the same "wirl-theme" key, which from
// then on beats the system setting. Which icon shows is decided by CSS from
// data-theme (in home/css.ts), so the right one is on screen from the first
// paint, before React has read anything. The head script also sets this
// button's label and pressed state once the page is parsed, so it is right
// before hydration too (hence suppressHydrationWarning: the server had to
// guess). It watches the attribute rather than keeping its own copy, so a
// system change or another tab flipping the theme keeps it in step.

import { useSyncExternalStore } from 'react';

const KEY = 'wirl-theme';

function subscribe(onChange: () => void) {
  const watch = new MutationObserver(onChange);
  watch.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  return () => watch.disconnect();
}
const isDark = () => document.documentElement.getAttribute('data-theme') === 'dark';
const onServer = () => false;

export default function ThemeToggle() {
  const dark = useSyncExternalStore(subscribe, isDark, onServer);

  function flip() {
    const next = isDark() ? 'light' : 'dark';
    const root = document.documentElement;
    root.setAttribute('data-theme', next);
    root.style.colorScheme = next;
    try {
      localStorage.setItem(KEY, next);
    } catch {
      /* storage blocked: the choice lasts for this page only */
    }
  }

  const label = dark ? 'Switch to light mode' : 'Switch to dark mode';
  return (
    <button
      type="button" className="tb-theme" data-theme-toggle onClick={flip}
      aria-label={label} aria-pressed={dark} title={label} suppressHydrationWarning
    >
      {/* Shown by day: the moon, to go to night. */}
      <svg className="tb-theme-moon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M19.6 14.6A8 8 0 0 1 9.4 4.4a8 8 0 1 0 10.2 10.2Z" strokeWidth="2" strokeLinejoin="round" />
      </svg>
      {/* Shown by night: the sun, to go back to day. */}
      <svg className="tb-theme-sun" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <circle cx="12" cy="12" r="4.4" />
        <path
          d="M12 2.6v2.3M12 19.1v2.3M2.6 12h2.3M19.1 12h2.3M5.35 5.35l1.6 1.6M17.05 17.05l1.6 1.6M5.35 18.65l1.6-1.6M17.05 6.95l1.6-1.6"
          strokeWidth="2.2" strokeLinecap="round"
        />
      </svg>
    </button>
  );
}
