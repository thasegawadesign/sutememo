import { RadixColorList } from '@/types/ColorList';

export const getRadixColorStep = (colorType: RadixColorList) => {
  return Number(colorType.split('-')[1]);
};
