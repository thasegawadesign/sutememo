import type {
  ColorScaleList,
  RadixScale,
  RadixScaleTailwind,
  TailwindPrefix,
} from '@/types/ColorList';
import { radixColorList } from '@/utils/radixColorList';

export const bgVariants: {
  [key: string]: string;
} = {
  primary: 'bg-primary',
  black: 'bg-black',
  white: 'bg-white',
  tigersYellow: 'bg-tigersYellow',
  tigersBlack: 'bg-tigersBlack',
  ...generateRadixMappingObj('bg-'),
} satisfies ColorScaleList;

export const bgHoverVariants: {
  [key: string]: string;
} = {
  primary: 'hover:bg-primary',
  black: 'hover-bg:black',
  white: 'hover-bg:white',
  tigersYellow: 'hover:bg-tigersYellow',
  tigersBlack: 'hover:bg-tigersBlack',
  ...generateRadixMappingObj('hover:bg-'),
} satisfies ColorScaleList;

export const colorVariants: {
  [key: string]: string;
} = {
  primary: 'text-primary',
  black: 'text-black',
  white: 'text-white',
  tigersYellow: 'text-tigersYellow',
  tigersBlack: 'text-tigersBlack',
  ...generateRadixMappingObj('text-'),
} satisfies ColorScaleList;

export const borderVariants: {
  [key: string]: string;
} = {
  primary: 'border-primary',
  black: 'border-black',
  white: 'border-white',
  tigersYellow: 'border-tigersYellow',
  tigersBlack: 'border-tigersBlack',
  ...generateRadixMappingObj('border-'),
} satisfies ColorScaleList;

export const ringVariants: {
  [key: string]: string;
} = {
  primary: 'ring-primary',
  black: 'ring-black',
  white: 'ring-white',
  tigersYellow: 'ring-tigersYellow',
  tigersBlack: 'ring-tigersBlack',
  ...generateRadixMappingObj('ring-'),
} satisfies ColorScaleList;

export const fillVariants: {
  [key: string]: string;
} = {
  primary: '!fill-primary',
  black: '!fill-black',
  white: '!fill-white',
  tigersYellow: '!fill-tigersYellow',
  tigersBlack: '!fill-tigersBlack',
  ...generateRadixMappingObj('!fill-'),
} satisfies ColorScaleList;

function generateRadixMappingObj(tailwindPrefix: TailwindPrefix) {
  const radixArr: [RadixScale, RadixScaleTailwind][] = [];
  radixColorList.map((radixColor, i) => {
    [...Array(12)].map((_, i) => {
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
