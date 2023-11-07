import { ImageResponse } from 'next/og';

import RawIconSvg from '@/components/raw-icon-svg';

import { primary, white } from '../../../../tailwind.config';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          background: white,
          width: '100%',
          height: '100%',
          textAlign: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <RawIconSvg colorCode={primary} />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
