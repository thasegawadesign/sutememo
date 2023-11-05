import clsx from 'clsx';

import { Mode } from '@/contexts/theme-provider';

type Props = {
  mode: Mode;
};

export default function FullScreenSolidBackgound(props: Props) {
  const { mode } = props;

  return (
    <div
      className={clsx('min-h-[100svh] w-full pwa:min-h-screen', {
        'bg-customGray-9': mode === 'dark',
        'bg-white-12': mode === 'light',
      })}
    />
  );
}
