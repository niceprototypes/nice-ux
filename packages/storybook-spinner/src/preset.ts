import { DEFAULT_TIMEOUT, DEFAULT_VIEW_TRANSITION } from "./constants"
import { bootScript } from "./scripts/bootScript"
import { previewScript } from "./scripts/previewScript"
import { previewCss } from "./styles/previewCss"
import { viewTransitionCss } from "./styles/viewTransitionCss"
import type { ResolvedSpinnerOptions, SpinnerOptions } from "./types"

/**
 * Storybook preset. Loaded from `@niceprototypes/storybook-spinner/preset` when the package
 * is listed in `addons`; the entry's `options` arrive merged into the second
 * argument of each hook.
 *
 * Both heads are prepended so the spinner paints before any other head content
 * (fonts, stylesheets, the consumer's own head files) is fetched or parsed.
 */

/**
 * Apply defaults and drop invalid values.
 *
 * @param options - Preset options as passed in main.ts
 * @returns Resolved options
 */
export function resolveOptions(options: SpinnerOptions = {}): ResolvedSpinnerOptions {
  const { hold, timeout, viewTransition } = options
  return {
    hold: hold === true,
    timeout: typeof timeout === "number" && Number.isFinite(timeout) && timeout >= 0 ? timeout : DEFAULT_TIMEOUT,
    viewTransition: typeof viewTransition === "boolean" ? viewTransition : DEFAULT_VIEW_TRANSITION,
  }
}

/**
 * Manager head: the boot overlay, plus (with `viewTransition` on) the
 * stylesheet that opts the manager into cross-document View Transitions and
 * holds the previous page's snapshot under the spinner.
 *
 * @param head - Head markup accumulated by earlier presets
 * @param options - Storybook options merged with this addon's preset options
 * @returns Head markup with the boot overlay first
 */
export const managerHead = async (head = "", options?: SpinnerOptions): Promise<string> => {
  const resolved = resolveOptions(options)
  return (
    `<script id="nsb-boot-script">${bootScript(resolved)}</script>\n` +
    (resolved.viewTransition ? `<style id="nsb-vt-css">${viewTransitionCss}</style>\n` : "") +
    head
  )
}

/**
 * Preview head: the boot overlay (acts only when iframe.html is opened
 * top-level, and only as the opaque overlay: no View Transitions there), the
 * permanent loader-replacement stylesheet, and the preview spinner.
 *
 * @param head - Head markup accumulated by earlier presets
 * @param options - Storybook options merged with this addon's preset options
 * @returns Head markup with the addon's markup first
 */
export const previewHead = async (head = "", options?: SpinnerOptions): Promise<string> =>
  `<script id="nsb-boot-script">${bootScript({ ...resolveOptions(options), viewTransition: false })}</script>\n` +
  `<style id="nsb-preview-css">${previewCss}</style>\n` +
  `<script id="nsb-preview-script">${previewScript()}</script>\n${head}`
