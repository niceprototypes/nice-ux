import * as React from "react"
import Typography from "nice-react-typography"
import ButtonIcon from "../ButtonIcon"
import {
  ButtonOuter,
  ButtonOverlay,
  ButtonInner,
  ButtonContent,
  ButtonIconPositioned,
} from "./styles"
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
  disabled = false,
  icon,
  onClick,
  size = "base",
  state = "base",
  status = "primary",
  type = "button",
}) => {
  const hasIcon = !!icon
  const isDisabled = disabled || state === "disabled"
  const isSquare = hasIcon && !children

  return (
    <ButtonOuter
      $borderRadius={borderRadius}
      $disabled={isDisabled}
      $hasIcon={hasIcon}
      $isSquare={isSquare}
      $size={size}
      $state={state}
      $status={status}
      aria-label={ariaLabel}
      className={className}
      data-testid={testId}
      disabled={isDisabled}
      onClick={isDisabled ? undefined : onClick}
      type={type}
    >
      {/* Border overlay (positioned behind content) */}
      <ButtonOverlay $borderWidth={borderWidth} $status={status} $state={state} />
      {/* Left positioned icon */}
      {hasIcon && (
        <ButtonIconPositioned $size={size}>
          <ButtonIcon icon={icon} size={size} color="currentColor" />
        </ButtonIconPositioned>
      )}
      {/* Button text content */}
      {children && (
        <ButtonInner $size={size}>
          <ButtonContent $size={size}>
            <Typography antialiased={antialiased} weight="medium" size={size}>
              {children}
            </Typography>
          </ButtonContent>
        </ButtonInner>
      )}
    </ButtonOuter>
  )
}

export default Button
