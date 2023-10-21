'use client';

import React from 'react';
import { ThemeProvider as MaterialThemeProvider } from './context/material-providers';

export function Providers({ children }: { children: React.ReactNode }) {
  return <MaterialThemeProvider>{children}</MaterialThemeProvider>;
}
