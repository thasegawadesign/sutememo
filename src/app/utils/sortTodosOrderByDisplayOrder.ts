import { Todo } from '@/types/Todo';

export const sortTodosOrderByDisplayOrder = (todos: Todo[]) => {
  const tmpArr: Todo[] = [];
  todos.map((todo, index) => {
    tmpArr.push({ id: todo.id, displayOrder: index, name: todo.name });
  });
  const sortedTodos = tmpArr.toSorted(
    (a, b) => a.displayOrder - b.displayOrder,
  );
  return sortedTodos;
};
