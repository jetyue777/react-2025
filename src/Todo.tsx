// src/features/todos/Todo.tsx
import { useEffect } from "react";
import { Box, CircularProgress, Divider, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../shared/hooks/hooks";
import { useGetTodosQuery, useGetTodoByIdQuery, useDeleteTodoMutation } from "../../api/todoApi";
import TodoList from "./TodoList/TodoList.tsx";
import TodoForm from "./TodoForm/TodoForm.tsx";
import TodoItemDetail from "./TodoItemDetail/TodoItemDetail.tsx";
import styles from "./Todo.module.scss";

const Todo = () => {
  const dispatch = useAppDispatch();
  const selectedTodoId = useAppSelector(state => state.todos.selectedTodoId);

  // RTK Query hooks
  const {
    data: todos = [],
    isLoading: isLoadingTodos,
    isError: isTodosError
  } = useGetTodosQuery();

  const {
    data: selectedTodo,
    isLoading: isLoadingTodoItem
  } = useGetTodoByIdQuery(selectedTodoId || '', {
    skip: !selectedTodoId // Skip query if no ID is selected
  });

  const [deleteTodo] = useDeleteTodoMutation();

  const handleDeleteTodo = (id: string) => {
    deleteTodo(id);
  };

  let itemDetail;

  if (!selectedTodoId) {
    itemDetail = (
      <Typography variant="h5" component="div">
        Please select a Todo from list to view.
      </Typography>
    );
  } else if (isLoadingTodoItem) {
    itemDetail = (
      <Box sx={{display: 'flex'}}>
        <CircularProgress/>
      </Box>
    );
  } else if (selectedTodo) {
    itemDetail = (
      <TodoItemDetail todoItem={selectedTodo} />
    );
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.content}>
        <TodoForm />
        <Divider className={styles.divider} />
        <div>
          {isLoadingTodos && <CircularProgress />}
          {!isLoadingTodos && !isTodosError && <TodoList onDeleteTodo={handleDeleteTodo} />}
          {isTodosError && (
            <Typography color="error">Failed to load todos.</Typography>
          )}
        </div>
      </div>
      <Divider orientation="vertical" variant="middle" flexItem sx={{mx: 3}} />
      <div>
        {itemDetail}
      </div>
    </div>
  );
};

export default Todo;