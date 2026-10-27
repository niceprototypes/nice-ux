import type { SelectOptionsType } from "../components/Select/Select.types"
import { getOptionText } from "./getOptionText"

/**
 * WAI-ARIA APG select-only combobox typeahead. Searches enabled options,
 * starting after `current` and wrapping, for one whose text starts with
 * `search` (case-insensitive). When nothing matches and `search` is one
 * repeated character ("aaa"), cycles through options starting with that
 * character instead. Returns -1 when nothing matches.
 */
export function getTypeaheadIndex(options: SelectOptionsType, search: string, current: number): number {
  const count = options.length
  const start = current + 1
  const ordered = Array.from({ length: count }, (_, offset) => (start + offset) % count)
  const matchFrom = (prefix: string) =>
    ordered.find(
      index => !options[index].disabled && getOptionText(options[index]).toLowerCase().startsWith(prefix)
    ) ?? -1

  const query = search.toLowerCase()
  const match = matchFrom(query)
  if (match !== -1) return match
  const repeated = query.split("").every(character => character === query[0])
  return repeated ? matchFrom(query[0]) : -1
}
