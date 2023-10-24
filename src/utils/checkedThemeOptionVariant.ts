import { Mode } from '@/contexts/theme-provider';

export const checkedThemeOptionVariant = (
  mainColor: string,
  baseColor: string,
  mode: Mode,
) => [mainColor, baseColor, mode, 'theme'].join('-');
