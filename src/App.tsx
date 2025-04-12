// src/App.tsx
import { Container, CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "./shared/layout/Header/Header.tsx";

const App = () => {
  return (
    <>
      <CssBaseline />
      <Header />
      <Container maxWidth="xl" sx={{pt: 5}}>
        <Outlet />
      </Container>
    </>
  );
};

export default App;