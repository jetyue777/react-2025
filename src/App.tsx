import React from 'react';
import { QueryProvider } from './providers/QueryProvider';
import { TodoList } from './components/TodoList';
import { TodoDetail } from './components/TodoDetail';

const App: React.FC = () => {
  return (
    <QueryProvider>
      <div className="app-container">
        <h1>Todo Application</h1>
        <div className="app-content">
          <TodoList />
          <TodoDetail />
        </div>
      </div>
    </QueryProvider>
  );
};

export default App;