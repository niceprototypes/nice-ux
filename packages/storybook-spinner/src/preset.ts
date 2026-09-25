import { DEFAULT_TIMEOUT } from "./constants"
import { bootScript } from "./scripts/bootScript"
import { previewScript } from "./scripts/previewScript"
import { previewCss } from "./styles/previewCss"
import type { ResolvedSpinnerOptions, SpinnerOptions } from "./types"

/**
 * Storybook preset. Loaded from `nice-storybook-spinner/preset` when the package
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
  const { hold, timeout } = options
  return {
    hold: hold === true,
    timeout: typeof timeout === "number" && Number.isFinite(timeout) && timeout >= 0 ? timeout : DEFAULT_TIMEOUT,
  }
}

/**
 * Manager head: the boot overlay.
 *
 * @param head - Head markup accumulated by earlier presets
 * @param options - Storybook options merged with this addon's preset options
 * @returns Head markup with the boot overlay first
 */
export const managerHead = async (head = "", options?: SpinnerOptions): Promise<string> =>
  `<script id="nsb-boot-script">${bootScript(resolveOptions(options))}</script>\n${head}`

/**
 * Preview head: the boot overlay (acts only when iframe.html is opened
 * top-level), the permanent loader-replacement stylesheet, and the preview
 * spinner.
 *
 * @param head - Head markup accumulated by earlier presets
 * @param options - Storybook options merged with this addon's preset options
 * @returns Head markup with the addon's markup first
 */
export const previewHead = async (head = "", options?: SpinnerOptions): Promise<string> =>
  `<script id="nsb-boot-script">${bootScript(resolveOptions(options))}</script>\n` +
  `<style id="nsb-preview-css">${previewCss}</style>\n` +
  `<script id="nsb-preview-script">${previewScript()}</script>\n${head}`
