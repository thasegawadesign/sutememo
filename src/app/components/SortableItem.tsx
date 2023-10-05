import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';
import { PiDotsSixVerticalBold, PiXBold } from 'react-icons/pi';
import {
  Dispatch,
  FocusEvent,
  RefObject,
  SetStateAction,
  forwardRef,
  useCallback,
  useEffect,
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
  updateIndexedDB: (todos: Todo[]) => void;
  deleteIndexedDB: (id: string) => void;
  setTodosOrderByDisplayOrder: (todos: Todo[]) => void;
};

export default forwardRef(function SortableItem(props: Props, _ref) {
  const {
    id,
    displayOrder,
    name,
    todos,
    setTodos,
    editableRef,
    readIndexedDB,
    updateIndexedDB,
    deleteIndexedDB,
    setTodosOrderByDisplayOrder,
  } = props;
  const {
    isDragging,
    isSorting,
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

  const handleBlur = useCallback((event: FocusEvent) => {
    const targetTodoId = id;
    const targetTodoName = name;
    const updatedTextContent = event.target.textContent;
    const isEdited = !(targetTodoName === updatedTextContent);
    if (updatedTextContent) {
      if (!isEdited) return;
      setTodos(
        todos.map((todo) =>
          targetTodoId === todo.id
            ? {
                id: id,
                displayOrder: displayOrder,
                name: updatedTextContent as string,
              }
            : todo
        )
      );
    } else {
      deleteIndexedDB(targetTodoId);
      readIndexedDB();
    }
  }, []);

  useEffect(() => {
    updateIndexedDB(todos);
  }, [todos]);

  useEffect(() => {
    if (!isSorting) setTodosOrderByDisplayOrder(todos);
  }, [isSorting]);

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={`py-2 px-1.5 border flex gap-1 items-center justify-between border-gray-100 rounded-md bg-white ${
        isDragging && 'opacity-30'
      }`}
    >
      <div className="flex items-center gap-1">
        <button
          ref={setActivatorNodeRef}
          {...attributes}
          {...listeners}
          className="text-2xl px-3 py-4 text-gray-500 hover:cursor-grab hover:bg-gray-100 transition-colors rounded"
        >
          <PiDotsSixVerticalBold />
        </button>
        <span
          ref={editableRef}
          onBlur={handleBlur}
          role="textbox"
          contentEditable
          suppressContentEditableWarning
          className="text-2xl text-gray-700 py-0.5 px-1 max-w-[calc(100vw-136px)]"
        >
          {name}
        </span>
      </div>
      <button className="text-xl text-gray-500 px-3 py-4 hover:cursor-pointer hover:bg-gray-100 transition-colors rounded">
        <PiXBold />
      </button>
    </li>
  );
});
