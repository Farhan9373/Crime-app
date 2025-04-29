import type { NextConfig } from "next";
const webpack = require("webpack");

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins.push(
        new webpack.DefinePlugin({
          "process.browser": JSON.stringify(false),
        })
      );
    }
    return config;
  },
};

export default nextConfig;