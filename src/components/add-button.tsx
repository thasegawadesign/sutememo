import { forwardRef, useContext } from 'react';
import { IoIosAdd } from 'react-icons/io';
import { Button } from '@/contexts/material-providers';
import { ThemeContext } from '@/contexts/theme-provider';
import { bgVariants, colorVariants } from '@/utils/colorVariants';

type Props = {
  handleAddButtonClick: () => void;
  handleAddButtonMouseUp: () => void;
};

export default forwardRef(function AddButton(props: Props, _ref) {
  const { handleAddButtonClick, handleAddButtonMouseUp } = props;

  const theme = useContext(ThemeContext);
  const { baseColor, mainColor } = theme;

  return (
    <>
      <Button
        onClick={handleAddButtonClick}
        onMouseUp={handleAddButtonMouseUp}
        aria-label="Add"
        role="button"
        tabIndex={0}
        className={`!fixed bottom-5 left-0 right-0 mx-auto w-[calc(100%-40px)] rounded-lg p-2 text-5xl
        text-white !shadow-none transition hover:brightness-95 pwa:bottom-[max(env(safe-area-inset-bottom),20px)] ${bgVariants[mainColor]} ${colorVariants[baseColor]}`}
      >
        <div className="grid place-items-center">
          <IoIosAdd />
        </div>
      </Button>
    </>
  );
});
