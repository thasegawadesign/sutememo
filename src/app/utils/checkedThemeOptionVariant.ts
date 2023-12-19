import { Mode } from '../contexts/theme-provider';

export const checkedThemeOptionVariant = (mainColor: string, mode: Mode) =>
  [mainColor, mode, 'theme'].join('-');
