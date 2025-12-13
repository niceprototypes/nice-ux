import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import typescript from "@rollup/plugin-typescript"
import dts from "rollup-plugin-dts"
import peerDepsExternal from "rollup-plugin-peer-deps-external"
import { createConfiguration } from "nice-configuration/rollup"

export default createConfiguration({
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({ tsconfig: "./tsconfig.json" }),
  ],
  dtsPlugin: dts(),
})