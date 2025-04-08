import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Todo from './features/Todo/Todo';
import New from './features/Another/New';
import PageNotFound from './shared/components/PageNotFound/PageNotFound';
import HomePage from './features/HomePage/HomePage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'todo', element: <Todo /> },
      { path: 'new', element: <New /> },
      { path: '*', element: <PageNotFound /> },
    ],
  },
]);
