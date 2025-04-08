import { useEffect } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Todo.module.scss";

import { ApiStatus } from "../../shared/models/todo.interface";
import { deleteTodo, LoadTodos } from "../../store/actions/todoActions";
import { IState, ITodoItem } from "../../store/types";
import TodoForm from "./TodoForm/TodoForm";
import TodoList from "./TodoList/TodoList";
import TodoItemDetail from "./TodoItemDetail/TodoItemDetail";

const Todo = () => {
  const dispatch = useDispatch();

  const loadingStatus = useSelector(
    (state: IState) => state.todos.loadingStatus
  );
  const loadItemStatus = useSelector(
    (state: IState) => state.todos.loadItemStatus
  );
  const todoItem = useSelector(
    (state: IState): ITodoItem | undefined => state.todos.todoItem
  );

  useEffect(() => {
    dispatch(LoadTodos());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    dispatch(deleteTodo(id));
  };

  const renderItemDetail = () => {
    if (loadItemStatus === ApiStatus.LOADING) {
      return (
        <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
          <CircularProgress />
        </Box>
      );
    }

    if (loadItemStatus === ApiStatus.LOADED && todoItem) {
      return (
        <TodoItemDetail todoItem={todoItem} onDeleteTodo={handleDelete} />
      );
    }

    if (loadItemStatus === ApiStatus.LOADED && !todoItem) {
      return (
        <Typography variant="h6" component="div">
          Please select a Todo from the list to view.
        </Typography>
      );
    }

    return null;
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.content}>
        <TodoForm />

        <Divider className={styles.divider} />

        <div>
          {loadingStatus === ApiStatus.LOADING && <CircularProgress />}

          {loadingStatus === ApiStatus.LOADED && (
            <TodoList onDeleteTodo={handleDelete} />
          )}

          {loadingStatus === ApiStatus.FAILED && (
            <Typography color="error">Failed to load todos.</Typography>
          )}
        </div>
      </div>

      <Divider orientation="vertical" flexItem sx={{ mx: 5 }} />

      <div>{renderItemDetail()}</div>
    </div>
  );
};

export default Todo;
