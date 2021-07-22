const path = require('path');
const withPlugins = require('next-compose-plugins');

const nextConfig = {
  reactStrictMode: true,
  distDir: '.next',
  sassOptions: {
    includePaths: [path.join(__dirname, 'src', 'styles')],
  },
  images: {
    // domains: ['res.cloudinary.com'],
    loader: 'cloudinary',
    path: 'https://res.cloudinary.com/rafiandria23/image/upload/',
  },
};

module.exports = withPlugins([], nextConfig);
