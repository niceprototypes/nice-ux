import * as React from "react"
import { Theme } from "@niceprototypes/styles"
import { useField } from "@niceprototypes/field"
import { RadioGroupContext } from "./RadioGroupContext"
import { StyledRadioGroup } from "./RadioGroup.styles"
import type { RadioGroupProps } from "./RadioGroup.types"

/**
 * RadioGroup
 *
 * A `role="radiogroup"` flex container. Every Radio inside shares one native radio `name`, so
 * the browser gives the APG keyboard model: one tab stop, arrow keys move and check. Controlled
 * with `value` + `onChange`, or uncontrolled with `defaultValue`. `size`, `backgroundColor`,
 * `borderColor` and `disabled` reach every Radio through context; a Radio's own prop wins.
 *
 * Inside a Field (@niceprototypes/field), the group takes the Field's id, is named by the Field
 * label (`aria-labelledby`), described by its description and error, and takes
 * `aria-invalid="true"`; every radio takes the Field's `required`.
 *
 * @example
 * ```tsx
 * <RadioGroup aria-label="Plan" defaultValue="free">
 *   <Radio value="free">Free</Radio>
 *   <Radio value="pro">Pro</Radio>
 * </RadioGroup>
 * ```
 */
const RadioGroup: React.FC<RadioGroupProps> = ({
  value,
  defaultValue,
  onChange,
  name,
  disabled = false,
  required,
  direction = "column",
  gap = "small",
  size = "base",
  backgroundColor = "base",
  borderColor = "base",
  children,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  theme,
  ref,
}) => {
  // Enclosing Field wiring (null outside a Field)
  const fieldContext = useField()
  const generatedName = React.useId()

  const contextValue = React.useMemo(
    () => ({
      name: name ?? generatedName,
      value,
      defaultValue,
      onChange,
      disabled,
      required: required ?? fieldContext?.required ?? false,
      size,
      backgroundColor,
      borderColor,
    }),
    [name, generatedName, value, defaultValue, onChange, disabled, required, fieldContext?.required, size, backgroundColor, borderColor],
  )

  const group = (
    <RadioGroupContext.Provider value={contextValue}>
      <StyledRadioGroup
        role="radiogroup"
        id={fieldContext?.id}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy ?? (ariaLabel ? undefined : fieldContext?.labelId)}
        aria-describedby={fieldContext?.describedBy}
        // Only ever "true" — never render aria-invalid="false"
        aria-invalid={fieldContext?.invalid ? true : undefined}
        ref={ref}
        $direction={direction}
        $gap={gap}
      >
        {children}
      </StyledRadioGroup>
    </RadioGroupContext.Provider>
  )

  return theme ? <Theme name={theme}>{group}</Theme> : group
}

export default RadioGroup
