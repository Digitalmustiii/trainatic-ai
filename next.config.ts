import type { NextConfig } from "next";
import type { Configuration as WebpackConfig } from "webpack";
import bundleAnalyzer from "@next/bundle-analyzer";
import webpack from "webpack";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true" && process.env.NODE_ENV !== "production",
});

const nextConfig: NextConfig = withBundleAnalyzer({
  reactStrictMode: true,

  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
    reactRemoveProperties: process.env.NODE_ENV === "production",
    styledComponents: process.env.NODE_ENV === "production",
  },

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
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 31536000,
  },

  webpack(config: WebpackConfig, { dev, isServer }) {
    config.resolve = config.resolve || {};
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };

    // ✅ Fix for SSR build issues like "window is not defined"
    config.plugins = config.plugins || [];
    config.plugins.push(
      new webpack.DefinePlugin({
        "typeof window": JSON.stringify(isServer ? "undefined" : "object"),
        "typeof self": JSON.stringify(isServer ? "undefined" : "object"),
        "typeof global": JSON.stringify("object"),
      })
    );

    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: "all",
          cacheGroups: {
            default: false,
            vendors: false,
            vendor: {
              name: "vendor",
              chunks: "all",
              test: /node_modules/,
              priority: 20,
            },
            common: {
              name: "common",
              minChunks: 2,
              chunks: "all",
              priority: 10,
              reuseExistingChunk: true,
              enforce: true,
            },
          },
        },
      };

      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        "@locales": false,
      };
    }

    return config;
  },

  experimental: {
    optimizePackageImports: ["lodash", "date-fns", "lucide-react"],
    serverActions: {
      bodySizeLimit: "1mb",
    },
  },

  async headers() {
    return [
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
        ],
      },
      {
        source: "/fonts/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
          {
            key: "Cross-Origin-Resource-Policy",
            value: "cross-origin",
          },
        ],
      },
      {
        source: "/images/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, s-maxage=31536000, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: "/(.*)\\.(svg|jpg|jpeg|png|gif|webp|ico|avif)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, s-maxage=31536000, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: "/api/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "s-maxage=60, stale-while-revalidate=300",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
        ],
      },
    ];
  },

  logging: {
    fetches: {
      fullUrl: process.env.NODE_ENV === "development",
    },
  },

  poweredByHeader: false,
  compress: true,
  productionBrowserSourceMaps: false,

  generateBuildId: async () => {
    return (
      process.env.VERCEL_GIT_COMMIT_SHA ||
      process.env.VERCEL_DEPLOYMENT_ID ||
      `prod-${Date.now()}`
    );
  },
});

export default nextConfig;
