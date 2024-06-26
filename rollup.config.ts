import type { RollupOptions } from "rollup";
import { dts } from "rollup-plugin-dts";
import preserveDirectives from "rollup-preserve-directives";

import babel from "@rollup/plugin-babel";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";

const sourceOptions: RollupOptions = {
  input: "app/index.ts",
  output: { dir: "dist\\src", preserveModules: true },
  external: [
    "lucide-react",
    "react",
    "react/jsx-runtime",
    "tailwindcss/defaultTheme",
  ],
  plugins: [
    typescript({
      tsconfig: "./app/tsconfig.json",
    }),
    babel({
      babelHelpers: "bundled",
      presets: [
        "@babel/preset-env",
        ["@babel/preset-react", { runtime: "automatic" }],
        "@babel/preset-typescript",
      ],
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    }),
    terser(),
    preserveDirectives(),
  ],
};

const typeOptions: RollupOptions = {
  input: "dist\\src\\types\\index.d.ts",
  output: {
    file: "dist\\src\\index.d.ts",
  },
  plugins: [
    dts({
      tsconfig: "./app/tsconfig.json",
    }),
  ],
};

const rollupConfig = [sourceOptions, typeOptions];

export default rollupConfig;
