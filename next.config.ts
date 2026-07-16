// next.config.js
module.exports = {
  allowedDevOrigins: ['192.168.43.241'],
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dummyjson.com",
      },
    ],
  },
};

module.exports = nextConfig;