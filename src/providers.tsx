'use server';

import { cookies } from 'next/headers';
import React from 'react';

import IsDarkModeSelectProvider from '@/contexts/is-dark-mode-select-provider';
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
          backgroundColor: 'bg-black-12',
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
          bg: 'bg-white-12',
        },
      },
      colors: {},
    },
  },
};

export async function Providers({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const baseColor = cookieStore.get('baseColor')?.value;
  const mainColor = cookieStore.get('mainColor')?.value;
  const mode = cookieStore.get('mode')?.value;
  const isDarkModeSelect = cookieStore.get('isDarkModeSelect')?.value;
  const isSystemModeSelect = cookieStore.get('isSystemModeSelect')?.value;

  return (
    <IsSystemModeSelectProvider isChecked={isSystemModeSelect}>
      <IsDarkModeSelectProvider isChecked={isDarkModeSelect}>
        <ThemeProvider baseColor={baseColor} mainColor={mainColor} mode={mode}>
          <ShowAppInstallButtonProvider>
            <MaterialThemeProvider value={CustomTheme}>
              {children}
            </MaterialThemeProvider>
          </ShowAppInstallButtonProvider>
        </ThemeProvider>
      </IsDarkModeSelectProvider>
    </IsSystemModeSelectProvider>
  );
}
