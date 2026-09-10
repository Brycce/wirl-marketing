'use client';

import { useEffect, useRef } from 'react';

// The panel pins once it is fully in view and stays put while the reader
// scrolls through the outer wrapper's extra height. --p goes 0 to 1 over
// that stretch: a short hold on the mess, the tidying, a short hold on the
// result, then the page carries on. Everything visual is CSS reading --p.
const STICKY_TOP = 72;

function smoothstep(t: number) {
  return t * t * (3 - 2 * t);
}

export default function PileScroll({ children, panelClassName = '' }: { children: React.ReactNode; panelClassName?: string }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outer = outerRef.current;
    const panel = panelRef.current;
    if (!outer || !panel) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      outer.style.setProperty('--p', '1');
      return;
    }

    let raf = 0;
    let current = 0;

    const target = () => {
      const travel = outer.offsetHeight - panel.offsetHeight;
      if (travel <= 0) return 1;
      const raw = Math.min(1, Math.max(0, (STICKY_TOP - outer.getBoundingClientRect().top) / travel));
      // Hold the mess for the first stretch, hold the result for the last.
      return smoothstep(Math.min(1, Math.max(0, (raw - 0.14) / 0.66)));
    };

    const tick = () => {
      const t = target();
      current += (t - current) * 0.25;
      if (Math.abs(t - current) < 0.002) current = t;
      outer.style.setProperty('--p', current.toFixed(4));
      if (current !== t) raf = requestAnimationFrame(tick);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div ref={outerRef} className="pile-outer relative" style={{ '--p': 0 } as React.CSSProperties}>
      <div ref={panelRef} className={`pile-panel sticky ${panelClassName}`} style={{ top: STICKY_TOP }}>
        {children}
      </div>
    </div>
  );
}
