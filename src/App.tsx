// src/App.tsx
import { Container, CssBaseline } from '@mui/material';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    <>
      <CssBaseline />
      <Header />
      <Container maxWidth="xl" sx={{ pt: 5 }}>
        <Outlet />
      </Container>
    </>
  );
};

export default App;