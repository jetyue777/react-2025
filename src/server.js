// Existing imports
const express = require('express');
const path = require('path');

// Add this new import
const compression = require('compression');

// Your existing app initialization
const app = express();
const PORT = process.env.PORT || 3000;

// Configure compression - ADD THIS BEFORE ANY ROUTE HANDLERS
app.use(compression({
  // Set compression level (1-9, where 9 is maximum compression but slower)
  level: 6,

  // Only compress responses larger than 10KB
  threshold: 10 * 1024,

  // Don't compress responses with this header
  filter: (req, res) => {
    if (req.headers['x-no-compression']) {
      return false;
    }
    // Use compression by default
    return compression.filter(req, res);
  }
}));


app.use(compression({
  level: 6,
  threshold: 0,
  filter: (req, res) => {
    // Always compress JavaScript and CSS files
    if (req.url.endsWith('.js') || req.url.endsWith('.css')) {
      return true;
    }

    // For other file types, use the default filter
    return compression.filter(req, res);
  }
}));


// Your existing static file serving
app.use(express.static(path.join(__dirname, 'client/build')));

// Your existing route handler for serving index.html
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Your existing app.listen call
app.listen(PORT, function() {
  console.log(`Server running on port ${PORT}`);
});