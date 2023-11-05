import {
  CustomScaleAlpha,
  RadixScaleAlpha,
  SafeColorList,
} from '@/types/ColorList';
import { COLOR_STEP } from '@/types/ColorStep';
import { customColorList } from '@/utils/customColorList';

import { defaultTranslucentColor } from '../../tailwind.config';

export const getTranslucentColor = (colorName: SafeColorList) => {
  let resultColor: RadixScaleAlpha | CustomScaleAlpha = defaultTranslucentColor;

  let isCustomBaseColor: boolean;
  let colorStep: COLOR_STEP;

  const colorType = colorName.split('-')[0];

  for (const customColor of customColorList) {
    isCustomBaseColor = colorType === customColor;
    if (isCustomBaseColor) {
      resultColor = `${colorType}-a${6}` as CustomScaleAlpha;
    } else {
      colorStep = Number(colorName.split('-')[1]) as never;
      if (colorStep < 3) {
        resultColor = `${colorType}-a${colorStep}` as RadixScaleAlpha;
      } else if (colorStep < 6) {
        resultColor = `${colorType}-a${colorStep - 2}` as RadixScaleAlpha;
      } else if (colorStep < 10) {
        resultColor = `${colorType}-a${colorStep - 3}` as RadixScaleAlpha;
      } else {
        resultColor = `${colorType}-a${colorStep - 6}` as RadixScaleAlpha;
      }
    }
  }

  return resultColor;
};
