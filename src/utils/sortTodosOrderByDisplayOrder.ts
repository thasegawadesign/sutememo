import { Todo } from '@/types/Todo';

export const sortTodosOrderByDisplayOrder = (todos: Todo[]) => {
  const arr: Todo[] = [];
  todos.map((todo, index) => {
    arr.push({ ...todo, displayOrder: index });
  });
  return arr.toSorted((a, b) => a.displayOrder - b.displayOrder);
};
