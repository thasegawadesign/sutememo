/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const withPWA = require("next-pwa")({
  disable: isProd ? false : true,
  dest: "public",
});

module.exports = withPWA();
