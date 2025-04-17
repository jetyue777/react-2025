const express = require('express');
const compression = require('compression');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve pre-compressed files when they exist
app.get('*.js', (req, res, next) => {
  const acceptEncoding = req.headers['accept-encoding'] || '';

  // Check if browser supports brotli
  if (acceptEncoding.includes('br')) {
    req.url = req.url + '.br';
    res.set('Content-Encoding', 'br');
    res.set('Content-Type', 'application/javascript');
    next();
  }
  // Fall back to gzip
  else if (acceptEncoding.includes('gzip')) {
    req.url = req.url + '.gz';
    res.set('Content-Encoding', 'gzip');
    res.set('Content-Type', 'application/javascript');
    next();
  }
  else {
    next();
  }
});

// Similar handler for CSS files
app.get('*.css', (req, res, next) => {
  // ... similar to JS handler, just change Content-Type to 'text/css'
  // ...
});

// Add fallback compression for everything else
app.use(compression({
  level: 6,
  threshold: 0,
  filter: (req, res) => {
    // Don't compress what's already compressed
    if (req.url.endsWith('.gz') || req.url.endsWith('.br')) {
      return false;
    }
    return compression.filter(req, res);
  }
}));

// Serve static files
app.use(express.static(path.join(__dirname, 'client/build'), {
  maxAge: '30d',  // Add caching
  // This option tells Express to look for index.html.gz and index.html.br
  setHeaders: (res, path) => {
    if (path.endsWith('.gz')) {
      res.set('Content-Encoding', 'gzip');
    } else if (path.endsWith('.br')) {
      res.set('Content-Encoding', 'br');
    }
  }
}));

// Fallback route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});