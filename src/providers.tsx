'use client';

import React from 'react';

import { ThemeProvider as MaterialThemeProvider } from '@/contexts/material-providers';
import ShowAppInstallButtonProvider from '@/contexts/show-app-install-button-provider';
import ThemeProvider from '@/contexts/theme-provider';

import type { DrawerStylesType } from '@/contexts/material-providers';

type CustomTheme = {
  drawer: DrawerStylesType;
};

const CustomTheme: CustomTheme = {
  drawer: {
    styles: {
      base: {
        overlay: {
          height: 'h-screen',
        },
      },
    },
  },
};

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <MaterialThemeProvider value={CustomTheme}>
        <ShowAppInstallButtonProvider>{children}</ShowAppInstallButtonProvider>
      </MaterialThemeProvider>
    </ThemeProvider>
  );
}
