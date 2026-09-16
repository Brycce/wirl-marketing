'use client';

import { useRef } from 'react';
import { SnailMark } from './paper/Snail';

// The wirl is a snail. Hover the wordmark and it gets going: speed lines,
// a nudge forward, and a ripple running along its belly.
export default function Wordmark({ size = 28 }: { size?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  function ripple(on: boolean) {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    ref.current?.querySelectorAll('animate').forEach((a) => {
      const el = a as SVGAnimateElement;
      if (on) el.beginElement();
      else el.endElement();
    });
  }

  return (
    <span ref={ref} className="wordmark inline-flex items-center gap-2" onMouseEnter={() => ripple(true)} onMouseLeave={() => ripple(false)}>
      <SnailMark size={size} fast className="wordmark-mark" />
      <span className="font-display font-bold leading-none tracking-[-0.04em]" style={{ fontSize: Math.round(size * 0.95) }}>wirl</span>
    </span>
  );
}
