/** Google Analytics 4 (gtag.js) configuration. */

/**
 * A GA4 measurement setup.
 *
 * Accepted either as a bare measurement id string — `"G-XXXXXXXXXX"` — or as
 * this object when you need config parameters. Mirrors how `googleFonts`
 * accepts a URL or a prebuilt config in `nice-styles`.
 */
export interface GoogleAnalyticsConfig {
  /** Measurement id, `G-XXXXXXXXXX`. Found under the GA4 property's data stream. */
  measurementId: string
  /**
   * Extra parameters passed to `gtag("config", id, params)` — `send_page_view`,
   * `anonymize_ip`, `cookie_domain`, custom dimensions, and so on.
   */
  config?: Record<string, unknown>
  /**
   * `dataLayer` global name. Change only when coexisting with another tag
   * manager that already owns the default. @default "dataLayer"
   */
  dataLayerName?: string
  /**
   * Emit the config call at load. Set false for consent-gated setups, where the
   * page calls `gtag("config", …)` itself once consent is recorded.
   * @default true
   */
  autoConfig?: boolean
}
