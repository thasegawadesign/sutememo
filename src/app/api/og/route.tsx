import { ImageResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          background: 'white',
          width: '100%',
          height: '100%',
          textAlign: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 263.41 206.83">
          <g id="layer">
            <g id="group">
              <g id="r">
                <rect
                  x="37.37"
                  y="72.76"
                  width="245.24"
                  height="61.31"
                  rx="12"
                  ry="12"
                  style={{ fill: '#208cd8', strokeWidth: '0' }}
                  transform="translate(-26.26 143.42) rotate(-45)"
                />
              </g>
              <g id="l">
                <rect
                  x="35.79"
                  y="70.05"
                  width="61.31"
                  height="140.67"
                  rx="12"
                  ry="12"
                  style={{ fill: '#208cd8', strokeWidth: '0' }}
                  transform="translate(-79.81 88.1) rotate(-45)"
                />
              </g>
            </g>
          </g>
        </svg>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
