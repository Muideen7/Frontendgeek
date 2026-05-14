import { ImageResponse } from '@vercel/og';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export const dynamic = 'force-dynamic';

const fallbackTemplate = (name: string) => (
  <div
    style={{
      background: '#091413',
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'sans-serif',
    }}
  >
    <h1
      style={{
        fontSize: 120,
        fontWeight: 900,
        letterSpacing: '-0.04em',
        textTransform: 'uppercase',
        color: '#F3F4F4',
        margin: 0,
        textAlign: 'center',
      }}
    >
      {name}
    </h1>
  </div>
);

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const rawName = searchParams.get('name') ?? 'Project';
  const rawDescription = searchParams.get('description') ?? '';
  const rawTags = searchParams.get('tags') ?? '';

  const sanitize = (str: string) => str.replace(/[<>&"']/g, '');
  
  const name = sanitize(rawName).slice(0, 100);
  const description = sanitize(rawDescription).slice(0, 500);
  const tags = sanitize(rawTags).split(',').filter(Boolean).slice(0, 5);

  let imageResponse;

  try {
    imageResponse = new ImageResponse(
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

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}
          >
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
  } catch {
    imageResponse = new ImageResponse(fallbackTemplate(name), {
      width: 1200,
      height: 630,
    });
  }

  const response = new NextResponse(imageResponse);
  response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
  response.headers.set('Pragma', 'no-cache');
  response.headers.set('Expires', '0');
  
  return response;
}