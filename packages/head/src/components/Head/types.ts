import type { ReactNode } from "react"
import type {
  AdobeAnalyticsConfig,
  GoogleAnalyticsConfig,
  LinkAttributes,
  MetaAttributes,
  ScriptAttributes,
  SeoConfig,
} from "../../types"

export interface HeadProps {
  /**
   * Head elements written as JSX. React 19 hoists `<title>`, `<meta>`,
   * `<link>` and async `<script src>` from anywhere in the tree, so this is a
   * passthrough — it exists to group them legibly at a call site.
   */
  children?: ReactNode
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

export type {
  AdobeAnalyticsConfig,
  GoogleAnalyticsConfig,
  HeadResources,
  LinkAttributes,
  MetaAttributes,
  OpenGraphConfig,
  RobotsConfig,
  ScriptAttributes,
  SeoConfig,
  SocialImage,
  TwitterCardConfig,
} from "../../types"
