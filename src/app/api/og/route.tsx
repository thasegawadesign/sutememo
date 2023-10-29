import { ImageResponse } from 'next/server';

import IconSvg from '@/components/icon-svg';

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
        <IconSvg color="primary" />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
