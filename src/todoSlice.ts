// src/store/todoSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TodoItem } from '../shared/models/todo.interface';

// Define a simpler TodoState since RTK Query will handle API states
export interface TodoState {
  selectedTodoId: string | null;
}

export const initialTodoState: TodoState = {
  selectedTodoId: null
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState: initialTodoState,
  reducers: {
    // Set the selected todo ID (for UI purposes)
    setSelectedTodoId: (state, action: PayloadAction<string | null>) => {
      state.selectedTodoId = action.payload;
    }
  }
});

// Export actions
export const { setSelectedTodoId } = todoSlice.actions;

// Export default reducer
export default todoSlice.reducer;