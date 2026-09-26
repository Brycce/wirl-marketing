import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { ImageResponse } from 'next/og';
import { pinnedShellPath, SHELL_REST_TURNS } from '@/components/swirl';

// The social card, drawn to match the page: the hero headline with the agent
// logos as stickers, and the app on its company link beside it, on a sun disc.

const SHELL = pinnedShellPath(SHELL_REST_TURNS);

const INK = '#1B2420';
const CREAM = '#F7F1E4';
const PAPER = '#FFFDF7';
const WASH = '#F3ECDD';
const SUN = '#FFD23F';
const GREEN = '#2E9D5B';
const EDGE = '#E4D9C3';

// The agent logos (from components/AgentIcons.tsx, LobeHub Icons, MIT), drawn
// flat here because the image renderer cannot take the React fragments there.
const CLAUDE = 'M4.709 15.955l4.72-2.647.08-.23-.08-.128H9.2l-.79-.048-2.698-.073-2.339-.097-2.266-.122-.571-.121L0 11.784l.055-.352.48-.321.686.06 1.52.103 2.278.158 1.652.097 2.449.255h.389l.055-.157-.134-.098-.103-.097-2.358-1.596-2.552-1.688-1.336-.972-.724-.491-.364-.462-.158-1.008.656-.722.881.06.225.061.893.686 1.908 1.476 2.491 1.833.365.304.145-.103.019-.073-.164-.274-1.355-2.446-1.446-2.49-.644-1.032-.17-.619a2.97 2.97 0 01-.104-.729L6.283.134 6.696 0l.996.134.42.364.62 1.414 1.002 2.229 1.555 3.03.456.898.243.832.091.255h.158V9.01l.128-1.706.237-2.095.23-2.695.08-.76.376-.91.747-.492.584.28.48.685-.067.444-.286 1.851-.559 2.903-.364 1.942h.212l.243-.242.985-1.306 1.652-2.064.73-.82.85-.904.547-.431h1.033l.76 1.129-.34 1.166-1.064 1.347-.881 1.142-1.264 1.7-.79 1.36.073.11.188-.02 2.856-.606 1.543-.28 1.841-.315.833.388.091.395-.328.807-1.969.486-2.309.462-3.439.813-.042.03.049.061 1.549.146.662.036h1.622l3.02.225.79.522.474.638-.079.485-1.215.62-1.64-.389-3.829-.91-1.312-.329h-.182v.11l1.093 1.068 2.006 1.81 2.509 2.33.127.578-.322.455-.34-.049-2.205-1.657-.851-.747-1.926-1.62h-.128v.17l.444.649 2.345 3.521.122 1.08-.17.353-.608.213-.668-.122-1.374-1.925-1.415-2.167-1.143-1.943-.14.08-.674 7.254-.316.37-.729.28-.607-.461-.322-.747.322-1.476.389-1.924.315-1.53.286-1.9.17-.632-.012-.042-.14.018-1.434 1.967-2.18 2.945-1.726 1.845-.414.164-.717-.37.067-.662.401-.589 2.388-3.036 1.44-1.882.93-1.086-.006-.158h-.055L4.132 18.56l-1.13.146-.487-.456.061-.746.231-.243 1.908-1.312-.006.006z';
const CODEX = 'M8.086.457a6.105 6.105 0 013.046-.415c1.333.153 2.521.72 3.564 1.7a.117.117 0 00.107.029c1.408-.346 2.762-.224 4.061.366l.063.03.154.076c1.357.703 2.33 1.77 2.918 3.198.278.679.418 1.388.421 2.126a5.655 5.655 0 01-.18 1.631.167.167 0 00.04.155 5.982 5.982 0 011.578 2.891c.385 1.901-.01 3.615-1.183 5.14l-.182.22a6.063 6.063 0 01-2.934 1.851.162.162 0 00-.108.102c-.255.736-.511 1.364-.987 1.992-1.199 1.582-2.962 2.462-4.948 2.451-1.583-.008-2.986-.587-4.21-1.736a.145.145 0 00-.14-.032c-.518.167-1.04.191-1.604.185a5.924 5.924 0 01-2.595-.622 6.058 6.058 0 01-2.146-1.781c-.203-.269-.404-.522-.551-.821a7.74 7.74 0 01-.495-1.283 6.11 6.11 0 01-.017-3.064.166.166 0 00.008-.074.115.115 0 00-.037-.064 5.958 5.958 0 01-1.38-2.202 5.196 5.196 0 01-.333-1.589 6.915 6.915 0 01.188-2.132c.45-1.484 1.309-2.648 2.577-3.493.282-.188.55-.334.802-.438.286-.12.573-.22.861-.304a.129.129 0 00.087-.087A6.016 6.016 0 015.635 2.31C6.315 1.464 7.132.846 8.086.457zm-.804 7.85a.848.848 0 00-1.473.842l1.694 2.965-1.688 2.848a.849.849 0 001.46.864l1.94-3.272a.849.849 0 00.007-.854l-1.94-3.393zm5.446 6.24a.849.849 0 000 1.695h4.848a.849.849 0 000-1.696h-4.848z';
const CURSOR = 'M22.106 5.68L12.5.135a.998.998 0 00-.998 0L1.893 5.68a.84.84 0 00-.419.726v11.186c0 .3.16.577.42.727l9.607 5.547a.999.999 0 00.998 0l9.608-5.547a.84.84 0 00.42-.727V6.407a.84.84 0 00-.42-.726zm-.603 1.176L12.228 22.92c-.063.108-.228.064-.228-.061V12.34a.59.59 0 00-.295-.51l-9.11-5.26c-.107-.062-.063-.228.062-.228h18.55c.264 0 .428.286.296.514z';
const LOGOS: { id: string; tilt: number; art: React.ReactNode }[] = [
  { id: 'claude', tilt: -5, art: <path d={CLAUDE} fill="#D97757" /> },
  {
    id: 'codex', tilt: 4,
    art: (
      <g>
        <defs>
          <linearGradient id="og-codex" gradientUnits="userSpaceOnUse" x1="12" x2="12" y1="0" y2="24">
            <stop stopColor="#B1A7FF" />
            <stop offset=".5" stopColor="#7A9DFF" />
            <stop offset="1" stopColor="#3941FF" />
          </linearGradient>
        </defs>
        <path d={CODEX} fill="url(#og-codex)" fillRule="evenodd" clipRule="evenodd" />
      </g>
    ),
  },
  { id: 'cursor', tilt: -2, art: <path d={CURSOR} fill={INK} fillRule="evenodd" /> },
];

