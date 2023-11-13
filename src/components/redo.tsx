import clsx from 'clsx';
import { useContext } from 'react';
import { GoReply } from 'react-icons/go';

import { Button } from '@/contexts/material-providers';
import { ThemeContext } from '@/contexts/theme-provider';
import { bgVariants, colorVariants } from '@/utils/colorVariants';

type Props = {
  canRedo: boolean;
  handleRedoClick: () => void;
};

export default function Redo(props: Props) {
  const { canRedo, handleRedoClick } = props;

  const theme = useContext(ThemeContext);
  const { baseColor, mainColor, mode } = theme;

  return (
    <>
      <Button
        aria-label="Redo"
        color="white"
        disabled={!canRedo}
        ripple={canRedo}
        role="button"
        tabIndex={0}
        className={clsx(
          `!fixed bottom-[max(calc(env(safe-area-inset-bottom)+64px),84px)] right-[16px] -scale-x-100 rounded-full p-5 text-xl !shadow-none xs:p-7 xs:text-xl ${bgVariants[`${baseColor}`]} ${colorVariants[`${mainColor}`]}`,
          {
            'hover:brightness-95 active:brightness-90':
              canRedo && mode === 'light',
            'hover:brightness-125 active:brightness-150':
              canRedo && mode === 'dark',
            'opacity-30': canRedo === false,
            'hover:bg-radixGray-1': canRedo && baseColor === 'tigersBlack-9',
          },
        )}
        onClick={handleRedoClick}
      >
        <GoReply />
      </Button>
    </>
  );
}
