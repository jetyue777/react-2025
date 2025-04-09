// src/features/todos/todoEpics.ts
import { ofType } from 'redux-observable';
import {
  filter,
  switchMap,
  map,
  catchError,
  mergeMap,
  startWith,
  of
} from 'rxjs';
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { Epic } from '../../store/rootEpic';
import axiosCustomRequest from '../../api/axiosCustomRequest';
import { todoActions } from './todoSlice';
import { TodoItem } from './types';

// Helper function to map response data to TodoItems
const mapResponseToTodoData = (responseData: any): TodoItem[] => {
  if (!responseData) {
    return [];
  }

  const mappedTodoData: TodoItem[] = [];

  for (const id in responseData) {
    mappedTodoData.push({
      id,
      description: responseData[id].description
    });
  }

  return mappedTodoData;
};

// Load all todos epic
export const loadTodosEpic: Epic = (action$) => action$.pipe(
  filter(todoActions.loadTodos.match),
  switchMap(() =>
    axiosCustomRequest({
      method: 'get',
      url: '/todos.json'
    }).pipe(
      map((response: AxiosResponse<any>) =>
        todoActions.loadedTodos(mapResponseToTodoData(response.data))
      ),
      startWith(todoActions.loadingTodos()),
      catchError(() => of(todoActions.loadingTodosFailed()))
    )
  )
);

// Load single todo item epic
export const loadTodoItemEpic: Epic = (action$) => action$.pipe(
  filter(todoActions.loadTodoItem.match),
  switchMap((action: PayloadAction<string>) =>
    axiosCustomRequest({
      method: 'get',
      url: `/todos/${action.payload}.json`
    }).pipe(
      map((response: AxiosResponse<any>) =>
        todoActions.loadedTodoItem({
          id: action.payload,
          description: response.data.description
        })
      ),
      startWith(todoActions.loadingTodoItem()),
      catchError(() => of(todoActions.loadingTodoItemFailed()))
    )
  )
);

// Add todo epic
export const addTodoEpic: Epic = (action$) => action$.pipe(
  filter(todoActions.addTodo.match),
  mergeMap((action: PayloadAction<string>) =>
    axiosCustomRequest({
      method: 'post',
      url: '/todos.json',
      data: { description: action.payload }
    }).pipe(
      map((response: AxiosResponse<any>) => {
        const addedTodoItem: TodoItem = {
          id: response.data.name,
          description: action.payload
        };
        return todoActions.addedTodo(addedTodoItem);
      }),
      startWith(todoActions.addingTodo()),
      catchError(() => of(todoActions.addingTodoFailed()))
    )
  )
);

// Delete todo epic
export const deleteTodoEpic: Epic = (action$) => action$.pipe(
  filter(todoActions.deleteTodo.match),
  mergeMap((action: PayloadAction<string>) =>
    axiosCustomRequest({
      method: 'delete',
      url: `/todos/${action.payload}.json`
    }).pipe(
      map(() => todoActions.deletedTodo(action.payload)),
      startWith(todoActions.deletingTodo(action.payload)),
      catchError(() => of(todoActions.deletingTodoFailed(action.payload)))
    )
  )
);

// Combine all todo epics
export const todoEpics = [
  loadTodosEpic,
  loadTodoItemEpic,
  addTodoEpic,
  deleteTodoEpic
];