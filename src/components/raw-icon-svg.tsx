import { SafeColorList } from '@/types/ColorList';
import { colorVariants } from '@/utils/colorVariants';

import { primary } from '../../tailwind.config';

type Props = {
  color: SafeColorList;
  realColor?: string;
};

export default function RawIconSvg(props: Props) {
  const { color, realColor = primary } = props;

  return (
    <svg
      height={206.83}
      style={{ maxWidth: '100%', maxHeight: '100%' }}
      viewBox="0 0 263.41 206.83"
      width={263.41}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="layer">
        <g id="group">
          <g id="l">
            <rect
              className={`fill-current ${colorVariants[color]}`}
              height="140.67"
              rx="12"
              ry="12"
              style={{ fill: realColor, strokeWidth: '0' }}
              transform="translate(-79.81 88.1) rotate(-45)"
              width="61.31"
              x="35.79"
              y="70.05"
            />
          </g>
          <g id="r">
            <rect
              className={`fill-current ${colorVariants[color]}`}
              height="61.31"
              rx="12"
              ry="12"
              style={{ fill: realColor, strokeWidth: '0' }}
              transform="translate(-26.26 143.42) rotate(-45)"
              width="245.24"
              x="37.37"
              y="72.76"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}
