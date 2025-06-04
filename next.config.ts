import { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["img.clerk.com",
      'randomuser.me'
    ],
  },
};

export default nextConfig;
