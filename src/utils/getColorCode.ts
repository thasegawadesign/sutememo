import { CustomColorList, SafeColorList } from '@/types/ColorList';
import { customColorList } from '@/utils/customColorList';

import {
  black,
  customGray,
  primary,
  tigersBlack,
  tigersYellow,
  white,
} from '../../tailwind.config';

export const getColorCode = (colorName: SafeColorList) => {
  const colorType = colorName.split('-')[0];
  const isCustomThemeColor = customColorList.includes(
    colorType as CustomColorList,
  );

  let radixColorType: string;
  let radixColorStep: number;

  let resultColor: string;

  if (isCustomThemeColor) {
    switch (colorType as never as CustomColorList) {
      case 'white':
        resultColor = white;
        break;
      case 'black':
        resultColor = black;
        break;
      case 'customGray':
        resultColor = customGray;
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
    radixColorStep = Number(colorName.split('-')[1]);
    resultColor = getComputedStyle(document.documentElement).getPropertyValue(
      `--${radixColorType}-${radixColorStep}`,
    );
  }

  return resultColor;
};
