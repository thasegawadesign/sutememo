import { Mode } from '@/contexts/theme-provider';
import { CustomColorList, SafeColorList } from '@/types/ColorList';
import { customColorList } from '@/utils/customColorList';

import {
  black,
  primary,
  tigersBlack,
  tigersYellow,
  white,
} from '../../tailwind.config';

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
        result = white;
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
        result = black;
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
        result = primary;
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
        result = tigersBlack;
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
        result = tigersYellow;
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
