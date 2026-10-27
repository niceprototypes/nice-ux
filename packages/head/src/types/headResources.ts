/**
 * The generic primitive every builder in this package compiles down to.
 *
 * Vendor helpers (Google Analytics, Adobe Analytics, Open Graph…) exist only to
 * produce a `HeadResources`; nothing downstream — neither `<Head>` nor
 * `injectHead` — knows a vendor exists. Anything the vendors don't cover is
 * passed as these arrays directly, which is the escape hatch.
 */

/** `<meta>` attributes. Exactly one of `name` / `property` / `httpEquiv` identifies it. */
export interface MetaAttributes {
  /** Standard metadata name — `description`, `robots`, `viewport`. */
  name?: string
  /** RDFa property — the Open Graph namespace uses this, not `name`. */
  property?: string
  /** Pragma directive, e.g. `content-security-policy`. */
  httpEquiv?: string
  /** Character encoding declaration; mutually exclusive with the above. */
  charSet?: string
  /** The value. */
  content?: string
}

/** `<link>` attributes. */
export interface LinkAttributes {
  /** Relationship — `canonical`, `preconnect`, `stylesheet`, `icon`, `alternate`. */
  rel: string
  /** Target URL. */
  href: string
  /** CORS mode; `"anonymous"` for cross-origin font and script CDNs. */
  crossOrigin?: "anonymous" | "use-credentials"
  /** MIME type hint. */
  type?: string
  /** Media query gate. */
  media?: string
  /** `hreflang` for alternate-language documents. */
  hrefLang?: string
  /** Resource kind for `rel="preload"` / `rel="prefetch"`. */
  as?: string
  /**
   * React 19 stylesheet ordering. Only meaningful for `rel="stylesheet"`; React
   * uses it to decide insertion order and to block paint until loaded.
   */
  precedence?: string
}

/**
 * A `<script>` to add to the document. Either external (`src`) or `inline`.
 *
 * The split matters because React 19 hoists **async external scripts only** —
 * `<script async src="…">` may be rendered anywhere and is deduplicated, while
 * inline scripts and `defer` scripts receive no special treatment. So external
 * async scripts are rendered declaratively and inline ones are written to the
 * DOM imperatively. `<Head>` does both; consumers don't need to care which.
 */
export interface ScriptAttributes {
  /** External script URL. Mutually exclusive with `inline`. */
  src?: string
  /** Inline script body. Mutually exclusive with `src`. */
  inline?: string
  /** Load without blocking parsing. Required for React to hoist an external script. */
  async?: boolean
  /** Defer until after parsing. Note: a deferred script is never hoisted by React. */
  defer?: boolean
  /** Stable id — also the deduplication key for inline scripts. */
  id?: string
  /** MIME type, e.g. `application/ld+json` for structured data. */
  type?: string
  /** CORS mode. */
  crossOrigin?: "anonymous" | "use-credentials"
}

/**
 * The normalized output of every builder, and the input `<Head>` and
 * `injectHead` accept. Merging two of these is array concatenation — which is
 * what lets a page compose SEO tags, analytics, and raw additions freely.
 */
export interface HeadResources {
  /** Document title. Last one wins, matching React's own hoisting behaviour. */
  title?: string
  /** `<meta>` elements. */
  metas?: MetaAttributes[]
  /** `<link>` elements. */
  links?: LinkAttributes[]
  /** `<script>` elements, external or inline. */
  scripts?: ScriptAttributes[]
}
