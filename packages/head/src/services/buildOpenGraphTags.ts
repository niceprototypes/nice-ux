import type { MetaAttributes, OpenGraphConfig, SocialImage } from "../types"

/** Normalize the string shorthand — `image: "https://…"` — into a `SocialImage`. */
function toSocialImage(image: SocialImage | string): SocialImage {
  return typeof image === "string" ? { url: image } : image
}

/**
 * Build the `<meta property="og:*">` set for an Open Graph card.
 *
 * Open Graph uses `property`, not `name` — a distinction crawlers enforce, and
 * the most common reason a card silently fails to render.
 *
 * `fallbacks` supplies title/description/url from the page's own SEO fields so
 * a card doesn't have to restate them; anything set explicitly on `config`
 * wins.
 *
 * @example
 * buildOpenGraphTags({ siteName: "Nice Prototypes", image: "/og.png" },
 *                    { title: "Home", url: "https://example.com/" })
 */
export function buildOpenGraphTags(
  config: OpenGraphConfig,
  fallbacks: { title?: string; description?: string; url?: string } = {}
): MetaAttributes[] {
  const title = config.title ?? fallbacks.title
  const description = config.description ?? fallbacks.description
  const url = config.url ?? fallbacks.url
  const metas: MetaAttributes[] = []

  const push = (property: string, content?: string) => {
    if (content) metas.push({ property, content })
  }

  push("og:type", config.type ?? "website")
  push("og:title", title)
  push("og:description", description)
  push("og:url", url)
  push("og:site_name", config.siteName)
  push("og:locale", config.locale)

  if (config.image) {
    const image = toSocialImage(config.image)
    push("og:image", image.url)
    // Dimensions let a crawler reserve card space before fetching the image;
    // without them some clients defer or skip the preview.
    if (image.width !== undefined) push("og:image:width", String(image.width))
    if (image.height !== undefined) push("og:image:height", String(image.height))
    push("og:image:type", image.type)
    push("og:image:alt", image.alt)
  }

  return metas
}
