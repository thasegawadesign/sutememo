'use client';

import { MaterialTailwindTheme } from '@material-tailwind/react';
import defaultTheme from '@material-tailwind/react/theme';
import { ReactNode } from 'react';

const mergedTheme = {
  ...defaultTheme,
  drawer: {
    ...defaultTheme.drawer,
    styles: {
      ...defaultTheme.drawer.styles,
      base: {
        ...defaultTheme.drawer.styles.base,
        overlay: {
          ...defaultTheme.drawer.styles.base.overlay,
          height: 'h-screen',
          backgroundColor: 'bg-black-9',
        },
      },
    },
  },
  switch: {
    ...defaultTheme.switch,
    styles: {
      ...defaultTheme.switch.styles,
      base: {
        ...defaultTheme.switch.styles.base,
        input: {
          ...defaultTheme.switch.styles.base.input,
          background: 'bg-radixGray-9',
        },
        circle: {
          ...defaultTheme.switch.styles.base.circle,
          bg: 'bg-white-9',
        },
      },
      colors: {
        ...defaultTheme.switch.styles.colors,
      },
    },
  },
};

export default function MaterialThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <MaterialTailwindTheme.Provider value={mergedTheme}>
      {children}
    </MaterialTailwindTheme.Provider>
  );
}
