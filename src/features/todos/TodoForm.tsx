// src/features/todos/TodoForm.tsx
import { useState, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import {
  TextField,
  Button
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { todoActions } from './todoSlice';
import styles from './TodoForm.module.scss';

const TodoForm = () => {
  const dispatch = useDispatch();
  const [description, setDescription] = useState('');

  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleAddTodo = () => {
    if (description.trim()) {
      dispatch(todoActions.addTodo(description));
      setDescription('');
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
        startIcon={<AddIcon />}
        disabled={!description.trim()}
      >
        Add Todo
      </Button>
    </div>
  );
};

export default TodoForm;