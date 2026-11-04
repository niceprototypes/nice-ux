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
 * ScrollRootType
 *
 * The page scroller for `root`: `true` for the window, or the element the page scrolls in (an
 * app shell's region), as the element or a ref to it.
 */
export type ScrollRootType = true | HTMLElement | React.RefObject<HTMLElement | null>

/**
 * ScrollStickyOptionsType
 *
 * The `sticky` options.
 */
export type ScrollStickyOptionsType = {
  /** Stacking order among the root's sticky bars: lower orders sit above. @default 0 */
  order?: number
  /** Called with true when the bar sticks, false when it returns to its place. */
  onChange?: (isSticky: boolean) => void
}

/**
 * ScrollFadeOptionsType
 *
 * The `fade` options. Positions are percent of the root's view: 0 with the content's top at the
 * view's bottom edge, 100 with it at the top edge.
 */
export type ScrollFadeOptionsType = {
  /** Where the fade in begins. @default 0 */
  start?: number
  /** Where the content reaches the peak opacity. @default 50 */
  peak?: number
  /** Where the fade out completes. @default 100 */
  end?: number
  /** Opacity before `start`, at `peak` and after `end`. @default [0, 1, 0] */
  opacity?: readonly [number, number, number]
}

/**
 * ScrollProps
 *
 * Every scrolling element and every page scroll behaviour. Without `root`, `sticky` or `fade` it
 * is the scroll container: HTML attributes (role, tabIndex, aria-*, style, event handlers) pass
 * through to the element; `className` lets a component extend it with `styled(Scroll)`.
 * `root` marks the page scroller and renders only its children; `sticky` and `fade` wrap their
 * children in the behaviour, measured against the nearest `root`, and never scroll themselves.
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
  /** The scroll container element, for a `root` or for measuring and scrolling it. */
  ref?: React.Ref<HTMLElement>
  /**
   * Make this the page scroller that `sticky`, `fade` and useScroll under it measure against:
   * `true` for the window, or the element the page scrolls in. Renders only the children.
   */
  root?: ScrollRootType
  /** Keep the children at the top of the root while the page scrolls past them. */
  sticky?: boolean | ScrollStickyOptionsType
  /** Fade the children in and out with their place in the root's view. */
  fade?: boolean | ScrollFadeOptionsType
  children?: React.ReactNode
}

// Declaration merging: const + namespace creates exportable type namespace
const ScrollTypes = {} as const

namespace ScrollTypes {
  export type Axis = ScrollAxisType
  export type As = ScrollAsType
  export type Root = ScrollRootType
  export type StickyOptions = ScrollStickyOptionsType
  export type FadeOptions = ScrollFadeOptionsType
  export type Props = ScrollProps
}

export default ScrollTypes
