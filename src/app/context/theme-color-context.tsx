import { createContext } from 'react';

export type Mode = 'light' | 'dark';
export type Theme = {
  baseColor: string;
  mainColor: string;
  mode: Mode;
};

export const ThemeContext = createContext<Theme>({
  baseColor: '',
  mainColor: '',
  mode: 'light',
});
