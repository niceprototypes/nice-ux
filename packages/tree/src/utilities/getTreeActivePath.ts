import type { TreeItemsType, TreeNodeIdType } from "../components/Tree/Tree.types"

/**
 * The ids from a top-level node down to the first node whose status is "active";
 * empty when no node is active.
 */
export const getTreeActivePath = (items: TreeItemsType): TreeNodeIdType[] => {
  for (const node of items) {
    if (node.status === "active") return [node.id]
    const path = node.items ? getTreeActivePath(node.items) : []
    if (path.length) return [node.id, ...path]
  }
  return []
}
