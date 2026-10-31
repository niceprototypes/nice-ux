import * as React from "react"
import type { SelectOptionGroupType, SelectOptionType } from "../components/Select/Select.types"

/**
 * Maps `<option value disabled>label</option>` children to options for the
 * custom listbox. The value falls back to the option's text when `value` is
 * absent. `<optgroup label>` becomes an option group (a disabled group
 * disables its options); any other child is ignored.
 */
export function optionsFromChildren(
  children: React.ReactNode,
  groupDisabled = false
): Array<SelectOptionType | SelectOptionGroupType> {
  const options: Array<SelectOptionType | SelectOptionGroupType> = []
  React.Children.forEach(children, child => {
    if (!React.isValidElement(child)) return
    if (child.type === "option") {
      const { value, disabled, children: label } = child.props as React.OptionHTMLAttributes<HTMLOptionElement>
      const text = typeof label === "string" || typeof label === "number" ? String(label) : ""
      options.push({
        value: value !== undefined ? String(value) : text,
        label,
        disabled: groupDisabled || !!disabled,
      })
    } else if (child.type === "optgroup") {
      const { label, disabled, children: grouped } = child.props as React.OptgroupHTMLAttributes<HTMLOptGroupElement>
      // Options only: an optgroup cannot nest
      const groupOptions = optionsFromChildren(grouped, groupDisabled || !!disabled).filter(
        (entry): entry is SelectOptionType => !("options" in entry)
      )
      options.push({ label, options: groupOptions })
    }
  })
  return options
}
