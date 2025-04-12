// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { todoApi } from '../api/todoApi';
import { todoSlice } from './todoSlice';

export const store = configureStore({
  reducer: {
    // Add the todoApi reducer to the store
    [todoApi.reducerPath]: todoApi.reducer,
    // Keep the todoSlice reducer for any local state
    // that's not directly handled by RTK Query
    todos: todoSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todoApi.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

// Enable refetchOnFocus and refetchOnReconnect
setupListeners(store.dispatch);

// Export types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;