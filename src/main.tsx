// src/main.tsx
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from "react-router-dom";
import { Router } from "./router.tsx";
import { store } from "./store/store.ts";
import { Provider } from 'react-redux';
import { createTheme, StyledEngineProvider, ThemeProvider } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={darkTheme}>
    <StyledEngineProvider injectFirst>
      <Provider store={store}>
        <RouterProvider router={Router} />
      </Provider>
    </StyledEngineProvider>
  </ThemeProvider>
);