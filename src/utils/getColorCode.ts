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
import { getColorType } from '@/utils/getColorType';
import { judgeIsCustomThemeColor } from '@/utils/judgeIsCustomThemeColor';

export const getColorCode = (colorName: SafeColorList) => {
  const colorType = getColorType(colorName);
  const isCustomThemeColor = judgeIsCustomThemeColor(colorType);

  let resultColorCode = '';

  if (isCustomThemeColor) {
    switch (colorType as never as CustomColorList) {
      case 'white':
        resultColorCode = WHITE_COLOR_CODE;
        break;
      case 'black':
        resultColorCode = BLACK_COLOR_CODE;
        break;
      case 'customGray':
        resultColorCode = CUSTOMGRAY_COLOR_CODE;
        break;
      case 'primary':
        resultColorCode = PRIMARY_COLOR_CODE;
        break;
      case 'tigersBlack':
        resultColorCode = TIGERSBLACK_COLOR_CODE;
        break;
      case 'tigersYellow':
        resultColorCode = TIGERSYELLOW_COLOR_CODE;
        break;
    }
  } else {
    const radixColorType = colorType.split('radix')[1].toLowerCase();
    const radixColorStep = Number(colorName.split('-')[1]);
    resultColorCode = getComputedStyle(
      document.documentElement,
    ).getPropertyValue(`--${radixColorType}-${radixColorStep}`);
  }

  return resultColorCode;
};
