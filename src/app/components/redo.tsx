import { ImRedo } from 'react-icons/im';
import { Button } from '../contexts/material-providers';
import { useContext } from 'react';
import { ThemeContext } from '../contexts/theme-provider';
import { bgVariants, colorVariants } from '../utils/colorVariants';

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
        tabIndex={0}
        aria-label="Undo"
        role="button"
        color="white"
        className={`!fixed bottom-[max(calc(env(safe-area-inset-bottom)+72px),94px)] right-[22px] rounded-full p-[26px] text-lg !shadow-none xs:p-7 xs:text-xl ${
          canRedo
            ? `${`${bgVariants[baseColor]} ${
                colorVariants[mainColor]
              } hover:brightness-[102%] ${
                mode === 'light' ? 'hover:bg-gray-900/10' : 'hover:bg-gray-900'
              }`}`
            : `${`${bgVariants[baseColor]} ${colorVariants[mainColor]} opacity-30`}`
        }`}
        ripple={canRedo}
        disabled={!canRedo}
        onClick={handleRedoClick}
      >
        <ImRedo />
      </Button>
    </>
  );
}
