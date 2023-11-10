import { CustomColorList, SafeColorList } from '@/types/ColorList';
import {
  customColorList,
  BLACK_COLOR_CODE,
  CUSTOMGRAY_COLOR_CODE,
  PRIMARY_COLOR_CODE,
  TIGERSBLACK_COLOR_CODE,
  TIGERSYELLOW_COLOR_CODE,
  WHITE_COLOR_CODE,
} from '@/utils/color';

export const getColorCode = (colorName: SafeColorList) => {
  const colorType = colorName.split('-')[0];
  const isCustomThemeColor = customColorList.includes(
    colorType as CustomColorList,
  );

  let radixColorType: string;
  let radixColorStep: number;

  let resultColor = '';

  if (isCustomThemeColor) {
    switch (colorType as never as CustomColorList) {
      case 'white':
        resultColor = WHITE_COLOR_CODE;
        break;
      case 'black':
        resultColor = BLACK_COLOR_CODE;
        break;
      case 'customGray':
        resultColor = CUSTOMGRAY_COLOR_CODE;
        break;
      case 'primary':
        resultColor = PRIMARY_COLOR_CODE;
        break;
      case 'tigersBlack':
        resultColor = TIGERSBLACK_COLOR_CODE;
        break;
      case 'tigersYellow':
        resultColor = TIGERSYELLOW_COLOR_CODE;
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
