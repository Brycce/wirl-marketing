'use client';

import { useEffect, useRef } from 'react';
import { SnailMark, BODY_REST, bodyPath, headShiftForLength } from './paper/Snail';
import { pinnedShellLength, pinnedShellPath, SHELL_BOB_BACK_TURNS, SHELL_OPEN_TURNS, SHELL_REST_TURNS, SHELL_RETRACT_TURNS } from './swirl';

// The wirl is a snail with its shell wound up tight. The shell and the body are
// one line of fixed length, so everything is driven by one number, how many
// turns the shell has: fewer turns and the spare line comes out the front.
// Hover and he winds up (pulls his head back, shell tighter), then lurches
// forward as the air streaks past, then keeps his neck pumping back and forth
// for as long as you stay, hustling. Leave and he settles back to rest.
const RETRACT_MS = 110;
const LURCH_MS = 300;
const SETTLE_MS = 240;
// One pump: a slightly slower draw back, then a quicker thrust forward.
const BOB_BACK_MS = 170;
const BOB_FORWARD_MS = 130;
const REST_SHELL_LENGTH = pinnedShellLength(SHELL_REST_TURNS);

type Segment = { to: number; ms: number; ease: (t: number) => number };
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOut = (t: number) => 0.5 - 0.5 * Math.cos(Math.PI * t);
const HUSTLE: Segment[] = [
  { to: SHELL_BOB_BACK_TURNS, ms: BOB_BACK_MS, ease: easeInOut },
  { to: SHELL_OPEN_TURNS, ms: BOB_FORWARD_MS, ease: easeOut },
];

// The eyes. Each stalk swivels on its base toward the pointer, the near one a
// touch sooner than the far one, so the look has some follow-through. The lean
// follows the direction to the pointer, so a pointer straight below leaves him
// upright, and he drifts back to his resting pose when the pointer goes still.
// Every so often he blinks, now and then twice.
const SWIVEL_MAX_DEG = 16;
const SWIVEL_SOFTEN_PX = 36;
const SWIVEL_EASE_MS = [150, 210];
const SETTLE_AFTER_MS = 1800;
const BLINK_MS = 200;
const BLINK_GAP_MS = 160;
const BLINK_CLOSED = 0.32;

function blinkLid(t: number) {
  // Close quickly, hold a hair, open a little slower. Never fully flat, so a
  // closed eye is still a visible dash at nav size.
  const open = 1 - BLINK_CLOSED;
  if (t < 0.36) return 1 - open * (t / 0.36) ** 2;
  if (t < 0.55) return BLINK_CLOSED;
  const u = (t - 0.55) / 0.45;
  return BLINK_CLOSED + open * (1 - (1 - u) ** 3);
}

// About one blink every seven seconds, with a long tail so it never ticks.
function nextBlinkIn() {
  return Math.min(14000, 3500 - 4000 * Math.log(1 - Math.random()));
}

