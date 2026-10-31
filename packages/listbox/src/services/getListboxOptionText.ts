import type { ListboxOptionType } from "../components/Listbox/Listbox.types"

/**
 * Text of an option for display and typeahead: the label when it is a string
 * or number, otherwise the value.
 */
export function getListboxOptionText(option: ListboxOptionType): string {
  const { label, value } = option
  return typeof label === "string" || typeof label === "number" ? String(label) : value
}
