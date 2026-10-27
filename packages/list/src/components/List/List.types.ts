import * as React from "react"
import type { SizeType, ThemeType } from "@niceprototypes/styles"

/**
 * ListChildrenType
 *
 * The list's items, typically `ListItem` elements. `null`, `undefined` and
 * boolean children render nothing and do not receive dividers.
 */
export type ListChildrenType = React.ReactNode

/**
 * ListScrollableType
 *
 * When true, the list caps its height at `list.maxHeight` and scrolls
 * vertically (`overflow-y: auto`).
 */
export type ListScrollableType = boolean

/**
 * ListSizeType
 *
 * Re-export of SizeType from @niceprototypes/styles.
 * Item padding scale, passed to every ListItem through context.
 *
 * Values:
 * - "smaller" | "small" | "base" | "large" | "larger"
 */
export type ListSizeType = SizeType

/**
 * ListThemeType
 *
 * Re-export of ThemeType from @niceprototypes/styles.
 * Pin token resolution to a specific theme.
 * Extensible for consumer-defined custom themes.
 */
export type ListThemeType = ThemeType

/**
 * ListOwnProps
 *
 * Props the List component owns. Every other standard `<ul>` attribute
 * (role, aria-*, data-*, id, tabIndex, event handlers) passes through to
 * the root element.
 */
export interface ListOwnProps {
  /** The list's items, typically `ListItem` elements */
  children?: ListChildrenType
  /** Cap the height at `list.maxHeight` and scroll vertically. Default false */
  scrollable?: ListScrollableType
  /** Item padding scale, passed to every ListItem. Default "base" */
  size?: ListSizeType
  /** CSS class name applied to the root element */
  className?: string
  /** Pin token resolution to a specific theme */
  theme?: ListThemeType
  /** Ref to the `<ul>` element */
  ref?: React.Ref<HTMLUListElement>
}

/**
 * ListProps
 *
 * Complete prop definition for the List component: the owned props plus
 * every standard `<ul>` attribute not owned by the component.
 */
export type ListProps = ListOwnProps & Omit<React.HTMLAttributes<HTMLUListElement>, keyof ListOwnProps>

/**
 * ListContextValue
 *
 * Value List provides to its ListItems.
 */
export interface ListContextValue {
  /** Item padding scale */
  size: ListSizeType
}

// Declaration merging: const + namespace creates exportable type namespace
const ListTypes = {} as const

namespace ListTypes {
  export type Children = ListChildrenType
  export type Scrollable = ListScrollableType
  export type Size = ListSizeType
  export type Theme = ListThemeType
  export type OwnProps = ListOwnProps
  export type Props = ListProps
  export type ContextValue = ListContextValue
}

export default ListTypes
