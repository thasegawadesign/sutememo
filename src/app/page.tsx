'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Button from './components/button';
import TodoList from './components/todoList';
import { Todo } from '@/types/Todo';
import { sortTodosOrderByDisplayOrder } from './utils/sortTodosOrderByDisplayOrder';
import { registerServiceWorker } from './utils/registerServiceWorker';
import AppInstallButton from './components/AppInstallButton';
import IconSvg from './components/IconSvg';
import { IndexedDBResult } from '@/types/IndexedDBResult';
import { ProcessTypeIDB } from '@/types/ProcessTypeIDB';

declare global {
  interface Window {
    deferredPrompt: BeforeInstallPromptEvent | null;
  }
}
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  deferredPrompt: BeforeInstallPromptEvent | null;
  prompt(): Promise<void>;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [processTypeIDB, setProcessTypeIDB] = useState<ProcessTypeIDB>();
  const [sortObsever, setSortObserver] = useState(false);
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showAppInstallButton, setShowAppInstallButton] = useState(false);
  const editableRef = useRef<HTMLSpanElement>(null);
  const scrollBottomRef = useRef<HTMLDivElement>(null);
  const appInstallButtonRef = useRef<HTMLButtonElement>(null);

  const scrollToBottom = useCallback(() => {
    scrollBottomRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  }, []);

  const handleKeyUp = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) return;
    if (event.key === 'Enter') {
      scrollToBottom();
      editableRef.current?.focus();
    }
  }, []);
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) return;
      if (event.key === 'Enter') {
        const target = event.target as HTMLElement;
        const insertID = uuidv4();
        if (target.nodeName !== 'BODY') return;
        insertIndexedDB(insertID, todos.length, '');
        setProcessTypeIDB('insertIndexedDB');
        setTodos([
          ...todos,
          { id: insertID, displayOrder: todos.length, name: '' },
        ]);
      }
    },
    [todos],
  );

  const handleAddButtonClick = useCallback(async () => {
    const insertID = uuidv4();
    insertIndexedDB(insertID, todos.length, '');
    setProcessTypeIDB('insertIndexedDB');
    await setTodos([
      ...todos,
      { id: insertID, displayOrder: todos.length, name: '' },
    ]);
    scrollToBottom();
    editableRef.current?.focus();
  }, [todos]);

  const handleAppInstallButtonClick = useCallback(async () => {
    if (!globalThis.window) return;
    const displayMode = window.matchMedia('(display-mode: standalone)').matches
      ? 'standalone'
      : 'browser tab';
    if (displayMode === 'standalone') return;
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    try {
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
        setDeferredPrompt(null);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setShowAppInstallButton(false);
    }
  }, [deferredPrompt]);

  const handleAppInstalled = useCallback(() => {
    if (!globalThis.window) return;
    console.log('PWA was installed');
    setDeferredPrompt(null);
    setShowAppInstallButton(false);
  }, [setDeferredPrompt]);

  const handleBeforeInstallPrompt = useCallback(
    (event: Event) => {
      if (!globalThis.window) return;
      event.preventDefault();
      const beforeInstallPromptEvent = event as BeforeInstallPromptEvent;
      console.log('beforeInstallPromptEvent: ', beforeInstallPromptEvent);
      setDeferredPrompt(beforeInstallPromptEvent);
      setShowAppInstallButton(true);
    },
    [deferredPrompt],
  );

  const handleVisibilityChange = useCallback(async () => {
    if (document.visibilityState === 'visible') {
      const fetchData = await fetchIndexedDB();
      setProcessTypeIDB('fetchIndexedDB');
      setTodos(fetchData);
    }
  }, []);

  const handleWindowFocus = useCallback(async () => {
    const fetchData = await fetchIndexedDB();
    setProcessTypeIDB('fetchIndexedDB');
    setTodos(fetchData);
  }, []);

  const dbVer = 1;
  const dbName = 'TodoDB';
  const dbStore = 'todos';
  const dbKeyPath = 'id';
  const dbToDoNameKey = 'name';
  const dbToDoDisplayOrderKey = 'displayOrder';

  const createIndexedDB: () => Promise<IndexedDBResult> =
    useCallback(async () => {
      return new Promise((resolve, reject) => {
        if (!globalThis.window) {
          reject('IndexedDB is not working this environment');
          return;
        }
        const request = window.indexedDB.open(dbName, dbVer);
        request.onupgradeneeded = (event) => {
          const db: IDBDatabase = (event.target as IDBOpenDBRequest).result;
          if (!db.objectStoreNames.contains(dbStore)) {
            const objectStore = db.createObjectStore(dbStore, {
              keyPath: dbKeyPath,
            });
            objectStore.createIndex(dbToDoNameKey, dbToDoNameKey, {
              unique: false,
            });
            objectStore.createIndex(
              dbToDoDisplayOrderKey,
              dbToDoDisplayOrderKey,
              {
                unique: false,
              },
            );
            objectStore.createIndex(dbKeyPath, dbKeyPath, { unique: true });
            objectStore.transaction.oncomplete = () => {
              console.log('createIndexedDB onupgradeneeded called');
              resolve({
                complete: true,
              });
            };
            objectStore.transaction.onerror = (event) => {
              reject('Transaction Error, createIndexedDB ->' + event);
            };
          }
        };
        request.onsuccess = (event) => {
          const db: IDBDatabase = (event.target as IDBOpenDBRequest).result;
          const transaction = db.transaction([dbStore], 'readwrite');
          transaction.oncomplete = () => {
            console.log('createIndexedDB onupgradeneeded called');
            resolve({
              complete: true,
            });
          };
          transaction.onerror = (event) => {
            reject('Transaction Error, createIndexedDB ->' + event);
          };
        };
        request.onerror = (event) => {
          console.error(event);
          reject('Request Error, createIndexedDB ->' + event);
        };
      });
    }, []);
  const fetchIndexedDB: () => Promise<Todo[]> = useCallback(async () => {
    return new Promise((resolve, reject) => {
      if (!globalThis.window) {
        reject('IndexedDB is not working this environment');
        return;
      }
      let result: Todo[];
      const request = window.indexedDB.open(dbName, dbVer);
      request.onsuccess = (event) => {
        const db: IDBDatabase = (event.target as IDBOpenDBRequest).result;
        const transaction = db.transaction([dbStore], 'readonly');
        const objectStore = transaction.objectStore(dbStore);
        const tmpArr: Todo[] = [];
        objectStore.openCursor().onsuccess = (event) => {
          const cursor = (event.target as IDBRequest).result;
          if (cursor) {
            tmpArr.push(cursor.value);
            cursor.continue();
          } else {
            const sortedTodos = tmpArr.toSorted(
              (a, b) => a.displayOrder - b.displayOrder,
            );
            result = sortTodosOrderByDisplayOrder(sortedTodos);
            console.log('Got all todos');
            console.log(result);
          }
        };
        objectStore.openCursor().onerror = (event) => {
          console.error(event);
        };
        transaction.oncomplete = () => {
          console.log('fetchIndexedDB called');
          resolve(result);
        };
        transaction.onerror = (event) => {
          reject('Transaction Error, fetchIndexedDB ->' + event);
        };
      };
      request.onerror = (event) => {
        reject('Request Error, fetchIndexedDB ->' + event);
      };
    });
  }, []);
  const updatePartialIndexedDB: (
    id: string,
    updatedText: string,
  ) => Promise<IndexedDBResult> = useCallback(
    async (id: string, updatedText: string) => {
      return new Promise((resolve, reject) => {
        if (!globalThis.window) {
          reject('IndexedDB is not working this environment');
          return;
        }
        const request = window.indexedDB.open(dbName, dbVer);
        request.onsuccess = (event) => {
          const db: IDBDatabase = (event.target as IDBOpenDBRequest).result;
          const transaction = db.transaction([dbStore], 'readwrite');
          const objectStore = transaction.objectStore(dbStore);
          const getResult: Todo = { id: '', displayOrder: -1, name: '' };
          const getRequest = objectStore.get(id);
          getRequest.onsuccess = (event) => {
            const { id, displayOrder, name } = (event.target as IDBRequest)
              .result as Todo;
            getResult.id = id;
            getResult.displayOrder = displayOrder;
            getResult.name = name;
            const updatedTodo: Todo = {
              id: getResult.id,
              displayOrder: getResult.displayOrder,
              name: updatedText,
            };
            const putRequest = objectStore.put(updatedTodo);
            putRequest.onsuccess = () => {
              console.log('PutRequest success, updatePartialIndexedDB');
            };
            putRequest.onerror = (event) => {
              reject('PutRequest Error, updatePartialIndexedDB ->' + event);
            };
          };
          getRequest.onerror = (event) => {
            reject('GetRequest Error, updatePartialIndexedDB ->' + event);
          };
          transaction.oncomplete = () => {
            console.log('updatePartialIndexedDB called');
            resolve({
              complete: true,
            });
          };
          transaction.onerror = (event) => {
            reject('Transaction Error, updatePartialIndexedDB ->' + event);
          };
        };
        request.onerror = (event) => {
          reject('Request Error, updatePartialIndexedDB ->' + event);
        };
      });
    },
    [],
  );
  const updateAllIndexedDB: (todos: Todo[]) => Promise<IndexedDBResult> =
    useCallback(async (todos: Todo[]) => {
      return new Promise((resolve, reject) => {
        if (!globalThis.window) {
          reject('IndexedDB is not working this environment');
          return;
        }
        const request = window.indexedDB.open(dbName, dbVer);
        request.onsuccess = (event) => {
          const db: IDBDatabase = (event.target as IDBOpenDBRequest).result;
          const transaction = db.transaction([dbStore], 'readwrite');
          const objectStore = transaction.objectStore(dbStore);
          const sortedTodos: Todo[] = sortTodosOrderByDisplayOrder(todos);
          sortedTodos.forEach((todo) => {
            const putRequest = objectStore.put(todo);
            putRequest.onsuccess = () => {
              console.log('PutRequest success, updateAllIndexedDB');
            };
            putRequest.onerror = (event) => {
              reject('PutRequest Error, updateAllIndexedDB ->' + event);
            };
          });
          transaction.oncomplete = () => {
            console.log('updateAllIndexedDB called');
            resolve({
              complete: true,
            });
          };
          transaction.onerror = (event) => {
            reject('Transaction Error, updateAllIndexedDB ->' + event);
          };
        };
        request.onerror = (event) => {
          reject('Request Error, updateAllIndexedDB ->' + event);
        };
      });
    }, []);
  const insertIndexedDB: (
    id: string,
    displayOrder: number,
    name: string,
  ) => Promise<IndexedDBResult> = useCallback(
    async (id: string, displayOrder: number, name: string) => {
      return new Promise((resolve, reject) => {
        if (!globalThis.window) {
          reject('IndexedDB is not working this environment');
          return;
        }
        const newTodo: Todo = {
          id,
          displayOrder,
          name,
        };
        const request = window.indexedDB.open(dbName, dbVer);
        request.onsuccess = (event) => {
          const db: IDBDatabase = (event.target as IDBOpenDBRequest).result;
          const transaction = db.transaction([dbStore], 'readwrite');
          const objectStore = transaction.objectStore(dbStore);
          const addRequest = objectStore.add(newTodo);
          addRequest.onsuccess = () => {
            console.log('AddRequest success, insertIndexedDB');
          };
          addRequest.onerror = (event) => {
            reject('AddRequest Error, insertIndexedDB ->' + event);
          };
          transaction.oncomplete = () => {
            console.log('insertIndexedDB called');
            resolve({
              complete: true,
            });
          };
          transaction.onerror = (event) => {
            reject('Transaction Error, insertIndexedDB ->' + event);
          };
        };
        request.onerror = (event) => {
          reject('Request Error, insertIndexedDB ->' + event);
        };
      });
    },
    [],
  );
  const deleteIndexedDB: (id: string) => Promise<IndexedDBResult> = useCallback(
    async (id: string) => {
      return new Promise((resolve, reject) => {
        if (!globalThis.window) {
          reject('IndexedDB is not working this environment');
          return;
        }
        const request = window.indexedDB.open(dbName, dbVer);
        request.onsuccess = (event) => {
          const db: IDBDatabase = (event.target as IDBOpenDBRequest).result;
          const transaction = db.transaction([dbStore], 'readwrite');
          const objectStore = transaction.objectStore(dbStore);
          const deleteRequest = objectStore.delete(id);
          deleteRequest.onsuccess = () => {
            console.log('DeleteRequest success, deleteIndexedDB');
          };
          deleteRequest.onerror = (event) => {
            reject('DeleteRequest Error, deleteIndexedDB ->' + event);
          };
          transaction.oncomplete = (event) => {
            console.log('deleteIndexedDB called');
            resolve({
              complete: true,
            });
          };
          transaction.onerror = (event) => {
            reject('Transaction Error, deleteIndexedDB ->' + event);
          };
        };
        request.onerror = (event) => {
          reject('Request Error, deleteIndexedDB ->' + event);
        };
      });
    },
    [],
  );

  useEffect(() => {
    if (!globalThis.window) return;
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (!globalThis.window) return;
    window.addEventListener('keyup', handleKeyUp);
    return () => window.removeEventListener('keyup', handleKeyUp);
  }, [handleKeyUp]);

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
    if (!globalThis.window) return;
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () =>
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt,
      );
  }, [handleBeforeInstallPrompt]);

  useEffect(() => {
    if (!globalThis.window) return;
    window.addEventListener('appinstalled', handleAppInstalled);
    return () => window.removeEventListener('appinstalled', handleAppInstalled);
  }, [handleAppInstalled]);

  useEffect(() => {
    const sortedTodos = sortTodosOrderByDisplayOrder(todos);
    if (sortObsever) {
      setTodos(sortedTodos);
      updateAllIndexedDB(sortedTodos);
    }
    if (processTypeIDB === 'deleteIndexedDB') {
      updateAllIndexedDB(sortedTodos);
    }
    return () => {
      setProcessTypeIDB(undefined);
    };
  }, [sortObsever, processTypeIDB]);

  useEffect(() => {
    const init = async () => {
      createIndexedDB();
      const fetchData = await fetchIndexedDB();
      setProcessTypeIDB('fetchIndexedDB');
      setTodos(fetchData);
      setLoading(false);
    };
    registerServiceWorker();
    init();
  }, []);

  return (
    <main>
      <div className="flex items-center justify-between px-[22px] pb-5 pt-3">
        <div className="flex items-center gap-2">
          <div className="hidden h-12 w-12 select-none items-center justify-center rounded-[24%] border border-gray-200 bg-white p-2 text-center minimum:flex">
            <IconSvg />
          </div>
          <h1
            style={{ fontWeight: 800 }}
            className="select-none text-4xl text-main"
          >
            ToDo
          </h1>
        </div>
        {showAppInstallButton && (
          <AppInstallButton
            handleAppInstallButtonClick={handleAppInstallButtonClick}
            appInstallButtonRef={appInstallButtonRef}
          />
        )}
      </div>
      {todos.length > 0 && (
        <>
          <TodoList
            todos={todos}
            sortObsever={sortObsever}
            editableRef={editableRef}
            setTodos={setTodos}
            setProcessTypeIDB={setProcessTypeIDB}
            setSortObserver={setSortObserver}
            updatePartialIndexedDB={updatePartialIndexedDB}
            updateAllIndexedDB={updateAllIndexedDB}
            deleteIndexedDB={deleteIndexedDB}
          />
        </>
      )}
      <Button handleAddButtonClick={handleAddButtonClick} />
      {todos.length > 0 && (
        <div
          ref={scrollBottomRef}
          className="h-[calc(env(safe-area-inset-bottom)+104px)] pwa:h-[max(calc(env(safe-area-inset-bottom)+84px),104px)]"
        />
      )}
    </main>
  );
}
