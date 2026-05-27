import * as React from "react"
import { Theme } from "nice-react-styles"
import { StyledInput } from "./Input.styles"
import { InputProps } from "./Input.types"
import { isDisabled } from "../../utilities/isDisabled"

const Input: React.FC<InputProps> = ({
  "aria-describedby": ariaDescribedBy,
  "aria-label": ariaLabel,
  autoComplete,
  autoFocus = false,
  backgroundColor,
  borderColor,
  borderRadius = "base",
  borderWidth = "base",
  className,
  "data-testid": testId,
  defaultValue,
  id,
  maxLength,
  minLength,
  theme,
  name,
  onBlur,
  onChange,
  onFocus,
  onKeyDown,
  pattern,
  placeholder,
  readOnly = false,
  required = false,
  size = "base",
  state = "base",
  status = "primary",
  style,
  type = "text",
  value,
}) => {
  const [isFocused, setIsFocused] = React.useState(false)
  const disabled = isDisabled(state)

  const input = (
    <StyledInput
      $backgroundColor={backgroundColor}
      $borderColor={borderColor}
      $borderRadius={borderRadius}
      $borderWidth={borderWidth}
      $disabled={disabled}
      $isFocused={isFocused}
      $size={size}
      $state={state}
      $status={status}
      aria-describedby={ariaDescribedBy}
      aria-label={ariaLabel}
      autoComplete={autoComplete}
      autoFocus={autoFocus}
      className={className}
      data-testid={testId}
      defaultValue={defaultValue}
      disabled={disabled}
      id={id}
      maxLength={maxLength}
      minLength={minLength}
      name={name}
      onBlur={(event) => {
        setIsFocused(false)
        onBlur?.(event)
      }}
      onChange={(event) => {
        onChange?.(event.target.value, event)
      }}
      onFocus={(event) => {
        setIsFocused(true)
        onFocus?.(event)
      }}
      onKeyDown={onKeyDown}
      pattern={pattern}
      placeholder={placeholder}
      readOnly={readOnly}
      required={required}
      style={style}
      type={type}
      value={value}
    />
  )

  return theme ? <Theme name={theme}>{input}</Theme> : input
}

export default Input