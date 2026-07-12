/**
 * Available icon names and their variants — re-exported from nice-icons, the
 * single source of truth. nice-icons' generated `index.d.ts` types `iconNames` as
 * a readonly literal tuple, so `(typeof iconNames)[number]` (Icon.types.ts →
 * IconNameType) stays the exact name union. `iconVariants` maps each name to the
 * variant stems it ships (`base` always present, plus any of `fill`, `3d`, …), so
 * buildIconMap/resolveIconComponent can resolve variants without importing every SVG module.
 * Do not maintain separate lists here; add icons by dropping folders into
 * nice-icons and rebuilding it.
 */
export { iconNames, iconVariants } from "nice-icons"