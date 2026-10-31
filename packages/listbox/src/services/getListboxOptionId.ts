/**
 * DOM id of the option at `index` in the Listbox whose id is `listboxId`; the
 * value a controlling combobox puts in `aria-activedescendant`.
 */
export function getListboxOptionId(listboxId: string, index: number): string {
  return `${listboxId}-option-${index}`
}
