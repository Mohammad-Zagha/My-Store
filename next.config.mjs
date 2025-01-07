/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://perume-shop-backend-920e5c436d39.herokuapp.com/api/:path*', // Proxy to backend
      },
    ];
  },
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
