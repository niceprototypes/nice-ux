import type { GoogleAnalyticsConfig, HeadResources } from "../types"

/** `G-XXXXXXXXXX`. Anything else is a property id, a stream id, or a typo. */
const MEASUREMENT_ID_PATTERN = /^G-[A-Z0-9]+$/i

/**
 * Build the head resources for Google Analytics 4 via gtag.js.
 *
 * GA4 needs two scripts, and they are not interchangeable:
 *
 * 1. `<script async src="…/gtag/js?id=G-…">` — external and async, so React 19
 *    hoists and deduplicates it.
 * 2. An inline bootstrap defining `dataLayer` and `gtag()`, then calling
 *    `gtag("config", id)`. Inline scripts get no hoisting, which is why
 *    `ScriptAttributes` carries `inline` and `<Head>` writes those to the DOM
 *    itself.
 *
 * Order between them does not matter. The inline snippet queues calls onto
 * `dataLayer` and gtag.js drains the queue whenever it finishes loading, so the
 * async script may arrive first, last, or not at all without losing events.
 *
 * @param googleAnalytics - A measurement id, or a config for extra parameters.
 * @returns Head resources, or `null` if the id is missing or malformed.
 *
 * @example
 * buildGoogleAnalyticsConfig("G-MLPED529MH")
 *
 * @example
 * // Consent-gated: load the library, defer the config call to the app.
 * buildGoogleAnalyticsConfig({ measurementId: "G-…", autoConfig: false })
 */
export function buildGoogleAnalyticsConfig(
  googleAnalytics: string | GoogleAnalyticsConfig
): HeadResources | null {
  if (!googleAnalytics) return null

  const config: GoogleAnalyticsConfig =
    typeof googleAnalytics === "string" ? { measurementId: googleAnalytics } : googleAnalytics

  const { measurementId, dataLayerName = "dataLayer", autoConfig = true } = config

  if (!measurementId) {
    console.error("buildGoogleAnalyticsConfig: measurementId is required")
    return null
  }

  if (!MEASUREMENT_ID_PATTERN.test(measurementId)) {
    // Not fatal — GA may add formats — but almost always a property id
    // ("UA-…", a bare number) pasted where the measurement id belongs, which
    // fails silently at collection time and is miserable to diagnose later.
    console.warn(
      `buildGoogleAnalyticsConfig: "${measurementId}" does not look like a GA4 measurement id (G-XXXXXXXXXX).`
    )
  }

  const params = config.config ? `, ${JSON.stringify(config.config)}` : ""
  const configCall = autoConfig ? `\n  gtag("config", ${JSON.stringify(measurementId)}${params});` : ""

  // `arguments` rather than rest args: gtag records the raw arguments object,
  // and Google's own snippet relies on that shape.
  const inline = [
    `window.${dataLayerName} = window.${dataLayerName} || [];`,
    `function gtag(){${dataLayerName}.push(arguments);}`,
    `gtag("js", new Date());${configCall}`,
  ].join("\n  ")

  return {
    scripts: [
      {
        src: `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}${
          dataLayerName !== "dataLayer" ? `&l=${encodeURIComponent(dataLayerName)}` : ""
        }`,
        async: true,
        id: `ga-lib-${measurementId}`,
      },
      { inline, id: `ga-init-${measurementId}` },
    ],
  }
}
