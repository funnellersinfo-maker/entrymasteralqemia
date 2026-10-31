import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Exportación estática para Cloudflare Pages (obligatorio)
  output: "export",
  images: { unoptimized: true },
  typescript: { ignoreBuildErrors: true },
  reactStrictMode: false,
};

export default nextConfig;
