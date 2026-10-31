import type { ListboxOptionType } from "../components/Listbox/Listbox.types"

/**
 * Index of the first enabled option ("first") or the last one ("last");
 * -1 when every option is disabled or there are none.
 */
export function getListboxEdgeIndex(options: ReadonlyArray<ListboxOptionType>, edge: "first" | "last"): number {
  if (edge === "first") return options.findIndex(option => !option.disabled)
  for (let index = options.length - 1; index >= 0; index--) {
    if (!options[index].disabled) return index
  }
  return -1
}
