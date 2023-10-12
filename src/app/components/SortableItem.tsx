import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';
import { PiDotsSixVerticalBold, PiXBold } from 'react-icons/pi';
import { isMobile } from 'react-device-detect';
import {
  Dispatch,
  FocusEvent,
  KeyboardEvent,
  MouseEvent,
  RefObject,
  SetStateAction,
  forwardRef,
  useCallback,
} from 'react';
import { Todo } from '@/types/Todo';

type Props = {
  id: string;
  displayOrder: number;
  name: string;
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  editableRef: RefObject<HTMLSpanElement>;
  readIndexedDB: () => void;
  updateIndexedDB: (id: string, updatedText: string) => void;
  updateAllIndexedDB: (todos: Todo[]) => void;
  deleteIndexedDB: (id: string) => void;
  setTodosOrderByDisplayOrder: (todos: Todo[]) => void;
};

export default forwardRef(function SortableItem(props: Props, _ref) {
  const {
    id,
    name,
    editableRef,
    readIndexedDB,
    updateIndexedDB,
    deleteIndexedDB,
  } = props;
  const {
    isDragging,
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({ id: id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleDeleteBtnClick = useCallback((event: MouseEvent) => {
    const targetId = id;
    deleteIndexedDB(targetId);
    readIndexedDB();
  }, []);

  const handleBlur = useCallback((event: FocusEvent) => {
    const targetId = id;
    const targetName = name;
    const updatedTextContent = event.target.textContent;
    const isEdited = targetName !== updatedTextContent;
    if (updatedTextContent) {
      if (!isEdited) return;
      updateIndexedDB(targetId, updatedTextContent);
      readIndexedDB();
    } else {
      deleteIndexedDB(targetId);
      readIndexedDB();
    }
  }, []);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
      const targetElement = event.target as HTMLElement;
      targetElement.blur();
    }
  }, []);

  return (
    <li
      ref={setNodeRef}
      style={style}
      role="listitem"
      className={`flex items-center justify-between gap-1 rounded-md border border-gray-100 bg-white px-1.5 py-2 sm:gap-2 sm:px-2 ${
        isDragging && 'opacity-30'
      }`}
    >
      <div className="flex flex-1 items-center gap-1 sm:gap-2">
        <button
          ref={setActivatorNodeRef}
          {...attributes}
          {...listeners}
          className="self-stretch rounded px-3 py-4 text-2xl text-gray-500 transition-colors hover:cursor-grab hover:bg-gray-100"
        >
          <PiDotsSixVerticalBold />
        </button>
        <span
          ref={editableRef}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          role="textbox"
          contentEditable
          suppressContentEditableWarning
          className="max-w-[calc(100svw-158px)] whitespace-break-spaces px-1 py-0.5 text-2xl leading-snug text-gray-700 focus:w-full sm:max-w-[calc(100svw-170px)]"
        >
          {name}
        </span>
        {isMobile && (
          <button
            className="flex-1 self-stretch bg-transparent"
            ref={setActivatorNodeRef}
            {...listeners}
            {...attributes}
          />
        )}
      </div>
      <button
        aria-label={'Delete'}
        onClick={handleDeleteBtnClick}
        className="rounded px-3 py-4 text-xl text-gray-500 transition-colors hover:cursor-pointer hover:bg-gray-100"
      >
        <PiXBold />
      </button>
    </li>
  );
});
