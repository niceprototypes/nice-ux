import { componentTokensData } from "@niceprototypes/styles"
import { tokenPageId } from "../data"

/**
 * Turn a CSS-variable cell value into a deep link to its token story.
 *
 * Two reference shapes resolve to a link; anything else returns `null` and stays
 * a plain code cell.
 *
 * 1. **Component reference** — `var(--np--{prefix}--…)` where `{prefix}` is a
 *    component that ships tokens (`button`, `icon`, …, keyed in
 *    `componentTokensData`). Links to that component's Tokens page
 *    `components-{prefix}-tokens--docs`, at any segment depth (`--np--button--size`,
 *    `--np--button--status--primary--background-color`). Checked first, because a
 *    two-segment component base like `--np--button--size` is shape-identical to a
 *    module `{group}--{variant}` and would otherwise misroute to a
 *    `tokens-button` story that does not exist.
 * 2. **Module root** — the shorthand base `var(--np--{group})` or
 *    `var(--np--{group}--{variant})` (at most two segments). Links to the module
 *    story `Tokens/{group}`, whose Storybook id is the title lowercased
 *    with separators dropped (`fontSize` → `tokens-fontsize`). Groups that live
 *    in a sidebar folder carry its segment too (`tokens-colors-bordercolor`) —
 *    the id comes from the page's place in `src/data/storybook.json`.
 *
 * A non-component reference with more than two `--` segments (a theme / inverse
 * primitive) is not a module root and returns `null`.
 *
 * The href uses Storybook's manager-route form (`/?path=/docs/{id}--docs`) — a
 * raw `/docs/…` anchor 404s, since only MDX-rendered links get rewritten — and
 * the anchor navigates with `target="_top"` (it lives inside the preview
 * iframe). The highlight target is carried solely by sessionStorage (written on
 * click) — NOT a URL param, because Storybook keeps query params across
 * navigations, so a stale `np-token` would stick and re-highlight an unrelated
 * row later.
 */
export interface TokenVarLink {
  /**
   * camelCase token group, e.g. `backgroundColor` — matches the module table's
   * `name`, so the highlight key compares directly against it.
   */
  group: string
  /** Variant within the group; `base` for the shorthand `var(--np--{group})`. */
  variant: string
  /** `{group}--{variant}` — the highlight key written to sessionStorage on click. */
  token: string
  /** `/?path=/docs/{storyId}--docs` (manager route). */
  href: string
}

/** sessionStorage key the link writes on click and the module table reads. */
export const HIGHLIGHT_KEY = "np-token"

export function parseTokenVarLink(value: string): TokenVarLink | null {
  const match = /^var\(--np--(.+)\)$/.exec(value.trim())
  if (!match) return null

  // Segments are double-dash separated; compound group names keep single dashes
  // (`background-color`), so splitting on `--` cleanly yields [group, variant?].
  const segments = match[1].split("--")

  // The var carries the kebab first segment (`background-color`); the module
  // table's `name` and the component prefixes are camelCase (`backgroundColor`,
  // `button`). Camelize so both comparisons are apples-to-apples.
  const group = segments[0].replace(/-([a-z])/g, (_, c: string) => c.toUpperCase())

  // Component reference: first segment is a component that ships tokens. Route to
  // its component Tokens page regardless of depth, before the module-root guard
  // below — a two-segment component base (`button--size`) is shape-identical to a
  // module `{group}--{variant}` and would otherwise 404 on a nonexistent
  // `tokens-button` story.
  if (Object.prototype.hasOwnProperty.call(componentTokensData, group)) {
    const variant = segments.slice(1).join("--") || "base"
    return {
      group,
      variant,
      token: `${group}--${variant}`,
      href: `/?path=/docs/components-${group.toLowerCase()}-tokens--docs`,
    }
  }

  if (segments.length > 2) return null // theme / inverse primitive — not a module root

  const variant = segments[1] ?? "base"
  const token = `${group}--${variant}`

  const pageId = tokenPageId(group)
  if (!pageId) return null // no page documents this group

  return { group, variant, token, href: `/?path=/docs/${pageId}--docs` }
}
