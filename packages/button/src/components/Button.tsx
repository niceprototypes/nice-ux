import * as React from "react"
import Typography from "nice-react-typography"
import { getToken } from "nice-styles"
import ButtonIcon from "./ButtonIcon"
import {
  ButtonOuter,
  ButtonOverlay,
  ButtonInner,
  ButtonText,
  ButtonIconPositioned,
} from "./Button.styles"
import { ButtonProps } from "../types"

/**
 * Button component
 * A flexible and customizable React button component
 *
 * Features:
 * - Multiple sizes (smaller, small, base, large, larger)
 * - States (default, disabled, attention, success, warning)
 * - Icon support with nice-react-icon
 * - Accessibility support
 * - TypeScript support
 *
 * @example
 * ```tsx
 * import Button from 'nice-react-button'
 *
 * <Button
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
  borderWidth = "base",
  children,
  className,
  "data-testid": testId,
  disabled = false,
  icon,
  onClick,
  size = "base",
  state = "default",
  type = "button",
}) => {
  const hasIcon = !!icon
  const isDisabled = disabled || state === "disabled"
  const isSquare = hasIcon && !children

  // @ts-ignore
  return (
    <ButtonOuter
      $disabled={isDisabled}
      $hasIcon={hasIcon}
      $isSquare={isSquare}
      $size={size}
      $state={state}
      aria-label={ariaLabel}
      className={className}
      data-testid={testId}
      disabled={isDisabled}
      onClick={isDisabled ? undefined : onClick}
      type={type}
    >
      {/* Border overlay (positioned behind content) */}
      <ButtonOverlay $borderWidth={getToken("borderWidth", borderWidth).var} $state={state} />
      {/* Left positioned icon */}
      {hasIcon && (
        <ButtonIconPositioned $size={size}>
          <ButtonIcon icon={icon} size={size} color="currentColor" />
        </ButtonIconPositioned>
      )}
      {/* Button text content */}
      {children && (
        <ButtonInner $size={size}>
          <ButtonText $size={size}>
            <Typography antialiased={antialiased} as="span" weight="medium" size={size}>
              {children}
            </Typography>
          </ButtonText>
        </ButtonInner>
      )}
    </ButtonOuter>
  )
}

export default Button
