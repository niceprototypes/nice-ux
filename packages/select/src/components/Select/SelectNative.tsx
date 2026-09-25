import * as React from "react"
import Icon from "nice-react-icon"
import Input from "nice-react-input"
import { StyledChevron } from "./Select.styles"
import type { SelectNativeProps } from "./Select.types"

/**
 * Native `<select>` rendered through Input's field chrome (`as="select"`).
 * Input owns the chrome, Field wiring, theme and className; Select adds the
 * options / placeholder content and a decorative chevron in the `end` slot.
 */
const SelectNative: React.FC<SelectNativeProps> = ({
  children,
  defaultValue,
  native: _native,
  onChange,
  options,
  placeholder,
  ref,
  size = "base",
  status,
  value,
  ...rest
}) => {
  // Children win over options when both are given
  const content =
    children ??
    options?.map(option => (
      <option
        key={option.value}
        value={option.value}
        disabled={option.disabled}
      >
        {option.label}
      </option>
    ))

  // Without a value, a <select> shows its first enabled option; defaulting to
  // "" selects the placeholder option instead.
  const initialValue =
    placeholder !== undefined && value === undefined && defaultValue === undefined
      ? ""
      : defaultValue

  return (
    <Input
      {...rest}
      as="select"
      ref={ref}
      size={size}
      status={status}
      value={value}
      defaultValue={initialValue}
      onChange={
        onChange &&
        ((next, event) =>
          onChange(next, event as React.ChangeEvent<HTMLSelectElement>))
      }
      end={
        <StyledChevron
          $size={size}
          $native
          aria-hidden="true"
        >
          <Icon
            name="carat-bottom"
            size="base"
            // Dimmed with the control's disabled text colour (color:disabled,
            // via the icon.color alias)
            color={status === "disabled" ? "disabled" : "base"}
          />
        </StyledChevron>
      }
    >
      {placeholder !== undefined && (
        <option
          value=""
          disabled
          hidden
        >
          {placeholder}
        </option>
      )}
      {content}
    </Input>
  )
}

export default SelectNative
