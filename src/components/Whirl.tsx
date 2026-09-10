'use client';

import { useEffect, useRef, useState } from 'react';

// Scattered internal tools, each on whatever host and auth the builder had to hand.
const TOOLS = [
  { name: 'refunds-admin', host: 'vercel.app', bad: 'no auth', role: 'Support' },
  { name: 'churn-report', host: 'netlify.app', bad: 'shared password', role: 'Finance' },
  { name: 'oncall-notes', host: 'onrender.com', bad: 'public', role: 'Engineering' },
  { name: 'invoice-tool', host: 'vercel.app', bad: 'personal account', role: 'Finance' },
  { name: 'lead-router', host: 'fly.dev', bad: 'no auth', role: 'Sales' },
  { name: 'hiring-tracker', host: 'vercel.app', bad: 'link in Notion', role: 'People' },
  { name: 'inventory-sync', host: 'railway.app', bad: 'shared password', role: 'Ops' },
  { name: 'ops-dashboard', host: 'amplifyapp.com', bad: 'public', role: 'Ops' },
  { name: 'payroll-export', host: 'vercel.app', bad: 'personal account', role: 'Finance' },
  { name: 'vendor-approvals', host: 'netlify.app', bad: 'no auth', role: 'Finance' },
  { name: 'sla-monitor', host: 'fly.dev', bad: 'link in Slack', role: 'Engineering' },
  { name: 'contract-search', host: 'vercel.app', bad: 'public', role: 'Legal' },
];

const COLS = 3;
const ROWS = 4;
const HOLD_MS = 700;
const FLIGHT_MS = 1500;
const STAGGER_MS = 70;
const TURNS = 1;

function easeInOut(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// Deterministic scatter so the page looks the same on every load.
function seeded(i: number) {
  const x = Math.sin(i * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

type Frame = { x: number; y: number; rot: number; settled: number };

export default function Whirl() {
  const boxRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [run, setRun] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const { width, height } = box.getBoundingClientRect();
    const cx = width / 2;
    const cy = height / 2;

    // Where each chip ends up: a tidy grid in the middle.
    const chipW = Math.min(150, width * 0.3);
    const chipH = 44;
    const gapX = 12;
    const gapY = 10;
    const gridW = COLS * chipW + (COLS - 1) * gapX;
    const gridH = ROWS * chipH + (ROWS - 1) * gapY;

    const end = TOOLS.map((_, i) => {
      const c = i % COLS;
      const r = Math.floor(i / COLS);
      const x = cx - gridW / 2 + c * (chipW + gapX) + chipW / 2;
      const y = cy - gridH / 2 + r * (chipH + gapY) + chipH / 2;
      return { r: Math.hypot(x - cx, y - cy), th: Math.atan2(y - cy, x - cx) };
    });

    // Where each chip starts: flung out around the edge, tilted.
    const start = TOOLS.map((_, i) => {
      const th = (i / TOOLS.length) * Math.PI * 2 + seeded(i) * 0.9;
      const r = Math.min(width, height) * (0.28 + seeded(i + 40) * 0.12);
      return { r, th, rot: (seeded(i + 80) - 0.5) * 40 };
    });

    const paint = (i: number, f: Frame) => {
      const el = chipRefs.current[i];
      if (!el) return;
      el.style.width = `${chipW}px`;
      el.style.transform = `translate(${f.x - chipW / 2}px, ${f.y - chipH / 2}px) rotate(${f.rot}deg)`;
      el.dataset.settled = f.settled > 0.7 ? 'true' : 'false';
    };

    const frameAt = (i: number, t: number): Frame => {
      const e = easeInOut(Math.min(1, Math.max(0, t)));
      const r = start[i].r + (end[i].r - start[i].r) * e;
      // Unwind the extra turns so every chip spirals in the same direction.
      const thEnd = end[i].th + Math.PI * 2 * TURNS;
      const th = start[i].th + (thEnd - start[i].th) * e;
      return {
        x: cx + r * Math.cos(th),
        y: cy + r * Math.sin(th),
        rot: start[i].rot * (1 - e),
        settled: e,
      };
    };

    if (reduced) {
      TOOLS.forEach((_, i) => paint(i, frameAt(i, 1)));
      setDone(true);
      return;
    }

    setDone(false);
    TOOLS.forEach((_, i) => paint(i, frameAt(i, 0)));

    let raf = 0;
    const t0 = performance.now();
    const total = HOLD_MS + FLIGHT_MS + STAGGER_MS * (TOOLS.length - 1);

    const tick = (now: number) => {
      const elapsed = now - t0;
      TOOLS.forEach((_, i) => {
        const local = (elapsed - HOLD_MS - i * STAGGER_MS) / FLIGHT_MS;
        paint(i, frameAt(i, local));
      });
      if (elapsed < total) {
        raf = requestAnimationFrame(tick);
      } else {
        setDone(true);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run]);

  return (
    <div className="relative">
      <div
        ref={boxRef}
        className="relative aspect-square w-full max-w-[560px] mx-auto overflow-hidden"
        aria-hidden="true"
      >
        {/* The workspace outline. Draws on once everything has settled. */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${done ? 'opacity-100' : 'opacity-0'}`}
        >
          <rect
            x="14"
            y="21"
            width="72"
            height="58"
            rx="3"
            fill="none"
            stroke="#2B38F5"
            strokeWidth="0.6"
            vectorEffect="non-scaling-stroke"
            pathLength={1}
            className={done ? 'draw-line' : ''}
          />
        </svg>

        {TOOLS.map((tool, i) => (
          <div
            key={tool.name}
            ref={(el) => {
              chipRefs.current[i] = el;
            }}
            data-settled="false"
            className="group absolute top-0 left-0 h-11 rounded-md border bg-paper px-3 py-1.5 leading-tight will-change-transform
              border-ink/25 data-[settled=true]:border-cobalt data-[settled=true]:bg-white transition-colors duration-300"
          >
            <div className="text-[13px] font-semibold text-ink truncate">{tool.name}</div>
            <div className="text-[11px] truncate">
              <span className="text-dim group-data-[settled=true]:hidden">{tool.host} · {tool.bad}</span>
              <span className="text-cobalt hidden group-data-[settled=true]:inline">acme login · {tool.role}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between max-w-[560px] mx-auto mt-3 text-sm text-dim">
        <span className="transition-opacity duration-500" style={{ opacity: done ? 1 : 0 }}>
          Twelve tools. One login. One list.
        </span>
        <button
          type="button"
          onClick={() => setRun((n) => n + 1)}
          className="underline underline-offset-4 decoration-rule hover:decoration-ink hover:text-ink transition-colors"
        >
          Wirl it again
        </button>
      </div>
    </div>
  );
}
