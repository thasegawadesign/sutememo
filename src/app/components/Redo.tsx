import { ImRedo } from 'react-icons/im';
import { Button } from '@material-tailwind/react';

type Props = {
  canRedo: boolean;
  handleRedoClick: () => void;
};

export default function Redo(props: Props) {
  const { canRedo, handleRedoClick } = props;

  return (
    <>
      <Button
        tabIndex={0}
        aria-label="Undo"
        role="button"
        color="white"
        variant="text"
        className={`xs:text-xl xs:p-7 !fixed bottom-[max(calc(env(safe-area-inset-bottom)+72px),94px)] right-[22px] rounded-full p-[26px] text-lg ${
          canRedo ? 'text-gray-500' : 'text-gray-300'
        }`}
        ripple={true}
        onClick={handleRedoClick}
      >
        <ImRedo />
      </Button>
    </>
  );
}
