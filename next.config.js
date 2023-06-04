const path = require('path');

/** @type {import('next').NextConfig} */
module.exports = {
  distDir: '.next',
  sassOptions: {
    includePaths: [path.join(__dirname, 'src', 'styles')],
  },
  images: {
    domains: ['assets.rafiandria23.tech'],
  },
};
