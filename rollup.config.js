import commonJS from "@rollup/plugin-commonjs";
export default {
  input: "src/main.js",
  output: {
    file: "dist/main.js",
    format: "cjs",
  },
  plugins: [commonJS()],
};
