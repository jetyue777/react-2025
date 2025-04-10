// src/features/HomePage/HomePage.tsx
import { Box, Typography, Paper, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Paper elevation={2} sx={{ p: 5, textAlign: 'center', mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to Todo App
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom color="text.secondary">
          A modern React app using Redux Toolkit, MUI, and TypeScript
        </Typography>
      </Paper>

      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={4}>
          <Paper elevation={1} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h5" gutterBottom>
              Manage Todos
            </Typography>
            <Typography paragraph>
              Create, view, and delete your todo items in a clean and intuitive interface.
            </Typography>
            <Button
              component={Link}
              to="/todo"
              variant="contained"
              color="primary"
              fullWidth
            >
              Go to Todos
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={1} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h5" gutterBottom>
              Create New Items
            </Typography>
            <Typography paragraph>
              Add new content or explore the new section of the application.
            </Typography>
            <Button
              component={Link}
              to="/new"
              variant="contained"
              color="secondary"
              fullWidth
            >
              Go to New
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;