import { customColorList } from '@/utils/customColorList';
import { radixColorList } from '@/utils/radixColorList';

import { CUSTOM_COLOR_STEP, RADIX_COLOR_STEP } from '../../tailwind.config';

import type {
  CustomScale,
  CustomScaleTailwind,
  RadixScale,
  RadixScaleAlpha,
  RadixScaleTailwind,
  TailwindPrefix,
} from '@/types/ColorList';

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
    [...Array(RADIX_COLOR_STEP)].map((_, i) => {
      const id = i + 1;
      const key: RadixScale = `${radixColor}-${id}`;
      const alphaKey: RadixScaleAlpha = `${radixColor}-a${id}`;
      const value: RadixScaleTailwind = `${tailwindPrefix}${key}`;
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
    [...Array(CUSTOM_COLOR_STEP)].map((_, i) => {
      const id = i + 1;
      const key: CustomScale = `${customColor}-a${id}`;
      const value: CustomScaleTailwind = `${tailwindPrefix}${key}`;
      customArr.push([key, value]);
    });
  });
  return Object.fromEntries(customArr);
}
