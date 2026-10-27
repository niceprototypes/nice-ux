import type { SelectOptionType } from "../components/Select/Select.types"

/**
 * Text of an option for the combobox display and typeahead: the label when it
 * is a string or number, otherwise the value.
 */
export function getOptionText(option: SelectOptionType): string {
  const { label, value } = option
  return typeof label === "string" || typeof label === "number" ? String(label) : value
}
