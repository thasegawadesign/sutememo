import { ColorList, RadixColorList, SafeColorList } from '@/types/ColorList';

export const getColorType = (colorName: SafeColorList) => {
  return colorName.split('-')[0] as ColorList;
};

export const getRadixColorType = (colorType: RadixColorList) => {
  return colorType.split('radix')[1].toLowerCase();
};
