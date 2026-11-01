import type * as React from "react"
import type { ColorTokenProp, ColorType } from "@niceprototypes/styles"

/**
 * TreeNodeIdType
 *
 * Unique id of a node across the whole tree; keys `expandedIds`.
 */
export type TreeNodeIdType = string

/**
 * TreeNodeNameType
 *
 * The row's label, rendered through Ink; also the accessible name of its link or button.
 */
export type TreeNodeNameType = string

/**
 * TreeNodeIconType
 *
 * Content before the label (an Icon); `null` for none. Icons take the row's colour.
 */
export type TreeNodeIconType = React.ReactNode

/**
 * TreeNodeUrlType
 *
 * Link target of a leaf. A node with `items` is a folder: its row toggles it and
 * renders no link.
 */
export type TreeNodeUrlType = string

/**
 * TreeNodeStatusType
 *
 * Row status.
 *
 * Values:
 * - "active": the current page. It and its ancestors take `activeColor`; every other
 *   row recedes until hovered.
 */
export type TreeNodeStatusType = "active"

/**
 * TreeNodeChildrenType
 *
 * Custom content rendered inside the row, after the label.
 */
export type TreeNodeChildrenType = React.ReactNode

/**
 * TreeNodeType
 *
 * One row and its sub-rows.
 * - id: unique across the tree
 * - name: label
 * - icon: content before the label, or null
 * - url: link target of a leaf
 * - status: "active" for the current page
 * - items: sub-rows; a node with items is a folder
 * - children: custom content inside the row
 */
export type TreeNodeType = {
  id: TreeNodeIdType
  name: TreeNodeNameType
  icon: TreeNodeIconType
  url?: TreeNodeUrlType
  status?: TreeNodeStatusType
  items?: TreeItemsType
  children?: TreeNodeChildrenType
}

/**
 * TreeItemsType
 *
 * The rows at one level of the tree.
 */
export type TreeItemsType = ReadonlyArray<TreeNodeType>

/**
 * TreeActiveColorType
 *
 * Re-export of ColorType from @niceprototypes/styles.
 * Colour of the active row, its ancestors and the guide line leading to it.
 */
export type TreeActiveColorType = ColorType

/**
 * TreeExpandedIdsType
 *
 * Ids of the open folders.
 */
export type TreeExpandedIdsType = ReadonlyArray<TreeNodeIdType>

/**
 * TreeOnExpandedChangeType
 *
 * Called when a folder row is toggled, with the next open folder ids and the click event.
 */
export type TreeOnExpandedChangeType = (
  expandedIds: TreeNodeIdType[],
  event: React.MouseEvent<HTMLButtonElement>,
) => void

/**
 * TreeOnSelectType
 *
 * Called when a leaf's link is clicked, with the node and the click event. A client-side
 * router calls `event.preventDefault()` and navigates itself.
 */
export type TreeOnSelectType = (node: TreeNodeType, event: React.MouseEvent<HTMLAnchorElement>) => void

/**
 * TreeProps
 *
 * Complete prop definition for the Tree component.
 */
export interface TreeProps {
  /** The top-level rows */
  items: TreeItemsType

  /** Colour of the active path; defaults to the `tree.activeColor` token (the link colour) */
  activeColor?: ColorTokenProp<TreeActiveColorType>

  /** Open folders (controlled) */
  expandedIds?: TreeExpandedIdsType

  /** Initially open folders (uncontrolled); defaults to the active node's ancestors */
  defaultExpandedIds?: TreeExpandedIdsType

  /** Folder toggle handler */
  onExpandedChange?: TreeOnExpandedChangeType

  /** Leaf link click handler */
  onSelect?: TreeOnSelectType

  /** Accessible name of the `<nav>` landmark */
  "aria-label"?: string
}

const TreeTypes = {} as const

namespace TreeTypes {
  export type NodeId = TreeNodeIdType
  export type NodeName = TreeNodeNameType
  export type NodeIcon = TreeNodeIconType
  export type NodeUrl = TreeNodeUrlType
  export type NodeStatus = TreeNodeStatusType
  export type NodeChildren = TreeNodeChildrenType
  export type Node = TreeNodeType
  export type Items = TreeItemsType
  export type ActiveColor = TreeActiveColorType
  export type ExpandedIds = TreeExpandedIdsType
  export type OnExpandedChange = TreeOnExpandedChangeType
  export type OnSelect = TreeOnSelectType
  export type Props = TreeProps
}

export default TreeTypes
