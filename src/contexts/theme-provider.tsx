'use client';

import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from 'react';

import { SafeColorList } from '@/types/ColorList';

import { safeColorList } from '../../tailwind.config';

export type Mode = 'light' | 'dark';
export interface ThemeType {
  baseColor: SafeColorList;
  mainColor: SafeColorList;
  mode: Mode;
}

interface ThemeContextType extends ThemeType {
  setTheme: Dispatch<SetStateAction<ThemeType>>;
}

export const defaultBaseColor: SafeColorList = 'radixGray-2';

export const defaultMainColor: SafeColorList = 'primary-a10';

export const defaultMode: Mode = 'dark';

export const ThemeContext = createContext<ThemeContextType>({
  baseColor: defaultBaseColor,
  mainColor: defaultMainColor,
  mode: defaultMode,
  setTheme: () => {},
});

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<ThemeType>({
    baseColor: defaultBaseColor,
    mainColor: defaultMainColor,
    mode: defaultMode,
  });

  useEffect(() => {
    if (!globalThis.window) return;
    setTheme({
      baseColor: safeColorList.includes(
        localStorage.getItem('baseColor') as SafeColorList,
      )
        ? (localStorage.getItem('baseColor') as SafeColorList)
        : defaultBaseColor,
      mainColor: safeColorList.includes(
        localStorage.getItem('mainColor') as SafeColorList,
      )
        ? (localStorage.getItem('mainColor') as SafeColorList)
        : defaultMainColor,
      mode: localStorage.getItem('mode')
        ? (localStorage.getItem('mode') as Mode)
        : matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light',
    });
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        baseColor: theme.baseColor,
        mainColor: theme.mainColor,
        mode: theme.mode,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
