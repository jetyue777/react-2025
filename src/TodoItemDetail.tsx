// src/features/todos/TodoItemDetail/TodoItemDetail.tsx
import React from "react";
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { TodoItem } from "../../../shared/models/todo.interface";
import todoImage from "../../../assets/messy-pencils.jpg";
import { useDeleteTodoMutation } from "../../../api/todoApi";

interface TodoItemDetailProps {
  todoItem: TodoItem;
}

const TodoItemDetail: React.FC<TodoItemDetailProps> = ({ todoItem }) => {
  const [deleteTodo, { isLoading: isDeleting }] = useDeleteTodoMutation();

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    deleteTodo(todoItem.id);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        alt="todo item"
        src={todoImage}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {todoItem.description}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {todoItem.id}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur et commodi deleniti, dignissimos ea verol
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color="primary"
          variant="outlined"
          loading={isDeleting}
          onClick={handleDelete}
          LoadingPosition="start"
        >
          Remove
        </Button>
      </CardActions>
    </Card>
  );
};

export default TodoItemDetail;