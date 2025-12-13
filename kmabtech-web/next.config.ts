/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.kmabtech.com",
        pathname: "/uploads/**",
      },
    ],
  },
};

module.exports = nextConfig;

