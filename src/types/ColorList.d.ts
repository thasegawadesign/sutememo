import { radixColorList } from '@/utils/radixColorList';

export type RadixColorList = (typeof radixColorList)[number];
type RadixScaleSolid = `${RadixColorList}-${number}`;
type RadixScaleAlpha = `${RadixColorList}-a${number}`;
export type RadixScale = RadixScaleSolid | RadixScaleAlpha;
export type RadixScaleTailwind = `${TailwindPrefix}${RadixScale}`;

export type ColorList =
  | 'primary'
  | 'black'
  | 'white'
  | 'tigersYellow'
  | 'tigersBlack'
  | RadixScale;

export type ColorScaleList = {
  [key in
    | 'primary'
    | 'black'
    | 'white'
    | 'tigersYellow'
    | 'tigersBlack'
    | RadixScale]: unknown;
};

export type TailwindPrefix =
  | 'bg-'
  | 'hover:bg-'
  | 'text-'
  | 'border-'
  | 'ring-'
  | '!fill-';

export type SafeList = {
  [key: string]: ColorList;
};
