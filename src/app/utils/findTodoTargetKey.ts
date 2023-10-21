import { Todo } from '@/types/Todo';

export const findIndex = function (todos: Todo[], id: string) {
  let targetIndex = -1;
  todos.forEach((todo, i) => {
    if (id === todo.id) targetIndex = i;
  });
  return targetIndex;
};
export const findName = function (todos: Todo[], id: string) {
  let targetName = '';
  todos.forEach((todo) => {
    if (id === todo.id) targetName = todo.name;
  });
  return targetName;
};
export const findDisplayOrder = function (todos: Todo[], id: string) {
  let targetOrder = -1;
  todos.forEach((todo, i) => {
    if (id === todo.id) targetOrder = todo.displayOrder;
  });
  return targetOrder;
};
