import * as React from "react"
import Icon from "nice-react-icon"
import { Theme } from "nice-react-styles"
import { useField } from "nice-react-field"
import { StyledBox, StyledCheck, StyledCheckbox, StyledCheckboxLabel, StyledInput } from "./Checkbox.styles"
import type { CheckboxProps } from "./Checkbox.types"

/**
 * Checkbox replaces the native checkbox's look: a native `<input type="checkbox">` stays the
 * focus target and keyboard handler (Space toggles), invisible over a token-driven box that
 * shows a nice-react-icon check when checked. With `children`, the root is a `<label>` holding
 * the box and the label text, so clicking the text toggles it too. Without `children`, name it
 * with `aria-label` or `aria-labelledby`.
 *
 * Controlled with `checked` + `onChange`, or uncontrolled with `defaultChecked`. Sizes, fill,
 * border, radius and the check come from the `checkbox.*` component tokens.
 *
 * @example
 * ```tsx
 * <Checkbox defaultChecked>Visible</Checkbox>
 *
 * <Checkbox aria-label="Visible" defaultChecked />
 *
 * <Checkbox aria-label="Select row" checked={selected} onChange={setSelected} size="small" />
 * ```
 */
const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  defaultChecked,
  onChange,
  disabled = false,
  size = "base",
  backgroundColor = "link",
  borderColor = "strong",
  borderRadius = "small",
  borderWidth = "base",
  iconName = "check",
  iconVendor = false,
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

  const hasLabel = children != null && typeof children !== "boolean"

  const checkbox = (
    <StyledCheckbox className={hasLabel ? undefined : className} $size={size} $disabled={disabled}>
      <StyledInput
        type="checkbox"
        checked={checked}
        defaultChecked={defaultChecked}
        // A controlled checkbox with no handler is read-only, not a React warning.
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
      <StyledBox
        aria-hidden="true"
        $backgroundColor={backgroundColor}
        $borderColor={borderColor}
        $borderRadius={borderRadius}
        $borderWidth={borderWidth}
      >
        <StyledCheck>
          <Icon name={iconName} vendor={iconVendor} size="base" color="base" />
        </StyledCheck>
      </StyledBox>
    </StyledCheckbox>
  )

  const element = hasLabel ? (
    <StyledCheckboxLabel className={className} $disabled={disabled}>
      {checkbox}
      {children}
    </StyledCheckboxLabel>
  ) : (
    checkbox
  )

  return theme ? <Theme name={theme}>{element}</Theme> : element
}

export default Checkbox
