import { radixColorList } from '@/utils/radixColorList';
import { safeColorList } from '/tailwind.config';

type RadixColorList = (typeof radixColorList)[number];
type RadixScaleSolid = `${RadixColorList}-${number}`;
type RadixScaleAlpha = `${RadixColorList}-a${number}`;
export type RadixScale = RadixScaleSolid | RadixScaleAlpha;
export type RadixScaleTailwind = `${TailwindPrefix}${RadixScale}`;
export type SafeTailwind = `${TailwindPrefix}${SafeColorList}`;

export type ColorList =
  | 'primary'
  | 'black'
  | 'white'
  | 'tigersYellow'
  | 'tigersBlack'
  | RadixScale;
export type SafeColorList = (typeof safeColorList)[number];

export type ColorScaleList = {
  [key in ColorList]: unknown;
};

export type TailwindPrefix =
  | 'bg-'
  | 'hover:bg-'
  | 'text-'
  | 'border-'
  | 'ring-'
  | '!fill-';

export type ThemeId = `${SafeColorList}-${SafeColorList}-${Mode}-theme`;
