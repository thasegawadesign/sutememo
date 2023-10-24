import { IndexedDBResult } from '@/types/IndexedDBResult';
import { Todo } from '@/types/Todo';
import { sortTodosOrderByDisplayOrder } from '@/utils/sortTodosOrderByDisplayOrder';

const dbVer = 1;
const dbName = 'TodoDB';
const dbStore = 'todos';
const dbKeyPath = 'id';
const dbToDoNameKey = 'name';
const dbToDoDisplayOrderKey = 'displayOrder';

export const createIndexedDB: () => Promise<IndexedDBResult> = async () => {
  return new Promise((resolve, reject) => {
    if (!globalThis.window) {
      reject(new Error('IndexedDB is not working this environment'));
      return;
    }
    const DBOpenRequest = window.indexedDB.open(dbName, dbVer);
    DBOpenRequest.onupgradeneeded = (event) => {
      const db: IDBDatabase = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(dbStore)) {
        const objectStore = db.createObjectStore(dbStore, {
          keyPath: dbKeyPath,
        });
        objectStore.createIndex(dbToDoNameKey, dbToDoNameKey, {
          unique: false,
        });
        objectStore.createIndex(dbToDoDisplayOrderKey, dbToDoDisplayOrderKey, {
          unique: false,
        });
        objectStore.createIndex(dbKeyPath, dbKeyPath, { unique: true });
        objectStore.transaction.oncomplete = () => {
          console.log('createIndexedDB onupgradeneeded called');
          resolve({
            complete: true,
          });
        };
        objectStore.transaction.onerror = (event) => {
          reject(new Error('Transaction Error, createIndexedDB ->' + event));
        };
      }
    };
    DBOpenRequest.onsuccess = (event) => {
      const db: IDBDatabase = (event.target as IDBOpenDBRequest).result;
      const transaction = db.transaction([dbStore], 'readwrite');
      transaction.oncomplete = () => {
        console.log('createIndexedDB onupgradeneeded called');
        resolve({
          complete: true,
        });
      };
      transaction.onerror = (event) => {
        reject(new Error('Transaction Error, createIndexedDB ->' + event));
      };
    };
    DBOpenRequest.onerror = (event) => {
      console.error(event);
      reject(new Error('DBOpenRequest Error, createIndexedDB ->' + event));
    };
  });
};

export const fetchIndexedDB: () => Promise<Todo[]> = async () => {
  return new Promise((resolve, reject) => {
    if (!globalThis.window) {
      reject(new Error('IndexedDB is not working this environment'));
      return;
    }
    let result: Todo[];
    const DBOpenRequest = window.indexedDB.open(dbName, dbVer);
    DBOpenRequest.onsuccess = (event) => {
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
        reject(new Error('OpenCursor Error, fetchIndexedDB ->' + event));
      };
      transaction.oncomplete = () => {
        console.log('fetchIndexedDB called');
        resolve(result);
      };
      transaction.onerror = (event) => {
        reject(new Error('Transaction Error, fetchIndexedDB ->' + event));
      };
    };
    DBOpenRequest.onerror = (event) => {
      reject(new Error('DBOpenRequest Error, fetchIndexedDB ->' + event));
    };
  });
};

export const updatePartialIndexedDB: (
  id: string,
  updatedText: string,
) => Promise<IndexedDBResult> = async (id: string, updatedText: string) => {
  return new Promise((resolve, reject) => {
    if (!globalThis.window) {
      reject(new Error('IndexedDB is not working this environment'));
      return;
    }
    const DBOpenRequest = window.indexedDB.open(dbName, dbVer);
    DBOpenRequest.onsuccess = (event) => {
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
          reject(
            new Error('PutRequest Error, updatePartialIndexedDB ->' + event),
          );
        };
      };
      getRequest.onerror = (event) => {
        reject(
          new Error('GetRequest Error, updatePartialIndexedDB ->' + event),
        );
      };
      transaction.oncomplete = () => {
        console.log('updatePartialIndexedDB called');
        resolve({
          complete: true,
        });
      };
      transaction.onerror = (event) => {
        reject(
          new Error('Transaction Error, updatePartialIndexedDB ->' + event),
        );
      };
    };
    DBOpenRequest.onerror = (event) => {
      reject(
        new Error('DBOpenRequest Error, updatePartialIndexedDB ->' + event),
      );
    };
  });
};

