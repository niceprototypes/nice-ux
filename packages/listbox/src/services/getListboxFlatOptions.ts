import type { ListboxOptionsType, ListboxOptionType } from "../components/Listbox/Listbox.types"

/**
 * The options with their groups dissolved, in order: the list the index
 * services (`getListboxEdgeIndex`, `getListboxNextIndex`,
 * `getListboxTypeaheadIndex`) and option ids (`getListboxOptionId`) count in.
 */
export function getListboxFlatOptions(options: ListboxOptionsType): ListboxOptionType[] {
  return options.flatMap(entry => ("options" in entry ? entry.options : [entry]))
}
