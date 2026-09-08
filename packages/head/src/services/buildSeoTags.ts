import { buildOpenGraphTags } from "./buildOpenGraphTags"
import { buildTwitterCardTags } from "./buildTwitterCardTags"
import type { HeadResources, LinkAttributes, MetaAttributes, RobotsConfig, SeoConfig } from "../types"

/**
 * Serialize `RobotsConfig` into a `robots` content string.
 *
 * Returns `null` when every field is either unset or the permissive default,
 * because **the absence of a robots meta already means "index, follow"**.
 * Emitting `"index, follow"` is not wrong, but it puts a directive on the page
 * that someone can later flip to its opposite; emitting nothing leaves no such
 * switch. Only restrictions produce output.
 */
function serializeRobots(robots: RobotsConfig): string | null {
  const directives: string[] = []

  if (robots.index === false) directives.push("noindex")
  if (robots.follow === false) directives.push("nofollow")
  if (robots.noArchive) directives.push("noarchive")
  if (robots.noSnippet) directives.push("nosnippet")
  if (robots.maxSnippet !== undefined) directives.push(`max-snippet:${robots.maxSnippet}`)
  if (robots.maxImagePreview) directives.push(`max-image-preview:${robots.maxImagePreview}`)

  return directives.length > 0 ? directives.join(", ") : null
}

/**
 * Build the full head resource set for a page's SEO: title, description,
 * canonical link, crawler directives, and both social cards.
 *
 * The cards inherit from the page fields — `openGraph.title` defaults to
 * `title`, `twitter.*` defaults to the resolved Open Graph values — so a page
 * states each fact once.
 *
 * @example
 * buildSeoTags({
 *   title: "Nice Prototypes",
 *   description: "A zero-to-one design and development agency.",
 *   canonical: "https://niceprototypes.com/",
 *   openGraph: { siteName: "Nice Prototypes", image: { url: "https://niceprototypes.com/og.png", width: 1200, height: 630 } },
 *   twitter: { card: "summary_large_image" },
 * })
 *
 * @example
 * // Keep a page out of search results — the only way to emit a robots meta.
 * buildSeoTags({ title: "Internal", robots: { index: false, follow: false } })
 */
export function buildSeoTags(config: SeoConfig): HeadResources {
  const metas: MetaAttributes[] = []
  const links: LinkAttributes[] = []

  if (config.description) {
    metas.push({ name: "description", content: config.description })
  }

  if (config.keywords?.length) {
    metas.push({ name: "keywords", content: config.keywords.join(", ") })
  }

  if (config.robots) {
    const content = serializeRobots(config.robots)
    if (content) metas.push({ name: "robots", content })
  }

  if (config.canonical) {
    links.push({ rel: "canonical", href: config.canonical })
  }

  const openGraph = config.openGraph
    ? buildOpenGraphTags(config.openGraph, {
        title: config.title,
        description: config.description,
        url: config.canonical,
      })
    : []

  if (config.twitter) {
    metas.push(
      ...buildTwitterCardTags(config.twitter, {
        title: config.openGraph?.title ?? config.title,
        description: config.openGraph?.description ?? config.description,
        image: config.openGraph?.image,
      })
    )
  }

  metas.push(...openGraph)

  return {
    ...(config.title ? { title: config.title } : {}),
    ...(metas.length ? { metas } : {}),
    ...(links.length ? { links } : {}),
  }
}
