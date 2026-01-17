import * as React from "react"
import Typography from "nice-react-typography"
import Icon from "nice-react-icon"
import { StyledButton } from "./styles"
import { ButtonProps } from "./types"
import { isDisabled } from "../../helpers/isDisabled"
import { isSquare } from "../../helpers/isSquare"
import { ButtonStyles } from "../../tokens"

const Button: React.FC<ButtonProps> = ({
  antialiased = false,
  "aria-label": ariaLabel,
  borderRadius = "base",
  borderWidth = "base",
  children,
  className,
  "data-testid": testId,
  icon,
  onClick,
  size = "base",
  state = "base",
  status = "primary",
  type = "button",
}) => {
  const disabled = isDisabled(state)
  const square = isSquare(icon, children)

  return (
    <>
      <ButtonStyles />
      <StyledButton
      $borderRadius={borderRadius}
      $borderWidth={borderWidth}
      $disabled={disabled}
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
        <Typography as="span" antialiased={antialiased} weight="medium" size={size}>
          {children}
        </Typography>
      )}
      {!!icon && <Icon name={icon} size={size} color="lighter" strokeWidth="large" />}
    </StyledButton>
    </>
  )
}

export default Button
