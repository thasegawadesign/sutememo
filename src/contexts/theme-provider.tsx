'use client';

import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from 'react';

import { SafeColorList } from '@/types/ColorList';

export type Mode = 'light' | 'dark';
export interface ThemeType {
  baseColor: SafeColorList;
  mainColor: SafeColorList;
  mode: Mode;
}

interface ThemeContextType extends ThemeType {
  setTheme: Dispatch<SetStateAction<ThemeType>>;
}

const defaultBaseColor: SafeColorList = 'radixGray-1';
const defaultMainColor: SafeColorList = 'radixGray-12';
const defaultMode: Mode = 'dark';

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
      baseColor: localStorage.getItem('baseColor')
        ? (localStorage.getItem('baseColor') as SafeColorList)
        : defaultBaseColor,
      mainColor: localStorage.getItem('mainColor')
        ? (localStorage.getItem('mainColor') as SafeColorList)
        : defaultMainColor,
      mode: localStorage.getItem('mode')
        ? (localStorage.getItem('mode') as Mode)
        : defaultMode,
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
