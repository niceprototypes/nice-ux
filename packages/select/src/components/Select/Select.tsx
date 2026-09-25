import * as React from "react"
import SelectCustom from "./SelectCustom"
import SelectNative from "./SelectNative"
import type { SelectProps } from "./Select.types"

/**
 * Select
 *
 * Default: a WAI-ARIA APG select-only combobox — Input rendered read-only with
 * `role="combobox"`, opening a Popover that holds a `role="listbox"` List
 * (SelectCustom). `native`: the platform `<select>` through Input's field
 * chrome (SelectNative). Both render the chevron in Input's `end` slot.
 */
const Select: React.FC<SelectProps> = props =>
  props.native === true ? <SelectNative {...props} /> : <SelectCustom {...props} />

export default Select
