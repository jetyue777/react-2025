import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface TodoStore {
  selectedTodoId: string | null;
  setSelectedTodoId: (id: string | null) => void;

  deletingIds: string[];
  addDeletingId: (id: string) => void;
  removeDeletingId: (id: string) => void;
}

export const useTodoStore = create<TodoStore>()(
  devtools(
    (set) => ({
      selectedTodoId: null,
      setSelectedTodoId: (id) => set({ selectedTodoId: id }),

      deletingIds: [],
      addDeletingId: (id) => set((state) => ({
        deletingIds: [...state.deletingIds, id]
      })),
      removeDeletingId: (id) => set((state) => ({
        deletingIds: state.deletingIds.filter((itemId) => itemId !== id)
      })),
    }),
    { name: 'Todo Store' }
  )
);