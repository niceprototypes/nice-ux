import * as React from "react"
import { Theme } from "@niceprototypes/styles"
import { useField } from "@niceprototypes/field"
import { StyledInput, StyledSwitch, StyledThumb, StyledToggle, StyledTrack } from "./Toggle.styles"
import type { ToggleProps } from "./Toggle.types"

/**
 * Toggle is an on/off switch: a native `<input type="checkbox" role="switch">`, visually
 * replaced by a track and thumb, inside a `<label>`. The checkbox stays the focus target and
 * keyboard handler (Space toggles); clicking the label text toggles too.
 *
 * Controlled with `checked` + `onChange`, or uncontrolled with `defaultChecked`. Without
 * visible `children`, pass `aria-label`.
 *
 * Sizes and colors come from the `toggle.*` component tokens.
 *
 * @example
 * ```tsx
 * <Toggle defaultChecked>Notifications</Toggle>
 *
 * <Toggle checked={hidden} onChange={setHidden} aria-label="Hidden" size="small" />
 * ```
 */
const Toggle: React.FC<ToggleProps> = ({
  checked,
  defaultChecked,
  onChange,
  disabled = false,
  size = "base",
  children,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  id,
  name,
  ref,
  className,
  theme,
}) => {
  // Enclosing Field wiring (null outside a Field): id for the label, the
  // description/error ids, invalid and required.
  const fieldContext = useField()

  const element = (
    <StyledToggle className={className} $disabled={disabled}>
      <StyledSwitch $size={size}>
        <StyledInput
          type="checkbox"
          role="switch"
          checked={checked}
          defaultChecked={defaultChecked}
          // A controlled switch with no handler is read-only, not a React warning.
          readOnly={checked !== undefined && !onChange}
          onChange={event => onChange?.(event.target.checked, event)}
          disabled={disabled}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          aria-describedby={fieldContext?.describedBy}
          // Only ever "true" — never render aria-invalid="false"
          aria-invalid={fieldContext?.invalid ? true : undefined}
          required={fieldContext?.required}
          id={id ?? fieldContext?.id}
          name={name}
          ref={ref}
        />
        <StyledTrack $size={size} aria-hidden="true">
          <StyledThumb $size={size} />
        </StyledTrack>
      </StyledSwitch>
      {children}
    </StyledToggle>
  )

  return theme ? <Theme name={theme}>{element}</Theme> : element
}

export default Toggle
