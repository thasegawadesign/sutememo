'use client';

import {
  DndContext,
  DragEndEvent,
  DragMoveEvent,
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

type Props = {
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  editableRef: RefObject<HTMLSpanElement>;
  readIndexedDB: () => void;
  updateIndexedDB: (todos: Todo[]) => void;
  deleteIndexedDB: (id: string) => void;
  setTodosOrderByDisplayOrder: (todos: Todo[]) => void;
};

export default function TodoList(props: Props) {
  const {
    todos,
    setTodos,
    editableRef,
    readIndexedDB,
    updateIndexedDB,
    deleteIndexedDB,
    setTodosOrderByDisplayOrder,
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
    touchSensor
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
  };
  const handleDragMove = function (event: DragMoveEvent) {};
  const handleDragEnd = function (event: DragEndEvent) {
    const { active, over } = event;
    setActiveId(null);
    if (!over) return;
    if (active.id !== over?.id) {
      setTodos((todos) => {
        const oldIndex = findIndex(active.id as string);
        const newIndex = findIndex(over?.id as string);
        return arrayMove(todos, oldIndex, newIndex);
      });
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
          <ul className="grid gap-3 mb-24 touch-none">
            {todos.map((todo) => (
              <SortableItem
                key={todo.id}
                id={todo.id}
                displayOrder={todo.displayOrder}
                name={todo.name}
                todos={todos}
                setTodos={setTodos}
                editableRef={editableRef}
                readIndexedDB={readIndexedDB}
                updateIndexedDB={updateIndexedDB}
                deleteIndexedDB={deleteIndexedDB}
                setTodosOrderByDisplayOrder={setTodosOrderByDisplayOrder}
              />
            ))}
          </ul>
        </div>
      </SortableContext>
      <DragOverlay
        wrapperElement="ul"
        className="shadow-sm"
        style={{ scale: 1.03 }}
      >
        {activeId ? (
          <SortableItem
            key={activeId}
            id={activeId}
            displayOrder={findDisplayOrder(activeId)}
            name={findName(activeId)}
            todos={todos}
            setTodos={setTodos}
            editableRef={editableRef}
            readIndexedDB={readIndexedDB}
            updateIndexedDB={updateIndexedDB}
            deleteIndexedDB={deleteIndexedDB}
            setTodosOrderByDisplayOrder={setTodosOrderByDisplayOrder}
          ></SortableItem>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
