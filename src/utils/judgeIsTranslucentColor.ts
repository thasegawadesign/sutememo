import { SafeColorList } from '@/types/ColorList';

export const judgeIsTranslucentColor = (colorName: SafeColorList) => {
  const step = colorName.split('-')[1];
  return step.includes('a');
};
