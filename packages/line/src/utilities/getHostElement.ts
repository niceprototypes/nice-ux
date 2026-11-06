/**
 * The element Line frames: its nearest ancestor that generates a box. Wrappers with
 * `display: contents` (the `theme` prop's Theme) have no box of their own, so they are skipped.
 */
export const getHostElement = (element: Element): Element | null => {
  let parent = element.parentElement
  while (parent && getComputedStyle(parent).display === "contents") parent = parent.parentElement
  return parent
}
