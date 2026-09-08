import { buildGoogleAnalyticsConfig } from "./buildGoogleAnalyticsConfig"
import { buildAdobeAnalyticsConfig } from "./buildAdobeAnalyticsConfig"
import { buildSeoTags } from "./buildSeoTags"
import { mergeHeadResources } from "../utilities/mergeHeadResources"
import { injectHeadResources } from "../utilities/injectHeadResources"
import type {
  AdobeAnalyticsConfig,
  GoogleAnalyticsConfig,
  LinkAttributes,
  MetaAttributes,
  ScriptAttributes,
  SeoConfig,
} from "../types"

/** Sources `injectHead` accepts — the vendor conveniences, plus raw resources. */
export interface InjectHeadConfig {
  /** Page SEO: title, description, canonical, robots, social cards. */
  seo?: SeoConfig
  /** Google Analytics 4 — a `G-…` measurement id, or a config. */
  googleAnalytics?: string | GoogleAnalyticsConfig
  /** Adobe Analytics — a Launch embed URL, or a config. */
  adobeAnalytics?: string | AdobeAnalyticsConfig
  /** Raw `<meta>` elements for anything the builders don't cover. */
  metas?: MetaAttributes[]
  /** Raw `<link>` elements. */
  links?: LinkAttributes[]
  /** Raw `<script>` elements, external or inline. */
  scripts?: ScriptAttributes[]
}

/**
 * JS-only head manager — resolves every source to head resources and writes
 * them into `<head>`. The framework-free counterpart to the `<Head>` component,
 * exactly as `injectFonts` is to `FontLoader` in `nice-styles`.
 *
 * Call once at startup. SSR-safe and idempotent.
 *
 * @returns A cleanup function removing what this call created.
 *
 * @example
 * import { injectHead } from "nice-react-head"
 *
 * injectHead({
 *   seo: { title: "Nice Prototypes", canonical: "https://niceprototypes.com/" },
 *   googleAnalytics: "G-MLPED529MH",
 * })
 *
 * @example
 * // A source no vendor covers — structured data — via the raw escape hatch.
 * injectHead({
 *   scripts: [{ type: "application/ld+json", inline: JSON.stringify(schema), id: "ld-org" }],
 * })
 */
export function injectHead(config: InjectHeadConfig): () => void {
  const resources = mergeHeadResources(
    config.seo ? buildSeoTags(config.seo) : null,
    config.googleAnalytics ? buildGoogleAnalyticsConfig(config.googleAnalytics) : null,
    config.adobeAnalytics ? buildAdobeAnalyticsConfig(config.adobeAnalytics) : null,
    { metas: config.metas, links: config.links, scripts: config.scripts }
  )

  return injectHeadResources(resources)
}
