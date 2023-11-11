import { COLOR_STEP } from '@/utils/color';
import { customColorList, radixColorList } from '@/utils/color';

import type {
  CustomScale,
  CustomScaleAlpha,
  CustomScaleTailwind,
  RadixScale,
  RadixScaleAlpha,
  RadixScaleTailwind,
  TailwindPrefix,
} from '@/types/ColorList';
import type { COLOR_STEP as COLOR_STEP_TYPE } from '@/types/ColorStep';

export const bgVariants: {
  [key: string]: string;
} = {
  ...generateCustomMappingObj('bg-'),
  ...generateRadixMappingObj('bg-'),
};

export const colorVariants: {
  [key: string]: string;
} = {
  ...generateCustomMappingObj('text-'),
  ...generateRadixMappingObj('text-'),
};

export const borderVariants: {
  [key: string]: string;
} = {
  ...generateCustomMappingObj('border-'),
  ...generateRadixMappingObj('border-'),
};

export const ringVariants: {
  [key: string]: string;
} = {
  ...generateCustomMappingObj('ring-'),
  ...generateRadixMappingObj('ring-'),
};

function generateRadixMappingObj(tailwindPrefix: TailwindPrefix) {
  const radixArr: [RadixScale, RadixScaleTailwind][] = [];
  radixColorList.map((radixColor) => {
    [...Array(COLOR_STEP)].map((_, i) => {
      const id: COLOR_STEP_TYPE = (i + 1) as COLOR_STEP_TYPE;
      const key: RadixScale = `${radixColor}-${id}`;
      const value: RadixScaleTailwind = `${tailwindPrefix}${key}`;
      const alphaKey: RadixScaleAlpha = `${radixColor}-a${id}`;
      const alphaValue: RadixScaleTailwind = `${tailwindPrefix}${alphaKey}`;
      radixArr.push([key, value]);
      radixArr.push([alphaKey, alphaValue]);
    });
  });
  return Object.fromEntries(radixArr);
}

function generateCustomMappingObj(tailwindPrefix: TailwindPrefix) {
  const customArr: [CustomScale, CustomScaleTailwind][] = [];
  customColorList.map((customColor) => {
    [...Array(COLOR_STEP)].map((_, i) => {
      const step: COLOR_STEP_TYPE = (i + 1) as COLOR_STEP_TYPE;
      const key: CustomScale = `${customColor}-${step}`;
      const value: CustomScaleTailwind = `${tailwindPrefix}${key}`;
      const alphaKey: CustomScaleAlpha = `${customColor}-a${step}`;
      const alphaValue: CustomScaleTailwind = `${tailwindPrefix}${alphaKey}`;
      customArr.push([key, value]);
      customArr.push([alphaKey, alphaValue]);
    });
  });
  return Object.fromEntries(customArr);
}
