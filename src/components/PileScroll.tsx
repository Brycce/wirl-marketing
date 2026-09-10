'use client';

import { useEffect, useRef } from 'react';

// Sets --p from 0 to 1 over the first stretch of scrolling. The pile reads it
// and tidies itself. Everything else is CSS.
const DISTANCE = 520;

export default function PileScroll({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.setProperty('--p', '1');
      return;
    }

    let raf = 0;
    let current = 0;
    const target = () => Math.min(1, Math.max(0, window.scrollY / DISTANCE));

    const tick = () => {
      const t = target();
      current += (t - current) * 0.18;
      if (Math.abs(t - current) < 0.002) current = t;
      el.style.setProperty('--p', current.toFixed(4));
      if (current !== t) raf = requestAnimationFrame(tick);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div ref={ref} className={className} style={{ '--p': 0 } as React.CSSProperties}>
      {children}
    </div>
  );
}
