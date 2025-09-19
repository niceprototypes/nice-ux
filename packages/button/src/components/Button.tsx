import * as React from "react"
import Typography from "nice-react-typography"
import Flex from "nice-react-flex"
import ButtonIcon from "./ButtonIcon"
import { ButtonOuter, ButtonInner, ButtonText } from "./Button.styles"
import { ButtonProps } from "../types"
import { getIconColor, mergeTheme } from "../utils"

/**
 * A flexible and customizable React button component with built-in theming support
 *
 * Features:
 * - Multiple sizes (1-4)
 * - Various statuses (primary, secondary, etc.)
 * - States (disabled, success, error, etc.)
 * - Icon support with nice-react-icon
 * - Full theming capabilities
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
  size = 3,
  state = "default",
  icon,
  iconRotation = 0,
  iconPosition = "right",
  status = "primary",
  onClick,
  disabled = false,
  fullWidth = false,
  children,
  className,
  theme,
  type = "button",
  "aria-label": ariaLabel,
  "data-testid": testId,
  borderRadius,
}) => {
  const hasChildren = !!children
  const hasIcon = !!icon
  const isDisabled = disabled || state === "disabled"
  const isLeft = iconPosition === "left"
  const mergedTheme = mergeTheme(theme)

  // Get icon color based on button status and theme
  const iconColor = getIconColor(status, mergedTheme)

  return (
    <ButtonOuter
      $size={size}
      $state={state}
      $status={status}
      $disabled={isDisabled}
      $fullWidth={fullWidth}
      $hasIcon={hasIcon}
      $theme={mergedTheme}
      $borderRadius={borderRadius}
      onClick={isDisabled ? undefined : onClick}
      disabled={isDisabled}
      className={className}
      type={type}
      aria-label={ariaLabel}
      data-testid={testId}
    >
      <ButtonInner theme={mergedTheme}>
        <Flex justifyContent={{ sm: "center" }} alignItems={{ sm: "center" }} grow={1}>
          {/* Left icon */}
          {(hasChildren || (hasIcon && isLeft)) && (
            <ButtonIcon
              size={size}
              icon={isLeft ? icon : undefined}
              iconRotation={iconRotation}
              color={iconColor}
            />
          )}

          {/* Button text content */}
          {children && (
            <ButtonText>
              <Typography size={size} as="span">
                {children}
              </Typography>
            </ButtonText>
          )}

          {/* Right icon */}
          {(hasChildren || (hasIcon && !isLeft)) && (
            <ButtonIcon
              size={size}
              icon={!isLeft ? icon : undefined}
              iconRotation={iconRotation}
              color={iconColor}
            />
          )}
        </Flex>
      </ButtonInner>
    </ButtonOuter>
  )
}

export default Button
