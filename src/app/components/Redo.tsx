import { ImRedo } from 'react-icons/im';

type Props = {
  handleRedoClick: () => void;
};

export default function Redo(props: Props) {
  const { handleRedoClick } = props;
  return (
    <>
      <button
        className="fixed bottom-24 right-[22px] rounded-full bg-gray-50 p-9 text-2xl text-gray-500 filter transition hover:brightness-95"
        onClick={handleRedoClick}
      >
        <ImRedo />
      </button>
    </>
  );
}
