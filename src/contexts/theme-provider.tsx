'use client';

import { Dispatch, SetStateAction, createContext, useState } from 'react';

export type Mode = 'light' | 'dark';
export interface ThemeType {
  baseColor: string;
  mainColor: string;
  mode: Mode;
}

interface ThemeContextType extends ThemeType {
  setTheme: Dispatch<SetStateAction<ThemeType>>;
}

export const ThemeContext = createContext<ThemeContextType>({
  baseColor: '',
  mainColor: '',
  mode: 'light',
  setTheme: () => {},
});

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<ThemeType>({
    baseColor: 'white',
    mainColor: 'primary',
    mode: 'light',
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
