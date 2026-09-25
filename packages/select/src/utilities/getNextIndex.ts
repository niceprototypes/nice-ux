import type { SelectOptionsType } from "../components/Select/Select.types"

/**
 * Index `delta` options away from `current`, clamped to the list (no wrap)
 * and moved past disabled options in the direction of travel. When no enabled
 * option lies at or beyond the clamped target, the nearest enabled option
 * between it and `current` is used; failing that, `current` is returned.
 */
export function getNextIndex(options: SelectOptionsType, current: number, delta: number): number {
  const last = options.length - 1
  if (last < 0) return -1
  const direction = delta < 0 ? -1 : 1
  const target = Math.min(last, Math.max(0, current + delta))
  for (let index = target; index >= 0 && index <= last; index += direction) {
    if (!options[index].disabled) return index
  }
  for (let index = target - direction; index !== current && index >= 0 && index <= last; index -= direction) {
    if (!options[index].disabled) return index
  }
  return current
}
