import { ImUndo } from 'react-icons/im';

export default function Undo() {
  const handleUndoClick = function () {};
  return (
    <>
      <button
        className="fixed bottom-24 left-[22px] rounded-full bg-gray-50 p-9 text-2xl text-gray-500 filter transition hover:brightness-95"
        onClick={handleUndoClick}
      >
        <ImUndo />
      </button>
    </>
  );
}
