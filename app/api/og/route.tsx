import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name') ?? 'Project';
  const description = searchParams.get('description') ?? '';
  const tags = (searchParams.get('tags') ?? '').split(',').filter(Boolean);

  return new ImageResponse(
    (
      <div
        style={{
          background: '#091413',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Watermark */}
        <div
          style={{
            position: 'absolute',
            bottom: -60,
            right: -40,
            fontSize: 280,
            fontWeight: 900,
            color: 'rgba(255,255,255,0.02)',
            letterSpacing: '-0.05em',
            lineHeight: 1,
            textTransform: 'uppercase',
          }}
        >
          WORK
        </div>

        {/* Top Label */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <div
            style={{
              width: 40,
              height: 1,
              background: 'rgba(255,255,255,0.3)',
            }}
          />
          <span
            style={{
              fontFamily: 'monospace',
              fontSize: 11,
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.4)',
            }}
          >
            OLAYEYE MUIDEEN — FEATURED WORK
          </span>
        </div>

        {/* Center Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <h1
            style={{
              fontSize: 108,
              fontWeight: 300,
              letterSpacing: '-0.04em',
              lineHeight: 0.85,
              textTransform: 'uppercase',
              color: '#F3F4F4',
              margin: 0,
            }}
          >
            {name}
          </h1>
          <p
            style={{
              fontSize: 22,
              color: 'rgba(243,244,244,0.5)',
              fontWeight: 300,
              fontStyle: 'italic',
              maxWidth: 700,
              lineHeight: 1.5,
              margin: 0,
            }}
          >
            {description}
          </p>
        </div>

        {/* Bottom Row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          {/* Tags */}
          <div style={{ display: 'flex', gap: 12 }}>
            {tags.slice(0, 3).map((tag) => (
              <div
                key={tag}
                style={{
                  padding: '8px 20px',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '100px',
                  fontFamily: 'monospace',
                  fontSize: 11,
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.5)',
                }}
              >
                {tag}
              </div>
            ))}
          </div>
          {/* Domain */}
          <span
            style={{
              fontFamily: 'monospace',
              fontSize: 12,
              letterSpacing: '0.3em',
              color: 'rgba(255,255,255,0.2)',
              textTransform: 'uppercase',
            }}
          >
            2026
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
