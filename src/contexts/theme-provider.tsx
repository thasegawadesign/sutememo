'use client';

import { Dispatch, SetStateAction, createContext, useState } from 'react';

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

export const defaultBaseColor: SafeColorList = 'radixGray-1';
const defaultMainColor: SafeColorList = 'radixGray-12';
export const defaultMode: Mode = 'dark';

export const ThemeContext = createContext<ThemeContextType>({
  baseColor: defaultBaseColor,
  mainColor: defaultMainColor,
  mode: defaultMode,
  setTheme: () => {},
});

type Props = {
  children: React.ReactNode;
  baseColor: string | undefined;
  mainColor: string | undefined;
  mode: string | undefined;
};

export default function ThemeProvider(props: Props) {
  const { children, baseColor, mainColor, mode } = props;

  const [theme, setTheme] = useState<ThemeType>({
    baseColor: (baseColor as SafeColorList) ?? defaultBaseColor,
    mainColor: (mainColor as SafeColorList) ?? defaultMainColor,
    mode: (mode as Mode) ?? defaultMode,
  });

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
