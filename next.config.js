const path = require('path');

/** @type {import('next').NextConfig} */
module.exports = {
  distDir: '.next',
  sassOptions: {
    includePaths: [path.join(__dirname, 'src', 'styles')],
  },
  images: {
    loader: 'cloudinary',
    path: 'https://res.cloudinary.com/rafiandria23/image/upload/',
  },
};
