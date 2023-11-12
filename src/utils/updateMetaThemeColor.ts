import {
  CustomColorList,
  RadixColorList,
  SafeColorList,
} from '@/types/ColorList';
import {
  BLACK_COLOR_CODE,
  MIDNIGHT_COLOR_CODE,
  PRIMARY_COLOR_CODE,
  TIGERSBLACK_COLOR_CODE,
  TIGERSYELLOW_COLOR_CODE,
  WHITE_COLOR_CODE,
} from '@/utils/color';
import { getColorStep } from '@/utils/getColorStep';
import { getColorType, getRadixColorType } from '@/utils/getColorType';
import { judgeIsCustomThemeColor } from '@/utils/judgeIsCustomThemeColor';

export const updateMetaThemeColor = (colorName: SafeColorList) => {
  const metaThemeColorElement = document.head.querySelector(
    '[name="theme-color"]',
  ) as HTMLMetaElement;

  let resultColorCode = '';

  const colorType = getColorType(colorName);
  const colorStep = getColorStep(colorName);
  const isCustomThemeColor = judgeIsCustomThemeColor(colorType);

  if (isCustomThemeColor) {
    switch (colorType as CustomColorList) {
      case 'white':
        resultColorCode = WHITE_COLOR_CODE;
        updateMetaThemeColorContent(metaThemeColorElement, resultColorCode);
        return;
      case 'black':
        resultColorCode = BLACK_COLOR_CODE;
        updateMetaThemeColorContent(metaThemeColorElement, resultColorCode);
        return;
      case 'midnight':
        resultColorCode = MIDNIGHT_COLOR_CODE;
        updateMetaThemeColorContent(metaThemeColorElement, resultColorCode);
        return;
      case 'primary':
        resultColorCode = PRIMARY_COLOR_CODE;
        updateMetaThemeColorContent(metaThemeColorElement, resultColorCode);
        return;
      case 'tigersBlack':
        resultColorCode = TIGERSBLACK_COLOR_CODE;
        updateMetaThemeColorContent(metaThemeColorElement, resultColorCode);
        return;
      case 'tigersYellow':
        resultColorCode = TIGERSYELLOW_COLOR_CODE;
        updateMetaThemeColorContent(metaThemeColorElement, resultColorCode);
        return;
    }
  } else {
    const radixColorType = getRadixColorType(colorType as RadixColorList);
    resultColorCode = getComputedStyle(
      document.documentElement,
    ).getPropertyValue(`--${radixColorType}-${colorStep}`);
    updateMetaThemeColorContent(metaThemeColorElement, resultColorCode);
    return;
  }
};

function updateMetaThemeColorContent(
  metaThemeColorElement: HTMLMetaElement,
  resultColorCode: string,
) {
  metaThemeColorElement.content = resultColorCode;
}
