import { fillVariants } from '../utils/colorVariants';

type Props = {
  color: string;
};

export default function IconSvg(props: Props) {
  const { color } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={263.41}
      height={206.83}
      viewBox="0 0 263.41 206.83"
      style={{ maxWidth: '100%', maxHeight: '100%' }}
    >
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
              className={fillVariants[color]}
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
              className={fillVariants[color]}
            />
          </g>
        </g>
      </g>
    </svg>
  );
}
