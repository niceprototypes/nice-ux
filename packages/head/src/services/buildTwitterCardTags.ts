import type { MetaAttributes, SocialImage, TwitterCardConfig } from "../types"

function toSocialImage(image: SocialImage | string): SocialImage {
  return typeof image === "string" ? { url: image } : image
}

/**
 * Build the `<meta name="twitter:*">` set for a Twitter/X card.
 *
 * Unlike Open Graph these use `name`, not `property`. Twitter falls back to
 * Open Graph for anything absent, so the minimum worth emitting is `card` —
 * everything else here exists to override OG rather than duplicate it. The
 * `fallbacks` argument is the OG values, so passing them makes the card
 * explicit rather than inherited.
 */
export function buildTwitterCardTags(
  config: TwitterCardConfig,
  fallbacks: { title?: string; description?: string; image?: SocialImage | string } = {}
): MetaAttributes[] {
  const metas: MetaAttributes[] = []

  const push = (name: string, content?: string) => {
    if (content) metas.push({ name, content })
  }

  push("twitter:card", config.card ?? "summary_large_image")
  push("twitter:site", config.site)
  push("twitter:creator", config.creator)
  push("twitter:title", config.title ?? fallbacks.title)
  push("twitter:description", config.description ?? fallbacks.description)

  const image = config.image ?? fallbacks.image
  if (image) {
    const resolved = toSocialImage(image)
    push("twitter:image", resolved.url)
    push("twitter:image:alt", resolved.alt)
  }

  return metas
}
