import { ImUndo } from 'react-icons/im';
import { Button } from '@material-tailwind/react';

type Props = {
  canUndo: boolean;
  handleUndoClick: () => void;
};

export default function Undo(props: Props) {
  const { canUndo, handleUndoClick } = props;
  return (
    <>
      <Button
        tabIndex={0}
        aria-label="Undo"
        role="button"
        color="white"
        variant="text"
        className={`xs:text-xl xs:p-7 !fixed bottom-[max(calc(env(safe-area-inset-bottom)+72px),94px)] left-[22px] rounded-full p-[26px] text-lg ${
          canUndo ? 'text-gray-500' : 'text-gray-300'
        }`}
        ripple={true}
        onClick={handleUndoClick}
      >
        <ImUndo />
      </Button>
    </>
  );
}
