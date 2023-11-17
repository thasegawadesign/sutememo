'use client';

import { format } from 'date-fns';
import { usePathname } from 'next/navigation';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import AddButton from '@/components/add-button';
import Redo from '@/components/redo';
import TodoList from '@/components/todo-list';
import Undo from '@/components/undo';
import { SettingsDrawerContext } from '@/contexts/settings-drawer-provider';
import { ScrollAmount } from '@/types/ScrollAmount';
import { Todo } from '@/types/Todo';
import { formatPattern } from '@/utils/date';
import {
  clearIndexedDB,
  createIndexedDB,
  deleteIndexedDB,
  fetchIndexedDB,
  insertIndexedDB,
  updateAllIndexedDB,
  updatePartialIndexedDB,
} from '@/utils/indexedDB';
import { registerServiceWorker } from '@/utils/registerServiceWorker';

type Props = {
  appendedNode: React.ReactNode;
};

export default function MainItem(props: Props) {
  const { appendedNode } = props;

  const pathname = usePathname();

  const { openDrawer, isExit, isOpenDrawer, setIsOpenDrawer, setIsExit } =
    useContext(SettingsDrawerContext);

  const [todos, setTodos] = useState<Todo[]>([]);
  const editableRef = useRef<HTMLSpanElement>(null);
  const scrollBottomRef = useRef<HTMLDivElement>(null);

  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const todosHistoryRef = useRef<Todo[][]>([]);
  const scrollAmountHistoryRef = useRef<ScrollAmount[]>([
    { x: window.scrollX, y: window.screenY },
  ]);
  const historyCurrentIndex = useRef(0);

  const scrollToBottom = () => {
    scrollBottomRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  };

  const handleUndoClick = async () => {
    const isOldest = historyCurrentIndex.current - 1 < 0;
    historyCurrentIndex.current = isOldest
      ? 0
      : historyCurrentIndex.current - 1;
    setCanUndo(
      historyCurrentIndex.current > 0 && todosHistoryRef.current.length >= 2,
    );
    setCanRedo(
      historyCurrentIndex.current < todosHistoryRef.current.length - 1 &&
        todosHistoryRef.current.length >= 2,
    );
    const prevTodos = todosHistoryRef.current[historyCurrentIndex.current];
    const currentTodos =
      todosHistoryRef.current[historyCurrentIndex.current + 1];
    if (canUndo) {
      try {
        await clearIndexedDB();
        updateAllIndexedDB(prevTodos);
        setTodos(prevTodos);
        const { x, y } = scrollAmountHistoryRef.current.at(
          historyCurrentIndex.current,
        ) ?? { x: window.scrollX, y: window.scrollY };
        scrollTo(x, y);
      } catch (error) {
        console.error(error);
        historyCurrentIndex.current = historyCurrentIndex.current + 1;
        updateAllIndexedDB(currentTodos);
        setTodos(currentTodos);
      }
    }
  };

  const handleRedoClick = async () => {
    const isLatest =
      historyCurrentIndex.current + 1 >= todosHistoryRef.current.length;
    historyCurrentIndex.current = isLatest
      ? historyCurrentIndex.current
      : historyCurrentIndex.current + 1;
    setCanUndo(
      historyCurrentIndex.current > 0 && todosHistoryRef.current.length >= 2,
    );
    setCanRedo(
      historyCurrentIndex.current < todosHistoryRef.current.length - 1 &&
        todosHistoryRef.current.length >= 2,
    );
    const currentTodos =
      todosHistoryRef.current[historyCurrentIndex.current - 1];
    const nextTodos = todosHistoryRef.current[historyCurrentIndex.current];
    if (canRedo) {
      try {
        await clearIndexedDB();
        updateAllIndexedDB(nextTodos);
        setTodos(nextTodos);
        const { x, y } = scrollAmountHistoryRef.current.at(
          historyCurrentIndex.current,
        ) ?? { x: window.scrollX, y: window.scrollY };
        scrollTo(x, y);
      } catch (error) {
        console.error(error);
        historyCurrentIndex.current = historyCurrentIndex.current - 1;
        updateAllIndexedDB(currentTodos);
        setTodos(currentTodos);
      }
    }
  };

  const handleKeyDown = useCallback(
    async (event: KeyboardEvent) => {
      if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) return;
      if (event.key === 'Enter') {
        const target = event.target as HTMLElement;
        const now = format(new Date(), formatPattern);
        const insertID = uuidv4();
        const prevTodos: Todo[] = todos.map((todo) => todo);
        const isEditing = target.contentEditable === 'true';
        const selection = window.getSelection();
        if (isEditing && selection?.anchorOffset === 0) {
          scrollToBottom();
        }
        if (target.nodeName === 'BODY') {
          try {
            setTodos([
              ...prevTodos,
              {
                id: insertID,
                displayOrder: prevTodos.length,
                name: '',
                createdAt: now,
                updatedAt: now,
                priority: 'auto',
                progress: 'notStarted',
                deadline: '',
                notificationSettings: {
                  date: '',
                  location: '',
                },
              },
            ]);
            scrollAmountHistoryRef.current.push({
              x: window.scrollX,
              y: window.scrollY,
            });
            todosHistoryRef.current.push([
              ...prevTodos,
              {
                id: insertID,
                displayOrder: prevTodos.length,
                name: '',
                createdAt: now,
                updatedAt: now,
                priority: 'auto',
                progress: 'notStarted',
                deadline: '',
                notificationSettings: {
                  date: '',
                  location: '',
                },
              },
            ]);
            const lastIndex = todosHistoryRef.current.length - 1;
            historyCurrentIndex.current = lastIndex;
            await insertIndexedDB(
              insertID,
              prevTodos.length,
              '',
              now,
              now,
              'auto',
              'notStarted',
              '',
              {
                date: '',
                location: '',
              },
            );
            scrollToBottom();
            editableRef.current?.focus();
          } catch (error) {
            console.error(error);
            setTodos(prevTodos);
          }
        }
      }
    },
    [todos],
  );

  const handleAddButtonMouseUp = useCallback(async () => {
    const now = format(new Date(), formatPattern);
    const insertID = uuidv4();
    const prevTodos: Todo[] = todos.map((todo) => todo);
    try {
      setTodos([
        ...prevTodos,
        {
          id: insertID,
          displayOrder: prevTodos.length,
          name: '',
          createdAt: now,
          updatedAt: now,
          priority: 'auto',
          progress: 'notStarted',
          deadline: '',
          notificationSettings: {
            date: '',
            location: '',
          },
        },
      ]);
      insertIndexedDB(
        insertID,
        prevTodos.length,
        '',
        now,
        now,
        'auto',
        'notStarted',
        '',
        {
          date: '',
          location: '',
        },
      );
      scrollAmountHistoryRef.current.push({
        x: window.scrollX,
        y: window.scrollY,
      });
      todosHistoryRef.current.push([
        ...prevTodos,
        {
          id: insertID,
          displayOrder: prevTodos.length,
          name: '',
          createdAt: now,
          updatedAt: now,
          priority: 'auto',
          progress: 'notStarted',
          deadline: '',
          notificationSettings: {
            date: '',
            location: '',
          },
        },
      ]);
      const lastIndex = todosHistoryRef.current.length - 1;
      historyCurrentIndex.current = lastIndex;
    } catch (error) {
      console.error(error);
      setTodos(prevTodos);
    }
  }, [todos]);

  const handleAddButtonClick = useCallback(async () => {
    scrollToBottom();
    editableRef.current?.focus();
  }, []);

  const handleVisibilityChange = useCallback(async () => {
    if (document.visibilityState === 'visible') {
      try {
        const fetchData = await fetchIndexedDB();
        setTodos(fetchData);
      } catch (error) {
        console.error(error);
      }
    }
  }, []);

  const handleWindowFocus = useCallback(async () => {
    try {
      const fetchData = await fetchIndexedDB();
      setTodos(fetchData);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    if (!globalThis.window) return;
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (!globalThis.window) return;
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () =>
      document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [handleVisibilityChange]);

  useEffect(() => {
    if (!globalThis.window) return;
    window.addEventListener('focus', handleWindowFocus);
    return () => window.removeEventListener('focus', handleWindowFocus);
  }, [handleWindowFocus]);

  useEffect(() => {
    if (pathname !== '/settings') {
      setIsExit(false);
    }
  }, [pathname, setIsExit]);

  useEffect(() => {
    if (!isOpenDrawer && !isExit) {
      setIsOpenDrawer(pathname === '/settings' ? true : false);
    }
  }, [isExit, isOpenDrawer, openDrawer, pathname, setIsOpenDrawer]);

  useEffect(() => {
    const init = async () => {
      try {
        await createIndexedDB();
        const fetchData = await fetchIndexedDB();
        setTodos(fetchData);
        todosHistoryRef.current = [fetchData];
        scrollAmountHistoryRef.current = [
          { x: window.scrollX, y: window.scrollY },
        ];
      } catch (error) {
        console.error(error);
      }
    };
    registerServiceWorker();
    init();
  }, []);

  return (
    <>
      {pathname === '/settings' ? appendedNode : null}
      {todos.length > 0 ? (
        <TodoList
          deleteIndexedDB={deleteIndexedDB}
          editableRef={editableRef}
          historyCurrentIndex={historyCurrentIndex}
          scrollAmountHistoryRef={scrollAmountHistoryRef}
          setCanRedo={setCanRedo}
          setCanUndo={setCanUndo}
          setTodos={setTodos}
          todos={todos}
          todosHistoryRef={todosHistoryRef}
          updateAllIndexedDB={updateAllIndexedDB}
          updatePartialIndexedDB={updatePartialIndexedDB}
        />
      ) : null}
      <menu>
        <li className="fixed bottom-[max(calc(env(safe-area-inset-bottom)+64px),84px)] left-[16px]">
          <Undo canUndo={canUndo} handleUndoClick={handleUndoClick} />
        </li>
        <li className="fixed bottom-[max(calc(env(safe-area-inset-bottom)+64px),84px)] right-[16px]">
          <Redo canRedo={canRedo} handleRedoClick={handleRedoClick} />
        </li>
      </menu>
      <menu>
        <li className="fixed bottom-5 left-0 right-0 mx-auto w-[calc(100%-40px)] pwa:bottom-[max(env(safe-area-inset-bottom),20px)]">
          <AddButton
            handleAddButtonClick={handleAddButtonClick}
            handleAddButtonMouseUp={handleAddButtonMouseUp}
          />
        </li>
      </menu>
      {todos.length > 0 ? (
        <div
          ref={scrollBottomRef}
          className="h-[calc(env(safe-area-inset-bottom)+224px)] pwa:h-[max(calc(env(safe-area-inset-bottom)+204px),224px)]"
        />
      ) : null}
    </>
  );
}