export const dynamic = 'force-static';
export const alt = 'Wirl. Build internal tools with Claude Code, Codex or Cursor, and deploy them behind your company login.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// The fonts live in the repo so the build never depends on Google being up.
// This route is rendered once at build time, so reading from the source tree is fine.
const fontFile = (name: string) => readFile(path.join(process.cwd(), 'src/app/fonts', name));

function Sticker({ children, tilt }: { children: React.ReactNode; tilt: number }) {
  return (
    <div
      style={{
        width: 56, height: 56, borderRadius: 999, background: '#FFFCF5',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 3px 8px rgba(27,36,32,0.28)', transform: `rotate(${tilt}deg)`, marginLeft: 8,
      }}
    >
      {children}
    </div>
  );
}

function Lock({ size = 18, color = GREEN }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path d="M7.5 10.5V8a4.5 4.5 0 0 1 9 0v2.5" fill="none" stroke={color} strokeWidth="2.6" strokeLinecap="round" />
      <rect x="5" y="10" width="14" height="11" rx="3" fill={color} />
    </svg>
  );
}

function Row({ name, amount, paid }: { name: string; amount: string; paid?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', background: WASH, borderRadius: 12, padding: '10px 14px', marginTop: 10 }}>
      <div style={{ fontSize: 21, fontWeight: 700, flexGrow: 1 }}>{name}</div>
      <div style={{ fontSize: 21, fontWeight: 700, marginRight: 14 }}>{amount}</div>
      <div
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', width: 84, height: 32, borderRadius: 999,
          border: `3px solid ${INK}`, background: paid ? GREEN : SUN, color: paid ? PAPER : INK, fontSize: 17, fontWeight: 700,
        }}
      >
        {paid ? 'Paid' : 'Due'}
      </div>
    </div>
  );
}

