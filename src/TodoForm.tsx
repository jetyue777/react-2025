import { ChangeEvent, useState } from 'react';
import { Button, TextField } from '@mui/material';
import styles from './TodoForm.module.scss';
import { useAddTodo } from '../../hooks/useTodoQueries';

const TodoForm = () => {
  const [description, setDescription] = useState('');
  const addTodoMutation = useAddTodo();

  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleAddTodo = () => {
    if (description.trim()) {
      addTodoMutation.mutate(description, {
        onSuccess: () => {
          setDescription('');
        }
      });
    }
  };

  return (
    <div>
      <TextField
        multiline
        placeholder="Enter todo message"
        rows={5}
        variant="outlined"
        onChange={handleDescriptionChange}
        value={description}
        fullWidth
      />
      <Button
        className={styles.addButton}
        color="primary"
        variant="outlined"
        onClick={handleAddTodo}
        fullWidth
        disabled={addTodoMutation.isPending}
        LoadingPosition="start"
      >
        {addTodoMutation.isPending ? 'Adding...' : 'Add Todo'}
      </Button>
    </div>
  );
};

export default TodoForm;