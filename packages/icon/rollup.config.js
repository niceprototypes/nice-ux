import { createConfiguration } from 'nice-config-rollup';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import svgr from '@svgr/rollup';

export default createConfiguration({
  plugins: [
    // Keep icon styling in the `<style>` block + classes for every icon. svgo's
    // default `inlineStyles` plugin would otherwise hoist the rules onto a
    // `style=` attribute for single-path icons (where each class matches exactly
    // one element), producing inconsistent markup vs. multi-path icons.
    svgr({
      svgoConfig: {
        plugins: [
          { name: 'preset-default', params: { overrides: { inlineStyles: false } } },
          // Re-add SVGR's default id/class prefixing (dropped when we supply our
          // own svgoConfig) so the semantic classes stay namespaced per file
          // (`base_svg__stroke`) and can't collide with a consumer's own CSS.
          'prefixIds',
        ],
      },
    }),
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