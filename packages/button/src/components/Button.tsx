import * as React from "react"
import Typography from "nice-react-typography"
import Flex from "nice-react-flex"
import ButtonIcon from "./ButtonIcon"
import { ButtonOuter, ButtonInner, ButtonText } from "./Button.styles"
import { ButtonProps } from "../types"
import { getIconColor, shouldRenderIcon, mergeTheme } from "../utils"

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
}) => {
  // Merge user theme with defaults
  const mergedTheme = mergeTheme(theme)

  // Determine if button should be disabled
  const isDisabled = disabled || state === "disabled"

  // Get icon color based on button status and theme
  const iconColor = getIconColor(status, mergedTheme)

  return (
    <ButtonOuter
      $size={size}
      $state={state}
      $status={status}
      $disabled={isDisabled}
      $fullWidth={fullWidth}
      $hasIcon={!!icon}
      $theme={mergedTheme}
      onClick={isDisabled ? undefined : onClick}
      disabled={isDisabled}
      className={className}
      type={type}
      aria-label={ariaLabel}
      data-testid={testId}
    >
      <ButtonInner theme={mergedTheme}>
        <Flex
          justifyContent={{ sm: "center" }}
          alignItems={{ sm: "center" }}
          grow={1}
        >
          {/* Left icon */}
          {shouldRenderIcon(children, icon, iconPosition, "left") && (
            <ButtonIcon
              size={size}
              icon={icon && iconPosition === "left" ? icon : undefined}
              iconRotation={iconRotation}
              iconPosition={iconPosition}
              color={iconColor}
              isSpacerOnly={!icon || iconPosition !== "left"}
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
          {shouldRenderIcon(children, icon, iconPosition, "right") && (
            <ButtonIcon
              size={size}
              icon={icon && iconPosition === "right" ? icon : undefined}
              iconRotation={iconRotation}
              iconPosition={iconPosition}
              color={iconColor}
              isSpacerOnly={!icon || iconPosition !== "right"}
            />
          )}
        </Flex>
      </ButtonInner>
    </ButtonOuter>
  )
}

export default Button