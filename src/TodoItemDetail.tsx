import React from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { TodoItem } from '../../models/todo.interface';
import todoImage from '../../assets/messy-pencils.jpg';
import { useTodoStore } from '../../store/todoStore';
import { useDeleteTodo } from '../../hooks/useTodoQueries';

interface TodoItemDetailProps {
  todoItem: TodoItem;
}

const TodoItemDetail: React.FC<TodoItemDetailProps> = ({ todoItem }) => {
  const { deletingIds } = useTodoStore();
  const deleteTodoMutation = useDeleteTodo();

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    deleteTodoMutation.mutate(todoItem.id);
  };

  const isDeleting = deletingIds.includes(todoItem.id);

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
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur et commodi deleniti, dismissimos
          aliquam eveniet ex provident tenetur. Atque commodi deserunt ipsa obcaecati quos reprehenderit sed sequi
          vero!
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color="primary"
          variant="outlined"
          loading={isDeleting}
          onClick={handleDelete}
          loadingPosition="start"
        >
          Remove
        </Button>
      </CardActions>
    </Card>
  );
};

export default TodoItemDetail;