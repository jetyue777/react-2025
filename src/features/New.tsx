// src/features/Another/New.tsx
import { Box, Typography, Paper } from '@mui/material';

const New = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          New Page
        </Typography>
        <Typography variant="body1" paragraph>
          This is a placeholder for the New page content. It corresponds to the "/new" route in your application.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          You can replace this with actual content for your New feature.
        </Typography>
      </Paper>
    </Box>
  );
};

export default New;