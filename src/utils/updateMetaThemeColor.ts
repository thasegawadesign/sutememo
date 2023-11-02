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
  const metaThemeColor = document.head.querySelector(
    '[name="theme-color"]',
  ) as HTMLMetaElement;
  let isCustomThemeColor: boolean;
  let radixColorType: string;
  let radixColorStep: number;
  const colorType = themeColor.split('-')[0];
  let result;
  isCustomThemeColor = customColorList.includes(colorType as CustomColorList);

  if (isCustomThemeColor) {
    switch (colorType as CustomColorList) {
      case 'white':
        result = white;
        metaThemeColor.content = result;
        metaThemeColor.media = `(prefers-color-scheme: ${mode})`;
        return;
      case 'black':
        result = black;
        metaThemeColor.content = result;
        metaThemeColor.media = `(prefers-color-scheme: ${mode})`;
        return;
      case 'primary':
        result = primary;
        metaThemeColor.content = result;
        metaThemeColor.media = `(prefers-color-scheme: ${mode})`;
        return;
      case 'tigersBlack':
        result = tigersBlack;
        metaThemeColor.content = result;
        metaThemeColor.media = `(prefers-color-scheme: ${mode})`;
        return;
      case 'tigersYellow':
        result = tigersYellow;
        metaThemeColor.content = result;
        metaThemeColor.media = `(prefers-color-scheme: ${mode})`;
        return;
    }
  } else {
    radixColorType = colorType.split('radix')[1].toLowerCase();
    radixColorStep = Number(themeColor.split('-')[1]);
    result = getComputedStyle(document.documentElement).getPropertyValue(
      `--${radixColorType}-${radixColorStep}`,
    );
    metaThemeColor.content = result;
    metaThemeColor.media = `(prefers-color-scheme: ${mode})`;
  }
};
