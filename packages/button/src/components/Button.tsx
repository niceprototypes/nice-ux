import * as React from "react"
import Typography from "nice-react-typography"
import Flex from "nice-react-flex"
import ButtonIcon from "./ButtonIcon"
import { ButtonOuter, ButtonInner, ButtonText } from "./Button.styles"
import { ButtonProps } from "../types"
import getThemeStyles from "../services/getThemeStyles"
import mergeThemeConfig from "../services/mergeThemeConfig"
import { defaultThemes } from "../constants/defaultThemes"

/**
 * Button component v2.0.0
 * A flexible and customizable React button component with built-in theming support
 *
 * Features:
 * - Multiple sizes (1-4)
 * - Light/dark mode support
 * - Various statuses (primary, secondary, etc.)
 * - States (default, disabled, attention, success, warning)
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
  mode = "light",
  icon,
  iconRotation = 0,
  iconPosition = "right",
  status = "primary",
  onClick,
  disabled = false,
  fullWidth = false,
  children,
  className,
  type = "button",
  "aria-label": ariaLabel,
  "data-testid": testId,
  borderRadius,
  config,
  antialiased = false,
  backgroundColor,
  backgroundImage,
}) => {
  const hasChildren = !!children
  const hasIcon = !!icon
  const isDisabled = disabled || state === "disabled"
  const isLeft = iconPosition === "left"

  // Merge config with default themes
  const mergedThemes = mergeThemeConfig(defaultThemes, config)

  // Get the theme styles for the current mode/status/state combination
  const actualState = isDisabled ? "disabled" : state
  const themeStyles = getThemeStyles(mergedThemes, mode, status, actualState)

  return (
    <ButtonOuter
      $size={size}
      $themeStyles={themeStyles}
      $disabled={isDisabled}
      $fullWidth={fullWidth}
      $hasIcon={hasIcon}
      $borderRadius={borderRadius}
      $backgroundColor={backgroundColor}
      $backgroundImage={backgroundImage}
      onClick={isDisabled ? undefined : onClick}
      disabled={isDisabled}
      className={className}
      type={type}
      aria-label={ariaLabel}
      data-testid={testId}
    >
      <ButtonInner $borderWidth={themeStyles.borderWidth || "1px"}>
        <Flex justifyContent={{ sm: "center" }} alignItems={{ sm: "center" }} grow={1}>
          {/* Left icon */}
          {(hasChildren || (hasIcon && isLeft)) && (
            <ButtonIcon
              size={size}
              icon={isLeft ? icon : undefined}
              iconRotation={iconRotation}
              color={themeStyles.color}
            />
          )}

          {/* Button text content */}
          {children && (
            <ButtonText>
              <Typography size={size} as="span" color={themeStyles.color} antialiased={antialiased}>
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
              color={themeStyles.color}
            />
          )}
        </Flex>
      </ButtonInner>
    </ButtonOuter>
  )
}

export default Button
