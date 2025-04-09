// src/store/rootEpic.ts
import { Action } from '@reduxjs/toolkit';
import { combineEpics, Epic as ReduxObservableEpic } from 'redux-observable';
import { Observable } from 'rxjs';
import { todoEpics } from '../features/todos/todoEpics';
import { RootState } from './rootReducer';

// Define our Epic type with proper typing for TypeScript
export type Epic = ReduxObservableEpic<Action, Action, RootState, any>;

// Flatten the todoEpics array and combine all epics
export const rootEpic: Epic = combineEpics(
  ...todoEpics
);