/** @type {import('next').NextConfig} */

const runtimeCaching = require('next-pwa/cache');
const withPWA = require('next-pwa')({
  disable: process.env.NODE_ENV === 'development',
  register: true,
  dest: 'public',
  runtimeCaching,
  buildExcludes: [
    /app-build-manifest.json$/,
    /\/.*Manifest.js$/,
    /chunks\/.*.js$/,
    /css\/.*.css$/,
  ],
});

module.exports = withPWA({
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
});
