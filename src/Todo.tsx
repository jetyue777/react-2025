import { useEffect } from 'react';
import { Box, CircularProgress, Divider, Typography } from '@mui/material';
import styles from './Todo.module.scss';
import TodoForm from './TodoForm/TodoForm';
import TodoList from './TodoList/TodoList';
import TodoItemDetail from './TodoItemDetail/TodoItemDetail';
import { useTodos, useTodoItem } from '../../hooks/useTodoQueries';
import { useTodoStore } from '../../store/todoStore';

const Todo = () => {
  const {
    selectedTodoId,
    setSelectedTodoId,
    deletingIds
  } = useTodoStore();

  const {
    data: todos = [],
    isLoading: loadingStatus,
    isError: loadingFailed,
    refetch
  } = useTodos();

  const {
    data: todoItem,
    isLoading: loadItemStatus
  } = useTodoItem(selectedTodoId || '');

  const handleDeleteTodo = (id: string) => {
    if (selectedTodoId === id) {
      setSelectedTodoId(null);
    }
  };

  let itemDetail;

  if (!selectedTodoId) {
    itemDetail = (
      <Typography variant="h5" component="div">
        Please select a Todo from list to view.
      </Typography>
    );
  } else if (loadItemStatus) {
    itemDetail = (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );
  } else if (todoItem) {
    itemDetail = (
      <TodoItemDetail
        todoItem={todoItem}
        onDeleteTodo={handleDeleteTodo}
        deletingIds={deletingIds}
      />
    );
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.content}>
        <TodoForm />
        <Divider className={styles.divider} />
        <div>
          {loadingStatus && <CircularProgress />}
          {!loadingStatus && <TodoList onDeleteTodo={handleDeleteTodo} />}
          {loadingFailed && (
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