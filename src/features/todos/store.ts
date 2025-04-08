// features/todos/store.ts
import { create } from 'zustand';

interface TodoUIState {
  selectedTodoId: string | null;
  setSelectedTodo: (id: string | null) => void;
}

export const useTodoUIStore = create<TodoUIState>((set) => ({
  selectedTodoId: null,
  setSelectedTodo: (id) => set({ selectedTodoId: id }),
}));
