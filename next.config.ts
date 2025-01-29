import type { NextConfig } from "next";
import withPlaiceholder from "@plaiceholder/next";
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        port: '',
        pathname: '/lariat-images/**',
        search: '',
      },
    ],
  },
};

// export default nextConfig
export default withPlaiceholder(nextConfig);