import * as React from "react"
import Ink from "@niceprototypes/ink"
import { RadioGroupContext } from "../RadioGroup/RadioGroupContext"
import { StyledCircle, StyledControl, StyledDot, StyledInput, StyledRadio } from "./Radio.styles"
import type { RadioProps } from "./Radio.types"

/**
 * Radio
 *
 * One option of a RadioGroup: a `<label>` around a native `<input type="radio">`, invisible over
 * a token-driven circle that shows a dot when checked, and the label text. The native radio
 * stays the focus target and keyboard handler, and takes the group's `name`, checked state and
 * `required`. `size`, `backgroundColor`, `borderColor` and `disabled` default to the group's.
 *
 * @example
 * ```tsx
 * <RadioGroup aria-label="Plan" defaultValue="free">
 *   <Radio value="free">Free</Radio>
 *   <Radio value="pro" disabled>Pro</Radio>
 * </RadioGroup>
 * ```
 */
const Radio: React.FC<RadioProps> = ({
  value,
  disabled,
  children,
  size,
  backgroundColor,
  borderColor,
  id,
  ref,
}) => {
  const group = React.useContext(RadioGroupContext)

  const isDisabled = disabled ?? group?.disabled ?? false
  const resolvedSize = size ?? group?.size ?? "base"
  const isControlled = group?.value !== undefined

  return (
    <StyledRadio $disabled={isDisabled}>
      <StyledControl $size={resolvedSize}>
        <StyledInput
          type="radio"
          name={group?.name}
          value={value}
          checked={isControlled ? group?.value === value : undefined}
          defaultChecked={isControlled ? undefined : group?.defaultValue === value}
          // A controlled group with no handler is read-only, not a React warning.
          readOnly={isControlled && !group?.onChange}
          onChange={event => group?.onChange?.(value, event)}
          disabled={isDisabled}
          required={group?.required || undefined}
          id={id}
          ref={ref}
        />
        <StyledCircle
          aria-hidden="true"
          $backgroundColor={backgroundColor ?? group?.backgroundColor ?? "base"}
          $borderColor={borderColor ?? group?.borderColor ?? "base"}
        >
          <StyledDot $size={resolvedSize} />
        </StyledCircle>
      </StyledControl>
      {children != null && typeof children !== "boolean" ? <Ink>{children}</Ink> : null}
    </StyledRadio>
  )
}

export default Radio
