/**
 * Turn a CSS-variable cell value into a deep link to its module token story.
 *
 * A "root var" is a reference to a module-level token — the shorthand base
 * form `var(--np--{group})` or `var(--np--{group}--{variant})`. Anything with
 * more `--` segments (a component-to-component reference, or a theme / inverse
 * primitive) is not a module root and returns `null`, so it stays a plain code
 * cell.
 *
 * Most module stories are titled `Tokens/Modules/{group}`, whose Storybook id is
 * the title lowercased with separators dropped (`fontSize` →
 * `tokens-modules-fontsize`). The color family (`color` / `backgroundColor` /
 * `borderColor`) is the exception — those share one `color` story as `## `
 * sections, so their links target `tokens-modules-colors--docs#{section}` (see
 * `COLOR_PAGE_SECTIONS`). The href uses Storybook's manager-route form
 * (`/?path=/docs/{id}--docs`) — a raw `/docs/…` anchor 404s, since only
 * MDX-rendered links get rewritten — and the anchor navigates with
 * `target="_top"` (it lives inside the preview iframe). The highlight target is
 * carried solely by sessionStorage (written on click) — NOT a URL param,
 * because Storybook keeps query params across navigations, so a stale
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

/**
 * The color-family groups share one Modules story (`Colors`), each rendered as an
 * `## ` section there. Maps the camelCase group → that section's heading-anchor
 * slug so a link scrolls to the right section. Must track the section headings in
 * `stories/Tokens/Modules/Colors.mdx`.
 */
const COLOR_PAGE_SECTIONS: Record<string, string> = {
  color: "color",
  backgroundColor: "background-color",
  borderColor: "border-color",
  brandColor: "brand-color",
}

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
  const token = `${group}--${variant}`

  // Color-family groups live as sections on the shared `Colors` story; everything
  // else is its own `tokens-modules-{group}` story.
  const section = COLOR_PAGE_SECTIONS[group]
  const storyId = section ? "tokens-modules-colors" : `tokens-modules-${group.toLowerCase()}`
  const hash = section ? `#${section}` : ""

  return { group, variant, token, href: `/?path=/docs/${storyId}--docs${hash}` }
}
