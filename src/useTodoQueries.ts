import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { todoApi } from '../api/todoApi';
import { TodoItem } from '../models/todo.interface';
import { useTodoStore } from '../store/todoStore';

export const todoKeys = {
  all: ['todos'] as const,
  lists: () => [...todoKeys.all, 'list'] as const,
  details: () => [...todoKeys.all, 'detail'] as const,
  detail: (id: string) => [...todoKeys.details(), id] as const,
};

export const useTodos = () => {
  return useQuery({
    queryKey: todoKeys.lists(),
    queryFn: todoApi.fetchTodos,
  });
};

export const useTodoItem = (id: string) => {
  return useQuery({
    queryKey: todoKeys.detail(id),
    queryFn: () => todoApi.fetchTodoItem(id),
    enabled: !!id,
  });
};

export const useAddTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: todoApi.createTodo,
    onSuccess: (newTodo) => {
      queryClient.setQueryData<TodoItem[]>(
        todoKeys.lists(),
        (old = []) => [...old, newTodo]
      );
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  const { addDeletingId, removeDeletingId, selectedTodoId, setSelectedTodoId } = useTodoStore();

  return useMutation({
    mutationFn: todoApi.deleteTodo,

    onMutate: async (deletedId) => {
      addDeletingId(deletedId);

      if (selectedTodoId === deletedId) {
        setSelectedTodoId(null);
      }

      await queryClient.cancelQueries({ queryKey: todoKeys.lists() });

      const previousTodos = queryClient.getQueryData<TodoItem[]>(todoKeys.lists());

      queryClient.setQueryData<TodoItem[]>(
        todoKeys.lists(),
        (old = []) => old.filter(todo => todo.id !== deletedId)
      );

      return { previousTodos };
    },

    onError: (err, id, context) => {
      queryClient.setQueryData(todoKeys.lists(), context?.previousTodos);
    },

    onSettled: (data, error, id) => {
      removeDeletingId(id);
      queryClient.invalidateQueries({ queryKey: todoKeys.lists() });
    },
  });
};