'use client';

import { MaterialTailwindTheme } from '@material-tailwind/react';
import defaultTheme from '@material-tailwind/react/theme';
import { ReactNode } from 'react';

const customThemeOverrides = {
  drawer: {
    styles: {
      base: {
        overlay: {
          height: 'h-screen',
          backgroundColor: 'bg-black-9',
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
          bg: 'bg-white-9',
        },
      },
      colors: {},
    },
  },
};

function mergeTheme(
  base: Record<string, unknown>,
  source: Record<string, unknown>,
): Record<string, unknown> {
  const result = { ...base };

  for (const key of Object.keys(source)) {
    const value = source[key];
    const existing = result[key];

    if (
      value &&
      typeof value === 'object' &&
      !Array.isArray(value) &&
      existing &&
      typeof existing === 'object' &&
      !Array.isArray(existing)
    ) {
      result[key] = mergeTheme(
        existing as Record<string, unknown>,
        value as Record<string, unknown>,
      );
    } else {
      result[key] = value;
    }
  }

  return result;
}

const mergedTheme = mergeTheme(
  defaultTheme as Record<string, unknown>,
  customThemeOverrides,
);

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
