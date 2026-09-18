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

// The eyes. Each stalk swivels on its base toward the pointer, and each eye
// tilts a little further on top, a beat later, so the look has some
// follow-through. Every few seconds he blinks, sometimes twice.
const SWIVEL_MAX_DEG = 12;
const SWIVEL_FULL_AT_PX = 260;
const TILT_MAX_DEG = 14;
const TILT_FULL_AT_PX = 180;
const SWIVEL_EASE_MS = 140;
const TILT_EASE_MS = 230;
const BLINK_MS = 190;
const BLINK_GAP_MS = 250;

function blinkLid(t: number) {
  // Close quickly, hold a hair, open a little slower.
  if (t < 0.36) return 1 - 0.9 * (t / 0.36) ** 2;
  if (t < 0.55) return 0.1;
  const u = (t - 0.55) / 0.45;
  return 0.1 + 0.9 * (1 - (1 - u) ** 3);
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
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const canTrack = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const stalks = Array.from(headEl.querySelectorAll<SVGGElement>('.stalk'));
    const eyes = Array.from(headEl.querySelectorAll<SVGGElement>('.eye'));
    const lids = Array.from(headEl.querySelectorAll<SVGGElement>('.lid'));
    const bases = stalks.map((s) => [Number(s.dataset.bx), Number(s.dataset.by)] as const);
    const swivel = stalks.map(() => 0);
    const tilt = stalks.map(() => 0);
    let pointer: { x: number; y: number } | null = null;
    let blinkAt = -1;
    let blinks = 0;
    let loop = 0;
    let last = 0;
    let timer = 0;

    function targets(i: number) {
      if (!pointer) return { s: 0, t: 0 };
      const stalkM = stalks[i].getScreenCTM();
      const eyeM = eyes[i].getScreenCTM();
      if (!stalkM || !eyeM) return { s: 0, t: 0 };
      const baseX = stalkM.a * bases[i][0] + stalkM.c * bases[i][1] + stalkM.e;
      const clamp = (v: number) => Math.max(-1, Math.min(1, v));
      return {
        s: clamp((pointer.x - baseX) / SWIVEL_FULL_AT_PX) * SWIVEL_MAX_DEG,
        t: clamp((pointer.x - eyeM.e) / TILT_FULL_AT_PX) * TILT_MAX_DEG,
      };
    }

    function tick(t: number) {
      const dt = last ? Math.min(64, t - last) : 16;
      last = t;
      let moving = false;
      const ks = 1 - Math.exp(-dt / SWIVEL_EASE_MS);
      const kt = 1 - Math.exp(-dt / TILT_EASE_MS);
      stalks.forEach((_, i) => {
        const g = targets(i);
        swivel[i] += (g.s - swivel[i]) * ks;
        tilt[i] += (g.t - tilt[i]) * kt;
        if (Math.abs(g.s - swivel[i]) > 0.02 || Math.abs(g.t - tilt[i]) > 0.02) moving = true;
        stalks[i].setAttribute('transform', `rotate(${swivel[i].toFixed(2)} ${bases[i][0]} ${bases[i][1]})`);
        eyes[i].setAttribute('transform', `rotate(${tilt[i].toFixed(2)})`);
      });
      let lid = 1;
      if (blinkAt >= 0) {
        const p = (t - blinkAt) / BLINK_MS;
        if (p >= 1) {
          blinks -= 1;
          blinkAt = blinks > 0 ? t + BLINK_GAP_MS - BLINK_MS : -1;
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
      if (!loop) loop = requestAnimationFrame(tick);
    }

    function scheduleBlink() {
      timer = window.setTimeout(() => {
        blinks = Math.random() < 0.22 ? 2 : 1;
        blinkAt = performance.now();
        wake();
        scheduleBlink();
      }, 2400 + Math.random() * 3200);
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' && e.pointerType !== 'pen') return;
      pointer = { x: e.clientX, y: e.clientY };
      wake();
    };
    if (canTrack) {
      window.addEventListener('pointermove', onMove, { passive: true });
      window.addEventListener('scroll', wake, { passive: true });
    }
    scheduleBlink();
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll', wake);
      window.clearTimeout(timer);
      cancelAnimationFrame(loop);
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
