/**
 * Next.js Configuration for Performance & Deployment
 * - Enables strict mode for better debugging
 * - Supports remote images with proper security
 * - Optimized for serverless deployment
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  compiler: {
    styledComponents: true,
  },

  output: "standalone",
};

export default nextConfig;