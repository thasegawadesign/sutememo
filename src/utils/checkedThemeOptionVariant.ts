import { ColorList, ThemeId } from '@/types/ColorList';
import { Mode } from '@/contexts/theme-provider';

export const checkedThemeOptionVariant = (
  mainColor: ColorList,
  baseColor: ColorList,
  mode: Mode,
) => [mainColor, baseColor, mode, 'theme'].join('-') as ThemeId;
