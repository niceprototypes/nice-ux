/**
 * @fileoverview The SVG layer without the `.svg` component modules: the icon and
 * illustration catalogs plus the string and base64 services. `@niceprototypes/icon/svg`
 * resolves here under Node, which cannot load `.svg` imports; bundlers get `index.js`,
 * which adds the React SVG components.
 */

export * from "./icons/generated/catalog.js"
export * from "./illustrations/generated/catalog.js"
export * from "./services/getIcon.js"
export * from "./services/getIconEncoded.js"
export * from "./services/getIllustration.js"
export * from "./services/getIllustrationEncoded.js"
