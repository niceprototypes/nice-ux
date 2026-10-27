/**
 * Merge a Field's `describedBy` with the control's consumer-supplied
 * `aria-describedby`, in the order [description, error, consumer], deduped.
 *
 * `fieldDescribedBy` is `useField().describedBy` (already description, then
 * error). Both arguments are space-separated id lists; empty entries are
 * dropped and the first occurrence of each id wins.
 *
 * @param fieldDescribedBy - `useField()?.describedBy`
 * @param consumer - the control's own `aria-describedby` prop
 * @returns The merged id list, or `undefined` when it is empty (so no empty
 *   `aria-describedby` attribute is rendered)
 *
 * @example
 * mergeDescribedBy("f-desc f-err", "hint f-desc") // "f-desc f-err hint"
 */
export function mergeDescribedBy(fieldDescribedBy?: string, consumer?: string): string | undefined {
  const ids = `${fieldDescribedBy ?? ""} ${consumer ?? ""}`.split(/\s+/).filter(Boolean)
  const merged = Array.from(new Set(ids)).join(" ")
  return merged || undefined
}
