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

// Same test as the CSS that shows the speed lines, plus reduced motion.
function canUnfurl() {
  return window.matchMedia('(hover: hover)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default function Wordmark({ size = 28 }: { size?: number }) {
  const shell = useRef<SVGPathElement>(null);
  const turns = useRef(SHELL_REST_TURNS);
  const frame = useRef(0);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  function draw(el: SVGPathElement, value: number) {
    turns.current = value;
    el.setAttribute('d', pinnedShellPath(value));
  }

  function wind(target: number, fullMs: number) {
    const el = shell.current;
    if (!el) return;
    cancelAnimationFrame(frame.current);
    // If animation is not allowed (or stopped being allowed mid-hover), make
    // sure the shell is at rest and leave it there.
    if (!canUnfurl()) {
      if (turns.current !== SHELL_REST_TURNS) draw(el, SHELL_REST_TURNS);
      return;
    }
    const from = turns.current;
    // Interrupted halfway? Take only the time the remaining distance needs.
    const ms = fullMs * (Math.abs(target - from) / SPAN);
    if (ms < 1) {
      draw(el, target);
      return;
    }
    // The clock starts on the first frame, not in the event handler: the
    // frame's timestamp can be earlier than the handler, which would make the
    // first step run backwards.
    let start: number | null = null;
    const tick = (now: number) => {
      if (start === null) start = now;
      const t = Math.min(1, Math.max(0, (now - start) / ms));
      const eased = 1 - Math.pow(1 - t, 3);
      draw(el, from + (target - from) * eased);
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
