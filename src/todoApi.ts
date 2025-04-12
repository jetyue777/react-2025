// src/api/todoApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TodoItem } from '../shared/models/todo.interface';

// Define the base URL as a constant for better maintainability
const BASE_URL = 'https://react-architecture-todo-default-rtdb.firebaseio.com';

// Define the shape of the response from Firebase
interface FirebaseResponse {
  [key: string]: { description: string };
}

// Transform function to convert Firebase response to our TodoItem[] format
const transformTodosResponse = (response: FirebaseResponse): TodoItem[] => {
  if (!response) return [];

  const mappedData: TodoItem[] = [];
  for (const id in response) {
    mappedData.push({
      id,
      description: response[id].description
    });
  }
  return mappedData;
};

// RTK Query API definition
export const todoApi = createApi({
  // Unique reducer path for this API slice
  reducerPath: 'todoApi',

  // Base configuration for all requests
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),

  // Tag types for cache invalidation
  tagTypes: ['Todos', 'Todo'],

  // Define API endpoints
  endpoints: (builder) => ({
    // Get all todos
    getTodos: builder.query<TodoItem[], void>({
      query: () => `/todos.json`,
      transformResponse: transformTodosResponse,
      providesTags: ['Todos']
    }),

    // Get a single todo
    getTodoById: builder.query<TodoItem, string>({
      query: (id) => `/todos/${id}.json`,
      transformResponse: (response: { description: string }, _, id) => ({
        id: id,
        description: response?.description
      }),
      providesTags: (_, __, id) => [{ type: 'Todo', id }]
    }),

    // Add a new todo
    addTodo: builder.mutation<{ name: string }, string>({
      query: (description) => ({
        url: '/todos.json',
        method: 'POST',
        body: { description }
      }),
      // Transform the returned Firebase key into our format
      transformResponse: (response: { name: string }) => response,
      invalidatesTags: ['Todos']
    }),

    // Delete a todo
    deleteTodo: builder.mutation<void, string>({
      query: (id) => ({
        url: `/todos/${id}.json`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Todos']
    })
  })
});

// Export auto-generated hooks
export const {
  useGetTodosQuery,
  useGetTodoByIdQuery,
  useAddTodoMutation,
  useDeleteTodoMutation
} = todoApi;