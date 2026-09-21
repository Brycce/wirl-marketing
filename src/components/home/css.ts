// Every Toybox style, scoped under .tbx. Keyframes are prefixed tb-.
export const CSS = String.raw`
.tbx {
  --ink: #1B2420; --cream: #F7F1E4; --paper: #FFFDF7; --edge: #E4D9C3; --wash: #F3ECDD;
  --sun: #FFD23F; --sun-edge: #D9A514; --coral: #FF9A76; --mint: #A6E6BE; --sky: #A9D8F7; --lilac: #CDBFFF;
  --green: #2E9D5B; --tomato: #E5483B; --blue: #3F6FE8; --pink: #FF8FB8;
  /* The quiet beat between sky and lilac: a warm neutral with the pink's
     temperature but none of its volume, so the white card on it still pops. */
  --blush: #F2DACB;
  background: var(--cream); color: var(--ink); min-height: 100vh; overflow-x: clip;
  font-feature-settings: 'cv11', 'ss03';
}
.tbx *, .tbx *::before, .tbx *::after { box-sizing: border-box; }
.tbx ::selection { background: var(--sun); color: var(--ink); }
.tbx :focus-visible { outline: 3px solid var(--ink); outline-offset: 3px; border-radius: 8px; }
.tbx svg text { font-family: Inter, system-ui, sans-serif; font-weight: 700; }
.tbx svg .mono { font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, monospace; font-weight: 600; }
.tbx .tb-art { display: block; width: 100%; height: auto; overflow: visible; }

.tbx .wrap { max-width: 1232px; margin: 0 auto; padding: 0 24px; }
@media (max-width: 640px) { .tbx .wrap { padding: 0 18px; } }

/* Type */
.tbx .tb-h1 { font-weight: 800; font-size: clamp(38px, 4.3vw, 60px); line-height: 1.02; letter-spacing: -0.035em; text-wrap: balance; }
.tbx .tb-h2 { font-weight: 800; font-size: clamp(32px, 3.7vw, 52px); line-height: 1.03; letter-spacing: -0.035em; text-wrap: balance; }
.tbx .tb-lede { margin-top: 18px; font-size: 18px; line-height: 1.52; max-width: 42ch; }
.tbx .tb-lede strong { font-weight: 750; }
@media (max-width: 640px) { .tbx .tb-lede { font-size: 17px; } }
.tbx .tb-list { margin-top: 18px; display: grid; gap: 9px; font-size: 17.5px; line-height: 1.48; max-width: 44ch; }
.tbx .tb-list li { position: relative; padding-left: 30px; }
.tbx .tb-list li::before {
  content: ''; position: absolute; left: 2px; top: .42em; width: 14px; height: 14px; border-radius: 99px;
  background: var(--dot, var(--green)); border: 2px solid var(--ink);
}
.tbx .tb-kicker {
  display: inline-flex; align-items: center; gap: 8px; margin-bottom: 18px;
  font-size: 14px; font-weight: 750; letter-spacing: .01em;
  background: var(--paper); border: 2px solid var(--ink); border-radius: 99px; padding: 6px 12px 6px 8px;
  box-shadow: 0 3px 0 var(--ink);
}
.tbx .tb-kicker svg { width: 20px; height: 20px; flex: none; }

/* Slabs: big rounded blocks of colour, stacked with cream gaps like toy blocks. */
.tbx .slab { margin: 16px 16px 0; border-radius: 40px; position: relative; isolation: isolate; overflow: hidden; padding: 48px 0; scroll-margin-top: 16px; }
.tbx .slab-in { max-width: 1232px; margin: 0 auto; padding: 0 clamp(18px, 5vw, 64px); }
.tbx .bg-coral { background: var(--coral); }
.tbx .bg-mint { background: var(--mint); }
.tbx .bg-sky { background: var(--sky); }
.tbx .bg-lilac { background: var(--lilac); }
.tbx .bg-pink { background: var(--pink); }
.tbx .bg-blush { background: var(--blush); }
.tbx .bg-sun { background: var(--sun); }
.tbx .bg-ink { background: var(--ink); color: var(--cream); }
@media (max-width: 640px) {
  .tbx .slab { margin: 12px 8px 0; border-radius: 28px; padding: 30px 0 24px; scroll-margin-top: 10px; }
}

/* Text beside the picture, alternating sides; on a phone, text first. */
.tbx .split { display: grid; gap: 18px; align-items: center; }
.tbx .split > * { min-width: 0; }
@media (max-width: 959px) { .tbx .split > .art { width: 100%; max-width: 620px; margin: 0 auto; } }
/* On a phone the picture bleeds to the slab's own edge, so nothing inside it
   has to shrink below reading size. */
@media (max-width: 640px) { .tbx .slab .split > .art { width: calc(100% + 36px); max-width: none; margin: 0 -18px; } }
@media (min-width: 960px) {
  .tbx .split { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 48px; }
  .tbx .split.flip > .art { order: -1; }
}

/* Toy buttons: a pill on a 4px ink edge that squashes when pressed. */
.tbx .tbtn {
  position: relative; display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  font: inherit; font-weight: 750; font-size: 16px; line-height: 1; white-space: nowrap; letter-spacing: -0.005em;
  color: var(--ink); background: var(--sun); border: 2px solid var(--ink); border-radius: 999px;
  padding: 13px 20px; box-shadow: 0 4px 0 var(--ink); cursor: pointer; text-decoration: none;
  transition: transform .09s ease, box-shadow .09s ease, background-color .15s ease;
}
.tbx .tbtn:hover { transform: translateY(-1px); box-shadow: 0 5px 0 var(--ink); }
.tbx .tbtn:active { transform: translateY(3px); box-shadow: 0 1px 0 var(--ink); }
.tbx .tbtn:disabled { opacity: .7; cursor: default; }
.tbx .tbtn-sm { font-size: 15px; padding: 10px 16px; }
.tbx .tbtn-paper { background: var(--paper); }
.tbx .tbtn-ink { background: var(--ink); color: var(--cream); box-shadow: 0 4px 0 #000; }
.tbx .tbtn-ink:hover { box-shadow: 0 5px 0 #000; }
.tbx .tbtn-ink:active { box-shadow: 0 1px 0 #000; }

/* Nav */
.tbx .tb-nav { display: flex; align-items: center; justify-content: space-between; padding-top: 20px; padding-bottom: 20px; }
.tbx .tb-nav a { color: var(--ink); text-decoration: none; }
.tbx .tb-nav-links { display: flex; align-items: center; gap: 22px; font-size: 15.5px; font-weight: 650; }
.tbx .tb-nav-links .tb-plain { opacity: .85; }
.tbx .tb-nav-links .tb-plain:hover { opacity: 1; text-decoration: underline; text-underline-offset: 4px; text-decoration-thickness: 2px; }
.tbx .tb-nav .tbtn { padding: 11px 16px; font-size: 15px; }
@media (max-width: 639px) { .tbx .tb-nav-links .tb-plain { display: none; } }

/* Hero */
.tbx .tb-hero { padding-top: 28px; padding-bottom: 48px; display: grid; gap: 30px; align-items: center; }
@media (min-width: 1024px) { .tbx .tb-hero { grid-template-columns: minmax(0, 52fr) minmax(0, 48fr); gap: 40px; padding-top: 32px; padding-bottom: 52px; }
  .tbx .tb-hero-art-wrap { margin-right: -28px; margin-top: -20px; } }
.tbx .tb-hero .tb-lede { font-size: 19px; max-width: 44ch; margin-top: 24px; }
@media (max-width: 420px) { .tbx .tb-h1 { letter-spacing: -0.04em; } }
@media (max-width: 640px) { .tbx .tb-hero { padding-top: 12px; padding-bottom: 28px; } .tbx .tb-hero .tb-lede { font-size: 17.5px; } }
.tbx .tb-hero-art-wrap { position: relative; }
.tbx .tb-hero-phone { display: none; }
@media (max-width: 1023px) { .tbx .tb-hero-art-wrap { width: 100%; max-width: 600px; margin: 0 auto; } }
@media (max-width: 560px) { .tbx .tb-hero-wide { display: none; } .tbx .tb-hero-phone { display: block; } }

/* Connect block */
.tbx .tb-connect { margin-top: 26px; max-width: 580px; scroll-margin-top: 24px; }
.tbx .tb-tabs { display: flex; flex-wrap: wrap; gap: 7px; margin-bottom: 12px; }
.tbx .tb-tab {
  display: inline-flex; align-items: center; gap: 7px; font: inherit; font-size: 14.5px; font-weight: 700; line-height: 1;
  color: var(--ink); background: var(--paper); border: 2px solid var(--ink); border-radius: 999px; padding: 8px 13px;
  box-shadow: 0 3px 0 var(--ink); cursor: pointer; transition: transform .09s ease, box-shadow .09s ease, background-color .15s;
}
.tbx .tb-tab:hover { background: #FFF6D6; }
.tbx .tb-tab:active { transform: translateY(2px); box-shadow: 0 1px 0 var(--ink); }
.tbx .tb-tab[aria-selected='true'] { background: var(--ink); color: var(--cream); transform: translateY(2px); box-shadow: 0 1px 0 var(--ink); }
.tbx .tb-tab-mark { width: 16px; height: 16px; flex: none; margin-left: -2px; }
.tbx .tb-term {
  background: #28342E; color: #E9F1EA; border: 3px solid var(--ink); border-radius: 18px; overflow: hidden;
  box-shadow: 0 3px 0 #101713, 0 6px 0 var(--ink);
}
.tbx .tb-term-bar { display: flex; align-items: center; gap: 7px; background: var(--ink); padding: 10px 14px; border-bottom: 2px solid #101713; }
.tbx .tb-term-bar i { width: 11px; height: 11px; border-radius: 99px; background: #3B4A42; border: 2px solid #101713; }
.tbx .tb-term-bar span { margin-left: 8px; font-size: 13px; font-weight: 650; color: #B9C6BD; }
.tbx .tb-term-body { padding: 18px 20px 20px; }
.tbx .tb-term pre { margin: 0; font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 15px; line-height: 1.6; white-space: pre-wrap; word-break: break-all; color: #E9F1EA; }
.tbx .tb-term-row { margin-top: 13px; display: flex; flex-wrap: wrap; align-items: center; gap: 12px 14px; }
.tbx .tb-hint { font-size: 14px; line-height: 1.45; color: #C9D6CD; max-width: 44ch; flex: 1 1 220px; }
.tbx .tb-copy { min-width: 92px; }
.tbx .tb-copy[data-copied='yes'] { background: #A6E6BE; }
.tbx .tb-burst { position: absolute; left: 50%; top: 50%; width: 0; height: 0; pointer-events: none; }
.tbx .tb-burst i {
  position: absolute; left: -7px; top: -7px; width: 14px; height: 14px; background: var(--sun);
  clip-path: polygon(50% 0, 62% 38%, 100% 50%, 62% 62%, 50% 100%, 38% 62%, 0 50%, 38% 38%);
  animation: tb-burst .6s cubic-bezier(.2,.8,.2,1) both;
}
.tbx .tb-burst i:nth-child(1) { --bx: -48px; --by: -26px; }
.tbx .tb-burst i:nth-child(2) { --bx: 6px; --by: -40px; animation-delay: .04s; }
.tbx .tb-burst i:nth-child(3) { --bx: 50px; --by: -22px; animation-delay: .08s; }
@keyframes tb-burst {
  0% { transform: translate(0, 0) scale(.3) rotate(0); opacity: 0; }
  25% { opacity: 1; }
  100% { transform: translate(var(--bx), var(--by)) scale(1.15) rotate(90deg); opacity: 0; }
}
@media (max-width: 420px) { .tbx .tb-term pre { font-size: 13px; } .tbx .tb-term-body { padding: 14px 14px 15px; } }
.tbx .tb-after { margin-top: 14px; font-size: 15px; line-height: 1.5; max-width: 52ch; }
.tbx .tb-after a { color: var(--ink); font-weight: 700; text-decoration: underline; text-underline-offset: 3px; text-decoration-thickness: 2px; }

/* ---------- Hero motion ----------
   The frame is complete from the first paint: all four windows, the link and
   the sticker are drawn, and the cursor starts on screen just off the card.
   It walks onto Continue and presses it, so a screenshot never catches an
   empty box. (tb-h-caret is the sign-in band's, not the hero's.) */
.tbx .tb-h-caret { animation: tb-h-caret 1.1s steps(1) infinite; }
@keyframes tb-h-caret { 0%, 55% { opacity: 1; } 56%, 100% { opacity: 0; } }
.tbx .tb-h-sticker { transform-box: fill-box; transform-origin: 50% 50%; animation: tb-h-settle 9s ease-in-out infinite; }
@keyframes tb-h-settle { 0%, 88%, 100% { transform: rotate(0); } 92% { transform: rotate(-1.6deg); } 96% { transform: rotate(1deg); } }
.tbx .tb-h-cursor { animation: tb-h-cursor 9s cubic-bezier(.45,0,.3,1) infinite; }
@keyframes tb-h-cursor {
  0%, 10% { transform: translate(26px, -12px); }
  24% { transform: translate(0, 0); }
  26.5% { transform: translate(0, 3px); }
  30%, 88% { transform: translate(0, 0); }
  100% { transform: translate(26px, -12px); }
}
.tbx .tb-h-press { animation: tb-h-press 9s ease infinite; }
@keyframes tb-h-press { 0%, 25% { transform: translateY(0); } 27%, 29% { transform: translateY(4px); } 32%, 100% { transform: translateY(0); } }


.tbx .tb-phone { display: inline; }
.tbx .tb-wide { display: none; }
@media (min-width: 640px) { .tbx .tb-phone { display: none; } .tbx .tb-wide { display: inline; } }

/* ---------- The mess ---------- */
.tbx .tb-mess { display: grid; grid-template-columns: 1fr 1fr; gap: 22px 22px; list-style: none; margin: 0 0 0 auto; padding: 0; max-width: 470px; }
.tbx .tb-mess li { display: flex; flex-direction: column; align-items: center; gap: 6px; min-width: 0; }
.tbx .tb-mess li span { font-size: 15.5px; font-weight: 750; text-align: center; line-height: 1.3; }
.tbx .tb-mess li:nth-child(2) { transform: translateY(18px); }
.tbx .tb-mess li:nth-child(4) { transform: translateY(18px); }
@media (max-width: 959px) { .tbx .tb-mess { max-width: none; margin: 0; } }
@media (max-width: 640px) {
  .tbx .tb-mess { gap: 14px 8px; }
  .tbx .tb-mess li span { font-size: 14px; }
  .tbx .tb-mess li:nth-child(2), .tbx .tb-mess li:nth-child(4) { transform: translateY(10px); }
}
.tbx .tb-scribble { stroke-dasharray: 100; stroke-dashoffset: 0; animation: tb-scribble 10s ease-in-out infinite; }
@keyframes tb-scribble { 0%, 6% { stroke-dashoffset: 100; } 22%, 100% { stroke-dashoffset: 0; } }
.tbx .tb-flutter { transform-box: fill-box; transform-origin: 50% 0; animation: tb-flutter 4s ease-in-out infinite; }
@keyframes tb-flutter { 0%, 70%, 100% { transform: rotate(0); } 76% { transform: rotate(-4deg); } 84% { transform: rotate(3deg); } 92% { transform: rotate(-1deg); } }
.tbx .tb-steam { animation: tb-steam 3s ease-in-out infinite; }
@keyframes tb-steam { 0%, 100% { opacity: .5; transform: translateY(0); } 50% { opacity: .15; transform: translateY(-3px); } }
.tbx .tb-web { transform-box: fill-box; transform-origin: 100% 0; animation: tb-web 5s ease-in-out infinite; }
@keyframes tb-web { 0%, 100% { transform: rotate(0); } 50% { transform: rotate(2deg); } }
.tbx .tb-jit { animation: tb-jit 6s ease-in-out infinite; }
.tbx .tb-jit-2 { animation-delay: -1.2s; animation-duration: 5.2s; }
.tbx .tb-jit-3 { animation-delay: -2.6s; animation-duration: 6.6s; }
.tbx .tb-jit-4 { animation-delay: -3.4s; animation-duration: 5.6s; }
.tbx .tb-jit-5 { animation-delay: -4.4s; animation-duration: 7s; }
@keyframes tb-jit {
  0%, 100% { transform: translate(0, 0); } 20% { transform: translate(-6px, 4px); } 40% { transform: translate(4px, -3px); }
  60% { transform: translate(-3px, -5px); } 80% { transform: translate(5px, 3px); }
}

/* ---------- Steps ---------- */
.tbx .tb-steps { list-style: none; margin: 24px 0 0; padding: 0; display: grid; gap: 13px; max-width: 42ch; }
.tbx .tb-steps li { display: flex; gap: 13px; align-items: flex-start; font-size: 17.5px; line-height: 1.42; }
.tbx .tb-steps b { font-weight: 750; }
.tbx .tb-num {
  flex: none; width: 34px; height: 34px; border-radius: 99px; display: grid; place-items: center; margin-top: -3px;
  background: var(--sun); border: 2px solid var(--ink); box-shadow: 0 3px 0 var(--ink); font-weight: 850; font-size: 16px;
}
@media (max-width: 640px) { .tbx .tb-steps li { font-size: 16.5px; } }
.tbx .tb-s-approve { animation: tb-s-press 6s ease infinite; }
@keyframes tb-s-press { 0%, 14% { transform: translateY(0); } 17%, 21% { transform: translateY(5px); } 24%, 100% { transform: translateY(0); } }
.tbx .tb-s-hand { animation: tb-s-hand 6s cubic-bezier(.4,0,.3,1) infinite; }
@keyframes tb-s-hand { 0% { transform: translate(34px, 30px); } 12% { transform: translate(0, 0); } 17%, 21% { transform: translate(0, 5px); } 26%, 100% { transform: translate(0, 0); } }
.tbx .tb-s-check { transform-box: fill-box; transform-origin: 50% 50%; animation: tb-pop-in 6s cubic-bezier(.3,1.6,.5,1) infinite; }
@keyframes tb-pop-in { 0%, 21% { transform: scale(0); } 27%, 100% { transform: scale(1); } }
.tbx .tb-s-pill { transform-box: fill-box; transform-origin: 50% 100%; animation: tb-bounce 6s ease infinite; }
@keyframes tb-bounce { 0%, 36% { transform: translateY(0); } 40% { transform: translateY(-8px); } 45% { transform: translateY(0); } 48% { transform: translateY(-2px); } 51%, 100% { transform: translateY(0); } }

/* ---------- Bring your own agent: a strip at the foot of the setup slab ---------- */
.tbx .tb-byo {
  margin-top: 32px; padding-top: 28px; border-top: 3px dashed rgba(27,36,32,.22);
  display: grid; gap: 26px; align-items: center;
}
@media (min-width: 1024px) { .tbx .tb-byo { grid-template-columns: minmax(0, 4fr) minmax(0, 8fr); gap: 44px; } }
@media (max-width: 640px) { .tbx .tb-byo { margin-top: 30px; padding-top: 26px; gap: 20px; } }
.tbx .tb-h3 { font-weight: 800; font-size: clamp(24px, 2.1vw, 30px); line-height: 1.1; letter-spacing: -0.03em; text-wrap: balance; }
.tbx .tb-byo-p { margin-top: 9px; font-size: 16.5px; line-height: 1.5; max-width: 34ch; }
.tbx .tb-byo-text .tbtn { margin-top: 15px; }

/* ---------- Agents sticker sheet ---------- */
.tbx .tb-sheet {
  position: relative; background: var(--paper); border: 3px solid var(--ink); border-radius: 28px;
  box-shadow: 0 4px 0 var(--edge), 0 7px 0 var(--ink); padding: 34px 26px 28px;
}
.tbx .tb-sheet::before {
  content: ''; position: absolute; inset: 12px; border-radius: 18px; border: 2px dashed #D9CFBA; pointer-events: none;
}
.tbx .tb-sheet-empty { position: absolute; top: 10px; right: 18px; width: 66px; height: 66px; }
.tbx .tb-sheet-grid { position: relative; list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 12px; }
.tbx .tb-sheet-cell { display: flex; flex-direction: column; align-items: center; text-align: center; min-width: 0; }
.tbx .tb-sheet-art { width: 100%; max-width: 128px; aspect-ratio: 1; }
.tbx .tb-sheet-lift { transition: transform .25s cubic-bezier(.2,.8,.2,1); transform-box: fill-box; transform-origin: 50% 50%; }
@media (hover: hover) { .tbx .tb-sheet-cell:hover .tb-sheet-lift { transform: translateY(-1.2px) scale(1.04) rotate(2deg); } }
.tbx .tb-sheet-name { margin-top: 10px; font-size: 16px; font-weight: 800; line-height: 1.2; }
.tbx .tb-sheet-note { margin-top: 5px; font-size: 15px; line-height: 1.35; max-width: 16ch; }
.tbx .tb-peel-flap { }
/* The slim sheet: the same stickers, printed small, so setup is one section. */
.tbx .tb-sheet-slim { padding: 22px 18px 18px; }
.tbx .tb-sheet-slim::before { inset: 9px; border-radius: 14px; }
.tbx .tb-sheet-slim .tb-sheet-grid { gap: 10px; }
.tbx .tb-sheet-slim .tb-sheet-art { max-width: 72px; }
.tbx .tb-sheet-slim .tb-sheet-name { margin-top: 8px; font-size: 15px; }
.tbx .tb-sheet-slim .tb-sheet-note { margin-top: 3px; font-size: 14px; max-width: 18ch; }
.tbx .tb-sheet-slim .tb-sheet-empty { width: 44px; height: 44px; top: 6px; right: 12px; }
@media (max-width: 760px) {
  .tbx .tb-sheet { padding: 30px 16px 22px; }
  .tbx .tb-sheet-grid { grid-template-columns: 1fr 1fr; gap: 22px 12px; }
  .tbx .tb-sheet-cell:last-child { grid-column: 1 / -1; }
  .tbx .tb-sheet-art { max-width: 112px; }
  .tbx .tb-sheet-empty { width: 40px; height: 40px; top: 10px; right: 14px; }
  /* On a phone the sheet reads as a list: sticker, name, note, one per line. */
  .tbx .tb-sheet-slim { padding: 14px 14px 12px; }
  .tbx .tb-sheet-slim .tb-sheet-grid { grid-template-columns: 1fr; gap: 9px; }
  /* Sticker in its own column, name over note in the second: as a row the five
     notes each started at a different x, because the names are different widths. */
  .tbx .tb-sheet-slim .tb-sheet-cell {
    display: grid; grid-template-columns: 34px minmax(0, 1fr); column-gap: 10px;
    align-items: center; text-align: left;
  }
  .tbx .tb-sheet-slim .tb-sheet-cell:last-child { grid-column: auto; }
  .tbx .tb-sheet-slim .tb-sheet-art { grid-row: 1 / 3; width: 34px; max-width: none; }
  .tbx .tb-sheet-slim .tb-sheet-name { margin-top: 0; font-size: 14.5px; line-height: 1.25; }
  .tbx .tb-sheet-slim .tb-sheet-note { margin-top: 1px; font-size: 14px; line-height: 1.3; max-width: none; }
  .tbx .tb-sheet-slim .tb-sheet-empty { display: none; }
}

/* ---------- The index: six badges that jump to their own band ----------
   It sits on cream between two coloured bands, so it needs real air above and
   below or it reads as a crack rather than a pause. The badges take the wider
   column (8fr) so the six labels never come within a word of each other. */
.tbx .tb-index { padding-top: 62px; padding-bottom: 56px; display: grid; gap: 30px; align-items: center; }
@media (min-width: 1024px) { .tbx .tb-index { grid-template-columns: minmax(0, 4fr) minmax(0, 8fr); gap: 56px; } }
.tbx .tb-index .tb-h2 { font-size: clamp(30px, 2.9vw, 40px); }
.tbx .tb-index-p { margin-top: 10px; font-size: 16.5px; line-height: 1.5; max-width: 32ch; }
.tbx .tb-badges { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 10px 20px; }
.tbx .tb-badges a { display: flex; flex-direction: column; align-items: center; gap: 8px; color: var(--ink); text-decoration: none; }
.tbx .tb-badge-art { width: 100%; max-width: 62px; transition: transform .2s cubic-bezier(.2,.8,.2,1); }
@media (hover: hover) { .tbx .tb-badges a:hover .tb-badge-art { transform: translateY(-4px) rotate(-4deg); } .tbx .tb-badges a:hover .tb-badge-label { text-decoration: underline; text-underline-offset: 3px; text-decoration-thickness: 2px; } }
.tbx .tb-badge-label { font-size: 14px; font-weight: 750; text-align: center; line-height: 1.2; white-space: nowrap; }
@media (max-width: 640px) {
  .tbx .tb-index { padding-top: 40px; padding-bottom: 36px; gap: 24px; }
  /* On a phone the index is a two-column list, so the labels stay full size. */
  .tbx .tb-badges { grid-template-columns: 1fr 1fr; gap: 14px 12px; }
  .tbx .tb-badges a { flex-direction: row; align-items: center; gap: 10px; }
  .tbx .tb-badge-art { width: 40px; flex: none; max-width: none; }
  .tbx .tb-badge-label { font-size: 15px; text-align: left; }
}

/* ---------- Sign-in ---------- */
.tbx .tb-si-hand { animation: tb-si-hand 5s cubic-bezier(.4,0,.3,1) infinite; }
@keyframes tb-si-hand { 0% { transform: translate(40px, 50px); opacity: 0; } 8% { opacity: 1; } 18% { transform: translate(0, 0); } 22%, 26% { transform: translate(0, 5px); } 30%, 100% { transform: translate(0, 0); } }
.tbx .tb-si-flash { animation: tb-si-flash 5s ease infinite; }
@keyframes tb-si-flash { 0%, 22% { opacity: 0; } 24% { opacity: 1; fill: #BCD0FF; } 36%, 100% { opacity: 1; } }
.tbx .tb-si-check { transform-box: fill-box; transform-origin: 50% 50%; animation: tb-si-check 5s cubic-bezier(.3,1.6,.5,1) infinite; }
@keyframes tb-si-check { 0%, 28% { transform: scale(0); } 36%, 100% { transform: scale(1); } }

/* ---------- Company-only ---------- */
.tbx .tb-only-check { transform-box: fill-box; transform-origin: 50% 50%; animation: tb-only-check 6s ease infinite; }
@keyframes tb-only-check { 0%, 70% { transform: scale(1); } 75% { transform: scale(1.25); } 80% { transform: scale(.95); } 85%, 100% { transform: scale(1); } }
.tbx .tb-rattle { animation: tb-rattle 6s ease-in-out infinite; }
.tbx .tb-knock { animation: tb-knock 6s ease-in-out infinite; }
@keyframes tb-knock {
  0%, 12% { transform: translate(18px, 14px); } 20% { transform: translate(0, 0); } 22% { transform: translate(-3px, 2px); }
  24% { transform: translate(0, 0); } 27% { transform: translate(-3px, 2px); } 29%, 60% { transform: translate(0, 0); } 75%, 100% { transform: translate(18px, 14px); }
}
@keyframes tb-rattle {
  0%, 21% { transform: translateY(0); } 22.5% { transform: translateY(-4px); } 24% { transform: translateY(0); }
  27.5% { transform: translateY(-3px); } 29%, 100% { transform: translateY(0); }
}

/* ---------- Keys (the ink slab) ---------- */
.tbx .bg-ink .tb-lede { color: var(--cream); }
.tbx .tb-k-dot { opacity: 1; animation: tb-k-dot 9s steps(1) infinite; }
.tbx .tb-k-dot-0 { --t: 0; } .tbx .tb-k-dot-1 { animation-name: tb-k-dot-1; } .tbx .tb-k-dot-2 { animation-name: tb-k-dot-2; }
.tbx .tb-k-dot-3 { animation-name: tb-k-dot-3; } .tbx .tb-k-dot-4 { animation-name: tb-k-dot-4; } .tbx .tb-k-dot-5 { animation-name: tb-k-dot-5; }
.tbx .tb-k-dot-6 { animation-name: tb-k-dot-6; } .tbx .tb-k-dot-7 { animation-name: tb-k-dot-7; } .tbx .tb-k-dot-8 { animation-name: tb-k-dot-8; }
.tbx .tb-k-dot-9 { animation-name: tb-k-dot-9; }
@keyframes tb-k-dot { 0%, 4% { opacity: 0; } 5%, 100% { opacity: 1; } }
@keyframes tb-k-dot-1 { 0%, 6% { opacity: 0; } 7%, 100% { opacity: 1; } }
@keyframes tb-k-dot-2 { 0%, 8% { opacity: 0; } 9%, 100% { opacity: 1; } }
@keyframes tb-k-dot-3 { 0%, 10% { opacity: 0; } 11%, 100% { opacity: 1; } }
@keyframes tb-k-dot-4 { 0%, 12% { opacity: 0; } 13%, 100% { opacity: 1; } }
@keyframes tb-k-dot-5 { 0%, 14% { opacity: 0; } 15%, 100% { opacity: 1; } }
@keyframes tb-k-dot-6 { 0%, 16% { opacity: 0; } 17%, 100% { opacity: 1; } }
@keyframes tb-k-dot-7 { 0%, 18% { opacity: 0; } 19%, 100% { opacity: 1; } }
@keyframes tb-k-dot-8 { 0%, 20% { opacity: 0; } 21%, 100% { opacity: 1; } }
@keyframes tb-k-dot-9 { 0%, 22% { opacity: 0; } 23%, 100% { opacity: 1; } }
.tbx .tb-k-caret { opacity: 0; animation: tb-k-caret 9s linear infinite; }
@keyframes tb-k-caret { 0%, 24% { opacity: 0; } 25%, 30% { opacity: 1; } 31%, 100% { opacity: 0; } }
.tbx .tb-k-save { animation: tb-k-save 9s ease infinite; }
@keyframes tb-k-save { 0%, 30% { transform: translateY(0); } 32%, 35% { transform: translateY(5px); } 37%, 100% { transform: translateY(0); } }
.tbx .tb-k-toast { transform-box: fill-box; transform-origin: 50% 100%; animation: tb-k-toast 9s cubic-bezier(.3,1.5,.5,1) infinite; }
@keyframes tb-k-toast { 0%, 36% { transform: translateY(24px) scale(.8); opacity: 0; } 42%, 96% { transform: translateY(0) scale(1); opacity: 1; } 100% { opacity: 0; } }

/* ---------- Rollback ---------- */
.tbx .tb-rb { display: flex; flex-direction: column; align-items: center; gap: 22px; }
.tbx .tb-logchip {
  font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 15px; font-weight: 600; line-height: 1.35;
  background: var(--ink); color: #E9F1EA; border: 3px solid var(--ink); border-radius: 16px; padding: 11px 16px;
  box-shadow: 0 5px 0 #0F1512; max-width: 100%;
}
.tbx .tb-logchip b { color: var(--sun); font-weight: 700; }
.tbx .tb-nowrap { white-space: nowrap; }
.tbx .tb-log-t { color: #9FB1A6; }
.tbx .tb-rb-live { animation: tb-rb-live 8s cubic-bezier(.5,0,.3,1) infinite; }
/* Live starts on v4's top-left corner, left of the 500 badge rather than on
   top of it: at 276 the green pill covered the red one for two thirds of the
   loop. It flies back to v3 over the same arc. */
@keyframes tb-rb-live { 0%, 8% { transform: translate(248px, 0); } 64% { transform: translate(248px, 0); } 70% { transform: translate(124px, -58px); } 76%, 100% { transform: translate(0, 0); } }
.tbx .tb-rb-err { transform-box: fill-box; transform-origin: 50% 50%; animation: tb-rb-err 8s cubic-bezier(.3,1.7,.5,1) infinite; }
@keyframes tb-rb-err { 0%, 12% { transform: scale(0); } 16%, 100% { transform: scale(1); } }
.tbx .tb-rb-stamp { transform-box: fill-box; transform-origin: 50% 50%; animation: tb-rb-stamp 8s cubic-bezier(.5,0,.6,1.4) infinite; }
@keyframes tb-rb-stamp { 0%, 54% { transform: scale(1.5); opacity: 0; } 58% { transform: scale(1); opacity: 1; } 100% { transform: scale(1); opacity: 1; } }
.tbx .tb-rb-fail { animation: tb-rb-fail 8s ease infinite; }
@keyframes tb-rb-fail { 0%, 28% { opacity: 0; } 32%, 100% { opacity: 1; } }
.tbx .tb-rb-shake { animation: tb-rb-shake 8s linear infinite; }
@keyframes tb-rb-shake { 0%, 58% { transform: translate(0, 0); } 59% { transform: translate(2px, 2px); } 60% { transform: translate(-2px, -1px); } 61% { transform: translate(1px, -2px); } 62%, 100% { transform: translate(0, 0); } }

/* ---------- Share ---------- */
.tbx .tb-cmd {
  display: inline-block; margin-top: 18px; font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 15px; font-weight: 600;
  background: var(--ink); color: #E9F1EA; border: 3px solid var(--ink); border-radius: 14px; padding: 12px 16px; box-shadow: 0 5px 0 #0F1512; max-width: 100%;
  overflow-wrap: anywhere;
}
.tbx .tb-cmd span { color: var(--sun); }
@media (max-width: 420px) { .tbx .tb-cmd { font-size: 13.5px; padding: 11px 13px; } }
.tbx .tb-small { font-size: 16.5px; margin-top: 16px; }
/* The terminal and the link are drawn at rest; only the new version lands. */
.tbx .tb-sh-new { transform-box: fill-box; transform-origin: 50% 50%; animation: tb-sh-new 9s cubic-bezier(.3,1.7,.5,1) infinite; }
@keyframes tb-sh-new { 0%, 8% { transform: scale(.92); } 14%, 100% { transform: scale(1); } }

/* ---------- Admins ---------- */
.tbx .tb-admin-slab { padding-bottom: 60px; }
@media (max-width: 640px) { .tbx .tb-admin-slab { padding-bottom: 26px; } }
.tbx .tb-admin-split { display: grid; gap: 34px; align-items: center; }
@media (min-width: 1260px) {
  .tbx .tb-admin-split { grid-template-columns: minmax(0, 320px) minmax(0, 1fr); gap: 52px; }
  .tbx .tb-admin-art { margin-right: -36px; }
}
.tbx .tb-admin-art { position: relative; min-width: 0; }
@media (min-width: 761px) and (max-width: 959px) { .tbx .tb-col-uses { display: none; } }
@media (max-width: 1259px) { .tbx .tb-admin-cursor { display: none; } }
.tbx .tb-admin {
  position: relative; background: var(--paper); border: 3px solid var(--ink); border-radius: 22px; overflow: hidden; padding-bottom: 30px;
  box-shadow: 0 4px 0 var(--edge), 0 7px 0 var(--ink);
}
.tbx .tb-admin-bar { display: flex; align-items: center; gap: 10px; padding: 12px 18px; border-bottom: 2.5px solid var(--ink); background: var(--edge); font-size: 16px; font-weight: 650; }
.tbx .tb-admin-bar b { font-weight: 800; }
.tbx .tb-admin-sep { opacity: .5; }
.tbx .tb-dots { display: inline-flex; gap: 6px; margin-right: 8px; }
.tbx .tb-dots i { width: 11px; height: 11px; border-radius: 99px; background: var(--paper); border: 2px solid var(--ink); }
.tbx .tb-admin-count { margin-left: auto; font-size: 14px; font-weight: 800; background: var(--sun); border: 2px solid var(--ink); border-radius: 99px; padding: 4px 11px; }
.tbx .tb-admin-table { width: 100%; border-collapse: separate; border-spacing: 0; font-size: 15px; }
.tbx .tb-admin-table th { text-align: left; font-size: 13px; font-weight: 800; letter-spacing: .03em; text-transform: uppercase; color: #5E5A4C; padding: 14px 12px 8px; white-space: nowrap; }
.tbx .tb-admin-table th:first-child, .tbx .tb-admin-table td:first-child { padding-left: 20px; }
.tbx .tb-admin-table td { padding: 10px 12px; border-top: 2px solid #EDE5D4; vertical-align: middle; white-space: nowrap; }
.tbx .tb-admin-table tr.tb-row-hover td { background: #FFF6D6; }
.tbx .tb-admin-table tr.tb-more td { font-size: 14px; font-weight: 650; color: #5E5A4C; padding-top: 12px; padding-bottom: 4px; }
.tbx .tb-admin-table tr.tb-more .tb-app { font-size: 13.5px; color: var(--ink); white-space: nowrap; }
.tbx .tb-more-phone { display: none; }
.tbx .tb-app { font-family: 'JetBrains Mono', ui-monospace, monospace; font-weight: 700; font-size: 14.5px; }
.tbx .tb-by { display: inline-flex; align-items: center; gap: 7px; font-weight: 700; }
.tbx .tb-face { display: block; flex: none; }
.tbx .tb-agent-badge { display: block; filter: drop-shadow(0 1px 1px rgba(27,36,32,.25)); }
.tbx .tb-hosts { display: inline-flex; gap: 6px; }
.tbx .tb-host { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 13px; font-weight: 600; background: var(--wash); border: 2px solid var(--ink); border-radius: 99px; padding: 3px 9px; }
.tbx .tb-everyone { font-size: 14px; font-weight: 800; background: #DDF3E4; border: 2px solid var(--ink); border-radius: 99px; padding: 3px 10px; }
.tbx .tb-stack { display: inline-flex; align-items: center; }
.tbx .tb-stack .tb-face { margin-right: -7px; }
.tbx .tb-stack-n { margin-left: 12px; font-weight: 800; font-size: 14px; }
.tbx .tb-last { display: inline-flex; align-items: center; gap: 8px; font-weight: 650; }
.tbx .tb-last i { width: 10px; height: 10px; border-radius: 99px; background: #B3AB98; border: 2px solid var(--ink); }
.tbx .tb-last i.tb-pulse { background: var(--green); animation: tb-pulse 2.4s ease-in-out infinite; }
@keyframes tb-pulse { 0%, 100% { box-shadow: 0 0 0 0 rgba(46,157,91,.5); } 50% { box-shadow: 0 0 0 5px rgba(46,157,91,0); } }
/* Left of the first row's avatar, not across her face. */
.tbx .tb-admin-cursor { position: absolute; left: 172px; top: 130px; pointer-events: none; filter: drop-shadow(0 2px 0 rgba(27,36,32,.2)); }
.tbx .tb-log {
  position: relative; margin: -22px 22px 0 auto; width: min(540px, 86%); background: #28342E; color: #E9F1EA;
  border: 3px solid var(--ink); border-radius: 18px; box-shadow: 0 4px 0 #101713, 0 7px 0 var(--ink); overflow: hidden;
  transform: rotate(-1.2deg);
}
.tbx .tb-log-bar { display: flex; align-items: center; gap: 4px; background: var(--ink); padding: 9px 14px; font-size: 13px; font-weight: 750; color: #B9C6BD; }
.tbx .tb-log-bar .tb-dots i { background: #3B4A42; border-color: #101713; }
.tbx .tb-log-lines { list-style: none; margin: 0; padding: 12px 16px 14px; font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 14px; line-height: 1.75; font-weight: 500; overflow: hidden; }
.tbx .tb-log-lines li { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.tbx .tb-log-who { color: var(--sun); font-weight: 700; }
.tbx .tb-log-lines { animation: tb-log-push 8s cubic-bezier(.3,1.3,.5,1) infinite; }
@keyframes tb-log-push { 0%, 12% { transform: translateY(-1.75em); } 18%, 100% { transform: translateY(0); } }
.tbx .tb-log-new { animation: tb-log-new 8s ease infinite; }
@keyframes tb-log-new { 0%, 12% { opacity: 0; } 18% { opacity: 1; background: rgba(255,210,63,.18); } 40%, 100% { opacity: 1; background: transparent; } }
@media (max-width: 760px) {
  .tbx .tb-col-uses, .tbx .tb-col-who { display: none; }
  .tbx .tb-admin-table { font-size: 14px; }
  .tbx .tb-admin-table td, .tbx .tb-admin-table th { padding-left: 8px; padding-right: 8px; }
  .tbx .tb-admin-table th:first-child, .tbx .tb-admin-table td:first-child { padding-left: 12px; }
  .tbx .tb-app { font-size: 13px; }
  .tbx .tb-by-name { display: none; }
  .tbx .tb-by { gap: 0; }
  .tbx .tb-by > span:last-child { margin-left: -9px; margin-top: 16px; }
  .tbx .tb-admin { padding-bottom: 6px; }
  .tbx .tb-last { font-size: 13.5px; gap: 6px; white-space: nowrap; }
  .tbx .tb-admin-table tr.tb-more td { white-space: normal; font-size: 13px; line-height: 1.5; padding-bottom: 10px; }
  .tbx .tb-hide-phone { display: none; }
  .tbx .tb-admin-bar { font-size: 14px; padding: 10px 12px; gap: 7px; }
  .tbx .tb-admin-bar .tb-dots { display: none; }
  .tbx .tb-admin-cursor { display: none; }
  .tbx .tb-log { margin: 18px 0 0; width: 100%; transform: none; }
  .tbx .tb-admin-table td:last-child, .tbx .tb-admin-table th:last-child { padding-right: 12px; }
  .tbx .tb-log-lines { font-size: 12.5px; padding: 9px 12px 10px; }
  .tbx .tb-log-lines li { white-space: normal; line-height: 1.42; margin-bottom: 4px; }
  .tbx .tb-admin-table tbody tr:nth-child(4), .tbx .tb-admin-table tbody tr:nth-child(5) { display: none; }
  .tbx .tb-more-wide { display: none; }
  .tbx .tb-more-phone { display: inline; }
}

/* ---------- FAQ ---------- */
.tbx .tb-faq { padding-top: 56px; padding-bottom: 48px; max-width: 1000px; }
.tbx .tb-faq .tb-h2 { display: flex; align-items: center; gap: 14px; }
.tbx .tb-q { width: 60px; height: 60px; flex: none; }
.tbx .tb-faq-list { margin-top: 24px; display: grid; gap: 12px; align-items: start; }
@media (min-width: 880px) { .tbx .tb-faq-list { grid-template-columns: 1fr 1fr; gap: 12px 18px; } }
.tbx .tb-faq-item { background: var(--paper); border: 2px solid var(--ink); border-radius: 18px; box-shadow: 0 3px 0 var(--edge), 0 5px 0 var(--ink); transition: transform .1s ease, box-shadow .1s ease; }
.tbx .tb-faq-item summary { list-style: none; cursor: pointer; display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 16px 20px; font-size: 17.5px; font-weight: 750; line-height: 1.35; }
.tbx .tb-faq-item summary::-webkit-details-marker { display: none; }
.tbx .tb-faq-item:has(summary:active) { transform: translateY(3px); box-shadow: 0 1px 0 var(--edge), 0 2px 0 var(--ink); }
.tbx .tb-faq-item p { padding: 0 20px 20px; font-size: 16.5px; line-height: 1.55; max-width: 60ch; }
.tbx .tb-key {
  flex: none; width: 34px; height: 34px; border-radius: 10px; display: grid; place-items: center;
  background: var(--sun); border: 2px solid var(--ink); box-shadow: 0 3px 0 var(--ink); transition: transform .2s cubic-bezier(.3,1.4,.5,1);
}
.tbx .tb-key svg { width: 18px; height: 18px; }
.tbx .tb-faq-item[open] .tb-key { transform: rotate(45deg); }
@media (max-width: 640px) { .tbx .tb-faq { padding-top: 36px; padding-bottom: 30px; } .tbx .tb-faq-item summary { font-size: 16.5px; padding: 15px 16px; } .tbx .tb-faq-item p { padding: 0 16px 16px; } .tbx .tb-q { width: 46px; height: 46px; } }

/* ---------- Closing ---------- */
.tbx .tb-closing { padding: 56px 24px; display: flex; flex-direction: column; align-items: center; gap: 30px; }
.tbx .tb-cl-card { position: relative; z-index: 1; text-align: center; max-width: 560px; display: flex; flex-direction: column; align-items: center; }
.tbx .tb-cl-card .tb-h2 { font-size: clamp(40px, 4.6vw, 64px); }
.tbx .tb-cl-card .tb-lede { margin-left: auto; margin-right: auto; }
.tbx .tb-cl-stickers { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; justify-content: center; gap: 14px 22px; }
.tbx .tb-cl-stickers li { width: 176px; animation: tb-bob 7s ease-in-out infinite; transition: transform .25s cubic-bezier(.2,.8,.2,1); }
.tbx .tb-cl-stickers li:nth-child(2) { animation-duration: 6.2s; animation-delay: -2s; }
.tbx .tb-cl-stickers li:nth-child(3) { animation-duration: 7.6s; animation-delay: -4s; }
.tbx .tb-cl-stickers li:nth-child(4) { animation-duration: 6.6s; animation-delay: -1s; }
@keyframes tb-bob { 0%, 100% { translate: 0 0; } 50% { translate: 0 -3px; } }
@media (hover: hover) { .tbx .tb-cl-stickers li:hover { transform: translateY(-6px) scale(1.04); } }
.tbx .tb-form { width: 100%; max-width: 480px; margin-top: 24px; }
.tbx .tb-form-row { display: flex; gap: 12px; }
.tbx .tb-input {
  flex: 1; min-width: 0; font: inherit; font-size: 16px; font-weight: 550; color: var(--ink);
  background: var(--paper); border: 2px solid var(--ink); border-radius: 999px; padding: 12px 18px;
  box-shadow: 0 2px 0 var(--edge), 0 4px 0 var(--ink); outline: none;
}
.tbx .tb-input::placeholder { color: #8A8474; }
.tbx .tb-input:focus-visible { box-shadow: 0 2px 0 var(--edge), 0 4px 0 var(--ink), 0 0 0 4px rgba(27,36,32,.2); }
.tbx .tb-form-note { margin-top: 14px; font-size: 14.5px; font-weight: 600; min-height: 1.3em; }
.tbx .tb-err { color: #8E1F16; font-weight: 750; }
.tbx .tb-done { display: flex; align-items: center; gap: 12px; margin-top: 28px; text-align: left; background: var(--paper); border: 2px solid var(--ink); border-radius: 18px; padding: 14px 18px; box-shadow: 0 4px 0 var(--ink); }
.tbx .tb-done-h { font-weight: 800; font-size: 19px; }
.tbx .tb-done-p { font-size: 14.5px; margin-top: 2px; }
@media (max-width: 640px) {
  .tbx .tb-closing { padding: 38px 14px 42px; gap: 24px; }
  .tbx .tb-form-row { flex-direction: column; }
  /* 152, not 138: the app name is 12.6 in a 172 viewBox, so 138 renders it at
     10.1px. 152 puts it at 11.1px, and two of them still fit 390 with the gap. */
  .tbx .tb-cl-stickers li { width: 152px; }
  .tbx .tb-cl-a li:nth-child(n+3) { display: none; }
  .tbx .tb-cl-b { display: none; }
}
@media (min-width: 641px) and (max-width: 1179px) { .tbx .tb-cl-a li:nth-child(4) { display: none; } }
@media (min-width: 1180px) {
  .tbx .tb-closing { min-height: 430px; justify-content: center; }
  .tbx .tb-cl-stickers { position: absolute; top: 0; bottom: 0; width: 250px; display: block; }
  .tbx .tb-cl-a { left: 2%; }
  .tbx .tb-cl-b { right: 2%; }
  .tbx .tb-cl-stickers li { position: absolute; width: 182px; }
  .tbx .tb-cl-a li:nth-child(1) { top: 1%; left: 10px; }
  .tbx .tb-cl-a li:nth-child(2) { top: 23%; left: 82px; }
  .tbx .tb-cl-a li:nth-child(3) { top: 45%; left: 4px; }
  .tbx .tb-cl-a li:nth-child(4) { top: 67%; left: 68px; }
  .tbx .tb-cl-b li:nth-child(1) { top: 5%; right: 40px; }
  .tbx .tb-cl-b li:nth-child(2) { top: 33%; right: 88px; }
  .tbx .tb-cl-b li:nth-child(3) { top: 61%; right: 20px; }
}

/* ---------- Footer ---------- */
.tbx .tb-foot { padding-top: 26px; padding-bottom: 26px; }
.tbx .tb-ground { position: relative; height: 2px; background: var(--ink); border-radius: 2px; margin-bottom: 22px; }
.tbx .tb-crawl { position: absolute; right: 18%; bottom: 1px; color: var(--ink); animation: tb-crawl 64s linear infinite; }
.tbx .tb-crawl svg { display: block; }
.tbx .tb-inch { display: block; transform-origin: 100% 100%; animation: tb-inch 1.8s ease-in-out infinite; }
@keyframes tb-inch { 0%, 100% { transform: scaleX(1); } 50% { transform: scaleX(1.08); } }
@keyframes tb-crawl {
  0% { transform: translateX(0) scaleX(1); }
  42% { transform: translateX(-150px) scaleX(1); }
  47% { transform: translateX(-150px) scaleX(1); }
  47.5% { transform: translateX(-150px) scaleX(-1); }
  89% { transform: translateX(0) scaleX(-1); }
  94% { transform: translateX(0) scaleX(-1); }
  94.5% { transform: translateX(0) scaleX(1); }
  100% { transform: translateX(0) scaleX(1); }
}
.tbx .tb-foot-row { display: flex; align-items: center; justify-content: space-between; gap: 18px; flex-wrap: wrap; }
.tbx .tb-foot-row a { color: var(--ink); text-decoration: none; }
.tbx .tb-foot-links { display: flex; gap: 24px; font-size: 15px; font-weight: 650; }
.tbx .tb-foot-links a:hover { text-decoration: underline; text-underline-offset: 4px; text-decoration-thickness: 2px; }
@media (max-width: 640px) { .tbx .tb-foot-row { flex-direction: column; align-items: flex-start; } }

@media (prefers-reduced-motion: reduce) {
  .tbx *, .tbx *::before, .tbx *::after { animation: none !important; transition: none !important; }
  .tbx .tb-burst { display: none; }
}
`;
