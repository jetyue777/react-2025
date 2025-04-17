const CompressionPlugin = require('compression-webpack-plugin');
const zlib = require('zlib');

module.exports = {
  // Your existing webpack config...
  plugins: [
    // Your existing plugins...

    // Generate .gz files
    new CompressionPlugin({
      filename: '[path][base].gz',
      algorithm: 'gzip',
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,  // Only compress files > 10KB
      minRatio: 0.8      // Only compress if compression ratio is better than 0.8
    }),

    // Generate .br files (Brotli - better compression)
    new CompressionPlugin({
      filename: '[path][base].br',
      algorithm: 'brotliCompress',
      test: /\.(js|css|html|svg)$/,
      compressionOptions: {
        params: {
          [zlib.constants.BROTLI_PARAM_QUALITY]: 11,  // Max quality
        },
      },
      threshold: 10240,
      minRatio: 0.8
    })
  ]
};