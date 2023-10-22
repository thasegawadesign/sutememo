'use client';

import React from 'react';
import { ThemeProvider as MaterialThemeProvider } from './contexts/material-providers';
import ThemeProvider from './contexts/theme-provider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <MaterialThemeProvider>{children}</MaterialThemeProvider>
    </ThemeProvider>
  );
}
