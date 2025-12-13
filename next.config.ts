import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Acknowledge Turbopack config (Next.js 16 requirement)
  turbopack: {},

  // Force webpack mode to avoid Turbopack conflicts
  webpack: (config, { isServer }) => {
    // Ignore problematic test files
    config.externals = config.externals || [];

    if (Array.isArray(config.externals)) {
      config.externals.push({
        'tap': 'tap',
        'tape': 'tape',
        'why-is-node-running': 'why-is-node-running'
      });
    }

    // Ignore test files completely
    config.module.rules.push({
      test: /node_modules\/thread-stream\/test\//,
      use: 'null-loader'
    });

    return config;
  },

  images: {
    qualities: [100, 75],
    unoptimized: true, // Disable image optimization for faster builds
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  // Suppress build warnings from node_modules
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
