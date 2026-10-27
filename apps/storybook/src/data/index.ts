import type { ReactNode } from "react"
import { listTokens, type TokenGroup } from "nice-react-styles"
import data from "./storybook.json"
import type { DataColumn } from "../components/DataTable"
import type { TokenGroupConfig, TokenVariant } from "../dataTables/components/tokens/Modules/Modules.types"
import { buildTree, flatten, storySortOrder, type DataItem, type DataNode, type DataSettings } from "./tree.ts"
import { renderers } from "./renderers"
import { renderInline } from "./text"

export type { DataItem, DataNode, DataSettings } from "./tree.ts"
export { renderers, type Renderer } from "./renderers"

/** The resolved sidebar tree, built once from `storybook.json` (its shape is validated by `check:data`). */
const tree: DataItem[] = buildTree(data.items as unknown as DataNode[], data.defaults as DataSettings)

/** Every item by id, in sidebar order. */
const itemsById = new Map(flatten(tree).map(item => [item.id, item]))

/** The resolved tree, top-level items first. */
export const getTree = (): DataItem[] => tree

/** Every item, depth-first — the sidebar's top-to-bottom order. */
export const getItems = (): DataItem[] => [...itemsById.values()]

/** One item by id (its sanitized path), or undefined. */
export const getItem = (id: string): DataItem | undefined => itemsById.get(id)

/**
 * The item a Storybook entry belongs to. An entry id is the page id plus
 * `--{name}` (`tokens-fonts-fontsize--docs`), and the page id is the item id.
 */
export const getItemForEntry = (entryId: string): DataItem | undefined => getItem(entryId.split("--")[0])

/** The tree as Storybook's `storySort.order` array. */
export const getStorySortOrder = (): unknown[] => storySortOrder(tree)

/** A column set's names, as declared under `columns` in `storybook.json`. */
export type ColumnSetName = keyof typeof data.columns

/** A column set ready for `<DataTable columns columnWidths />`. */
export interface ColumnSet {
  columns: DataColumn[]
  /** Index-aligned to `columns`; undefined when no column in the set is fixed. */
  columnWidths?: (string | null)[]
}

/** Column width overrides by column key (`null` = equal flex). */
export type ColumnWidths = Record<string, string | null>

/**
 * A named column set, split into DataTable's two props: the column definitions
 * and the widths each column carries (`width`, or `null` for equal flex).
 * `widths` overrides individual columns by key.
 */
export const getColumns = (name: ColumnSetName, widths: ColumnWidths = {}): ColumnSet => {
  const set = data.columns[name] as (DataColumn & { width?: string })[]
  const columns = set.map(({ width, ...column }) => column)
  const columnWidths = set.map(column => (column.key in widths ? widths[column.key] : column.width ?? null))
  return columnWidths.some(width => width !== null) ? { columns, columnWidths } : { columns }
}

/** One token module page, resolved for the token tables. */
export interface TokenTable extends TokenGroupConfig, ColumnSet {
  /** The page's item id (its sanitized path). */
  id: string
  /** Prose under the page title. */
  description?: ReactNode
  /** Cap section headings at the content width (the item's `sectionWrapped`). */
  sectionWrapped: boolean
}

/** The group's variants from nice-styles, in registry order (core, non-inverse). */
const registryVariants = (group: string): TokenVariant[] =>
  listTokens({ group })
    .filter(token => !token.prefix && !token.inverse && token.path.length === 1)
    .map(token => token.variant as TokenVariant)

/** Whether an item is a token module page (its `table` is the tokenModule set). */
const isTokenPage = (item: DataItem): boolean => !item.isFolder && item.settings.table === "tokenModule"

/** Resolved token tables by item id, built on first use. */
let tokenTables: Map<string, TokenTable> | undefined

/** Build one token table from its item: the name is the token group. */
const toTokenTable = (item: DataItem): TokenTable => {
  const { description, variants, preview, widths } = item.settings as {
    description?: string
    variants?: TokenVariant[]
    preview?: string
    widths?: ColumnWidths
  }
  const render = renderers[preview ?? item.id]
  if (!render) throw new Error(`storybook data: no renderer "${preview ?? item.id}" for ${item.title}`)
  return {
    id: item.id,
    name: item.name as TokenGroup,
    description: description === undefined ? undefined : renderInline(description),
    variants: variants ?? registryVariants(item.name),
    preview: render,
    sectionWrapped: item.settings.sectionWrapped === true,
    ...getColumns("tokenModule", widths),
  }
}

const tokenTableMap = (): Map<string, TokenTable> =>
  (tokenTables ??= new Map(getItems().filter(isTokenPage).map(item => [item.id, toTokenTable(item)])))

/** Every token module table, in sidebar order. */
export const getTokenTables = (): TokenTable[] => [...tokenTableMap().values()]

/** One token module table by item id. */
export const getTokenTable = (id: string): TokenTable | undefined => tokenTableMap().get(id)

/** The id of the page documenting a token group, or undefined. */
export const tokenPageId = (group: string): string | undefined => getTokenTables().find(table => table.name === group)?.id
