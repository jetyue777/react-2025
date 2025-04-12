// src/features/todos/TodoForm.tsx
import { ChangeEvent, useState } from "react";
import { Button, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import styles from "./TodoForm.module.scss";
import { useAddTodoMutation } from "../../../api/todoApi";

const TodoForm = () => {
  // Local state for the input field
  const [description, setDescription] = useState("");

  // RTK Query mutation hook
  const [addTodo, { isLoading }] = useAddTodoMutation();

  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleAddTodo = () => {
    if (description.trim()) {
      // Use RTK Query mutation
      addTodo(description);
      setDescription(""); // Clear input after adding
    }
  };

  return (
    <div>
      <TextField
        multiline
        placeholder="Enter todo message"
        rows={3}
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
        disabled={isLoading}
        startIcon={<AddIcon />}
      >
        Add Todo
      </Button>
    </div>
  );
};

export default TodoForm;