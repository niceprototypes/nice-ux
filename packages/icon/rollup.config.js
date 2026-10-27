import { createConfiguration } from '@niceprototypes/config-rollup';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import svgr from '@svgr/rollup';
import path from 'node:path';

const configs = createConfiguration({
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
  ]
});

// The SVG layer (src/svg) is plain JS that ships its own declarations, so tsc emits none
// for it. The declaration bundle keeps the SVG layer's import as external and points it at
// the shipped src/svg/index.d.ts.
const svgDeclarations = path.resolve('dist/types/svg/index.js');
const declarationConfig = configs[configs.length - 1];
declarationConfig.external = (id) => /(^|\/)svg\/index\.js$/.test(id);
declarationConfig.output[0].paths = (id) => (id === svgDeclarations ? '../src/svg/index.js' : id);

export default configs;
