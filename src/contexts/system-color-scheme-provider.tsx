'use client';

import { Dispatch, SetStateAction, createContext, useState } from 'react';

import { Mode } from '@/contexts/theme-provider';

type SystemColorScheme = {
  prefersColorScheme: Mode;
};

interface SystemColorSchemeContext extends SystemColorScheme {
  setPrefersColorScheme: Dispatch<SetStateAction<Mode>>;
}

export const SystemColorSchemeContext = createContext<SystemColorSchemeContext>(
  {
    prefersColorScheme: 'light',
    setPrefersColorScheme: () => {},
  },
);

export default function SystemColorSchemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [prefersColorScheme, setPrefersColorScheme] = useState<Mode>('light');

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
