/** What a `<Scroll follow>` shares with useScrollEnd under it. */
export interface ScrollEndContextValue {
  /** True while the scroll position is pinned to the end. */
  atEnd: boolean
  /**
   * Scroll to the end and pin there. `behavior` defaults to "smooth"; under
   * `prefers-reduced-motion: reduce` the scroll is instant.
   */
  scrollToEnd: (behavior?: ScrollBehavior) => void
}
