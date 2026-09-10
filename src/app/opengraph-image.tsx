import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Wirl. Let your people build.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const MARK = ["..........KKKK..........", ".........KK..KK.........", ".KK......KK..KK......KK.", ".KK......KK..KK......KK.", ".KK.......KKKK.......KK.", ".KK......KKKKKK......KK.", ".KK.....KKK..KKK.....KK.", ".KK....KKK....KKK....KK.", ".KK...KKK......KKK...KK.", ".KK..KKK........KKK..KK.", ".KKKKKK..........KKKKKK.", "..KKKK............KKKK.."];

function Mark({ px }: { px: number }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {MARK.map((row, y) => (
        <div key={y} style={{ display: 'flex' }}>
          {[...row].map((ch, x) => (
            <div key={x} style={{ width: px, height: px, background: ch === 'K' ? '#1F2A1F' : 'transparent' }} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default async function Image() {
  const pixelify = await fetch(
    'https://fonts.gstatic.com/s/pixelifysans/v3/CHy2V-3HFUT7aC4iv1TxGDR9DHEserHN25py2TQO131Y.ttf'
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          background: '#F6F1DF',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
          fontFamily: 'Pixelify',
          color: '#1F2A1F',
          border: '12px solid #1F2A1F',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 22, marginBottom: 40 }}>
          <Mark px={7} />
          <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1 }}>wirl</div>
        </div>
        <div style={{ fontSize: 88, lineHeight: 1, textAlign: 'center', fontWeight: 700 }}>Let your people build.</div>
        <div style={{ fontSize: 34, color: '#6E6A58', marginTop: 28, textAlign: 'center' }}>
          A secure place for the internal tools your team makes. Governance built in.
        </div>
        <div style={{ display: 'flex', gap: 16, marginTop: 48 }}>
          {['anyone can ship', 'login on every wirl', 'team permissions', 'audit log'].map((text) => (
            <div key={text} style={{ background: '#FBF7E9', border: '4px solid #1F2A1F', boxShadow: '6px 6px 0 #8BAC0F', padding: '10px 22px', fontSize: 28 }}>
              {text}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: 'Pixelify', data: pixelify, weight: 700, style: 'normal' }] }
  );
}
