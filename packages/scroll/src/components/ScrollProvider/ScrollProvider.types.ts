import * as React from "react"

/**
 * Callback for scroll position updates
 */
export type ScrollSubscribeCallbackType = (scrollY: number) => void

/**
 * Unsubscribe function returned by subscribe
 */
export type ScrollUnsubscribeType = () => void

/**
 * Context value for ScrollProvider
 */
export interface ScrollContextValue {
  scrollY: number
  subscribe: (callback: ScrollSubscribeCallbackType) => ScrollUnsubscribeType
  /** The element that scrolls, or null for the window */
  root: HTMLElement | null
}

/**
 * ScrollProviderRootType
 *
 * The element the page scrolls in (a ref to it, or the element), when that is not the
 * window: an app shell's scrolling region. Unset, the window.
 */
export type ScrollProviderRootType = React.RefObject<HTMLElement | null> | HTMLElement | null

/**
 * Props for ScrollProvider
 */
export interface ScrollProviderProps {
  children: React.ReactNode
  /** The element the page scrolls in; unset, the window */
  root?: ScrollProviderRootType
}

const ScrollProviderTypes = {} as const

namespace ScrollProviderTypes {
  export type SubscribeCallback = ScrollSubscribeCallbackType
  export type Unsubscribe = ScrollUnsubscribeType
  export type Context = ScrollContextValue
  export type Root = ScrollProviderRootType
  export type Props = ScrollProviderProps
}

export default ScrollProviderTypes
