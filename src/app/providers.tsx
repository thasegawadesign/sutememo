'use client';

import React from 'react';
import { ThemeProvider as MaterialThemeProvider } from './context/material-providers';
import ThemeProvider from './context/theme-color-context';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <MaterialThemeProvider>{children}</MaterialThemeProvider>
    </ThemeProvider>
  );
}
