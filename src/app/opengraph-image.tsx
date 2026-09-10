import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Wirl. The tools your agents build, wirled into one place.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const interBlack = await fetch(
    'https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuBWYMZg.ttf'
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          background: '#FBFBF9',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 60px',
          position: 'relative',
        }}
      >
        {/* Domain top right */}
        <div
          style={{
            position: 'absolute',
            top: 40,
            right: 50,
            fontSize: 36,
            fontWeight: 900,
            color: '#18181b',
          }}
        >
          wirl.dev
        </div>

        {/* Logo */}
        <img
          src="https://wirl.dev/logo.png"
          width={120}
          height={120}
          style={{ marginBottom: 28 }}
        />

        {/* Tagline */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 900,
            color: '#18181b',
            textAlign: 'center',
            lineHeight: 1.1,
          }}
        >
          The tools your agents build,
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 900,
            color: '#18181b',
            textAlign: 'center',
            lineHeight: 1.1,
          }}
        >
          wirled into one place.
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 36,
            fontWeight: 700,
            color: '#2B38F5',
            marginTop: 24,
          }}
        >
          Behind your login. With roles and an audit log.
        </div>

        {/* Pills */}
        <div
          style={{
            display: 'flex',
            gap: 20,
            marginTop: 40,
          }}
        >
          {['Login on every app', 'Roles set once', 'Audit log'].map((text) => (
            <div
              key={text}
              style={{
                background: '#EEEEE9',
                padding: '18px 36px',
                borderRadius: 100,
                fontSize: 28,
                color: '#161616',
                fontWeight: 700,
              }}
            >
              {text}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Inter',
          data: interBlack,
          weight: 900,
          style: 'normal',
        },
      ],
    }
  );
}
