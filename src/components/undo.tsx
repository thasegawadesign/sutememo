import { useContext } from 'react';
import { Button } from '@/contexts/material-providers';
import { ThemeContext } from '@/contexts/theme-provider';
import { bgVariants, colorVariants } from '@/utils/colorVariants';
import { GoReply } from 'react-icons/go';
import clsx from 'clsx';

type Props = {
  canUndo: boolean;
  handleUndoClick: () => void;
};

export default function Undo(props: Props) {
  const { canUndo, handleUndoClick } = props;

  const theme = useContext(ThemeContext);
  const { baseColor, mainColor, mode } = theme;

  return (
    <>
      <Button
        tabIndex={0}
        aria-label="Undo"
        role="button"
        color="white"
        className={clsx(
          `!fixed bottom-[max(calc(env(safe-area-inset-bottom)+64px),84px)] left-[16px] rounded-full p-5 text-xl !shadow-none xs:p-7 xs:text-xl ${bgVariants[baseColor]} ${colorVariants[mainColor]}`,
          {
            'hover:brightness-95 active:brightness-90':
              canUndo && mode === 'light',
            'hover:brightness-125 active:brightness-150':
              canUndo && mode === 'dark',
            'opacity-30': canUndo === false,
          },
        )}
        ripple={canUndo}
        disabled={!canUndo}
        onClick={handleUndoClick}
      >
        <GoReply />
      </Button>
    </>
  );
}
