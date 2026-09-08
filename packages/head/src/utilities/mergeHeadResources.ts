import type { HeadResources } from "../types"

/**
 * Merge head resource sets left to right.
 *
 * Arrays concatenate — a page composes SEO tags, analytics, and raw additions
 * without any of them knowing about the others. `title` is last-write-wins,
 * matching React's own hoisting behaviour when several `<title>` elements
 * render.
 *
 * Deduplication is deliberately not done here. Two `og:image` tags are valid
 * (crawlers read both), and React already deduplicates async scripts and
 * stylesheets by href. Collapsing them at merge time would remove a legitimate
 * capability to fix a problem the platform already handles.
 */
export function mergeHeadResources(...sources: Array<HeadResources | null | undefined>): HeadResources {
  const merged: Required<Pick<HeadResources, "metas" | "links" | "scripts">> & HeadResources = {
    metas: [],
    links: [],
    scripts: [],
  }

  for (const source of sources) {
    if (!source) continue
    if (source.title !== undefined) merged.title = source.title
    if (source.metas) merged.metas.push(...source.metas)
    if (source.links) merged.links.push(...source.links)
    if (source.scripts) merged.scripts.push(...source.scripts)
  }

  return {
    ...(merged.title !== undefined ? { title: merged.title } : {}),
    ...(merged.metas.length ? { metas: merged.metas } : {}),
    ...(merged.links.length ? { links: merged.links } : {}),
    ...(merged.scripts.length ? { scripts: merged.scripts } : {}),
  }
}
