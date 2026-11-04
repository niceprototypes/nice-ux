/** Called with the root's scroll offset from the top, once per frame while it scrolls. */
export type ScrollSubscribeCallbackType = (scrollY: number) => void

/** What a root shares with the scroll behaviours under it: its element and its scroll offset. */
export interface ScrollContextValue {
  /** The offset when the context was made; useScroll keeps it current. */
  scrollY: number
  /** Calls `callback` now and on every scroll frame; returns the unsubscribe. */
  subscribe: (callback: ScrollSubscribeCallbackType) => () => void
  /** The element the page scrolls in; null is the window. */
  root: HTMLElement | null
}

/** One sticky bar a root stacks: its order, height and offset from the root's top. */
export interface StickyInstance {
  order: number
  height: number
  stickyTop: number
}

/** What a root shares with its sticky bars: the stack, ordered top to bottom. */
export interface StickyContextValue {
  registerInstance: (order: number, height: number) => number
  unregisterInstance: (order: number) => void
  getStickyTop: (order: number) => number
  getTotalStickyHeight: () => number
}
