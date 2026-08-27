import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // Repo ini pnpm monorepo (apps/web dua level di bawah root) — tanpa ini,
  // output file tracing cuma menelusuri apps/web dan lockfile di root tidak ikut ter-trace.
  outputFileTracingRoot: path.join(__dirname, "../../"),
};

export default nextConfig;
