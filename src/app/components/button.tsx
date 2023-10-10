import { forwardRef } from 'react';
import { IoIosAdd } from 'react-icons/io';

type Props = {
  handleBtnClick: () => void;
};

export default forwardRef(function Button(props: Props, _ref) {
  const { handleBtnClick } = props;
  return (
    <button
      onClick={handleBtnClick}
      aria-label="Add"
      role="button"
      tabIndex={0}
      className="add-button fixed bottom-5 left-0 right-0 mx-auto w-[calc(100%-40px)] rounded-lg bg-main p-2 text-5xl
      text-white filter transition hover:brightness-95 pwa:bottom-[max(env(safe-area-inset-bottom),20px)]"
    >
      <div className="grid place-items-center">
        <IoIosAdd />
      </div>
    </button>
  );
});
