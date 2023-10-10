import { forwardRef } from 'react';
import { isIOS } from 'react-device-detect';
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
      className={`fixed left-0 right-0 mx-auto w-[calc(100%-40px)] rounded-lg bg-main p-2 text-5xl text-white filter transition hover:brightness-95 ${
        isIOS ? 'bottom-[env(safe-area-inset-bottom)]' : 'bottom-5'
      }`}
    >
      <div className="grid place-items-center">
        <IoIosAdd />
      </div>
    </button>
  );
});
