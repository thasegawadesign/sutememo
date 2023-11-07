import clsx from 'clsx';
import { useContext } from 'react';

import { ThemeContext } from '@/contexts/theme-provider';
import { bgVariants } from '@/utils/colorVariants';

export default function FullScreenSolidBackgound() {
  const { baseColor } = useContext(ThemeContext);

  return (
    <div
      className={clsx(
        `min-h-[100svh] w-full pwa:min-h-screen ${bgVariants[baseColor]}`,
      )}
    />
  );
}
