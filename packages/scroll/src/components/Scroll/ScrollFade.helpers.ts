/**
 * Element position in the root's view, as a percentage: 0 with the element's top edge at the
 * bottom of the view, 100 with it at the top.
 */
export const getScrollProgress = (elementTop: number, viewportHeight: number): number =>
  ((viewportHeight - elementTop) / viewportHeight) * 100

/**
 * Opacity at a scroll progress, piecewise-linear across four phases: before `start` (the first
 * opacity), fade in (`start` → `peak`), fade out (`peak` → `end`), after `end` (the last opacity).
 */
export const getFadeOpacity = (
  progress: number,
  [start, peak, end]: readonly [number, number, number],
  [startOpacity, peakOpacity, endOpacity]: readonly [number, number, number],
): number => {
  if (progress < start) return startOpacity
  if (progress < peak) return startOpacity + (peakOpacity - startOpacity) * ((progress - start) / (peak - start))
  if (progress < end) return peakOpacity - (peakOpacity - endOpacity) * ((progress - peak) / (end - peak))
  return endOpacity
}
