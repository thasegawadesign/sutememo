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
        className={`fixed bottom-[max(calc(env(safe-area-inset-bottom)+92px),102px)] left-[22px] rounded-full border border-gray-200 bg-gray-100 p-8 text-2xl text-gray-500 filter transition ${
          canUndo
            ? 'brightness-100 hover:brightness-95'
            : 'brightness-105 hover:brightness-105'
        }`}
        onClick={handleUndoClick}
      >
        <ImUndo />
      </button>
    </>
  );
}
