import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "localhost",
        port: "7001",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
