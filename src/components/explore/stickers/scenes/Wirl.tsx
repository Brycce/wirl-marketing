// Point the agent at Wirl: the app, and everything it comes with. One big
// supplier-payments window, with a sticker for each thing Wirl adds slapped on
// and around it, in the order the list reads: the Google sign-in, who can open
// it, the vault, the log, and the rollback.

import { C, Scene, Sticker, tapeWidth } from '../kit';
import {
  AppWindow, Bubble, FONT, GoogleButton, KeyTag, MarkSticker, MONO, Padlock, Receipt, Safe, Tape, tapeH, Versions,
} from '../objects';

/* The access switch: who can open it. 344 x 40 */
export const ACCESS_W = 344;
export function AccessSwitch({ on = 0 }: { on?: number }) {
  const segs: [string, number, number][] = [
    ['Everyone at harbor.co', 4, 164],
    ['4 people', 170, 86],
    ['Anyone', 258, 82],
  ];
  return (
    <g>
      <rect x={0} y={0} width={ACCESS_W} height={40} rx={20} fill={C.white} stroke={C.ink} strokeWidth={2.5} />
      {segs.map(([label, x, w], i) => (
        <g key={label}>
          {i === on && <rect x={x} y={4} width={w} height={32} rx={16} fill={C.ink} />}
          {i > 0 && i !== on && i - 1 !== on && <path d={`M${x - 2} 12 V28`} stroke="#DAD6CC" strokeWidth={1.5} />}
          <text x={x + w / 2} y={25} fontSize={13.5} fontWeight={650} fill={i === on ? '#FFFFFF' : C.ink} textAnchor="middle" style={FONT}>{label}</text>
        </g>
      ))}
    </g>
  );
}

/* The app's own content, faint behind the stickers. */
export function SupplierRows({ w, y = 52, n = 4 }: { w: number; y?: number; n?: number }) {
  return (
    <g>
      {Array.from({ length: n }, (_, i) => (
        <g key={i} transform={`translate(0 ${y + i * 40})`}>
          <rect x={18} y={0} width={[120, 96, 110, 84][i % 4]} height={10} rx={5} fill="#E6E3DB" />
          <rect x={w - 118} y={0} width={44} height={10} rx={5} fill="#E6E3DB" />
          <rect x={w - 62} y={-7} width={44} height={24} rx={12} fill="#FFF1C2" stroke="#E9D9A6" strokeWidth={1.5} />
          {i < n - 1 && <path d={`M16 24 H${w - 16}`} stroke="#EFEDE7" strokeWidth={1.5} />}
        </g>
      ))}
    </g>
  );
}

/* A round avatar sticker with an agent's mark. 40 x 40 */
export function AgentAvatar({ id, uid }: { id: string; uid: string }) {
  return (
    <g>
      <circle cx={20} cy={20} r={20} fill={C.white} />
      <MarkSticker id={id} x={6} y={6} size={28} uid={uid} border={0} />
    </g>
  );
}

export function WirlArt() {
  const capText = 'rolled back after 12 min';
  const capW = tapeWidth(capText, 13.5) + 22;
  return (
    <Scene
      W={648} H={506} MW={340} MH={580}
      tone={C.sky}
      label="Codex deploying supplier-payments to Wirl. The app gets a Google sign-in, a switch for who can open it (everyone at harbor.co, 4 people, or anyone), a safe for its Stripe key, a log of calls by host, and a rollback from a failed v4 to v3."
    >
      {/* The agent, deploying. */}
      <Sticker w={40} h={40} pad={9} d={[24, 24, 1, -6]} m={[10, 14, 0.9, -6]} i={0} cut={<circle cx={20} cy={20} r={19} />}>
        <AgentAvatar id="codex" uid="wirl-av" />
      </Sticker>
      <Sticker w={262} h={46} d={[74, 20, 1, -2]} m={[52, 12, 0.9, -2]} i={0}>
        <Bubble w={262} h={46} tail="none">
          <text x={18} y={29} fontSize={15.5} fontWeight={600} fill={C.ink} style={FONT}>Deploying supplier-payments…</text>
        </Bubble>
      </Sticker>

      {/* The app. */}
      <Sticker w={380} h={262} d={[104, 88, 1, 1]} m={[18, 78, 0.8, 1]} i={1} hover={false}>
        <AppWindow w={380} h={262} name="supplier-payments" bar={C.green}>
          <SupplierRows w={380} y={64} n={5} />
        </AppWindow>
      </Sticker>
      <Sticker w={44} h={54} d={[454, 66, 0.82, 10]} m={[290, 60, 0.7, 10]} i={1}>
        <Padlock />
      </Sticker>

      {/* 1. Sign-in with Google */}
      <Sticker w={206} h={40} d={[190, 146, 1, -3]} m={[86, 126, 0.84, -3]} i={2}>
        <GoogleButton />
      </Sticker>

      {/* 4. The log, by host */}
      <Sticker w={186} h={124} d={[16, 312, 1, -5]} m={[8, 340, 0.95, -4]} i={5}>
        <Receipt
          w={186} h={124} title="CALLS BY HOST"
          lines={[['api.stripe.com', '214'], ['hooks.slack.com', '12'], ['api.sendgrid.com', '3']]}
        />
        <g className="sb-print">
          <rect x={146} y={40} width={32} height={16} fill={C.white} />
          <text x={174} y={52} fontSize={12.5} fill={C.ink} fontWeight={700} style={MONO} textAnchor="end">215</text>
        </g>
      </Sticker>

      {/* 3. Keys in a vault */}
      <Sticker w={132} h={34} d={[410, 206, 1, -6]} m={[150, 392, 0.9, -6]} i={4} inner="sb-key">
        <KeyTag />
      </Sticker>
      <Sticker w={96} h={100} d={[522, 166, 1, 4]} m={[236, 330, 0.86, 4]} i={4}>
        <Safe dialClass="sb-dial" />
      </Sticker>

      {/* 2. Who can open it */}
      <Sticker w={ACCESS_W} h={40} d={[214, 330, 1, -2]} m={[14, 284, 0.9, -2]} i={3}>
        <AccessSwitch />
      </Sticker>

      {/* 5. Bad deploys roll back */}
      <Sticker w={196} h={64} d={[412, 398, 1, 2]} m={[18, 474, 0.9, 2]} i={6}>
        <Versions />
      </Sticker>
      <Sticker w={capW} h={tapeH(1, 13.5)} pad={9} d={[424, 468, 1, -2]} m={[160, 530, 0.95, -2]} i={6}>
        <Tape w={capW} text={capText} size={13.5} />
      </Sticker>
    </Scene>
  );
}

