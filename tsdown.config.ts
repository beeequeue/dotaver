import { defineConfig } from "tsdown"

export default defineConfig({
  entry: ["src/index.ts"],
  outDir: "dist",

  env: { TEST: false },

  platform: "node",
  format: "esm",
  dts: true,
  fixedExtension: true,

  minify: false,
})
