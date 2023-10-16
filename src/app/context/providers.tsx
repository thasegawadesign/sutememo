'use client';

import { ThemeProvider } from '@material-tailwind/react';
import { ReactNode } from 'react';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      <ThemeProvider>{children}</ThemeProvider>
    </>
  );
}
