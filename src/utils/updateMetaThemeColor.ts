import { Mode } from '@/contexts/theme-provider';
import { CustomColorList, SafeColorList } from '@/types/ColorList';
import {
  BLACK_COLOR_CODE,
  customColorList,
  PRIMARY_COLOR_CODE,
  TIGERSBLACK_COLOR_CODE,
  TIGERSYELLOW_COLOR_CODE,
  WHITE_COLOR_CODE,
} from '@/utils/color';

export const updateMetaThemeColor = (themeColor: SafeColorList, mode: Mode) => {
  const metaDarkTheme = document.head.querySelector(
    '[media="(prefers-color-scheme: dark)"]',
  ) as HTMLMetaElement;
  const metaLightTheme = document.head.querySelector(
    '[media="(prefers-color-scheme: light)"]',
  ) as HTMLMetaElement;

  let result;

  let isCustomThemeColor: boolean;
  let radixColorType: string;
  let radixColorStep: number;

  const colorType = themeColor.split('-')[0];
  isCustomThemeColor = customColorList.includes(colorType as CustomColorList);

  if (isCustomThemeColor) {
    switch (colorType as CustomColorList) {
      case 'white':
        result = WHITE_COLOR_CODE;
        if (mode === 'dark') {
          metaDarkTheme.content = result;
          metaDarkTheme.media = '(prefers-color-scheme: dark)';
          return;
        }
        if (mode === 'light') {
          metaLightTheme.content = result;
          metaLightTheme.media = '(prefers-color-scheme: light)';
          return;
        }
        break;
      case 'black':
        result = BLACK_COLOR_CODE;
        if (mode === 'dark') {
          metaDarkTheme.content = result;
          metaDarkTheme.media = '(prefers-color-scheme: dark)';
          return;
        }
        if (mode === 'light') {
          metaLightTheme.content = result;
          metaLightTheme.media = '(prefers-color-scheme: light)';
          return;
        }
        break;
      case 'primary':
        result = PRIMARY_COLOR_CODE;
        if (mode === 'dark') {
          metaDarkTheme.content = result;
          metaDarkTheme.media = '(prefers-color-scheme: dark)';
          return;
        }
        if (mode === 'light') {
          metaLightTheme.content = result;
          metaLightTheme.media = '(prefers-color-scheme: light)';
          return;
        }
        break;
      case 'tigersBlack':
        result = TIGERSBLACK_COLOR_CODE;
        if (mode === 'dark') {
          metaDarkTheme.content = result;
          metaDarkTheme.media = '(prefers-color-scheme: dark)';
          return;
        }
        if (mode === 'light') {
          metaLightTheme.content = result;
          metaLightTheme.media = '(prefers-color-scheme: light)';
          return;
        }
        break;
      case 'tigersYellow':
        result = TIGERSYELLOW_COLOR_CODE;
        if (mode === 'dark') {
          metaDarkTheme.content = result;
          metaDarkTheme.media = '(prefers-color-scheme: dark)';
          return;
        }
        if (mode === 'light') {
          metaLightTheme.content = result;
          metaLightTheme.media = '(prefers-color-scheme: light)';
          return;
        }
        break;
    }
  } else {
    radixColorType = colorType.split('radix')[1].toLowerCase();
    radixColorStep = Number(themeColor.split('-')[1]);
    result = getComputedStyle(document.documentElement).getPropertyValue(
      `--${radixColorType}-${radixColorStep}`,
    );
    if (mode === 'dark') {
      metaDarkTheme.content = result;
      metaDarkTheme.media = '(prefers-color-scheme: dark)';
      return;
    }
    if (mode === 'light') {
      metaLightTheme.content = result;
      metaLightTheme.media = '(prefers-color-scheme: light)';
      return;
    }
  }
};
