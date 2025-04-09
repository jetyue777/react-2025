// src/api/axios.ts
import axios from 'axios';

export const baseURL = 'https://react-architecture-todo-default-rtdb.firebaseio.com';

// Create Axios instance with default config
const api = axios.create({
  baseURL
});

export default api;