import clsx from 'clsx';
import { forwardRef, useContext } from 'react';
import { GoPlus } from 'react-icons/go';

import { Button } from '@/contexts/material-providers';
import { ThemeContext } from '@/contexts/theme-provider';
import { bgVariants, colorVariants } from '@/utils/colorVariants';

type Props = {
  handleAddButtonClick: () => void;
  handleAddButtonMouseUp: () => void;
};

export default forwardRef(function AddButton(props: Props, _ref) {
  const { handleAddButtonClick, handleAddButtonMouseUp } = props;

  const { baseColor, mainColor, mode } = useContext(ThemeContext);

  return (
    <>
      <Button
        aria-label="Add"
        role="button"
        tabIndex={0}
        className={clsx(
          `text-white !fixed bottom-5 left-0 right-0 mx-auto w-[calc(100%-40px)] rounded-lg p-2.5 text-3xl !shadow-none transition pwa:bottom-[max(env(safe-area-inset-bottom),20px)] ${bgVariants[`${mainColor}`]} ${colorVariants[`${baseColor}`]}`,
          {
            'hover:brightness-110 active:brightness-125': mode === 'light',
            'hover:brightness-95 active:brightness-90': mode === 'dark',
          },
        )}
        onClick={handleAddButtonClick}
        onMouseUp={handleAddButtonMouseUp}
      >
        <div className="grid place-items-center">
          <GoPlus />
        </div>
      </Button>
    </>
  );
});
