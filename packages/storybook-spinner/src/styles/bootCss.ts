import { SPINNER_CSS } from "../generated/spinner"
import { BOOT_ID, PREVIEW_ID } from "../constants"
import { spinnerSurfaceCss } from "./spinnerSurfaceCss"

/**
 * Boot overlay stylesheet. Lives only while the overlay is up (removed with it).
 *
 * The overlay is appended to <html> ahead of <body>, so body content at the same
 * maximum z-index paints over it. When iframe.html is opened top-level that is
 * Storybook's own loaders and the preview spinner: hide them while the overlay
 * is up so only the overlay's spinner is ever visible.
 */
export const bootCss =
  `#${BOOT_ID}{display:flex}` +
  spinnerSurfaceCss(BOOT_ID) +
  `.sb-preparing-story,.sb-preparing-docs,.sb-loader,#${PREVIEW_ID}{visibility:hidden!important}` +
  SPINNER_CSS
