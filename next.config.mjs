/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // build a static site
  reactStrictMode:false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // allows images from any domain
      },
      {
        protocol: 'http',
        hostname: '**', // allows images from any domain over HTTP as well
      },
    ],
    unoptimized: false, // disable Next.js image optimization
  },
};

export default nextConfig;
