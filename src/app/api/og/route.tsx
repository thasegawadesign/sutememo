import { ImageResponse } from 'next/og';

import RawTodoifyIconSvg from '@/components/raw-todoify-icon';
import { PRIMARY_COLOR_CODE, WHITE_COLOR_CODE } from '@/utils/color';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          background: WHITE_COLOR_CODE,
          width: '100%',
          height: '100%',
          textAlign: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <RawTodoifyIconSvg colorCode={PRIMARY_COLOR_CODE} />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
