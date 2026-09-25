import { defineConfig } from "tsup"

/**
 * Two entry points:
 * - `index`  — the public API (addon id, option types).
 * - `preset` — the Storybook preset (`managerHead` / `previewHead`). Storybook
 *   resolves it from the `./preset` subpath when the package is listed in
 *   `addons`.
 *
 * The spinner markup and token values are generated into
 * `src/generated/spinner.ts` by the prebuild step, so the dist has no runtime
 * dependency on the Nice packages.
 */
export default defineConfig({
  entry: ["src/index.ts", "src/preset.ts"],
  format: ["esm"],
  dts: true,
  clean: true,
  sourcemap: true,
  external: [/^storybook(\/|$)/, /^@storybook\//],
})
