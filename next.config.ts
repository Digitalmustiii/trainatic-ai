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

  // 2️⃣ Compiler optimizations (swcMinify is deprecated, now handled automatically)
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // 3️⃣ Image Optimization - using remotePatterns instead of deprecated domains
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
      {
        protocol: "https",
        hostname: "randomuser.me",
      },
      // Add other remote image CDNs here
    ],
    deviceSizes: [320, 420, 768, 1024, 1280, 1600],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // 4️⃣ Custom Webpack adjustments (fully typed)
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

  // 5️⃣ Experimental flags (only include features you actually use)
  experimental: {
    // Only uncomment if you need these specific features:
    // serverActions: true,
    // ppr: true, // Partial Prerendering
    // optimizePackageImports: ['lodash', 'date-fns'], // Tree-shake specific packages
  },

  // 6️⃣ Custom HTTP headers (for caching static assets & API routes)
  async headers() {
    return [
      {
        // Cache Next.js built-in JS/CSS under /_next/static for 1 year
        source: "/_next/static/(.*)",
        headers: [
          { 
            key: "Cache-Control", 
            value: "public, max-age=31536000, immutable" 
          },
        ],
      },
      {
        // Cache font files under /public/fonts for 1 year
        source: "/fonts/(.*)",
        headers: [
          { 
            key: "Cache-Control", 
            value: "public, max-age=31536000, immutable" 
          },
        ],
      },
      {
        // Cache images under /public/images for 1 year
        source: "/images/(.*)",
        headers: [
          { 
            key: "Cache-Control", 
            value: "public, max-age=31536000, immutable" 
          },
        ],
      },
      {
        // Cache any other static image at root for 1 year
        source: "/(.*)\\.(svg|jpg|jpeg|png|gif|webp|ico)",
        headers: [
          { 
            key: "Cache-Control", 
            value: "public, max-age=31536000, immutable" 
          },
        ],
      },
      {
        // API routes: cache at edge for 60s, stale-while-revalidate
        source: "/api/(.*)",
        headers: [
          { 
            key: "Cache-Control", 
            value: "s-maxage=60, stale-while-revalidate=59" 
          },
        ],
      },
    ];
  },

  // 7️⃣ Output configuration for better performance
  output: "standalone", // Uncomment if deploying to Docker/standalone

  // 8️⃣ Logging configuration
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
});

export default nextConfig;