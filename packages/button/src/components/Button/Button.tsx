import * as React from "react"
import Typography from "nice-react-typography"
import Icon from "nice-react-icon"
import { StyledButton } from "./styles"
import { ButtonProps } from "./types"

/**
 * Button component
 * A flexible and customizable React button component
 *
 * Features:
 * - Multiple sizes (smaller, small, base, large, larger)
 * - Status variants (primary, secondary)
 * - States (base, disabled, error, success, warning)
 * - Icon support with nice-react-icon
 * - Accessibility support
 * - TypeScript support
 *
 * @example
 * ```tsx
 * import Button from 'nice-react-button'
 *
 * <Button
 *   status="primary"
 *   icon="arrow"
 *   onClick={() => console.log('clicked')}
 * >
 *   Click me
 * </Button>
 * ```
 */
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
  const disabled = state === "disabled"
  const square = !!icon && !children

  return (
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
        <Typography antialiased={antialiased} weight="medium" size={size}>
          {children}
        </Typography>
      )}
      {!!icon && <Icon name={icon} size={size} color="lighter" />}
    </StyledButton>
  )
}

export default Button
