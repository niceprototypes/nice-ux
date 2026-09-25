import { SPINNER_CSS } from "../generated/spinner"
import { PREVIEW_ID } from "../constants"
import { spinnerSurfaceCss } from "./spinnerSurfaceCss"

/**
 * Preview iframe stylesheet (permanent).
 *
 * - Storybook's native loaders (`.sb-preparing-story` / `.sb-preparing-docs`)
 *   never show.
 * - The preview spinner is hidden by default and shown exactly when Storybook
 *   would show its loader: body carries `sb-show-preparing-story` or
 *   `sb-show-preparing-docs` but not yet `sb-show-main`. `!important` beats
 *   Storybook's rule that hides every non-loader body child while preparing
 *   (`.sb-show-preparing-*:not(.sb-show-main) > :not(.sb-preparing-*)`).
 * - `.sb-nopreview` and `.sb-errordisplay` are not touched.
 */
export const previewCss =
  `.sb-preparing-story,.sb-preparing-docs{display:none!important}` +
  `#${PREVIEW_ID}{display:none}` +
  spinnerSurfaceCss(PREVIEW_ID) +
  `body.sb-show-preparing-story:not(.sb-show-main)>#${PREVIEW_ID},` +
  `body.sb-show-preparing-docs:not(.sb-show-main)>#${PREVIEW_ID}{display:flex!important}` +
  SPINNER_CSS
