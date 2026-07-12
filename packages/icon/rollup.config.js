import { createConfiguration } from 'nice-config-rollup';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import svgr from '@svgr/rollup';

export default createConfiguration({
  plugins: [
    svgr(),
    resolve({
      browser: true,
      extensions: ['.js', '.ts', '.tsx', '.svg']
    }),
    commonjs(),
    json(),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: 'dist/types'
    })
  ],
  // Bundle nice-icons so SVGR can transform SVGs into React components
  bundlePackages: ['nice-icons']
});