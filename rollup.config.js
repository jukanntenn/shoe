import typescript from "@rollup/plugin-typescript";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";

const BUNDLE = process.env.BUNDLE === "true";
const ESM = process.env.ESM === "true";

let fileDestination = `shoe${ESM ? ".esm" : ""}`;
const external = ["@popperjs/core"];

const globals = {
  "@popperjs/core": "Popper",
};

const plugins = [
  typescript({
    exclude: ["**/*.test.ts"],
  }),
];

if (BUNDLE) {
  fileDestination += ".bundle";
  // Remove last entry in external array to bundle Popper
  external.pop();
  delete globals["@popperjs/core"];
  plugins.push(
    replace({
      "process.env.NODE_ENV": '"production"',
      preventAssignment: true,
    }),
    nodeResolve()
  );
}

const rollupConfig = {
  input: `src/index.${ESM ? "esm" : "umd"}.ts`,
  output: {
    file: `dist/${fileDestination}.js`,
    format: ESM ? "esm" : "umd",
    globals,
    generatedCode: "es2015",
  },
  external,
  plugins,
};

if (!ESM) {
  rollupConfig.output.name = "shoe";
}

export default rollupConfig;
