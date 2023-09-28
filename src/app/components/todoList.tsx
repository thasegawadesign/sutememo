'use client';

import {
  DndContext,
  DragEndEvent,
  DragMoveEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
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
  updateIndexedDB: () => void;
};

export default function TodoList(props: Props) {
  const { todos, setTodos, editableRef, updateIndexedDB } = props;
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const [activeId, setActiveId] = useState<string | null>(null);

  const findIndex = function (id: string) {
    let index = -1;
    todos.forEach((todo, i) => {
      if (id === todo.id) index = i;
    });
    return index;
  };
  const findName = function (id: string) {
    let name = '';
    todos.forEach((todo) => {
      if (id === todo.id) name = todo.name;
    });
    return name;
  };
  const handleDragStart = function (event: DragStartEvent) {
    const { active } = event;
    setActiveId(active.id as string);
  };
  const handleDragMove = function (event: DragMoveEvent) {};
  const handleDragEnd = function (event: DragEndEvent) {
    const { active, over } = event;
    setActiveId(null);
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
        <ul className="px-3 grid gap-2 mb-24">
          {todos.map((todo) => (
            <SortableItem
              key={todo.id}
              id={todo.id}
              name={todo.name}
              todos={todos}
              setTodos={setTodos}
              editableRef={editableRef}
              updateIndexedDB={updateIndexedDB}
            />
          ))}
        </ul>
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
            name={findName(activeId)}
            todos={todos}
            setTodos={setTodos}
            editableRef={editableRef}
            updateIndexedDB={updateIndexedDB}
          ></SortableItem>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
