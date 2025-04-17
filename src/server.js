const express = require('express');
const compression = require('compression');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8003;

// IMPORTANT: This middleware must come BEFORE express.static
// Custom middleware to serve pre-compressed files for JS
app.get('*.js', (req, res, next) => {
  const acceptEncoding = req.headers['accept-encoding'] || '';
  console.log(`Request for: ${req.url}`);
  console.log(`Accept-Encoding: ${acceptEncoding}`);

  // Get the actual file path without the req.url base path
  const filePath = path.join(__dirname, 'client/build', req.url);
  const brPath = filePath + '.br';
  const gzipPath = filePath + '.gz';

  // Try to serve brotli first
  if (acceptEncoding.includes('br') && fs.existsSync(brPath)) {
    req.url = req.url + '.br';
    res.set('Content-Encoding', 'br');
    res.set('Content-Type', 'application/javascript');
  }
  // Then try gzip
  else if (acceptEncoding.includes('gzip') && fs.existsSync(gzipPath)) {
    req.url = req.url + '.gz';
    res.set('Content-Encoding', 'gzip');
    res.set('Content-Type', 'application/javascript');
  }
  next();
});

// Same handler for CSS files
app.get('*.css', (req, res, next) => {
  const acceptEncoding = req.headers['accept-encoding'] || '';

  // Get the actual file path
  const filePath = path.join(__dirname, 'client/build', req.url);
  const brPath = filePath + '.br';
  const gzipPath = filePath + '.gz';

  if (acceptEncoding.includes('br') && fs.existsSync(brPath)) {
    req.url = req.url + '.br';
    res.set('Content-Encoding', 'br');
    res.set('Content-Type', 'text/css');
  } else if (acceptEncoding.includes('gzip') && fs.existsSync(gzipPath)) {
    req.url = req.url + '.gz';
    res.set('Content-Encoding', 'gzip');
    res.set('Content-Type', 'text/css');
  }
  next();
});

// IMPORTANT: Add Cache-Control headers for better performance
app.use(express.static(path.join(__dirname, 'client/build'), {
  maxAge: '30d', // Cache assets for 30 days
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.html')) {
      // Don't cache HTML files
      res.setHeader('Cache-Control', 'no-cache');
    } else if (filePath.endsWith('.js') || filePath.endsWith('.css')) {
      // Aggressively cache JS/CSS with the file hash in the name
      res.setHeader('Cache-Control', 'public, max-age=31536000'); // 1 year
    }
  }
}));

// Add the fallback compression middleware for everything else
app.use(compression({
  level: 6,
  threshold: 10 * 1024,
  filter: (req, res) => {
    // Don't compress what's already compressed
    if (req.url.endsWith('.gz') || req.url.endsWith('.br')) {
      return false;
    }
    return compression.filter(req, res);
  }
}));

// Any route will serve up index.html
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(PORT, function() {
  console.log(`Server running on port ${PORT}`);
});