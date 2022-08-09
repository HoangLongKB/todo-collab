import { createSelector } from "reselect";
import { FILTER_STATUS } from "../../constant/filter";
import { State, Todo } from "../../model";

export const searchSelector = (state: State) => state.filter.search;
export const prioritySelector = (state: State) => state.filter.priority;
export const statusSelector = (state: State) => state.filter.status;
export const todosSelector = (state: State) => state.todos;

export const filteredTodoSelector = createSelector(
  todosSelector,
  searchSelector,
  prioritySelector,
  statusSelector,
  (todoList, search, priority, status) => {
    const searchedTodos = filterBySearch(todoList, search);
    const todoFilteredByPriority = filterByPriority(searchedTodos, priority);
    return filterByStatus(todoFilteredByPriority, status);
  }
);

const filterBySearch = (todoList: Todo[], search: string) => {
  return todoList.filter(todo => todo.name.toLowerCase().includes(search.toLowerCase()));
}

const filterByPriority = (todoList: Todo[], priority: number[]) => {
  if (priority.length > 0) {
    return todoList.filter(todo => priority.includes(todo.priority));
  }
  return todoList;
}

const filterByStatus = (todoList: Todo[], status: string) => {
  if (status === FILTER_STATUS.ALL) {
    return todoList;
  }
  const isCompleted = status === FILTER_STATUS.COMPLETED;
  return todoList.filter(todo => todo.completed === isCompleted);
}