export default async function Image() {
  const [bold, regular] = await Promise.all([fontFile('Inter-700.ttf'), fontFile('Inter-500.ttf')]);
  const line = { display: 'flex', alignItems: 'center' } as const;

  return new ImageResponse(
    (
      <div style={{ background: CREAM, width: '100%', height: '100%', display: 'flex', position: 'relative', fontFamily: 'Inter', color: INK }}>
        {/* The sun, behind the app */}
        <div style={{ position: 'absolute', right: -40, top: 60, width: 520, height: 520, borderRadius: 999, background: SUN }} />

        {/* Left: the mark and the headline */}
        <div style={{ display: 'flex', flexDirection: 'column', padding: '56px 0 0 72px', width: 720 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <svg viewBox="0 0 48 36" width="64" height="48">
              <g fill="none" stroke={INK} strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
                <path d={SHELL} />
                <path d="M34.17 29.31 C 27 31.8, 15 33.2, 9 30.2 C 4.6 28, 4.2 23.4, 8.2 22.2" />
                <path d="M8.6 22.4 L5.6 15.2" />
                <path d="M9.6 22.4 L10.6 14.6" />
              </g>
              <circle cx="5.4" cy="14.6" r="2.1" fill={INK} />
              <circle cx="10.8" cy="14" r="2.1" fill={INK} />
            </svg>
            <div style={{ fontSize: 44, fontWeight: 700, letterSpacing: -1.8, lineHeight: 1 }}>wirl</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', marginTop: 64, fontSize: 62, fontWeight: 700, letterSpacing: -2.7, lineHeight: 1.08 }}>
            <div style={line}>Build internal tools</div>
            <div style={line}>
              with
              <div style={{ display: 'flex', marginLeft: 10 }}>
                {LOGOS.map((m) => (
                  <Sticker key={m.id} tilt={m.tilt}>
                    <svg width="32" height="32" viewBox="0 0 24 24">{m.art}</svg>
                  </Sticker>
                ))}
                <Sticker tilt={4}>
                  <svg width="28" height="28" viewBox="0 0 24 24">
                    <path d="M12 5v14M5 12h14" fill="none" stroke={INK} strokeOpacity="0.45" strokeWidth="2.8" strokeLinecap="round" />
                  </svg>
                </Sticker>
              </div>
            </div>
            <div style={line}>Deploy them behind</div>
            <div style={line}>your company login.</div>
          </div>
        </div>

        {/* Right: the app, open at its company link */}
        <div
          style={{
            position: 'absolute', right: 56, top: 158, width: 392, display: 'flex', flexDirection: 'column',
            background: PAPER, border: `4px solid ${INK}`, borderRadius: 20, boxShadow: `0 10px 0 ${EDGE}, 0 10px 0 4px ${INK}`,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', background: GREEN, borderBottom: `4px solid ${INK}`, borderRadius: '15px 15px 0 0', padding: '12px 16px' }}>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{ width: 13, height: 13, borderRadius: 99, background: PAPER, border: `2.5px solid ${INK}`, marginRight: 7 }} />
            ))}
            <div style={{ color: PAPER, fontSize: 21, fontWeight: 700, marginLeft: 8 }}>supplier-payments</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', padding: '16px 18px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', background: WASH, border: `3px solid ${INK}`, borderRadius: 999, padding: '7px 12px' }}>
              <Lock size={16} />
              <div style={{ fontSize: 16, fontWeight: 500, marginLeft: 7, whiteSpace: 'nowrap' }}>acme--supplier-payments.wirl.run</div>
            </div>
            <Row name="Northwind" amount="$4,200" paid />
            <Row name="Kelp & Co" amount="$1,180" />
          </div>
        </div>

        {/* The company-only sticker on the app's corner */}
        <div
          style={{
            position: 'absolute', right: 20, top: 404, width: 128, height: 128, borderRadius: 999, background: '#FFFCF5',
            display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'rotate(-8deg)', boxShadow: '0 4px 10px rgba(27,36,32,0.3)',
          }}
        >
          <div
            style={{
              width: 112, height: 112, borderRadius: 999, background: GREEN, border: `3px solid ${INK}`,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: PAPER,
            }}
          >
            <Lock size={24} color={PAPER} />
            <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: 0.5, marginTop: 4 }}>COMPANY</div>
            <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: 0.5 }}>ONLY</div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Inter', data: bold, weight: 700, style: 'normal' },
        { name: 'Inter', data: regular, weight: 500, style: 'normal' },
      ],
    }
  );
}
