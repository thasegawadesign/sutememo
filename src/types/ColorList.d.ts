import { customColorList } from '@/utils/customColorList';
import { radixColorList } from '@/utils/radixColorList';

import { safeColorList } from '../../tailwind.config';

type RadixColorList = (typeof radixColorList)[number];
type RadixScaleOpaque = `${RadixColorList}-${number}`;
type RadixScaleAlpha = `${RadixColorList}-a${number}`;
export type RadixScale = RadixScaleOpaque | RadixScaleAlpha;
export type RadixScaleTailwind = `${TailwindPrefix}${RadixScale}`;

type CustomColorList = (typeof customColorList)[number];
export type CustomScale = `${CustomColorList}-a${number}`;
export type CustomScaleTailwind = `${TailwindPrefix}${CustomScale}`;

export type ColorList = CustomColorList | RadixScale;
export type SafeColorList = (typeof safeColorList)[number];
export type SafeTailwind = `${TailwindPrefix}${SafeColorList}`;

export type ColorScaleList = {
  [key in SafeColorList]: unknown;
};

export type TailwindPrefix =
  | 'bg-'
  | 'hover:bg-'
  | 'text-'
  | 'border-'
  | 'ring-'
  | '!fill-';

export type ThemeId = `${SafeColorList}-${SafeColorList}-${Mode}-theme`;
