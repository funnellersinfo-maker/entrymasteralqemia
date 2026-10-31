import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Exportación estática para Cloudflare Pages (obligatorio)
  output: "export",
  images: { unoptimized: true },
  typescript: { ignoreBuildErrors: true },
  reactStrictMode: false,
  // Permite compilar la exportación estática (next build) en un directorio
  // aparte (NEXT_BUILD_DIST_DIR=.build-export) sin romper el servidor de
  // desarrollo, que usa .next en vivo.
  distDir: process.env.NEXT_BUILD_DIST_DIR || ".next",
};

export default nextConfig;
