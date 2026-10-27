import type { AdobeAnalyticsConfig, HeadResources } from "../types"

/**
 * Build the head resources for Adobe Analytics via a Launch/Tags embed.
 *
 * Adobe's shape differs from Google's in two ways worth knowing, because both
 * are visible in this function's output:
 *
 * - There is no measurement id. The property, environment, and rules are all
 *   encoded in the embed URL, so the URL *is* the configuration.
 * - The data layer is populated **before** the loader runs, not after. Rules
 *   read `digitalData` as the library initializes, so the inline script is
 *   emitted first and the loader second — the reverse of GA's ordering
 *   indifference.
 *
 * `async` defaults to true for page speed. Adobe's own documentation prefers a
 * synchronous embed so the library is guaranteed present before page code calls
 * into it; set `async: false` if your code calls Adobe APIs directly rather
 * than through rules.
 *
 * @param adobeAnalytics - An embed script URL, or a config.
 * @returns Head resources, or `null` when no URL is supplied.
 *
 * @example
 * buildAdobeAnalyticsConfig("https://assets.adobedtm.com/abc/def/launch-123.min.js")
 *
 * @example
 * buildAdobeAnalyticsConfig({
 *   scriptUrl: "https://assets.adobedtm.com/abc/def/launch-123.min.js",
 *   dataLayer: { page: { name: "home" } },
 *   async: false,
 * })
 */
export function buildAdobeAnalyticsConfig(
  adobeAnalytics: string | AdobeAnalyticsConfig
): HeadResources | null {
  if (!adobeAnalytics) return null

  const config: AdobeAnalyticsConfig =
    typeof adobeAnalytics === "string" ? { scriptUrl: adobeAnalytics } : adobeAnalytics

  const { scriptUrl, async = true, dataLayer, dataLayerName = "digitalData" } = config

  if (!scriptUrl) {
    console.error("buildAdobeAnalyticsConfig: scriptUrl is required")
    return null
  }

  const scripts: HeadResources["scripts"] = []

  // Data layer first — see the ordering note above.
  if (dataLayer) {
    scripts.push({
      inline: `window.${dataLayerName} = Object.assign(window.${dataLayerName} || {}, ${JSON.stringify(dataLayer)});`,
      id: `adobe-datalayer-${dataLayerName}`,
    })
  }

  scripts.push({ src: scriptUrl, async, id: "adobe-launch" })

  return { scripts }
}
