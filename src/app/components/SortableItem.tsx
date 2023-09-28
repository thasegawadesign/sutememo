import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';
import { PiDotsSixVerticalBold } from 'react-icons/pi';
import {
  Dispatch,
  FocusEvent,
  RefObject,
  SetStateAction,
  forwardRef,
} from 'react';
import { Todo } from '@/types/Todo';

type Props = {
  id: string;
  name: string;
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  editableRef: RefObject<HTMLSpanElement>;
};

export default forwardRef(function SortableItem(props: Props) {
  const { id, name, todos, setTodos, editableRef } = props;
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
  const handleBlur = function (event: FocusEvent) {
    const targetId = id;
    const updatedTextContent = event.target.textContent;
    setTodos(
      todos.map((todo) =>
        targetId === todo.id
          ? { id: id, name: updatedTextContent as string }
          : todo
      )
    );
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={`py-2 px-1.5 border border-gray-100 rounded-md flex items-center justify-between bg-white ${
        isDragging && 'opacity-30'
      }`}
    >
      <span
        ref={editableRef}
        onBlur={handleBlur}
        contentEditable
        suppressContentEditableWarning
        className="text-2xl text-gray-700"
      >
        {name}
      </span>
      <button
        ref={setActivatorNodeRef}
        {...attributes}
        {...listeners}
        className="text-2xl px-3 py-4 text-gray-500 hover:cursor-grab hover:bg-gray-100 transition-colors rounded"
      >
        <PiDotsSixVerticalBold />
      </button>
    </li>
  );
});
