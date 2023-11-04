import { ImageResponse } from 'next/og';

import IconSvg from '@/components/icon-svg';

import { customGray } from '../../../../tailwind.config';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          background: customGray,
          width: '100%',
          height: '100%',
          textAlign: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <IconSvg color="white-12" />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
