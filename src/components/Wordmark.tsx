'use client';

import { useEffect, useRef } from 'react';
import { SnailMark, BODY_REST, bodyPath, headShiftForLength } from './paper/Snail';
import { pinnedShellLength, pinnedShellPath, SHELL_OPEN_TURNS, SHELL_REST_TURNS } from './swirl';

// The wirl is a snail with its shell wound up tight. The shell and the body are
// one line of fixed length. Hover and the shell uncoils; the line it gives up
// comes out the front, so the body gets longer and the head moves ahead, as if
// he is stretching out of his shell to go faster. Leave and he pulls back in.
const OPEN_MS = 420;
const CLOSE_MS = 240;
const SPAN = Math.abs(SHELL_REST_TURNS - SHELL_OPEN_TURNS);
const REST_SHELL_LENGTH = pinnedShellLength(SHELL_REST_TURNS);

// Same test as the CSS that shows the speed lines, plus reduced motion.
function canUnfurl() {
  return window.matchMedia('(hover: hover)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default function Wordmark({ size = 28 }: { size?: number }) {
  const shell = useRef<SVGPathElement>(null);
  const body = useRef<SVGPathElement>(null);
  const head = useRef<SVGGElement>(null);
  const turns = useRef(SHELL_REST_TURNS);
  const frame = useRef(0);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  function draw(value: number) {
    const s = shell.current;
    const b = body.current;
    const h = head.current;
    if (!s || !b || !h) return;
    turns.current = value;
    s.setAttribute('d', pinnedShellPath(value));
    if (value === SHELL_REST_TURNS) {
      b.setAttribute('d', BODY_REST);
      h.removeAttribute('transform');
      return;
    }
    // Every bit of line the shell stops using goes into the body.
    const dx = headShiftForLength(REST_SHELL_LENGTH - pinnedShellLength(value));
    b.setAttribute('d', bodyPath(dx));
    h.setAttribute('transform', `translate(${(-dx).toFixed(2)} 0)`);
  }

  function wind(target: number, fullMs: number) {
    if (!shell.current) return;
    cancelAnimationFrame(frame.current);
    // If animation is not allowed (or stopped being allowed mid-hover), make
    // sure he is back at rest and leave him there.
    if (!canUnfurl()) {
      if (turns.current !== SHELL_REST_TURNS) draw(SHELL_REST_TURNS);
      return;
    }
    const from = turns.current;
    // Interrupted halfway? Take only the time the remaining distance needs.
    const ms = fullMs * (Math.abs(target - from) / SPAN);
    if (ms < 1) {
      draw(target);
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
      draw(t < 1 ? from + (target - from) * eased : target);
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
      <SnailMark size={size} fast className="wordmark-mark" shellRef={shell} bodyRef={body} headRef={head} shellTurns={SHELL_REST_TURNS} />
      <span className="font-display font-bold leading-none tracking-[-0.04em]" style={{ fontSize: Math.round(size * 0.95) }}>wirl</span>
    </span>
  );
}
