/**
 * The scroll root helpers: one place that reads and drives the scroll position, of an element
 * when a `<Scroll root>` names one, else of the window.
 */

/** The element that scrolls, or null for the window. */
export type ScrollRootElement = HTMLElement | null

/** What scroll events come from. */
export const scrollTargetOf = (root: ScrollRootElement): HTMLElement | Window => root ?? window

/** The scroll offset from the top. */
export const scrollTopOf = (root: ScrollRootElement): number => (root ? root.scrollTop : window.scrollY)

/** Scroll to an offset from the top. */
export const scrollRootTo = (root: ScrollRootElement, top: number): void => (root ? root.scrollTo(0, top) : window.scrollTo(0, top))

/** The visible area, in viewport coordinates: the root's box, or the window's. */
export const viewportOf = (root: ScrollRootElement): { top: number; height: number } =>
  root ? { top: root.getBoundingClientRect().top, height: root.clientHeight } : { top: 0, height: window.innerHeight }
