import type { FontSizeType } from "@niceprototypes/styles"
import type * as React from "react"

/**
 * ContentsItemIdType
 *
 * The id of the in-page element a row links to (`href="#{id}"`).
 */
export type ContentsItemIdType = string

/**
 * ContentsItemLabelType
 *
 * The row's text.
 */
export type ContentsItemLabelType = React.ReactNode

/**
 * ContentsItemType
 *
 * One row: a link to the element with `id`, and optional nested rows.
 */
export type ContentsItemType = {
  id: ContentsItemIdType
  label: ContentsItemLabelType
  items?: ContentsItemsType
}

/**
 * ContentsItemsType
 *
 * The rows of one level, in page order.
 */
export type ContentsItemsType = ReadonlyArray<ContentsItemType>

/**
 * ContentsHeadingType
 *
 * The sticky heading above the rows; it also names the `<nav>` landmark.
 */
export type ContentsHeadingType = React.ReactNode

/**
 * ContentsActiveIdType
 *
 * The id of the highlighted row. Set, it pins the highlight (controlled); unset, scroll-spy
 * moves it to the section in view.
 */
export type ContentsActiveIdType = ContentsItemIdType

/**
 * ContentsOnActiveChangeType
 *
 * Called with the id scroll-spy or a click makes active.
 */
export type ContentsOnActiveChangeType = (id: ContentsItemIdType) => void

/**
 * ContentsProps
 *
 * Complete prop definition for the Contents component.
 */
/**
 * ContentsSizeType
 *
 * The heading's and rows' text size, a font size token variant.
 */
export type ContentsSizeType = FontSizeType

export interface ContentsProps {
  /** The rows, nested by `items` */
  items: ContentsItemsType

  /** Heading text */
  heading?: ContentsHeadingType

  /** Highlighted row (controlled) */
  activeId?: ContentsActiveIdType

  /** Active-row change handler */
  onActiveChange?: ContentsOnActiveChangeType

  /** Accessible name of the `<nav>` landmark; defaults to the heading */
  "aria-label"?: string

  /** Text size of the heading and rows. @default "smaller" */
  size?: ContentsSizeType
}

const ContentsTypes = {} as const

namespace ContentsTypes {
  export type Size = ContentsSizeType
  export type ItemId = ContentsItemIdType
  export type ItemLabel = ContentsItemLabelType
  export type Item = ContentsItemType
  export type Items = ContentsItemsType
  export type Heading = ContentsHeadingType
  export type ActiveId = ContentsActiveIdType
  export type OnActiveChange = ContentsOnActiveChangeType
  export type Props = ContentsProps
}

export default ContentsTypes
