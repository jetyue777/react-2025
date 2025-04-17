const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

// Middleware to serve gzipped files if available
app.get('*.js', (req, res, next) => {
  const gzippedFile = req.url + '.gz';

  // Check if the .gz file exists
  fs.exists(path.join(__dirname, 'public', gzippedFile), (exists) => {
    if (exists) {
      // Serve the gzipped version
      res.setHeader('Content-Encoding', 'gzip');
      res.sendFile(path.join(__dirname, 'public', gzippedFile));
    } else {
      next(); // Continue if no .gz file exists
    }
  });
});

// Serve static files
app.use(express.static('public'));

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
