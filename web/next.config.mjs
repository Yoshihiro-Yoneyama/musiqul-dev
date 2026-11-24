import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";

const withVanillaExtract = createVanillaExtractPlugin({
  // Next.js 16 では Turbopack が dev/build の既定になったため、Turbopack 用のローダー設定も有効にする
  unstable_turbopack: { mode: "auto" },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true
};

export default withVanillaExtract(nextConfig);