/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  disable: process.env.NODE_ENV === 'development',
  register: true,
  dest: 'public',
});

module.exports = withPWA({
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
});
