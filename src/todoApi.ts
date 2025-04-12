import axios from 'axios';
import { TodoItem } from '../models/todo.interface';

const api = axios.create({
  baseURL: 'https://react-architecture-todo-default-rtdb.firebaseio.com'
});

export const todoApi = {
  fetchTodos: async (): Promise<TodoItem[]> => {
    const response = await api.get<Record<string, TodoItem>>('/todos.json');

    if (!response.data) return [];

    return Object.entries(response.data).map(([id, data]) => ({
      id,
      description: data.description
    }));
  },

  fetchTodoItem: async (id: string): Promise<TodoItem> => {
    const response = await api.get<{description: string}>(`/todos/${id}.json`);
    return {
      id,
      description: response.data.description
    };
  },

  createTodo: async (description: string): Promise<TodoItem> => {
    const response = await api.post<{name: string}>('/todos.json', { description });
    return {
      id: response.data.name,
      description
    };
  },

  deleteTodo: async (id: string): Promise<string> => {
    await api.delete(`/todos/${id}.json`);
    return id;
  }

};