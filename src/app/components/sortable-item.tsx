import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';
import { PiDotsSixVerticalBold, PiXBold } from 'react-icons/pi';
import { isMobile, isTablet, isDesktop } from 'react-device-detect';
import { Button } from '../context/theme-providers';

import {
  Dispatch,
  TouchEvent,
  FocusEvent,
  KeyboardEvent,
  RefObject,
  SetStateAction,
  forwardRef,
  useCallback,
  MutableRefObject,
} from 'react';
import { Todo } from '@/types/Todo';
import { IndexedDBResult } from '@/types/IndexedDBResult';
import { sortTodosOrderByDisplayOrder } from '../utils/sortTodosOrderByDisplayOrder';

type Props = {
  id: string;
  displayOrder: number;
  name: string;
  todos: Todo[];
  editableRef: RefObject<HTMLSpanElement>;
  todosHistoryRef: MutableRefObject<Todo[][]>;
  todosHistoryCurrentIndex: MutableRefObject<number>;
  setCanUndo: Dispatch<SetStateAction<boolean>>;
  setCanRedo: Dispatch<SetStateAction<boolean>>;
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  updatePartialIndexedDB: (
    id: string,
    updatedText: string,
  ) => Promise<IndexedDBResult>;
  updateAllIndexedDB: (todos: Todo[]) => Promise<IndexedDBResult>;
  deleteIndexedDB: (id: string) => Promise<IndexedDBResult>;
};

export default forwardRef(function SortableItem(props: Props, _ref) {
  const {
    id,
    name,
    todos,
    editableRef,
    todosHistoryRef,
    todosHistoryCurrentIndex,
    setCanUndo,
    setCanRedo,
    setTodos,
    updatePartialIndexedDB,
    updateAllIndexedDB,
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

  const handleDeleteButtonClick = function () {
    const targetId = id;
    deleteIndexedDB(targetId);
    const filterdTodos: Todo[] = todos.filter((todo) => todo.id !== targetId);
    const sortedTodos: Todo[] = sortTodosOrderByDisplayOrder(filterdTodos);
    setTodos(sortedTodos);
    updateAllIndexedDB(sortedTodos);
    todosHistoryRef.current.push(sortedTodos);
    todosHistoryCurrentIndex.current = todosHistoryCurrentIndex.current + 1;
    setCanUndo(true);
  };

  const handleBlurContentEditable = function (event: FocusEvent) {
    const targetId = id;
    const targetText = name;
    const updatedText = (event.target as HTMLElement).innerText;
    const isEdited = targetText !== updatedText;
    if (updatedText) {
      if (!isEdited) return;
      updatePartialIndexedDB(targetId, updatedText);
      const updatedTodos: Todo[] = todos.map((todo) =>
        todo.id === targetId
          ? {
              id: todo.id,
              displayOrder: todo.displayOrder,
              name: updatedText,
            }
          : todo,
      );
      setTodos(updatedTodos);
      todosHistoryRef.current.push(updatedTodos);
      todosHistoryCurrentIndex.current = todosHistoryCurrentIndex.current + 1;
      setCanUndo(true);
      setCanRedo(false);
    } else {
      deleteIndexedDB(targetId);
      const filterdTodos: Todo[] = todos.filter((todo) => todo.id !== targetId);
      const sortedTodos: Todo[] = sortTodosOrderByDisplayOrder(filterdTodos);
      setTodos(sortedTodos);
      updateAllIndexedDB(sortedTodos);
      todosHistoryRef.current.push(sortedTodos);
      todosHistoryCurrentIndex.current = todosHistoryCurrentIndex.current + 1;
      setCanUndo(true);
      setCanRedo(false);
    }
  };

  const handleKeyDownContentEditable = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
      const targetElement = event.target as HTMLElement;
      targetElement.blur();
    }
  }, []);

  const handleTransparentButtonTouchEnd = useCallback((event: TouchEvent) => {
    event.preventDefault();
  }, []);

  return (
    <li
      ref={setNodeRef}
      style={style}
      role="listitem"
      className={`flex items-center justify-between gap-1.5 rounded-md border border-gray-100 bg-white px-1.5 py-2 sm:gap-2.5 sm:px-2 ${
        isDragging && 'opacity-30'
      }`}
    >
      <div className="flex flex-1 items-center gap-1.5 sm:gap-2.5">
        <Button
          ref={setActivatorNodeRef}
          {...attributes}
          {...listeners}
          color="white"
          variant="text"
          className="self-stretch rounded px-3 py-4 text-2xl text-gray-500 hover:cursor-grab hover:bg-gray-100 sm:px-4 sm:py-5"
        >
          <PiDotsSixVerticalBold />
        </Button>
        <span
          ref={editableRef}
          onBlur={handleBlurContentEditable}
          onKeyDown={handleKeyDownContentEditable}
          role="textbox"
          contentEditable
          suppressContentEditableWarning
          className="max-w-[calc(100svw-162px)] whitespace-break-spaces break-words rounded-sm px-1.5 py-1 text-2xl leading-snug text-gray-700 focus:w-full sm:max-w-[calc(100svw-190px)] sm:rounded"
        >
          {name}
        </span>
        {(isMobile || isTablet) && (
          <button
            className="flex-1 self-stretch bg-transparent"
            ref={setActivatorNodeRef}
            onTouchEnd={handleTransparentButtonTouchEnd}
            {...listeners}
            {...attributes}
          />
        )}
      </div>
      <Button
        aria-label={'Delete'}
        onClick={handleDeleteButtonClick}
        variant="text"
        className={`rounded px-3 py-4 text-xl text-gray-500 hover:cursor-pointer sm:px-4 sm:py-5 ${
          isDesktop && 'self-stretch'
        }`}
      >
        <PiXBold />
      </Button>
    </li>
  );
});
