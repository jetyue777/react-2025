// src/features/todos/TodoList.tsx
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  LoadingButton
} from '@mui/material';
import DeleteForever from '@mui/icons-material/DeleteForever';
import { todoActions } from './todoSlice';
import { RootState } from '../../store/rootReducer';
import { ApiStatus, TodoItem } from './types';

interface TodoListProps {
  onDeleteTodo: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ onDeleteTodo }) => {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos.todos);
  const deletingIds = useSelector((state: RootState) => state.todos.deletingIds);
  const deletingStatus = useSelector((state: RootState) => state.todos.deletingStatus);

  const handleClickTodo = (id: string) => {
    if (id) {
      dispatch(todoActions.loadTodoItem(id));
    }
  };

  const handleDeleteTodo = (event: React.MouseEvent<HTMLButtonElement>, id: string) => {
    event.stopPropagation();
    onDeleteTodo(id);
  };

  let todoContent;

  if (todos.length > 0) {
    todoContent = todos.map((todo: TodoItem) => (
      <Card key={todo.id} sx={{ mb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CardActionArea onClick={() => handleClickTodo(todo.id)}>
            <CardContent>
              <Typography variant="h5" component="div">
                {todo.description}
              </Typography>
            </CardContent>
          </CardActionArea>
          <LoadingButton
            size="medium"
            color="primary"
            variant="outlined"
            loading={deletingIds.includes(todo.id)}
            onClick={(e) => handleDeleteTodo(e, todo.id)}
            loadingPosition="start"
            startIcon={<DeleteForever />}
          >
            Remove
          </LoadingButton>
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
    <>{todoContent}</>
  );
};

export default TodoList;