/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
  disable: process.env.NODE_ENV === 'development',
  register: true,
  dest: 'public',
  runtimeCaching: require('next-pwa/cache'),
  skipWaiting: true,
  publicExcludes: [],
  buildExcludes: ['app-build-manifest.json'],
});

module.exports = withPWA({
  turbopack: {},
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
});
