'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Button from './components/button';
import TodoList from './components/todoList';
import { Todo } from '@/types/Todo';

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
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

  const dbVer = 1;
  const dbName = 'TodoDB';
  const dbStore = 'todos';
  const dbKeyPath = 'id';

  const createIndexedDB = function () {
    if (!globalThis.window) return;
    const request = window.indexedDB.open(dbName, dbVer);
    request.onupgradeneeded = (event) => {
      const db: IDBDatabase = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(dbStore)) {
        const objectStore = db.createObjectStore(dbStore, {
          keyPath: dbKeyPath,
        });
        objectStore.createIndex('name', 'name', { unique: false });
        objectStore.createIndex('id', 'id', { unique: true });
        objectStore.transaction.oncomplete = (event) => {
          const todoObjectStore = db
            .transaction(dbStore, 'readwrite')
            .objectStore(dbStore);
          todos.forEach((todo) => {
            todoObjectStore.add(todo);
          });
        };
      }
    };
    request.onsuccess = (event) => {
      const db: IDBDatabase = (event.target as IDBOpenDBRequest).result;
      const transaction = db.transaction([dbStore], 'readwrite');
      const objectStore = transaction.objectStore(dbStore);
      todos.forEach((todo) => {
        const request = objectStore.add(todo);
        request.onsuccess = (event) => {};
        request.onerror = (event) => {};
      });
      const tmpArr: Todo[] = [];
      objectStore.openCursor().onsuccess = (event) => {
        const cursor = (event.target as IDBRequest).result;
        if (cursor) {
          tmpArr.push(cursor.value);
          cursor.continue();
        } else {
          setTodos(tmpArr);
          console.log(`Got all todos`);
        }
      };
      transaction.oncomplete = (event) => {};
      transaction.onerror = (event) => {
        console.error('Transaction error');
      };
    };
    request.onerror = (event) => {
      console.error(event);
    };
  };
  const readIndexedDB = function () {
    if (!globalThis.window) return;
  };
  const updateIndexedDB = function () {
    if (!globalThis.window) return;
    const request = window.indexedDB.open(dbName, dbVer);
    request.onsuccess = (event) => {
      const db: IDBDatabase = (event.target as IDBOpenDBRequest).result;
      const transaction = db.transaction([dbStore], 'readwrite');
      const objectStore = transaction.objectStore(dbStore);
      todos.forEach((todo) => {
        const request = objectStore.put(todo);
        request.onsuccess = (event) => {};
        request.onerror = (event) => {
          console.error(event);
        };
      });
      console.log('updateIndexedDB called');
    };
    request.onerror = (event) => {};
  };
  const deleteIndexedDB = function () {
    if (!globalThis.window) return;
    const request = window.indexedDB.open(dbName, dbVer);
    request.onsuccess = (event) => {};
    request.onerror = (event) => {
      console.log(event);
    };
  };
  const clearIndexedDB = function () {
    if (!globalThis.window) return;
  };
  useEffect(() => {
    createIndexedDB();
  }, []);

  return (
    <main>
      <h1
        style={{ fontWeight: 800 }}
        className="text-main text-4xl px-3 pt-2 pb-5"
      >
        ToDo
      </h1>
      <TodoList
        todos={todos}
        setTodos={setTodos}
        editableRef={editableRef}
        updateIndexedDB={updateIndexedDB}
      />
      <div ref={scrollBottomRef} className="h-24"></div>
      <Button handleBtnClick={handleBtnClick} />
    </main>
  );
}
