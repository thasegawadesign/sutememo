import { fillVariants } from '@/utils/colorVariants';

import { primary } from '../../tailwind.config';

type Props = {
  color: string;
};

export default function IconSvg(props: Props) {
  const { color } = props;
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
          <g id="r">
            <rect
              className={fillVariants[color]}
              height="61.31"
              rx="12"
              ry="12"
              style={{ fill: primary, strokeWidth: '0' }}
              transform="translate(-26.26 143.42) rotate(-45)"
              width="245.24"
              x="37.37"
              y="72.76"
            />
          </g>
          <g id="l">
            <rect
              className={fillVariants[color]}
              height="140.67"
              rx="12"
              ry="12"
              style={{ fill: primary, strokeWidth: '0' }}
              transform="translate(-79.81 88.1) rotate(-45)"
              width="61.31"
              x="35.79"
              y="70.05"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}
