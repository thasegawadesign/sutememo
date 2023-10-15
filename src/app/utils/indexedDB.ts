import { IndexedDBResult } from "@/types/IndexedDBResult";
import { Todo } from "@/types/Todo";
import { sortTodosOrderByDisplayOrder } from "./sortTodosOrderByDisplayOrder";

const dbVer = 1;
const dbName = 'TodoDB';
const dbStore = 'todos';
const dbKeyPath = 'id';
const dbToDoNameKey = 'name';
const dbToDoDisplayOrderKey = 'displayOrder';

export const createIndexedDB: () => Promise<IndexedDBResult> = async () => {
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
};

export const fetchIndexedDB: () => Promise<Todo[]> = async () => {
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
};

export const updatePartialIndexedDB: (
  id: string,
  updatedText: string,
) => Promise<IndexedDBResult> = async (id: string, updatedText: string) => {
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
};

export const updateAllIndexedDB: (todos: Todo[]) => Promise<IndexedDBResult> = async (
  todos: Todo[],
) => {
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
};

export const deleteIndexedDB: (id: string) => Promise<IndexedDBResult> = async (
  id: string,
) => {
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
};