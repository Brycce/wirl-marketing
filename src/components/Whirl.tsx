'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';

// Twelve tools someone on the team already shipped, each a loose scribble.
// They get pulled into the centre, and the mark is what's left.

const SIZE = 560;
const C = SIZE / 2;
const N = 12;
const HOLD_MS = 600;
const FLIGHT_MS = 1400;
const STAGGER_MS = 80;

const LABELS: Record<number, string> = {
  0: 'no auth',
  2: 'password is in the README',
  4: 'runs on an intern’s laptop',
  6: 'auth: honour system',
  8: 'deployed from a coffee shop',
  10: 'link is in Slack, somewhere',
};

function seeded(i: number) {
  const x = Math.sin(i * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

function easeInOut(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// A small scribble: three cubic segments in a 48x30 box, different every index.
// Coordinates are rounded so the server and client render the same string.
function scribble(i: number) {
  const r = (k: number) => Math.round(seeded(i * 7 + k) * 100) / 100;
  return (
    `M 0 ${10 + r(1) * 10}` +
    ` C ${6 + r(2) * 6} ${-6 + r(3) * 8}, ${12 + r(4) * 6} ${30 - r(5) * 8}, ${20 + r(6) * 4} ${14 + r(7) * 6}` +
    ` C ${26 + r(8) * 6} ${-2 + r(9) * 8}, ${34 + r(10) * 4} ${32 - r(11) * 8}, ${40 + r(12) * 4} ${12 + r(13) * 8}` +
    ` C ${44 + r(14) * 4} ${4 + r(15) * 6}, ${46 + r(16) * 4} ${24 - r(17) * 6}, ${48} ${14 + r(18) * 6}`
  );
}

export default function Whirl() {
  const groupRefs = useRef<(SVGGElement | null)[]>([]);
  const markRef = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(0);
  const [done, setDone] = useState(false);

  const scribbles = useMemo(() => Array.from({ length: N }, (_, i) => scribble(i)), []);
  const start = useMemo(
    () =>
      Array.from({ length: N }, (_, i) => ({
        th: (i / N) * Math.PI * 2 + seeded(i) * 0.7,
        r: 170 + seeded(i + 40) * 80,
        rot: (seeded(i + 80) - 0.5) * 60,
      })),
    [],
  );

  useEffect(() => {
    const mark = markRef.current;
    if (!mark) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const paintScribble = (i: number, e: number) => {
      const g = groupRefs.current[i];
      if (!g) return;
      const s = start[i];
      const r = s.r + (20 - s.r) * e;
      const th = s.th + Math.PI * 2 * 1.1 * e;
      const x = C + r * Math.cos(th);
      const y = C + r * Math.sin(th);
      const k = 1 - 0.9 * e;
      g.setAttribute('transform', `translate(${x - 24 * k} ${y - 15 * k}) rotate(${s.rot * (1 - e)}) scale(${k})`);
      g.style.opacity = String(e > 0.65 ? Math.max(0, 1 - (e - 0.65) / 0.3) : 1);
    };

    // The mark arrives as the last scribbles do: scales up, settles, stops turning.
    const paintMark = (p: number) => {
      const e = easeInOut(p);
      mark.style.opacity = String(Math.min(1, e * 1.4));
      mark.style.transform = `translate(-50%, -50%) scale(${0.55 + 0.45 * e}) rotate(${-40 * (1 - e)}deg)`;
    };

    if (reduced) {
      for (let i = 0; i < N; i++) paintScribble(i, 1);
      paintMark(1);
      setDone(true);
      return;
    }

    setDone(false);
    for (let i = 0; i < N; i++) paintScribble(i, 0);
    paintMark(0);

    const t0 = performance.now();
    const flightEnd = HOLD_MS + FLIGHT_MS + STAGGER_MS * (N - 1);
    const markStart = HOLD_MS + FLIGHT_MS * 0.55;
    let raf = 0;

    const tick = (now: number) => {
      const el = now - t0;
      for (let i = 0; i < N; i++) {
        const t = (el - HOLD_MS - i * STAGGER_MS) / FLIGHT_MS;
        paintScribble(i, easeInOut(Math.min(1, Math.max(0, t))));
      }
      paintMark(Math.min(1, Math.max(0, (el - markStart) / (flightEnd - markStart))));
      if (el < flightEnd) raf = requestAnimationFrame(tick);
      else setDone(true);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, start]);

  return (
    <div>
      <div className="relative w-full max-w-[560px] mx-auto aspect-square" aria-hidden="true">
        <svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="absolute inset-0 w-full h-full"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {scribbles.map((d, i) => (
            <g
              key={i}
              ref={(el) => {
                groupRefs.current[i] = el;
              }}
            >
              <path d={d} stroke="#161616" strokeWidth="3" />
              {LABELS[i] && (
                <text x="56" y="20" fontSize="12.5" fill="#6B6B66" fontFamily="inherit">
                  {LABELS[i]}
                </text>
              )}
            </g>
          ))}
        </svg>
        <div
          ref={markRef}
          className="absolute left-1/2 top-1/2 w-[46%] will-change-transform"
          style={{ opacity: 0, transform: 'translate(-50%, -50%) scale(0.55)' }}
        >
          <Image src="/logo.png" alt="" width={640} height={640} priority className="w-full h-auto" />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 max-w-[560px] mx-auto mt-2 text-sm text-dim">
        <span className="transition-opacity duration-500" style={{ opacity: done ? 1 : 0 }}>
          Twelve tools your team already shipped. One place.
        </span>
        <button
          type="button"
          onClick={() => setRun((n) => n + 1)}
          className="self-start whitespace-nowrap underline underline-offset-4 decoration-rule hover:decoration-ink hover:text-ink transition-colors"
        >
          Wirl it again
        </button>
      </div>
    </div>
  );
}
