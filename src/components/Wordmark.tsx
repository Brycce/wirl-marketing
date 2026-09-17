'use client';

import { useEffect, useRef } from 'react';
import { SnailMark } from './paper/Snail';
import { pinnedShellPath, SHELL_OPEN_TURNS, SHELL_REST_TURNS } from './swirl';

// The wirl is a snail with its shell wound up tight. Hover and the shell
// springs open to its full size as the speed lines come in, so it reads as
// taking off. Leave and it winds back up, faster than it opened. The outer end
// of the coil is pinned to the body, so nothing else about him moves.
const OPEN_MS = 420;
const CLOSE_MS = 240;
const SPAN = Math.abs(SHELL_REST_TURNS - SHELL_OPEN_TURNS);

export default function Wordmark({ size = 28 }: { size?: number }) {
  const shell = useRef<SVGPathElement>(null);
  const turns = useRef(SHELL_REST_TURNS);
  const frame = useRef(0);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  function wind(target: number, fullMs: number) {
    const el = shell.current;
    if (!el) return;
    if (!window.matchMedia('(hover: hover)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    cancelAnimationFrame(frame.current);
    const from = turns.current;
    // Interrupted halfway? Take only the time the remaining distance needs.
    const ms = fullMs * (Math.abs(target - from) / SPAN);
    if (ms < 1) return;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / ms);
      const eased = 1 - Math.pow(1 - t, 3);
      turns.current = from + (target - from) * eased;
      el.setAttribute('d', pinnedShellPath(turns.current));
      if (t < 1) frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
  }

  return (
    <span
      className="wordmark inline-flex items-center gap-2"
      onMouseEnter={() => wind(SHELL_OPEN_TURNS, OPEN_MS)}
      onMouseLeave={() => wind(SHELL_REST_TURNS, CLOSE_MS)}
    >
      <SnailMark size={size} fast className="wordmark-mark" shellRef={shell} shellTurns={SHELL_REST_TURNS} />
      <span className="font-display font-bold leading-none tracking-[-0.04em]" style={{ fontSize: Math.round(size * 0.95) }}>wirl</span>
    </span>
  );
}
