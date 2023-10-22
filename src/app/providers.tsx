'use client';

import React from 'react';
import { ThemeProvider as MaterialThemeProvider } from './contexts/material-providers';
import ThemeProvider from './contexts/theme-provider';
import ShowAppInstallButtonProvider from './contexts/show-app-install-button-provider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <MaterialThemeProvider>
        <ShowAppInstallButtonProvider>{children}</ShowAppInstallButtonProvider>
      </MaterialThemeProvider>
    </ThemeProvider>
  );
}
