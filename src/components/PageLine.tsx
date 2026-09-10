'use client';

import { useEffect, useRef } from 'react';

// One stroke runs the page. It starts under the mark, loops once at every
// element marked data-loop, and draws itself on as the reader scrolls.
export default function PageLine() {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const path = pathRef.current;
    const wrapper = svg?.parentElement;
    if (!svg || !path || !wrapper) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let samples: { y: number; f: number }[] = [];

    const build = () => {
      const box = wrapper.getBoundingClientRect();
      const start = wrapper.querySelector<HTMLElement>('[data-line-start]');
      const loops = Array.from(wrapper.querySelectorAll<HTMLElement>('[data-loop]'));
      const end = wrapper.querySelector<HTMLElement>('[data-line-end]');
      if (!start || loops.length === 0) return;

      const s = start.getBoundingClientRect();
      const x = s.left - box.left + 15;
      let d = `M ${x} ${s.bottom - box.top + 6}`;

      for (const el of loops) {
        const r = el.getBoundingClientRect();
        const y = r.top - box.top + Math.min(r.height / 2, 36);
        d +=
          ` L ${x} ${y - 40}` +
          ` C ${x} ${y - 10}, ${x + 6} ${y + 12}, ${x + 18} ${y + 6}` +
          ` C ${x + 30} ${y - 2}, ${x + 26} ${y - 22}, ${x + 10} ${y - 22}` +
          ` C ${x - 4} ${y - 22}, ${x - 12} ${y - 6}, ${x - 6} ${y + 6}` +
          ` C ${x - 2} ${y + 14}, ${x} ${y + 22}, ${x} ${y + 40}`;
      }

      if (end) {
        const r = end.getBoundingClientRect();
        const y = r.top - box.top + r.height / 2;
        d += ` L ${x} ${y - 30} C ${x} ${y + 10}, ${x + 20} ${y + 14}, ${x + 44} ${y + 14}`;
      }

      svg.setAttribute('viewBox', `0 0 ${box.width} ${box.height}`);
      svg.style.width = `${box.width}px`;
      svg.style.height = `${box.height}px`;
      path.setAttribute('d', d);

      // Sample the path so scroll position maps to length, not height.
      // Loops add length without adding height.
      const total = path.getTotalLength();
      samples = [];
      for (let k = 0; k <= 400; k++) {
        const len = (total * k) / 400;
        samples.push({ y: path.getPointAtLength(len).y, f: k / 400 });
      }
      draw();
    };

    const draw = () => {
      if (reduced) {
        path.style.strokeDashoffset = '0';
        return;
      }
      const top = wrapper.getBoundingClientRect().top + window.scrollY;
      const targetY = window.scrollY + window.innerHeight * 0.82 - top;
      let p = 1;
      for (const s of samples) {
        if (s.y > targetY) {
          p = s.f;
          break;
        }
      }
      path.style.strokeDashoffset = String(1 - p);
    };

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(draw);
    };

    build();
    const ro = new ResizeObserver(build);
    ro.observe(wrapper);
    window.addEventListener('scroll', onScroll, { passive: true });
    document.fonts?.ready.then(build);

    return () => {
      ro.disconnect();
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      className="hidden md:block absolute top-0 left-0 pointer-events-none"
      fill="none"
    >
      <path
        ref={pathRef}
        stroke="#161616"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
        style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
      />
    </svg>
  );
}
