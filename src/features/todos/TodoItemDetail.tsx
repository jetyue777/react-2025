// src/features/todos/TodoItemDetail.tsx
import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
  LoadingButton
} from '@mui/material';
import DeleteForever from '@mui/icons-material/DeleteForever';
import { TodoItem } from './types';

interface TodoItemDetailProps {
  todoItem: TodoItem;
  onDeleteTodo: (id: string) => void;
  deletingIds: string[];
}

const TodoItemDetail: React.FC<TodoItemDetailProps> = ({
                                                         todoItem,
                                                         onDeleteTodo,
                                                         deletingIds
                                                       }) => {
  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onDeleteTodo(todoItem.id);
  };

  // Check if this todo is currently being deleted
  const isDeleting = deletingIds.includes(todoItem.id);

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        alt="todo item"
        src="/assets/messy-pencils.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {todoItem.description}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {todoItem.id}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur at commodi deleniti, dignissimos ea eligendi eveniet ex provident tenetur. Atque commodi deserunt ipsa obcaecati quos reprehenderit sed sequi vero!
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton
          size="small"
          color="primary"
          variant="outlined"
          loading={isDeleting}
          onClick={handleDelete}
          loadingPosition="start"
          startIcon={<DeleteForever />}
        >
          Remove
        </LoadingButton>
      </CardActions>
    </Card>
  );
};

export default TodoItemDetail;