import { Mode } from '@/contexts/theme-provider';
import { ColorList, ThemeId } from '@/types/ColorList';

export const checkedThemeOptionVariant = (
  mainColor: ColorList,
  baseColor: ColorList,
  mode: Mode,
) => [mainColor, baseColor, mode, 'theme'].join('-') as ThemeId;
