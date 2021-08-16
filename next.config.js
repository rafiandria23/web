const path = require('path');
const withPWA = require('next-pwa');

const nextConfig = {
  reactStrictMode: false,
  target: 'serverless',
  distDir: '.next',
  sassOptions: {
    includePaths: [path.join(__dirname, 'src', 'styles')],
  },
  images: {
    loader: 'cloudinary',
    path: 'https://res.cloudinary.com/rafiandria23/image/upload/',
  },
};

module.exports = withPWA({
  ...nextConfig,
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
  },
});
