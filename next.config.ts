// next.config.ts - PRODUCTION OPTIMIZED FOR VERCEL
import type { NextConfig } from "next";
import type { Configuration as WebpackConfig } from "webpack";
import bundleAnalyzer from "@next/bundle-analyzer";
import webpack from 'webpack';

/**
 * Bundle analyzer - only for local analysis, disabled in production
 */
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true" && process.env.NODE_ENV !== "production",
});

const nextConfig: NextConfig = withBundleAnalyzer({
  // 1️⃣ React Strict Mode
  reactStrictMode: true,

  // 2️⃣ Production compiler optimizations
  compiler: {
    // Remove console logs in production only
    removeConsole: process.env.NODE_ENV === "production",
    // Remove React dev tools in production
    reactRemoveProperties: process.env.NODE_ENV === "production",
    // Enable SWC minification for production
    styledComponents: process.env.NODE_ENV === "production",
  },

  // 3️⃣ Image Optimization - optimized for Vercel
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
    // Optimized device sizes for better performance
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    // Enable image optimization formats
    formats: ['image/webp', 'image/avif'],
    // Minimize JPEG baseline for faster loading
    minimumCacheTTL: 31536000, // 1 year
  },

  // 4️⃣ Fixed Webpack configuration to prevent SSR issues
  webpack(
    config: WebpackConfig,
    { dev, isServer }: { dev: boolean; isServer: boolean }
  ): WebpackConfig {
    // Fix for "self is not defined" error
    config.resolve = config.resolve || {};
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };

    // Define global variables for SSR compatibility
config.plugins = config.plugins || [];
config.plugins.push(
  new webpack.DefinePlugin({
   'typeof window': JSON.stringify(isServer ? 'undefined' : 'object'),
    'typeof self': JSON.stringify(isServer ? 'undefined' : 'object'),
    'typeof global': JSON.stringify('object'),
  })
);

    // Production optimizations
    if (!dev) {
      // Client-side only optimizations
      if (!isServer) {
        // Split chunks more efficiently for client
        config.optimization = {
          ...config.optimization,
          splitChunks: {
            chunks: 'all',
            cacheGroups: {
              default: false,
              vendors: false,
              // Vendor chunk for node_modules (client only)
              vendor: {
                name: 'vendor',
                chunks: 'all',
                test: /node_modules/,
                priority: 20,
              },
              // Common chunk for shared code
              common: {
                name: 'common',
                minChunks: 2,
                chunks: 'all',
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
    }

    return config;
  },

  // 5️⃣ Experimental flags - conservative for production stability
  experimental: {
    // Only enable stable features for production
    optimizePackageImports: [
      'lodash',
      'date-fns', 
      'lucide-react',
    ],
    // Server actions with conservative limits
    serverActions: {
      bodySizeLimit: '1mb',
    },
    // Disable potentially unstable features for production
    // ppr: false,
    // turbo: false, // Can cause build issues
  },

  // 6️⃣ PRODUCTION-OPTIMIZED HTTP headers for Vercel Edge Network
  async headers() {
    return [
      {
        // Static assets - maximum cache for production
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable"
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff"
          },
          {
            key: "X-Frame-Options",
            value: "DENY"
          },
        ],
      },
      {
        // Production font caching
        source: "/fonts/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable"
          },
          {
            key: "Cross-Origin-Resource-Policy",
            value: "cross-origin"
          },
        ],
      },
      {
        // Production image caching with CDN optimization
        source: "/images/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, s-maxage=31536000, stale-while-revalidate=86400"
          },
        ],
      },
      {
        // Static images - production caching
        source: "/(.*)\\.(svg|jpg|jpeg|png|gif|webp|ico|avif)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, s-maxage=31536000, stale-while-revalidate=86400"
          },
        ],
      },
      {
        // API routes - production edge caching
        source: "/api/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "s-maxage=60, stale-while-revalidate=300"
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff"
          },
        ],
      },
    ];
  },

  // 7️⃣ Remove standalone output for Vercel (causes issues)
  // output: "standalone", // Remove this line for Vercel deployment

  // 8️⃣ Optimized logging
  logging: {
    fetches: {
      fullUrl: process.env.NODE_ENV === "development",
    },
  },

  // 9️⃣ PRODUCTION performance optimizations
  poweredByHeader: false, // Security - remove X-Powered-By header
  compress: true, // Enable gzip compression for production
  productionBrowserSourceMaps: false, // Disable source maps in production for security
  
  // 🔟 Production build ID for optimal caching
  generateBuildId: async () => {
    // Use Vercel deployment ID for cache busting in production
    return process.env.VERCEL_GIT_COMMIT_SHA || 
           process.env.VERCEL_DEPLOYMENT_ID || 
           `prod-${Date.now()}`;
  },
});

export default nextConfig;