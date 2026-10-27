/**
 * Available icon names and their variants — re-exported from @niceprototypes/icon, the
 * single source of truth. @niceprototypes/icon' generated `index.d.ts` types `iconNames` as
 * a readonly literal tuple, so `(typeof iconNames)[number]` (Icon.types.ts →
 * IconNameType) stays the exact name union. `iconVariants` maps each name to the
 * variant stems it ships (`base` always present, plus any of `fill`, `3d`, …), so
 * buildIconMap/resolveIconComponent can resolve variants without importing every SVG module.
 * Do not maintain separate lists here; add icons by dropping folders into
 * @niceprototypes/icon and rebuilding it.
 */
export { iconNames, iconVariants } from "./svg/index.js"

/**
 * Available illustration names and their variants — re-exported from @niceprototypes/icon'
 * parallel illustration surface (fixed-color art, distinct from the monochrome
 * icon set). `illustrationNames` is a readonly literal tuple, so
 * `(typeof illustrationNames)[number]` (Illustration.types.ts → IllustrationNameType)
 * stays the exact name union. Most illustrations ship only `base`.
 */
export { illustrationNames, illustrationVariants } from "./svg/index.js"