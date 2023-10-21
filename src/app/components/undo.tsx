import { ImUndo } from 'react-icons/im';
import { Button } from '../context/material-providers';

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
        className={`!fixed bottom-[max(calc(env(safe-area-inset-bottom)+72px),94px)] left-[22px] rounded-full p-[26px] text-lg !shadow-none xs:p-7 xs:text-xl ${
          canUndo
            ? 'text-gray-500 hover:bg-blue-gray-50 hover:brightness-[102%]'
            : 'text-gray-400'
        }`}
        ripple={canUndo}
        disabled={!canUndo}
        onClick={handleUndoClick}
      >
        <ImUndo />
      </Button>
    </>
  );
}
