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
import type { Todo } from '@/types/Todo';
import { Dispatch, RefObject, SetStateAction, useId, useState } from 'react';
import SortableItem from './SortableItem';
import { isMobile } from 'react-device-detect';
import { IndexedDBResult } from '@/types/IndexedDBResult';
import { sortTodosOrderByDisplayOrder } from '../utils/sortTodosOrderByDisplayOrder';

type Props = {
  todos: Todo[];
  editableRef: RefObject<HTMLSpanElement>;
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

  const findIndex = function (id: string) {
    let targetIndex = -1;
    todos.forEach((todo, i) => {
      if (id === todo.id) targetIndex = i;
    });
    return targetIndex;
  };
  const findName = function (id: string) {
    let targetName = '';
    todos.forEach((todo) => {
      if (id === todo.id) targetName = todo.name;
    });
    return targetName;
  };
  const findDisplayOrder = function (id: string) {
    let targetOrder = -1;
    todos.forEach((todo, i) => {
      if (id === todo.id) targetOrder = todo.displayOrder;
    });
    return targetOrder;
  };
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
      const oldIndex = findIndex(active.id as string);
      const newIndex = findIndex(over?.id as string);
      const sortedTodos: Todo[] = sortTodosOrderByDisplayOrder(
        arrayMove(todos, oldIndex, newIndex),
      );
      setTodos(sortedTodos);
      updateAllIndexedDB(sortedTodos);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragMove={handleDragMove}
      onDragEnd={handleDragEnd}
      id={useId()}
    >
      <SortableContext items={todos} strategy={verticalListSortingStrategy}>
        <div className="px-[22px]">
          <ul className="grid touch-none gap-3">
            {todos.map((todo) => (
              <SortableItem
                key={todo.id}
                id={todo.id}
                displayOrder={todo.displayOrder}
                name={todo.name}
                todos={todos}
                editableRef={editableRef}
                setTodos={setTodos}
                updatePartialIndexedDB={updatePartialIndexedDB}
                updateAllIndexedDB={updateAllIndexedDB}
                deleteIndexedDB={deleteIndexedDB}
              />
            ))}
          </ul>
        </div>
      </SortableContext>
      <DragOverlay
        wrapperElement="ul"
        className="shadow-sm"
        style={{ scale: isMobile ? 1.032 : 1.016 }}
      >
        {activeId ? (
          <SortableItem
            key={activeId}
            id={activeId}
            displayOrder={findDisplayOrder(activeId)}
            name={findName(activeId)}
            todos={todos}
            editableRef={editableRef}
            setTodos={setTodos}
            updateAllIndexedDB={updateAllIndexedDB}
            updatePartialIndexedDB={updatePartialIndexedDB}
            deleteIndexedDB={deleteIndexedDB}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
