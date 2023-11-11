import { Mode } from '@/contexts/theme-provider';
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

export const updateMetaThemeColor = (themeColor: SafeColorList, mode: Mode) => {
  const metaDarkTheme = document.head.querySelector(
    '[media="(prefers-color-scheme: dark)"]',
  ) as HTMLMetaElement;
  const metaLightTheme = document.head.querySelector(
    '[media="(prefers-color-scheme: light)"]',
  ) as HTMLMetaElement;

  let resultColorCode = '';

  const colorType = getColorType(themeColor);
  const colorStep = getColorStep(themeColor);
  const isCustomThemeColor = judgeIsCustomThemeColor(colorType);

  if (isCustomThemeColor) {
    switch (colorType as CustomColorList) {
      case 'white':
        resultColorCode = WHITE_COLOR_CODE;
        updateMetaTheme(mode, metaDarkTheme, metaLightTheme, resultColorCode);
        return;
      case 'black':
        resultColorCode = BLACK_COLOR_CODE;
        updateMetaTheme(mode, metaDarkTheme, metaLightTheme, resultColorCode);
        return;
      case 'midnight':
        resultColorCode = MIDNIGHT_COLOR_CODE;
        updateMetaTheme(mode, metaDarkTheme, metaLightTheme, resultColorCode);
        return;
      case 'primary':
        resultColorCode = PRIMARY_COLOR_CODE;
        updateMetaTheme(mode, metaDarkTheme, metaLightTheme, resultColorCode);
        return;
      case 'tigersBlack':
        resultColorCode = TIGERSBLACK_COLOR_CODE;
        updateMetaTheme(mode, metaDarkTheme, metaLightTheme, resultColorCode);
        return;
      case 'tigersYellow':
        resultColorCode = TIGERSYELLOW_COLOR_CODE;
        updateMetaTheme(mode, metaDarkTheme, metaLightTheme, resultColorCode);
        return;
    }
  } else {
    const radixColorType = getRadixColorType(colorType as RadixColorList);
    resultColorCode = getComputedStyle(
      document.documentElement,
    ).getPropertyValue(`--${radixColorType}-${colorStep}`);
    updateMetaTheme(mode, metaDarkTheme, metaLightTheme, resultColorCode);
    return;
  }
};

function updateMetaTheme(
  mode: Mode,
  metaDarkTheme: HTMLMetaElement,
  metaLightTheme: HTMLMetaElement,
  resultColorCode: string,
) {
  switch (mode) {
    case 'dark':
      updateMetaDarkTheme(metaDarkTheme, resultColorCode);
      return;
    case 'light':
      updateMetaLightTheme(metaLightTheme, resultColorCode);
      return;
  }
}

function updateMetaDarkTheme(
  metaDarkTheme: HTMLMetaElement,
  resultColorCode: string,
) {
  metaDarkTheme.content = resultColorCode;
  metaDarkTheme.media = '(prefers-color-scheme: dark)';
  return;
}

function updateMetaLightTheme(
  metaLightTheme: HTMLMetaElement,
  resultColorCode: string,
) {
  metaLightTheme.content = resultColorCode;
  metaLightTheme.media = '(prefers-color-scheme: light)';
  return;
}
