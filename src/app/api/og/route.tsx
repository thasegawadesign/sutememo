import IconSvg from '@/app/components/IconSvg';
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
        <IconSvg />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
