import { customColorList } from '@/utils/customColorList';
import { radixColorList } from '@/utils/radixColorList';

import { CUSTOM_COLOR_STEP, RADIX_COLOR_STEP } from '../../tailwind.config';

import type {
  CustomScale,
  CustomScaleTailwind,
  RadixScale,
  RadixScaleTailwind,
  TailwindPrefix,
} from '@/types/ColorList';

export const bgVariants: {
  [key: string]: string;
} = {
  white: 'bg-white',
  black: 'bg-black',
  ...generateCustomMappingObj('bg-'),
  ...generateRadixMappingObj('bg-'),
};

export const colorVariants: {
  [key: string]: string;
} = {
  white: 'text-white',
  black: 'text-black',
  ...generateCustomMappingObj('text-'),
  ...generateRadixMappingObj('text-'),
};

export const borderVariants: {
  [key: string]: string;
} = {
  white: 'border-white',
  black: 'border-black',
  ...generateCustomMappingObj('border-'),
  ...generateRadixMappingObj('border-'),
};

export const ringVariants: {
  [key: string]: string;
} = {
  white: 'ring-white',
  black: 'ring-black',
  ...generateCustomMappingObj('ring-'),
  ...generateRadixMappingObj('ring-'),
};

export const fillVariants: {
  [key: string]: string;
} = {
  white: '!fill-white',
  black: '!fill-black',
  ...generateCustomMappingObj('!fill-'),
  ...generateRadixMappingObj('!fill-'),
};

function generateRadixMappingObj(tailwindPrefix: TailwindPrefix) {
  const radixArr: [RadixScale, RadixScaleTailwind][] = [];
  radixColorList.map((radixColor, i) => {
    [...Array(RADIX_COLOR_STEP)].map((_, i) => {
      const id = i + 1;
      const key: RadixScale =
        radixColor === 'radixBlack' || radixColor === 'radixWhite'
          ? `${radixColor}-a${id}`
          : `${radixColor}-${id}`;
      const value: RadixScaleTailwind = `${tailwindPrefix}${key}`;
      radixArr.push([key, value]);
    });
  });
  return Object.fromEntries(radixArr);
}

function generateCustomMappingObj(tailwindPrefix: TailwindPrefix) {
  const customArr: [CustomScale, CustomScaleTailwind][] = [];
  customColorList.map((customColor, i) => {
    [...Array(CUSTOM_COLOR_STEP)].map((_, i) => {
      const id = i + 1;
      const key: CustomScale = `${customColor}-a${id}`;
      const value: CustomScaleTailwind = `${tailwindPrefix}${key}`;
      customArr.push([key, value]);
    });
  });
  return Object.fromEntries(customArr);
}
