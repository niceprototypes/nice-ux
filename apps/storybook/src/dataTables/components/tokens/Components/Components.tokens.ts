import { componentTokensData, getComponentTokenKey } from "nice-react-styles"
import { CORE_TOKEN_REFERENCE } from "./Components.constants"
import type { ComponentTokenGroup, ComponentTokenNode, ComponentPrefixWithTokens } from "./Components.types"

/**
 * Component-level token reference data for the Tokens/Components stories.
 *
 * Reads straight from `componentTokensData` — the generated JSON each component
 * package ships in `styles/src/tokens/components/{prefix}.json` — and turns it
 * into the per-group leaf rows the table renders, marking whether each value is
 * a core-token reference or a literal.
 */

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