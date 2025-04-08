// features/todos/api.ts
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Todo } from '../../shared/models/todo';

// Axios instance for Firebase REST API
const api = axios.create({
  baseURL: 'https://react-architecture-todo-default-rtdb.firebaseio.com',
});

// Data shape from Firebase (without the id, which is the key)
type TodoData = Omit<Todo, 'id'>;

/** Fetch all todos (GET). Uses AbortSignal for cancellation (switchMap behavior). */
const fetchTodos = async ({ signal }: { signal?: AbortSignal }): Promise<Todo[]> => {
  const response = await api.get<Record<string, TodoData> | null>('/todos.json', { signal });
  const data = response.data;
  if (!data) {
    return []; // no todos
  }
  // Transform { key: {title, completed}, ... } into Todo[]
  return Object.entries(data).map(([id, todo]) => ({ id, ...todo }));
};

/** Fetch a single todo by ID (GET). Aborted if query becomes outdated. */
const fetchTodo = async (id: string, signal?: AbortSignal): Promise<Todo> => {
  const response = await api.get<TodoData | null>(`/todos/${id}.json`, { signal });
  const data = response.data;
  if (!data) {
    throw new Error('Todo not found');
  }
  return { id, ...data };
};

/** Add a new todo (POST). Returns the created Todo (with generated ID). */
const addTodo = async (newTodo: Omit<Todo, 'id'>): Promise<Todo> => {
  const response = await api.post<{ name: string }>(`/todos.json`, newTodo);
  const { name: id } = response.data;  // Firebase returns the new record's key as "name"
  return { id, ...newTodo };
};

/** Delete a todo by ID (DELETE). */
const deleteTodo = async (id: string): Promise<void> => {
  await api.delete(`/todos/${id}.json`);
  // No data returned on delete; just resolve if successful.
};

// React Query Hooks:

/** useTodosQuery: fetches the todo list, cancels previous fetch if a new one starts. */
export function useTodosQuery() {
  return useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,  // React Query will pass { signal } to fetchTodos
    // staleTime, refetchOnWindowFocus, etc., can be configured as needed
  });
}

/** useTodoItemQuery: fetches a single todo item by ID. Cancels any prior fetch if ID changes. */
export function useTodoItemQuery(todoId: string | null) {
  return useQuery({
    queryKey: ['todo', todoId],
    enabled: !!todoId,             // only run when an ID is provided
    queryFn: ({ signal }) => {
      // If called without an ID (shouldn't happen due to enabled flag), throw:
      if (!todoId) throw new Error('No todo ID provided');
      return fetchTodo(todoId, signal);
    },
    // The AbortSignal (signal) ensures that if todoId changes (previous query becomes unused),
    // the previous request is aborted&#8203;:contentReference[oaicite:3]{index=3}.
  });
}

/** useAddTodoMutation: posts a new todo. Multiple calls are allowed concurrently. */
export function useAddTodoMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      // After adding, refresh the todos list (parallel requests won't cancel each other)
      queryClient.invalidateQueries(['todos']);
    },
  });
}

/** useDeleteTodoMutation: deletes a todo by ID. Allows concurrent deletions. */
export function useDeleteTodoMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      // Invalidate todos list to refetch updated data
      queryClient.invalidateQueries(['todos']);
    },
  });
}
