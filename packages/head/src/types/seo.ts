/** Configuration for `buildSeoTags` and its card sub-builders. */

/**
 * Crawler directives, structured rather than stringly-typed.
 *
 * The string form (`"noindex, nofollow"`) is what ships in most hand-written
 * `index.html` files, and it is easy to leave in place for a year without
 * anyone noticing the site is invisible. Booleans make the intent explicit and
 * greppable; `buildSeoTags` serializes them.
 */
export interface RobotsConfig {
  /** Allow this page in search results. Emits `noindex` when false. */
  index?: boolean
  /** Allow crawlers to follow links from this page. Emits `nofollow` when false. */
  follow?: boolean
  /** Suppress the cached-page link. */
  noArchive?: boolean
  /** Suppress the auto-generated snippet. */
  noSnippet?: boolean
  /** Cap snippet length in characters; `0` suppresses, `-1` lifts the cap. */
  maxSnippet?: number
  /** Largest image preview Google may show. */
  maxImagePreview?: "none" | "standard" | "large"
}

/** An image referenced by a social card. */
export interface SocialImage {
  /** Absolute URL — relative paths are not resolved by crawlers. */
  url: string
  /** Pixel width, used by crawlers to lay out the card before fetching. */
  width?: number
  /** Pixel height. */
  height?: number
  /** MIME type, e.g. `image/png`. */
  type?: string
  /** Alternative text. */
  alt?: string
}

/** Open Graph properties. Emitted as `<meta property="og:*">`. */
export interface OpenGraphConfig {
  /** `og:title` — falls back to the document title. */
  title?: string
  /** `og:description` — falls back to the meta description. */
  description?: string
  /** `og:url` — falls back to the canonical URL. */
  url?: string
  /** `og:type`. @default "website" */
  type?: string
  /** `og:site_name`. */
  siteName?: string
  /** `og:locale`, e.g. `en_US`. */
  locale?: string
  /** `og:image` and its dimension/type/alt companions. */
  image?: SocialImage | string
}

/** Twitter card properties. Emitted as `<meta name="twitter:*">`. */
export interface TwitterCardConfig {
  /** Card layout. @default "summary_large_image" */
  card?: "summary" | "summary_large_image" | "app" | "player"
  /** `twitter:site` — the site's @handle. */
  site?: string
  /** `twitter:creator` — the author's @handle. */
  creator?: string
  /** Falls back to the Open Graph title. */
  title?: string
  /** Falls back to the Open Graph description. */
  description?: string
  /** Falls back to the Open Graph image. */
  image?: SocialImage | string
}

/**
 * Everything `buildSeoTags` accepts. Every field is optional so a page can
 * override one thing without restating the rest.
 */
export interface SeoConfig {
  /** Document title. */
  title?: string
  /** Meta description. */
  description?: string
  /** Absolute canonical URL — emitted as `<link rel="canonical">`. */
  canonical?: string
  /**
   * Crawler directives. Omitted entirely when absent: **no `robots` meta is the
   * indexable default**, so a page opts into restriction rather than out of it.
   */
  robots?: RobotsConfig
  /** Open Graph card. Inherits title/description/url when they aren't set. */
  openGraph?: OpenGraphConfig
  /** Twitter card. Inherits from Open Graph when not set. */
  twitter?: TwitterCardConfig
  /** Comma-joined `keywords` meta. Largely ignored by search engines today. */
  keywords?: string[]
}
