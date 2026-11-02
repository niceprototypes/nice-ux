import type { ContentsItemsType } from "../components/Contents/Contents.types"

/** Every row id, depth-first: the page order of the sections. */
export const getContentsIds = (items: ContentsItemsType): string[] =>
  items.flatMap(item => [item.id, ...(item.items ? getContentsIds(item.items) : [])])
