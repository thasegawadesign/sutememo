import { SafeColorList } from '@/types/ColorList';
import { COLOR_STEP } from '@/types/ColorStep';
import { judgeIsTranslucentColor } from '@/utils/judgeIsTranslucentColor';

export const getColorStep = (colorName: SafeColorList) => {
  let step;
  if (judgeIsTranslucentColor(colorName)) {
    step = Number(colorName.split('-')[1].split('a')[1]);
  } else {
    step = Number(colorName.split('-')[1]);
  }
  return step as COLOR_STEP;
};
