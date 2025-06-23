import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image optimization settings
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
  },
  
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  webpack: (config, { isServer }) => {
    // Ensure proper module resolution for Vercel
    config.resolve.extensionAlias = {
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
    };
    
    // Add fallback for module resolution
    config.resolve.fallback = {
      ...config.resolve.fallback,
    };
    
    return config;
  },
};

module.exports = nextConfig;
