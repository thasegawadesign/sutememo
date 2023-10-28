import { useContext } from 'react';
import { Button } from '@/contexts/material-providers';
import { ThemeContext } from '@/contexts/theme-provider';
import { bgVariants, colorVariants } from '@/utils/colorVariants';
import { ImUndo } from 'react-icons/im';
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
          `!fixed bottom-[max(calc(env(safe-area-inset-bottom)+72px),94px)] left-[22px] rounded-full p-[26px] text-lg !shadow-none xs:p-7 xs:text-xl ${bgVariants[baseColor]} ${colorVariants[mainColor]}`,
          {
            'hover:brightness-[102%]': canUndo === true,
            'hover:bg-gray-900/10': canUndo && mode === 'light',
            'hover:bg-gray-900': canUndo && mode === 'dark',
            'opacity-30': canUndo === false,
          },
        )}
        ripple={canUndo}
        disabled={!canUndo}
        onClick={handleUndoClick}
      >
        <ImUndo />
      </Button>
    </>
  );
}
