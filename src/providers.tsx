'use client';

import React from 'react';

import IsSystemModeSelectProvider from '@/contexts/is-system-mode-select-provider';
import { ThemeProvider as MaterialThemeProvider } from '@/contexts/material-providers';
import ShowAppInstallButtonProvider from '@/contexts/show-app-install-button-provider';
import ThemeProvider from '@/contexts/theme-provider';

import type {
  DrawerStylesType,
  SwitchButtonStylesType,
} from '@/contexts/material-providers';

type CustomTheme = {
  drawer: DrawerStylesType;
  switch: SwitchButtonStylesType;
};

const CustomTheme: CustomTheme = {
  drawer: {
    styles: {
      base: {
        overlay: {
          height: 'h-screen',
          backgroundColor: 'bg-black-a6',
        },
      },
    },
  },
  switch: {
    styles: {
      base: {
        input: {
          background: 'bg-radixGray-9',
        },
        circle: {
          bg: 'bg-white-a10',
        },
      },
      colors: {},
    },
  },
};

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <IsSystemModeSelectProvider>
      <ThemeProvider>
        <MaterialThemeProvider value={CustomTheme}>
          <ShowAppInstallButtonProvider>
            {children}
          </ShowAppInstallButtonProvider>
        </MaterialThemeProvider>
      </ThemeProvider>
    </IsSystemModeSelectProvider>
  );
}
