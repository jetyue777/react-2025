// src/features/todos/TodoList/TodoList.tsx
import React from "react";
import { Box, Button, Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { TodoItem } from "../../../shared/models/todo.interface";
import { useAppDispatch } from "../../../shared/hooks/hooks";
import { useGetTodosQuery, useDeleteTodoMutation } from "../../../api/todoApi";
import { setSelectedTodoId } from "../../../store/todoSlice";

interface TodoListProps {
  onDeleteTodo: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ onDeleteTodo }) => {
  const dispatch = useAppDispatch();

  // Use RTK Query hooks
  const { data: todos = [], isLoading } = useGetTodosQuery();
  const [deleteTodo, { isLoading: isDeleting }] = useDeleteTodoMutation();

  const handleClickTodo = (id: string) => {
    console.log(id);
    if (id) {
      dispatch(setSelectedTodoId(id));
    }
  };

  const handleDeleteTodo = (event: React.MouseEvent<HTMLButtonElement>, id: string) => {
    event.stopPropagation();
    onDeleteTodo(id);
  };

  let todoContent;

  if (todos.length > 0) {
    todoContent = todos.map((todo: TodoItem) => (
      <Card key={todo.id} sx={{mb: 1}}>
        <Box sx={{display: 'flex', alignItems: 'center'}}>
          <CardActionArea onClick={() => handleClickTodo(todo.id)}>
            <CardContent>
              <Typography variant="h5" component="div">
                {todo.description}
              </Typography>
            </CardContent>
          </CardActionArea>
          <Button
            size="medium"
            color="primary"
            variant="outlined"
            loading={isDeleting}
            onClick={(e) => handleDeleteTodo(e, todo.id)}
            LoadingPosition="start"
          >
            Remove
          </Button>
        </Box>
      </Card>
    ));
  } else {
    todoContent = (
      <Typography variant="h5" component="div">
        No todo is found
      </Typography>
    );
  }

  return (
    <>
      {todoContent}
    </>
  );
};

export default TodoList;