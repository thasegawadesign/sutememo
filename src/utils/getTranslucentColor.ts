import {
  CustomScaleAlpha,
  RadixColorList,
  RadixScaleAlpha,
  SafeColorList,
} from '@/types/ColorList';
import { COLOR_STEP } from '@/types/ColorStep';

type ResultColor = RadixScaleAlpha | CustomScaleAlpha;

export const getTranslucentColor = (
  colorName: SafeColorList,
  opacity: COLOR_STEP,
) => {
  const colorType = colorName.split('-')[0] as RadixColorList;
  const resultColor: ResultColor = `${colorType}-a${opacity}`;
  return resultColor;
};
