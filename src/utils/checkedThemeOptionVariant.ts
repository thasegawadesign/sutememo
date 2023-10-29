import { Mode } from '@/contexts/theme-provider';
import { SafeColorList, ThemeId } from '@/types/ColorList';

export const checkedThemeOptionVariant = (
  mainColor: SafeColorList,
  baseColor: SafeColorList,
  mode: Mode,
) => [mainColor, baseColor, mode, 'theme'].join('-') as ThemeId;