/* Mini stickers for the list beside the picture, one per line, matching the art. */
export function Marker({ kind }: { kind: 'google' | 'people' | 'safe' | 'log' | 'back' }) {
  return (
    <svg viewBox="-3 -3 36 36" className="sb-mk" aria-hidden="true" focusable="false">
      {kind === 'google' && (
        <g>
          <circle cx={15} cy={15} r={16.5} fill="#fff" />
          <circle cx={15} cy={15} r={12.5} fill="#fff" stroke={C.ink} strokeWidth={2} />
          <g transform="translate(7.5 7.5) scale(0.3125)">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
          </g>
        </g>
      )}
      {kind === 'people' && (
        <g>
          <circle cx={15} cy={15} r={16.5} fill="#fff" />
          <circle cx={15} cy={15} r={12.5} fill="#fff" stroke={C.ink} strokeWidth={2} />
          <g stroke={C.ink} strokeWidth={1.5} strokeLinejoin="round">
            <circle cx={18.8} cy={11.2} r={3.2} fill={C.lilac} />
            <path d="M13.2 21.5 C13.2 17 15.6 15.5 18.8 15.5 C22 15.5 24.4 17 24.4 21.5 Z" fill={C.lilac} />
            <circle cx={11.2} cy={12} r={3.2} fill={C.sun} />
            <path d="M5.6 22.2 C5.6 17.8 8 16.3 11.2 16.3 C14.4 16.3 16.8 17.8 16.8 22.2 Z" fill={C.sun} />
          </g>
        </g>
      )}
      {kind === 'safe' && (
        <g>
          <rect x={-1} y={-1} width={32} height={32} rx={9} fill="#fff" />
          <rect x={3} y={3} width={24} height={24} rx={5} fill={C.cobalt} stroke={C.ink} strokeWidth={2} />
          <circle cx={14} cy={15} r={5.5} fill="#E9EDFF" stroke={C.ink} strokeWidth={1.6} />
          <path d="M14 15 V11" stroke={C.ink} strokeWidth={1.6} strokeLinecap="round" />
          <rect x={22} y={11} width={2.6} height={8} rx={1.3} fill="#E9EDFF" stroke={C.ink} strokeWidth={1.1} />
        </g>
      )}
      {kind === 'log' && (
        <g>
          <path d="M3 -1 H27 Q31 -1 31 3 V31 L3 31 Q-1 31 -1 27 V3 Q-1 -1 3 -1 Z" fill="#fff" />
          <path d="M6 3 H24 Q26 3 26 5 V24 L23 27 L20 24 L17 27 L14 24 L11 27 L8 24 L5 27 L4 26 V5 Q4 3 6 3 Z" fill="#fff" stroke={C.ink} strokeWidth={1.8} strokeLinejoin="round" />
          <path d="M8 9.5 H17 M20 9.5 H22 M8 14.5 H16 M20 14.5 H22 M8 19.5 H14" stroke={C.ink} strokeWidth={1.8} strokeLinecap="round" />
        </g>
      )}
      {kind === 'back' && (
        <g>
          <circle cx={15} cy={15} r={16.5} fill="#fff" />
          <circle cx={15} cy={15} r={12.5} fill={C.green} stroke={C.ink} strokeWidth={2} />
          <path d="M20 19.5 C20.5 13 16 10 10.5 11.2" fill="none" stroke={C.ink} strokeWidth={2.2} strokeLinecap="round" />
          <path d="M13 7.5 L9.6 11.2 L13.4 14.4" fill="none" stroke={C.ink} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
        </g>
      )}
    </svg>
  );
}
