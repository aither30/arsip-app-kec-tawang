import type { NextConfig } from "next";
import withTM from "next-transpile-modules";

const nextConfig: NextConfig = withTM([])({
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      canvas: false, // Tambahkan ini
    };
    return config;
  },
});

export default nextConfig;
