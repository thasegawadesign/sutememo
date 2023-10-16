import { TouchEvent } from 'react';
import { ImUndo } from 'react-icons/im';

type Props = {
  canUndo: boolean;
  handleUndoClick: () => void;
};

export default function Undo(props: Props) {
  const { canUndo, handleUndoClick } = props;
  return (
    <>
      <button
        tabIndex={0}
        aria-label="Undo"
        role="button"
        className={`xs:text-xl xs:p-7 fixed bottom-[max(calc(env(safe-area-inset-bottom)+80px),102px)] left-[22px] rounded-full border border-gray-200 bg-gray-100 p-[26px] text-lg brightness-105 filter transition ${
          canUndo
            ? 'text-gray-500 hover:brightness-[102%]'
            : 'text-gray-300 hover:brightness-105'
        }`}
        onClick={handleUndoClick}
      >
        <ImUndo />
      </button>
    </>
  );
}
