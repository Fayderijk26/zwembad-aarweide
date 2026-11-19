import type { NextConfig } from "next";

/**
 * Statische export, zodat de site op elke eenvoudige host kan (zoals GitHub Pages).
 * Voor GitHub Pages draait de site onder /zwembad-aarweide: bouw dan met GITHUB_PAGES=true.
 */
const basePath = process.env.GITHUB_PAGES === "true" ? "/zwembad-aarweide" : "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  images: { unoptimized: true },
  turbopack: { root: process.cwd() },
};

export default nextConfig;
