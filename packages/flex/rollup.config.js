import { createConfiguration } from 'nice-configuration/rollup'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import dts from 'rollup-plugin-dts'

export default createConfiguration({
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({ tsconfig: './tsconfig.json' })
  ],
  dts: true,
  dtsInput: 'dist/types/index.d.ts',
  dtsPlugin: dts()
})