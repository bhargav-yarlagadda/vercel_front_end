import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com", // GitHub avatars
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com", // repo images/logos if needed
      },
    ],
  },
};

module.exports = nextConfig;


export default nextConfig;
