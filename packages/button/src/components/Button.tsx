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
 * - Various statuses (primary, secondary, etc.)
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
  backgroundColor,
  backgroundImage,
  borderColor,
  borderRadius,
  borderWidth = "base",
  bordered = true,
  children,
  className,
  condensed = false,
  "data-testid": testId,
  disabled = false,
  fontWeight = "medium",
  fullWidth = false,
  icon,
  iconPosition = "right",
  iconRotation = 0,
  mode = "light",
  onClick,
  size = "base",
  state = "default",
  status = "primary",
  type = "button",
}) => {
  const hasIcon = !!icon
  const isDisabled = disabled || state === "disabled"
  const isLeft = iconPosition === "left"
  const isSquare = hasIcon && !children

  // @ts-ignore
  // @ts-ignore
  return (
    <ButtonOuter
      $backgroundColor={backgroundColor}
      $backgroundImage={backgroundImage}
      $borderColor={borderColor}
      $borderRadius={borderRadius}
      $bordered={bordered}
      $condensed={condensed}
      $disabled={isDisabled}
      $fullWidth={fullWidth}
      $hasIcon={hasIcon}
      $isSquare={isSquare}
      $mode={mode}
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
      <ButtonOverlay
        $bordered={bordered}
        $borderColor={borderColor}
        $borderWidth={getToken("borderWidth", borderWidth).var}
        $mode={mode}
        $state={state}
        $status={status}
      />
      {/* Left positioned icon */}
      {hasIcon && isLeft && (
        <ButtonIconPositioned $size={size} $isLeft={true}>
          <ButtonIcon icon={icon} iconRotation={iconRotation} size={size} color="currentColor" />
        </ButtonIconPositioned>
      )}
      {/* Button text content */}
      {children && (
        <ButtonInner $size={size}>
          <ButtonText $size={size}>
            <Typography antialiased={antialiased} as="span" weight={fontWeight} size={size}>
              {children}
            </Typography>
          </ButtonText>
        </ButtonInner>
      )}
      {/* Right positioned icon */}
      {hasIcon && !isLeft && (
        <ButtonIconPositioned $size={size} $isLeft={false}>
          <ButtonIcon icon={icon} iconRotation={iconRotation} size={size} color="currentColor" />
        </ButtonIconPositioned>
      )}
    </ButtonOuter>
  )
}

export default Button
