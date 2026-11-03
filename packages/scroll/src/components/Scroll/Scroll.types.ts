import * as React from "react"

/**
 * ScrollAxisType
 *
 * The direction the content scrolls in: `x` (`overflow-x: auto`), `y` (`overflow-y: auto`)
 * or `both` (`overflow: auto`).
 */
export type ScrollAxisType = "x" | "y" | "both"

/**
 * ScrollAsType
 *
 * The element Scroll renders: a `nav` for a contents rail, a `ul` for a list.
 */
export type ScrollAsType = "div" | "nav" | "ul"

/**
 * ScrollProps
 *
 * The scroll container. HTML attributes (role, tabIndex, aria-*, style, event handlers) pass
 * through to the element; `className` lets a component extend it with `styled(Scroll)`.
 */
export type ScrollProps = React.HTMLAttributes<HTMLElement> & {
  /** The element to render. @default "div" */
  as?: ScrollAsType
  /** The direction the content scrolls in. @default "y" */
  axis?: ScrollAxisType
  /**
   * Show the scrollbar. Hidden, the content still scrolls by wheel, touch and keyboard.
   * Unset, the `scroll.scrollbarWidth` token decides: hidden, unless the project's
   * `setTokens({ scroll: { scrollbarWidth: { base: "auto" } } })` shows every scrollbar.
   */
  showScrollbar?: boolean
  /** The element, for a ScrollProvider `root` or for measuring and scrolling it. */
  ref?: React.Ref<HTMLElement>
  children?: React.ReactNode
}

// Declaration merging: const + namespace creates exportable type namespace
const ScrollTypes = {} as const

namespace ScrollTypes {
  export type Axis = ScrollAxisType
  export type As = ScrollAsType
  export type Props = ScrollProps
}

export default ScrollTypes
