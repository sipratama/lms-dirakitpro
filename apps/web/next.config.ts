import { existsSync } from "node:fs";
import path from "node:path";
import type { NextConfig } from "next";

// Monorepo: .env ada di root (dua level di atas apps/web), bukan di app ini.
// Guard existsSync supaya build di dalam Docker image (yang sengaja tidak
// menyertakan .env — lihat .dockerignore) tidak crash; env var produksi
// diinject lewat container runtime, bukan file .env yang di-bake ke image.
const rootEnvPath = path.resolve(__dirname, "../../.env");
if (existsSync(rootEnvPath)) {
  process.loadEnvFile(rootEnvPath);
}

const nextConfig: NextConfig = {
  output: "standalone",
  // Repo ini pnpm monorepo (apps/web dua level di bawah root) — tanpa ini,
  // output file tracing cuma menelusuri apps/web dan lockfile di root tidak ikut ter-trace.
  outputFileTracingRoot: path.join(__dirname, "../../"),
};

export default nextConfig;
