/**
 * @niceprototypes/ux: every Nice UI package from one import.
 */

export * from "@niceprototypes/styles"
export * from "@niceprototypes/icon"
export * from "@niceprototypes/button"
export * from "@niceprototypes/calendar"
export * from "@niceprototypes/checkbox"
export * from "@niceprototypes/code"
export * from "@niceprototypes/dialog"
export * from "@niceprototypes/field"
export * from "@niceprototypes/flex"
export * from "@niceprototypes/form"
export * from "@niceprototypes/head"
export * from "@niceprototypes/icon-vendor"
export * from "@niceprototypes/image"
export * from "@niceprototypes/image-vendor"
export * from "@niceprototypes/ink"
export * from "@niceprototypes/input"
export * from "@niceprototypes/lightbox"
export * from "@niceprototypes/line"
export * from "@niceprototypes/list"
export * from "@niceprototypes/logo"
export * from "@niceprototypes/popover"
export * from "@niceprototypes/scroll"
export * from "@niceprototypes/select"
export * from "@niceprototypes/slider"
export * from "@niceprototypes/tabs"
export * from "@niceprototypes/tile"
export * from "@niceprototypes/toggle"
export * from "@niceprototypes/tooltip"

// Names two packages both export. The foundation package (styles, icon) keeps the plain
// name; the other is re-exported under a name qualified by its package.
export type { LinkAttributes } from "@niceprototypes/styles"
export type { LinkAttributes as HeadLinkAttributes } from "@niceprototypes/head"
export { registerVendorResolver } from "@niceprototypes/icon"
export { registerVendorResolver as registerImageVendorResolver } from "@niceprototypes/image"
