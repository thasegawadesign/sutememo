import { ColorList, CustomColorList } from '@/types/ColorList';
import { customColorList } from '@/utils/color';

export const judgeIsCustomThemeColor = (colorType: ColorList) => {
  return customColorList.includes(colorType as CustomColorList);
};
