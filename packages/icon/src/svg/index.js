/**
 * @fileoverview Public package entry for @niceprototypes/icon.
 *
 * Surfaces everything from the package root — the generated icon and
 * illustration exports plus the consumable service functions — so consumers
 * import from `"@niceprototypes/icon/svg"` directly:
 *
 *   import { getIcon, CheckBaseIcon, getIllustration, NiceHeartBaseIllustration } from "@niceprototypes/icon/svg"
 *
 * Two asset surfaces ship side by side: monochrome, token-recolored **icons**
 * (`getIcon`/`getIconEncoded`) and fixed-color **illustrations**
 * (`getIllustration`/`getIllustrationEncoded`). The subpath exports
 * (`@niceprototypes/icon/get-icon`, `/catalog`, `/illustration-catalog`, …) remain for
 * narrow/direct access, but the root is the intended surface. Under Node the root
 * resolves to `core.js` (everything but the SVG components).
 *
 * @module @niceprototypes/icon
 */

export * from "./icons/generated/index.js"
export * from "./illustrations/generated/index.js"
export * from "./core.js"
