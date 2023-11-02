'use client';

import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from 'react';

import { Mode } from '@/contexts/theme-provider';

type SystemColorScheme = {
  prefersColorScheme: Mode;
};

interface SystemColorSchemeContext extends SystemColorScheme {
  setPrefersColorScheme: Dispatch<SetStateAction<Mode>>;
}

export const defaultMode: Mode = 'dark';

export const SystemColorSchemeContext = createContext<SystemColorSchemeContext>(
  {
    prefersColorScheme: defaultMode,
    setPrefersColorScheme: () => {},
  },
);

export default function SystemColorSchemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [prefersColorScheme, setPrefersColorScheme] =
    useState<Mode>(defaultMode);

  useEffect(() => {
    if (!globalThis.window) return;
    setPrefersColorScheme(
      matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
    );
  }, []);

  return (
    <SystemColorSchemeContext.Provider
      value={{
        prefersColorScheme,
        setPrefersColorScheme,
      }}
    >
      {children}
    </SystemColorSchemeContext.Provider>
  );
}