export const updateAllIndexedDB: (
  todos: Todo[],
) => Promise<IndexedDBResult> = async (todos: Todo[]) => {
  return new Promise((resolve, reject) => {
    if (!globalThis.window) {
      reject(new Error('IndexedDB is not working this environment'));
      return;
    }
    const DBOpenRequest = window.indexedDB.open(dbName, dbVer);
    DBOpenRequest.onsuccess = (event) => {
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
          reject(new Error('PutRequest Error, updateAllIndexedDB ->' + event));
        };
      });
      transaction.oncomplete = () => {
        console.log('updateAllIndexedDB called');
        resolve({
          complete: true,
        });
      };
      transaction.onerror = (event) => {
        reject(new Error('Transaction Error, updateAllIndexedDB ->' + event));
      };
    };
    DBOpenRequest.onerror = (event) => {
      reject(new Error('DBOpenRequest Error, updateAllIndexedDB ->' + event));
    };
  });
};

export const insertIndexedDB: (
  id: string,
  displayOrder: number,
  name: string,
) => Promise<IndexedDBResult> = async (
  id: string,
  displayOrder: number,
  name: string,
) => {
  return new Promise((resolve, reject) => {
    if (!globalThis.window) {
      reject(new Error('IndexedDB is not working this environment'));
      return;
    }
    const newTodo: Todo = {
      id,
      displayOrder,
      name,
    };
    const DBOpenRequest = window.indexedDB.open(dbName, dbVer);
    DBOpenRequest.onsuccess = (event) => {
      const db: IDBDatabase = (event.target as IDBOpenDBRequest).result;
      const transaction = db.transaction([dbStore], 'readwrite');
      const objectStore = transaction.objectStore(dbStore);
      const addRequest = objectStore.add(newTodo);
      addRequest.onsuccess = () => {
        console.log('AddRequest success, insertIndexedDB');
      };
      addRequest.onerror = (event) => {
        reject(new Error('AddRequest Error, insertIndexedDB ->' + event));
      };
      transaction.oncomplete = () => {
        console.log('insertIndexedDB called');
        resolve({
          complete: true,
        });
      };
      transaction.onerror = (event) => {
        reject(new Error('Transaction Error, insertIndexedDB ->' + event));
      };
    };
    DBOpenRequest.onerror = (event) => {
      reject(new Error('DBOpenRequest Error, insertIndexedDB ->' + event));
    };
  });
};

export const deleteIndexedDB: (id: string) => Promise<IndexedDBResult> = async (
  id: string,
) => {
  return new Promise((resolve, reject) => {
    if (!globalThis.window) {
      reject(new Error('IndexedDB is not working this environment'));
      return;
    }
    const DBOpenRequest = window.indexedDB.open(dbName, dbVer);
    DBOpenRequest.onsuccess = (event) => {
      const db: IDBDatabase = (event.target as IDBOpenDBRequest).result;
      const transaction = db.transaction([dbStore], 'readwrite');
      const objectStore = transaction.objectStore(dbStore);
      const deleteRequest = objectStore.delete(id);
      deleteRequest.onsuccess = () => {
        console.log('DeleteRequest success, deleteIndexedDB');
      };
      deleteRequest.onerror = (event) => {
        reject(new Error('DeleteRequest Error, deleteIndexedDB ->' + event));
      };
      transaction.oncomplete = (event) => {
        console.log('deleteIndexedDB called');
        resolve({
          complete: true,
        });
      };
      transaction.onerror = (event) => {
        reject(new Error('Transaction Error, deleteIndexedDB ->' + event));
      };
    };
    DBOpenRequest.onerror = (event) => {
      reject(new Error('DBOpenRequest Error, deleteIndexedDB ->' + event));
    };
  });
};
export const clearIndexedDB: () => Promise<IndexedDBResult> = async () => {
  return new Promise((resolve, reject) => {
    if (!globalThis.window) {
      reject(new Error('IndexedDB is not working this environment'));
      return;
    }
    const DBOpenRequest = window.indexedDB.open(dbName, dbVer);
    DBOpenRequest.onsuccess = (event) => {
      const db: IDBDatabase = (event.target as IDBOpenDBRequest).result;
      const transaction = db.transaction([dbStore], 'readwrite');
      const objectStore = transaction.objectStore(dbStore);
      const deleteRequest = objectStore.clear();
      deleteRequest.onsuccess = () => {
        console.log('DeleteRequest success, clearIndexedDB');
      };
      deleteRequest.onerror = (event) => {
        reject(new Error('DeleteRequest Error, clearIndexedDB ->' + event));
      };
      transaction.oncomplete = (event) => {
        console.log('clearIndexedDB called');
        resolve({
          complete: true,
        });
      };
      transaction.onerror = (event) => {
        reject(new Error('Transaction Error, clearIndexedDB ->' + event));
      };
    };
    DBOpenRequest.onerror = (event) => {
      reject(new Error('DBOpenRequest Error, clearIndexedDB ->' + event));
    };
  });
};
