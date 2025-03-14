import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/**", // Allows all image paths from this domain
      },
    ],
  },
  /* config options here */
};

export default nextConfig;

