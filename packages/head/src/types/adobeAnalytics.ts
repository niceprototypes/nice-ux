/** Adobe Analytics (Experience Platform / Launch) configuration. */

/**
 * An Adobe Analytics setup.
 *
 * Adobe delivers analytics through an environment-specific loader script rather
 * than a single global id, so the primitive here is the script URL. Accepted as
 * a bare URL string or as this object.
 */
export interface AdobeAnalyticsConfig {
  /**
   * The Launch / Tags embed script URL, e.g.
   * `https://assets.adobedtm.com/<property>/<env>/launch-<hash>.min.js`.
   */
  scriptUrl: string
  /**
   * Load asynchronously. Adobe's own docs favour a synchronous embed so the
   * library is ready before page code runs; async is faster but the library may
   * not exist yet when your first `track` call fires. @default true
   */
  async?: boolean
  /**
   * `digitalData` layer to define before the loader runs, for properties whose
   * rules read from it.
   */
  dataLayer?: Record<string, unknown>
  /**
   * `digitalData` global name. @default "digitalData"
   */
  dataLayerName?: string
}
