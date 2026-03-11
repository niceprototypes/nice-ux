import * as React from "react"
import Typography from "nice-react-typography"
import Icon from "nice-react-icon"
import { getInvertedMode } from "nice-react-styles"
import { StyledButton } from "./styles"
import { ButtonProps } from "./types"
import { isDisabled } from "../../helpers/isDisabled"
import { isSquare } from "../../helpers/isSquare"

const Button: React.FC<ButtonProps> = ({
  antialiased = false,
  "aria-label": ariaLabel,
  backgroundImage,
  borderColor,
  borderRadius = "base",
  borderWidth = "base",
  children,
  className,
  "data-testid": testId,
  icon,
  mode,
  onClick,
  size = "base",
  state = "base",
  status = "primary",
  type = "button",
}) => {
  const disabled = isDisabled(state)
  const invertedMode = getInvertedMode(mode, status)
  const square = isSquare(icon, children)

  return (
    <StyledButton
      $backgroundImage={backgroundImage}
      $borderColor={borderColor}
      $borderRadius={borderRadius}
      $borderWidth={borderWidth}
      $disabled={disabled}
      $mode={mode}
      $size={size}
      $square={square}
      $state={state}
      $status={status}
      aria-label={ariaLabel}
      className={className}
      data-testid={testId}
      onClick={disabled ? undefined : onClick}
      type={type}
    >
      {children && (
        <Typography
          as="span"
          antialiased={antialiased}
          mode={invertedMode}
          weight="medium"
          size={size}
        >
          {children}
        </Typography>
      )}
      {!!icon && <Icon name={icon} size={size} color="lightest" strokeWidth="large" />}
    </StyledButton>
  )
}

export default Button
