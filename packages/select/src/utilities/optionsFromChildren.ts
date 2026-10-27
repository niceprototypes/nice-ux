import * as React from "react"
import type { SelectOptionType } from "../components/Select/Select.types"

/**
 * Maps `<option value disabled>label</option>` children to options for the
 * custom listbox. The value falls back to the option's text when `value` is
 * absent. `<optgroup>` is flattened (a disabled group disables its options);
 * any other child is ignored.
 */
export function optionsFromChildren(children: React.ReactNode, groupDisabled = false): SelectOptionType[] {
  const options: SelectOptionType[] = []
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
      const { disabled, children: grouped } = child.props as React.OptgroupHTMLAttributes<HTMLOptGroupElement>
      options.push(...optionsFromChildren(grouped, groupDisabled || !!disabled))
    }
  })
  return options
}
