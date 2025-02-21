import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    async rewrites() {
      return [
        {
          source: '/api/:path*', // Proxy all requests starting with /api
          destination: `${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_API_PORT}/:path*`,
        },
      ];
    },
};

export default nextConfig;
