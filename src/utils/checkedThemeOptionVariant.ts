import { SafeColorList, ThemeId } from '@/types/ColorList';
import { Mode } from '@/contexts/theme-provider';

export const checkedThemeOptionVariant = (
  mainColor: SafeColorList,
  baseColor: SafeColorList,
  mode: Mode,
) => [mainColor, baseColor, mode, 'theme'].join('-') as ThemeId;
