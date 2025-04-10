// src/features/todos/Todo.tsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  CircularProgress,
  Divider,
  Typography
} from '@mui/material';
import { todoActions } from './todoSlice';
import { ApiStatus } from './types';
import { RootState } from '../../store/rootReducer';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import TodoItemDetail from './TodoItemDetail';
import styles from './Todo.module.scss';

const Todo = () => {
  const dispatch = useDispatch();

  const loadingStatus = useSelector((state: RootState) => state.todos.loadingStatus);
  const loadItemStatus = useSelector((state: RootState) => state.todos.loadItemStatus);
  const todoItem = useSelector((state: RootState) => state.todos.todoItem);

  useEffect(() => {
    // Load todos when component mounts
    dispatch(todoActions.loadTodos());
  }, [dispatch]);

  const handleDeleteTodo = (id: string) => {
    dispatch(todoActions.deleteTodo(id));
  };

  let itemDetail;

  if (loadItemStatus === ApiStatus.LOADED && !todoItem) {
    itemDetail = (
      <Typography variant="h5" component="div">
        Please select a Todo from list to view.
      </Typography>
    );
  } else if (loadItemStatus === ApiStatus.LOADING) {
    itemDetail = (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );
  } else if (loadItemStatus === ApiStatus.LOADED && todoItem) {
    itemDetail = (
      <TodoItemDetail
        todoItem={todoItem}
        onDeleteTodo={handleDeleteTodo}
        deletingIds={useSelector((state: RootState) => state.todos.deletingIds)}
      />
    );
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.content}>
        <TodoForm />
        <Divider className={styles.divider} />
        <div>
          {loadingStatus === ApiStatus.LOADING && <CircularProgress />}
          {loadingStatus === ApiStatus.LOADED && <TodoList onDeleteTodo={handleDeleteTodo} />}
          {loadingStatus === ApiStatus.FAILED && (
            <Typography color="error">Failed to load todos</Typography>
          )}
        </div>
      </div>
      <Divider orientation="vertical" variant="middle" flexItem sx={{ mx: 3 }} />
      <div>
        {itemDetail}
      </div>
    </div>
  );
};

export default Todo;