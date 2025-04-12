import React from 'react';
import { Box, Button, Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { TodoItem } from '../../models/todo.interface';
import { useTodoStore } from '../../store/todoStore';
import { useTodos, useTodoItem, useDeleteTodo } from '../../hooks/useTodoQueries';

interface TodoListProps {
  onDeleteTodo: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ onDeleteTodo }) => {
  const { data: todos = [], isLoading } = useTodos();
  const { setSelectedTodoId, deletingIds } = useTodoStore();
  const deleteTodoMutation = useDeleteTodo();

  const handleClickTodo = (id: string) => {
    console.log(id);
    setSelectedTodoId(id);
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
          <Button
            size="medium"
            color="primary"
            variant="outlined"
            loading={deletingIds.includes(todo.id)}
            onClick={(e) => handleDeleteTodo(e, todo.id)}
            loadingPosition="start"
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

  console.log(deletingIds);
  console.log(`deleting status: ${isLoading}`);

  return (
    <>{todoContent}</>
  );
};

export default TodoList;