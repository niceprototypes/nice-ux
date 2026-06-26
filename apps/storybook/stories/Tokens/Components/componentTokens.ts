import { componentTokensData, getComponentTokenKey, type ComponentPrefix } from "nice-react-styles"

/**
 * Component-level token reference data for the Tokens/Components stories.
 *
 * Unlike Tokens/Modules (which documents the core token scale), these pages
 * read straight from `componentTokensData` — the generated JSON each component
 * package ships in `styles/src/tokens/components/{prefix}.json`. The point of
 * the page is to show, per component, which tokens are **initialized to a core
 * token** (a `var(--np--…)` reference that inherits down the tree and can be
 * overridden) versus which are a **literal string value** (a fixed `#ddd`,
 * `transparent`, `0 0 16 16`, …).
 */

type ComponentTokenNode = string | { [key: string]: ComponentTokenNode }

/** A single resolved leaf token within a component's token tree. */
export interface ComponentTokenRow {
  /** Full path from the top-level group to the leaf (e.g. `["status","primary","backgroundColor","base"]`). */
  path: string[]
  /** Human label for the row beneath its group (e.g. `dark`, or `borderColor: primary.base` for status tokens). */
  variant: string
  /** The component CSS variable this leaf defines (e.g. `--np--button--size`). */
  cssVar: string
  /** The raw value the variable is initialized to (a core `var(--np--…)` reference or a literal string). */
  value: string
  /** True when `value` wires to a core token (contains a `var(--np--…)` reference, including via `calc(...)`). */
  isCoreToken: boolean
}

/** One top-level token group within a component (e.g. `size`, `status`). */
export interface ComponentTokenGroup {
  /** Top-level group name — the leading path segment. */
  name: string
  rows: ComponentTokenRow[]
}

/** A component prefix that actually ships component tokens. */
export type ComponentPrefixWithTokens = ComponentPrefix

// Detects a core-token reference anywhere in a value — a bare `var(--np--…)`
// or one nested in `calc(...)`. Anything else is treated as a literal string.
const CORE_TOKEN_REFERENCE = /var\(\s*--np--/

// Walk a token tree, emitting one entry per string leaf. The `$themes` branch
// (theme overrides) is skipped — these pages document the default theme.
function collectLeaves(node: ComponentTokenNode, prefixPath: string[], out: Array<{ path: string[]; value: string }>): void {
  if (typeof node === "string") {
    out.push({ path: prefixPath, value: node })
    return
  }
  for (const [key, child] of Object.entries(node)) {
    if (key === "$themes") continue
    collectLeaves(child, [...prefixPath, key], out)
  }
}

/**
 * The row's display name beneath its group. Simple groups nest one level
 * (`[property, state]`), so the name is just the state (`base`, `dark`). The
 * `status` group nests three (`[type, property, state]`) and renders as
 * `property: type.state` (e.g. `borderColor: primary.base`) — surfacing the
 * property, which the `status` group name itself doesn't convey. A bare group
 * leaf falls back to the group name.
 */
function formatComponentVariant(path: string[]): string {
  const sub = path.slice(1)
  if (sub.length === 3) {
    const [type, property, state] = sub
    return `${property}: ${type}.${state}`
  }
  return sub.join(" / ") || path[0]
}

/**
 * The token groups for one component, in source order. Each group carries its
 * leaf rows with the resolved CSS variable, the value it is initialized to, and
 * whether that value references a core token.
 */
export function getComponentTokenGroups(prefix: ComponentPrefixWithTokens): ComponentTokenGroup[] {
  const tree = componentTokensData[prefix] as { [key: string]: ComponentTokenNode } | undefined
  if (!tree) return []

  const groups: ComponentTokenGroup[] = []
  for (const [groupName, groupNode] of Object.entries(tree)) {
    if (groupName === "$themes") continue
    const leaves: Array<{ path: string[]; value: string }> = []
    collectLeaves(groupNode, [groupName], leaves)
    groups.push({
      name: groupName,
      rows: leaves.map(({ path, value }) => ({
        path,
        variant: formatComponentVariant(path),
        cssVar: getComponentTokenKey(prefix, { token: path }),
        value,
        isCoreToken: CORE_TOKEN_REFERENCE.test(value),
      })),
    })
  }
  return groups
}

/** Every component prefix that ships tokens, in sidebar (alphabetical) order. */
export const componentPrefixesWithTokens: ComponentPrefixWithTokens[] = (
  Object.keys(componentTokensData) as ComponentPrefixWithTokens[]
).sort()

/** Title-cased component label for a prefix (e.g. `button` → `Button`). */
export function componentLabel(prefix: ComponentPrefixWithTokens): string {
  return prefix.charAt(0).toUpperCase() + prefix.slice(1)
}