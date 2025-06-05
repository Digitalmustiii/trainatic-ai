// next.config.ts

import type { NextConfig } from "next";
import type { Configuration as WebpackConfig } from "webpack";
import bundleAnalyzer from "@next/bundle-analyzer";

/**
 * Wrap NextConfig with @next/bundle-analyzer, enabled via ANALYZE=true
 */
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = withBundleAnalyzer({
  // 1️⃣ React Strict Mode
  reactStrictMode: true,

  // 2️⃣ SWC Minify (faster builds, smaller bundles)
  swcMinify: true,

  // 3️⃣ Remove all console.* calls in production
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // 4️⃣ Image Optimization domains
  images: {
    domains: [
      "img.clerk.com",
      "randomuser.me",
      // …add any other remote image CDNs here
    ],
    deviceSizes: [320, 420, 768, 1024, 1280, 1600],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // 5️⃣ Custom Webpack adjustments (fully typed)
  webpack(
    config: WebpackConfig,
    { dev, isServer }: { dev: boolean; isServer: boolean }
  ): WebpackConfig {
    if (!dev && !isServer) {
      // Example: exclude a folder/module (e.g. @locales) from the client bundle
      config.resolve = config.resolve || {};
      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        "@locales": false,
      };
    }
    return config;
  },

  // 6️⃣ Experimental flags (empty for now—add only valid ones)
  experimental: {
    // Example placeholders (uncomment if you actually use them):
    // serverActions: true,
    // appDir: true, // Next 13’s App Router is already enabled if you’re under /src/app
  },

  // 7️⃣ Custom HTTP headers (for caching static assets & API routes)
  async headers() {
    return [
      {
        // Cache Next.js built-in JS/CSS under /_next/static for 1 year
        source: "/_next/static/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        // Cache font files under /public/fonts for 1 year
        source: "/fonts/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        // Cache images under /public/images for 1 year
        source: "/images/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        // Cache any other static image (svg/jpg/png/webp) at root for 1 year
        source: "/(.*)\\.(svg|jpg|jpeg|png|gif|webp)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        // API routes: cache at Vercel’s edge for 60s, stale-while-revalidate
        source: "/api/(.*)",
        headers: [
          { key: "Cache-Control", value: "s-maxage=60, stale-while-revalidate=59" },
        ],
      },
    ];
  },

  // 8️⃣ Future flags (depending on your Next.js version)
  future: {
    webpack5: true, // Next 13+ already uses Webpack 5 by default
  },
});

export default nextConfig;
