const path = require('path');

/** @type {import('next').NextConfig} */
module.exports = {
  distDir: '.next',
  output: 'standalone',
  sassOptions: {
    includePaths: [path.join(__dirname, 'src', 'styles')],
  },
  images: {
    domains: ['storage.rafiandria23.tech'],
  },
};
