/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  // API routes ke liye runtime force kar diya
  experimental: {
    runtime: 'nodejs'
  }
};

module.exports = nextConfig;
