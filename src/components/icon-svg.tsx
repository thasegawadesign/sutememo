import { CustomColorList, SafeColorList } from '@/types/ColorList';
import { customColorList } from '@/utils/customColorList';

import {
  black,
  primary,
  tigersBlack,
  tigersYellow,
  white,
} from '../../tailwind.config';

type Props = {
  color: SafeColorList;
};

export default function IconSvg(props: Props) {
  const { color } = props;
  const colorType = color.split('-')[0];
  let isCustomThemeColor: boolean;
  let radixColorType: string;
  let radixColorStep: number;
  let resultColor;
  isCustomThemeColor = customColorList.includes(colorType as CustomColorList);
  if (isCustomThemeColor) {
    switch (colorType as CustomColorList) {
      case 'white':
        resultColor = white;
        break;
      case 'black':
        resultColor = black;
        break;
      case 'primary':
        resultColor = primary;
        break;
      case 'tigersBlack':
        resultColor = tigersBlack;
        break;
      case 'tigersYellow':
        resultColor = tigersYellow;
        break;
    }
  } else {
    radixColorType = colorType.split('radix')[1].toLowerCase();
    radixColorStep = Number(color.split('-')[1]);
    resultColor = getComputedStyle(document.documentElement).getPropertyValue(
      `--${radixColorType}-${radixColorStep}`,
    );
  }

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
              height="140.67"
              rx="12"
              ry="12"
              style={{ fill: resultColor, strokeWidth: '0' }}
              transform="translate(-79.81 88.1) rotate(-45)"
              width="61.31"
              x="35.79"
              y="70.05"
            />
          </g>
          <g id="r">
            <rect
              height="61.31"
              rx="12"
              ry="12"
              style={{ fill: resultColor, strokeWidth: '0' }}
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
