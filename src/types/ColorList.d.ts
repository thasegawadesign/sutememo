import { COLOR_STEP } from '@/types/ColorStep';
import { customColorList } from '@/utils/customColorList';
import { radixColorList } from '@/utils/radixColorList';

import { safeColorList } from '../../tailwind.config';

type RadixColorList = (typeof radixColorList)[number];
type RadixScaleOpaque = `${RadixColorList}-${COLOR_STEP}`;
type RadixScaleAlpha = `${RadixColorList}-a${COLOR_STEP}`;
export type RadixScale = RadixScaleOpaque | RadixScaleAlpha;
export type RadixScaleTailwind = `${TailwindPrefix}${RadixScale}`;

type CustomColorList = (typeof customColorList)[number];
type CustomScaleOpaque = `${CustomColorList}-${COLOR_STEP}`;
type CustomScaleAlpha = `${CustomColorList}-a${COLOR_STEP}`;
export type CustomScale = CustomScaleOpaque | CustomScaleAlpha;
export type CustomScaleTailwind = `${TailwindPrefix}${CustomScale}`;

export type ColorList = CustomColorList | RadixColorList;
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
  | 'ring-';

export type ThemeId = `${SafeColorList}-${SafeColorList}-${Mode}-theme`;
