import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {TodoItem} from '../../shared/models/todo.interface.ts';

const BASE_URL = 'https://react-architecture-todo-default-rtdb.firebaseio.com';

interface FirebaseResponse {
  [key: string]: { description: string };
}

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

export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
  tagTypes: ['Todos', 'Todo'],
  keepUnusedDataFor: 60, // default is 60 seconds
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    getTodos: builder.query<TodoItem[], void>({
      query: () => '/todos.json',
      transformResponse: transformTodosResponse,
      keepUnusedDataFor: 60, // 60 seconds
      providesTags: (result) =>
        // Return both a collection tag and individual item tags
        result
          ? [
            {type: 'Todos', id: 'LIST'},
            ...result.map(({id}) => ({type: 'Todo', id}))
          ]
          : [{type: 'Todos', id: 'LIST'}]
    }),

    getTodoById: builder.query<TodoItem, string>({
      query: (id: string) => `/todos/${id}.json`,
      transformResponse: (response: { description: string }, _, id: string) => ({
        id: id,
        description: response?.description
      }),
      providesTags: (_, __, id) => [{type: 'Todo', id}]
    }),

    addTodo: builder.mutation<string, string>({
      query: (description: string) => ({
        url: '/todos.json',
        method: 'POST',
        body: {description}
      }),
      transformResponse: (response: { name: string }) => response,
      // Only invalidate the list, not individual items
      invalidatesTags: [{type: 'Todos', id: 'LIST'}]
    }),

    deleteTodo: builder.mutation<void, string>({
      query: (id: string) => ({
        url: `/todos/${id}.json`,
        method: 'DELETE'
      }),
      // Invalidate both the list and the specific item
      invalidatesTags: (_, __, id) => [
        {type: 'Todos', id: 'LIST'},
        {type: 'Todo', id}
      ]
    }),

    // Adding an updateTodo mutation to show complete patterns
    updateTodo: builder.mutation<void, TodoItem>({
      query: ({id, description}) => ({
        url: `/todos/${id}.json`,
        method: 'PATCH',
        body: {description}
      }),
      // Only invalidate the specific item that was updated
      invalidatesTags: (_, __, {id}) => [{type: 'Todo', id}]
    })
  })
});

export const {
  useGetTodosQuery,
  useGetTodoByIdQuery,
  useAddTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation
} = todoApi;