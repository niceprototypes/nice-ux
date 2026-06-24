/**
 * Turn a CSS-variable cell value into a deep link to its module token story.
 *
 * A "root var" is a reference to a module-level token — the shorthand base
 * form `var(--np--{group})` or `var(--np--{group}--{variant})`. Anything with
 * more `--` segments (a component-to-component reference, or a theme / inverse
 * primitive) is not a module root and returns `null`, so it stays a plain code
 * cell.
 *
 * The module stories are titled `Tokens/Modules/{group}`, whose Storybook id is
 * the title lowercased with separators dropped (`backgroundColor` →
 * `tokens-modules-backgroundcolor`). The href uses Storybook's manager-route
 * form (`/?path=/docs/{id}--docs`) — a raw `/docs/…` anchor 404s, since only
 * MDX-rendered links get rewritten — and the anchor navigates with
 * `target="_top"` (it lives inside the preview iframe). The highlight target is
 * carried solely by sessionStorage (written on click, see CodeRow) — NOT a URL
 * param, because Storybook keeps query params across navigations, so a stale
 * `np-token` would stick and re-highlight an unrelated row later.
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
  if (segments.length > 2) return null // component token or theme primitive — not a module root

  // The var carries the kebab group (`background-color`); the module table's
  // `name` is camelCase (`backgroundColor`). Camelize so the highlight key
  // compares directly against the table name.
  const group = segments[0].replace(/-([a-z])/g, (_, c: string) => c.toUpperCase())
  const variant = segments[1] ?? "base"
  const storyId = `tokens-modules-${group.toLowerCase()}`
  const token = `${group}--${variant}`

  return { group, variant, token, href: `/?path=/docs/${storyId}--docs` }
}
