/**
 * Pure tree logic for `storybook.json` — shared by storybook (through
 * `./index.ts`) and `scripts/check-data.ts` (Node runs it with types stripped),
 * so it has no imports and uses only erasable TypeScript.
 *
 * Node shapes (the shape is the structure — there are no id/title/items fields
 * except a folder's own `items` when it also carries settings):
 * - `"animationDuration"`                          — a page.
 * - `{ "Animation": [ … ] }`                       — a folder.
 * - `{ "animationEasing": { …settings } }`         — a page with settings.
 * - `{ "Fonts": { …settings, "items": [ … ] } }`   — a folder with settings.
 *
 * Settings cascade: a folder's settings apply to every descendant, and an item's
 * own settings win over inherited ones. Plain objects merge key by key (a page
 * can override one column width its folder set); every other value — arrays
 * included — replaces the inherited one.
 */

/** An item's own settings; `items` is reserved for a folder's children. */
export type DataSettings = { [key: string]: unknown }

/** One entry of an `items` array. */
export type DataNode = string | { [name: string]: DataNode[] | DataSettings }

/** A tree node with everything derivable from its position resolved. */
export interface DataItem {
  /** Storybook-compatible id: the sanitized path (`tokens-animation-animationeasing`). */
  id: string
  /** Storybook title: the path joined with `/` (`Tokens/Animation/animationEasing`). */
  title: string
  /** The name of each ancestor, then this item's own name. */
  path: string[]
  /** This item's own name — the last path segment. */
  name: string
  /** 0 for a top-level item. */
  depth: number
  /** Whether the item has children. */
  isFolder: boolean
  /** Settings written on this item. */
  own: DataSettings
  /** Inherited settings overlaid with `own`. */
  settings: DataSettings
  /** Child items, in sidebar order. */
  children: DataItem[]
}

/** Whether a value is a plain object (not an array, not null). */
const isPlainObject = (value: unknown): value is DataSettings =>
  value !== null && typeof value === "object" && !Array.isArray(value)

/** `base` overlaid with `over`: plain objects merge recursively, anything else replaces. */
export const mergeSettings = (base: DataSettings, over: DataSettings): DataSettings => {
  const merged: DataSettings = { ...base }
  for (const [key, value] of Object.entries(over)) {
    const inherited = merged[key]
    merged[key] = isPlainObject(inherited) && isPlainObject(value) ? mergeSettings(inherited, value) : value
  }
  return merged
}

/**
 * Storybook's id sanitizer: lowercase, punctuation and spaces to `-`, repeated
 * dashes collapsed, leading/trailing dashes trimmed.
 */
export const sanitize = (value: string): string =>
  value
    .toLowerCase()
    .replace(/[ ’–—―′¿'`~!@#$%^&*()_|+\-=?;:'",.<>{}[\]\\/]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "")

/** A node's name, its own settings, and its children (undefined for a page). */
const parseNode = (node: DataNode, at: string): { name: string; own: DataSettings; children?: DataNode[] } => {
  if (typeof node === "string") {
    if (!node.trim()) throw new Error(`${at}: empty item name`)
    return { name: node, own: {} }
  }
  if (node === null || typeof node !== "object" || Array.isArray(node)) {
    throw new Error(`${at}: an item is a string or an object with exactly one key`)
  }
  const keys = Object.keys(node)
  if (keys.length !== 1) throw new Error(`${at}: an item object must have exactly one key, found ${keys.length}`)
  const name = keys[0]
  if (!name.trim()) throw new Error(`${at}: empty item name`)
  const value = node[name]
  if (Array.isArray(value)) return { name, own: {}, children: value }
  if (value === null || typeof value !== "object") {
    throw new Error(`${at}/${name}: value must be an array of items or a settings object`)
  }
  const { items, ...own } = value as DataSettings
  if (items !== undefined && !Array.isArray(items)) throw new Error(`${at}/${name}: "items" must be an array`)
  return { name, own, children: items as DataNode[] | undefined }
}

/**
 * Build the resolved tree. Throws on the first malformed node, naming its path.
 *
 * @param nodes - The `items` array.
 * @param inherited - Settings every node starts from (the JSON's `defaults`).
 * @param parent - Ancestor path; omit at the root.
 */
export const buildTree = (nodes: DataNode[], inherited: DataSettings = {}, parent: string[] = []): DataItem[] =>
  nodes.map((node, index) => {
    const at = parent.length ? parent.join("/") : `items[${index}]`
    const { name, own, children } = parseNode(node, at)
    const path = [...parent, name]
    const settings = mergeSettings(inherited, own)
    const title = path.join("/")
    return {
      id: sanitize(title),
      title,
      path,
      name,
      depth: parent.length,
      isFolder: children !== undefined,
      own,
      settings,
      children: children ? buildTree(children, settings, path) : [],
    }
  })

/** Every item, depth-first — the sidebar's top-to-bottom order. */
export const flatten = (tree: DataItem[]): DataItem[] =>
  tree.flatMap(item => [item, ...flatten(item.children)])

/**
 * The tree as Storybook's `storySort.order` array: each name, followed by its
 * children's order when it is a folder.
 */
export const storySortOrder = (tree: DataItem[]): unknown[] =>
  tree.flatMap(item => (item.isFolder ? [item.name, storySortOrder(item.children)] : [item.name]))

/**
 * Structural problems in an `items` array, as messages; empty when valid.
 * Covers malformed nodes and items whose paths sanitize to the same id.
 */
export const validate = (nodes: unknown, defaults: unknown = {}): string[] => {
  if (!Array.isArray(nodes)) return ['"items" must be an array']
  if (defaults === null || typeof defaults !== "object" || Array.isArray(defaults)) return ['"defaults" must be an object']
  let tree: DataItem[]
  try {
    tree = buildTree(nodes as DataNode[], defaults as DataSettings)
  } catch (error) {
    return [(error as Error).message]
  }
  const seen = new Map<string, string>()
  const errors: string[] = []
  for (const item of flatten(tree)) {
    const first = seen.get(item.id)
    if (first) errors.push(`duplicate id "${item.id}": "${first}" and "${item.title}"`)
    else seen.set(item.id, item.title)
  }
  return errors
}
