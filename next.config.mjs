/** 
 * Next.js Configuration for Netlify Deployment
 * - Static export configuration
 * - Image optimization disabled for static exports
 * - Strict mode enabled for React
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  output: "export",
};

export default nextConfig;