// Same test as the CSS that runs the lean and the streaks, plus reduced motion.
function canMove() {
  return window.matchMedia('(hover: hover)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default function Wordmark({ size = 28 }: { size?: number }) {
  const shell = useRef<SVGPathElement>(null);
  const body = useRef<SVGPathElement>(null);
  const head = useRef<SVGGElement>(null);
  const turns = useRef(SHELL_REST_TURNS);
  const frame = useRef(0);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  // Eyes that follow you and blink. Runs only while something is changing.
  useEffect(() => {
    const headEl = head.current;
    if (!headEl) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const stalks = Array.from(headEl.querySelectorAll<SVGGElement>('.stalk'));
    const lids = Array.from(headEl.querySelectorAll<SVGGElement>('.lid'));
    const bases = stalks.map((s) => [Number(s.dataset.bx), Number(s.dataset.by)] as const);
    const swivel = stalks.map(() => 0);
    let pointer: { x: number; y: number } | null = null;
    let movedAt = 0;
    let blinkAt = -1;
    let blinks = 0;
    let loop = 0;
    let last = 0;
    let blinkTimer = 0;
    let settleTimer = 0;
    let onScreen = true;
    let running = false;

    function target(i: number, now: number) {
      if (!pointer || now - movedAt > SETTLE_AFTER_MS) return 0;
      const m = stalks[i].getScreenCTM();
      if (!m) return 0;
      const bx = m.a * bases[i][0] + m.c * bases[i][1] + m.e;
      const by = m.b * bases[i][0] + m.d * bases[i][1] + m.f;
      const dx = pointer.x - bx;
      const dy = pointer.y - by;
      return (SWIVEL_MAX_DEG * dx) / Math.hypot(dx, dy, SWIVEL_SOFTEN_PX);
    }

    function tick(t: number) {
      const dt = last ? Math.min(64, t - last) : 16;
      last = t;
      let moving = false;
      stalks.forEach((_, i) => {
        const goal = target(i, t);
        const k = 1 - Math.exp(-dt / SWIVEL_EASE_MS[i % SWIVEL_EASE_MS.length]);
        swivel[i] += (goal - swivel[i]) * k;
        if (Math.abs(goal - swivel[i]) > 0.02) moving = true;
        else swivel[i] = goal;
        if (swivel[i] === 0) stalks[i].removeAttribute('transform');
        else stalks[i].setAttribute('transform', `rotate(${swivel[i].toFixed(2)} ${bases[i][0]} ${bases[i][1]})`);
      });
      let lid = 1;
      if (blinkAt >= 0) {
        const p = (t - blinkAt) / BLINK_MS;
        if (p >= 1) {
          blinks -= 1;
          blinkAt = blinks > 0 ? t + BLINK_GAP_MS : -1;
        } else if (p >= 0) {
          lid = blinkLid(p);
        }
        if (blinkAt >= 0) moving = true;
      }
      lids.forEach((l) => (lid === 1 ? l.removeAttribute('transform') : l.setAttribute('transform', `scale(1 ${lid.toFixed(3)})`)));
      loop = moving ? requestAnimationFrame(tick) : 0;
      if (!moving) last = 0;
    }

    function wake() {
      if (running && !loop) loop = requestAnimationFrame(tick);
    }

    function scheduleBlink() {
      blinkTimer = window.setTimeout(() => {
        // Only blink where someone can see it.
        if (!document.hidden && onScreen) {
          blinks = Math.random() < 0.15 ? 2 : 1;
          blinkAt = performance.now();
          wake();
        }
        scheduleBlink();
      }, nextBlinkIn());
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' && e.pointerType !== 'pen') return;
      pointer = { x: e.clientX, y: e.clientY };
      movedAt = performance.now();
      wake();
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(wake, SETTLE_AFTER_MS + 20);
    };
    const onLeave = (e: PointerEvent) => {
      if (e.relatedTarget === null) {
        pointer = null;
        wake();
      }
    };
    const seen = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
    });

    function start() {
      if (running) return;
      running = true;
      if (fine.matches) {
        window.addEventListener('pointermove', onMove, { passive: true });
        document.addEventListener('pointerout', onLeave, { passive: true });
        window.addEventListener('scroll', wake, { passive: true });
      }
      seen.observe(headEl as Element);
      scheduleBlink();
    }

    function stop() {
      running = false;
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerout', onLeave);
      window.removeEventListener('scroll', wake);
      seen.disconnect();
      window.clearTimeout(blinkTimer);
      window.clearTimeout(settleTimer);
      cancelAnimationFrame(loop);
      loop = 0;
      last = 0;
      pointer = null;
      blinkAt = -1;
      blinks = 0;
      swivel.fill(0);
      stalks.forEach((s) => s.removeAttribute('transform'));
      lids.forEach((l) => l.removeAttribute('transform'));
    }

    // Reduced motion can be switched on mid-visit; stop at once when it is.
    const onPreference = () => (reduce.matches ? stop() : start());
    reduce.addEventListener('change', onPreference);
    if (!reduce.matches) start();
    return () => {
      reduce.removeEventListener('change', onPreference);
      stop();
    };
  }, []);

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
    // Every bit of line the shell gives up (or takes back) goes into the body.
    const dx = headShiftForLength(REST_SHELL_LENGTH - pinnedShellLength(value));
    b.setAttribute('d', bodyPath(dx));
    h.setAttribute('transform', `translate(${(-dx).toFixed(2)} 0)`);
  }

  // Runs the segments in order, then repeats `loop` until something else plays.
  function play(segments: Segment[], loop?: Segment[]) {
    cancelAnimationFrame(frame.current);
    // If motion is not allowed (or stopped being allowed mid-hover), put him
    // back at rest and leave him there.
    if (!canMove()) {
      if (turns.current !== SHELL_REST_TURNS) draw(SHELL_REST_TURNS);
      return;
    }
    let list = segments;
    let index = 0;
    let from = turns.current;
    // The clock starts on the first frame, not in the event handler: a frame's
    // timestamp can be earlier than the handler, which would make the first
    // step run backwards. After that, each segment starts exactly when the one
    // before it ended, so the pumping keeps an even rhythm with no stalls.
    let start: number | null = null;
    const progress = (seg: Segment, now: number) => Math.min(1, Math.max(0, (now - (start as number)) / Math.max(1, seg.ms)));
    const tick = (now: number) => {
      if (start === null) start = now;
      let seg = list[index];
      let t = progress(seg, now);
      while (t >= 1) {
        from = seg.to;
        start += Math.max(1, seg.ms);
        index += 1;
        if (index >= list.length) {
          if (!loop) {
            draw(seg.to);
            return;
          }
          list = loop;
          index = 0;
        }
        seg = list[index];
        t = progress(seg, now);
      }
      draw(from + (seg.to - from) * seg.ease(t));
      frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
  }

  function lurch() {
    const atRest = Math.abs(turns.current - SHELL_REST_TURNS) < 0.005;
    if (atRest) {
      play(
        [
          { to: SHELL_RETRACT_TURNS, ms: RETRACT_MS, ease: easeInOut },
          { to: SHELL_OPEN_TURNS, ms: LURCH_MS, ease: easeOut },
        ],
        HUSTLE,
      );
    } else {
      // Caught mid-settle: no wind-up, just go, for the time the distance needs.
      const share = Math.abs(SHELL_OPEN_TURNS - turns.current) / Math.abs(SHELL_OPEN_TURNS - SHELL_RETRACT_TURNS);
      play([{ to: SHELL_OPEN_TURNS, ms: LURCH_MS * Math.min(1, share), ease: easeOut }], HUSTLE);
    }
  }

  function settle() {
    const share = Math.abs(SHELL_REST_TURNS - turns.current) / Math.abs(SHELL_REST_TURNS - SHELL_OPEN_TURNS);
    play([{ to: SHELL_REST_TURNS, ms: SETTLE_MS * Math.min(1, share), ease: easeOut }]);
  }

  return (
    <span className="wordmark inline-flex items-center gap-2" onMouseEnter={lurch} onMouseLeave={settle}>
      <SnailMark size={size} fast className="wordmark-mark" shellRef={shell} bodyRef={body} headRef={head} shellTurns={SHELL_REST_TURNS} />
      <span className="font-display font-bold leading-none tracking-[-0.04em]" style={{ fontSize: Math.round(size * 0.95) }}>wirl</span>
    </span>
  );
}
