'use client';

import { useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Button from './components/button';
import TodoList from './components/todoList';
import { Todo } from '@/types/Todo';

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: uuidv4(),
      name: '散歩する',
    },
    {
      id: uuidv4(),
      name: '買い物に行く',
    },
    {
      id: uuidv4(),
      name: '本を読む',
    },
  ]);
  const editableRef = useRef<HTMLSpanElement>(null);
  const scrollBottomRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = function () {
    scrollBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const handleBtnClick = async function () {
    scrollToBottom();
    await setTodos([...todos, { id: uuidv4(), name: '' }]);
    editableRef.current?.focus();
  };

  return (
    <main>
      <h1
        style={{ fontWeight: 800 }}
        className="text-main text-4xl px-3 pt-2 pb-5"
      >
        ToDo
      </h1>
      <TodoList todos={todos} setTodos={setTodos} editableRef={editableRef} />
      <div ref={scrollBottomRef} className="h-24"></div>
      <Button handleBtnClick={handleBtnClick} />
    </main>
  );
}
