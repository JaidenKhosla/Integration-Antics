import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    output: "export",  // <=== enables static exports
    reactStrictMode: false,
    trailingSlash: true,
    assetPrefix: "/Integration-Antics",
    basePath: "/Integration-Antics"
};

module.exports = nextConfig;
