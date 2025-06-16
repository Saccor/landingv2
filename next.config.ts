import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
