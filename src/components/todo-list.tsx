'use client';

import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  Dispatch,
  MutableRefObject,
  RefObject,
  SetStateAction,
  useId,
  useState,
} from 'react';
import { isMobile } from 'react-device-detect';

import SortableItem from '@/components/sortable-item';
import { IndexedDBResult } from '@/types/IndexedDBResult';
import {
  findDisplayOrder,
  findIndex,
  findName,
} from '@/utils/findTodoTargetKey';
import { sortTodosOrderByDisplayOrder } from '@/utils/sortTodosOrderByDisplayOrder';

import type { Todo } from '@/types/Todo';

type Props = {
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

export default function TodoList(props: Props) {
  const {
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
  const mouseSenser = useSensor(MouseSensor);
  const pointerSenser = useSensor(PointerSensor);
  const keyboardSensor = useSensor(KeyboardSensor, {
    coordinateGetter: sortableKeyboardCoordinates,
  });
  const touchSensor = useSensor(TouchSensor);
  const sensors = useSensors(
    mouseSenser,
    pointerSenser,
    keyboardSensor,
    touchSensor,
  );
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleDragStart = function (event: DragStartEvent) {
    const { active } = event;
    setActiveId(active.id as string);
    if (document.getElementById('cursor-style')) return;
    const cursorStyle = document.createElement('style');
    cursorStyle.innerHTML = '*{cursor: grabbing!important}';
    cursorStyle.id = 'cursor-style';
    document.head.appendChild(cursorStyle);
  };
  const handleDragMove = function () {};
  const handleDragEnd = function (event: DragEndEvent) {
    const { active, over } = event;
    setActiveId(null);
    document.getElementById('cursor-style')?.remove();
    if (!over) return;
    if (active.id !== over?.id) {
      const oldIndex = findIndex(todos, active.id as string);
      const newIndex = findIndex(todos, over?.id as string);
      const sortedTodos: Todo[] = sortTodosOrderByDisplayOrder(
        arrayMove(todos, oldIndex, newIndex),
      );
      setTodos(sortedTodos);
      todosHistoryRef.current.push(sortedTodos);
      todosHistoryCurrentIndex.current = todosHistoryCurrentIndex.current + 1;
      setCanUndo(true);
      setCanRedo(false);
      try {
        updateAllIndexedDB(sortedTodos);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      id={useId()}
      sensors={sensors}
      onDragEnd={handleDragEnd}
      onDragMove={handleDragMove}
      onDragStart={handleDragStart}
    >
      <SortableContext items={todos} strategy={verticalListSortingStrategy}>
        <div className="px-[22px]">
          <ul className="grid touch-none gap-4">
            {todos.map((todo) => (
              <SortableItem
                key={todo.id}
                deleteIndexedDB={deleteIndexedDB}
                displayOrder={todo.displayOrder}
                editableRef={editableRef}
                id={todo.id}
                name={todo.name}
                setCanRedo={setCanRedo}
                setCanUndo={setCanUndo}
                setTodos={setTodos}
                todos={todos}
                todosHistoryCurrentIndex={todosHistoryCurrentIndex}
                todosHistoryRef={todosHistoryRef}
                updateAllIndexedDB={updateAllIndexedDB}
                updatePartialIndexedDB={updatePartialIndexedDB}
              />
            ))}
          </ul>
        </div>
      </SortableContext>
      <DragOverlay
        className="shadow-sm"
        style={{ scale: isMobile ? 1.032 : 1.016 }}
        wrapperElement="ul"
      >
        {activeId ? (
          <SortableItem
            key={activeId}
            deleteIndexedDB={deleteIndexedDB}
            displayOrder={findDisplayOrder(todos, activeId)}
            editableRef={editableRef}
            id={activeId}
            name={findName(todos, activeId)}
            setCanRedo={setCanRedo}
            setCanUndo={setCanUndo}
            setTodos={setTodos}
            todos={todos}
            todosHistoryCurrentIndex={todosHistoryCurrentIndex}
            todosHistoryRef={todosHistoryRef}
            updateAllIndexedDB={updateAllIndexedDB}
            updatePartialIndexedDB={updatePartialIndexedDB}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
