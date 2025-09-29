import * as React from "react"
import Typography from "nice-react-typography"
import ButtonIcon from "./ButtonIcon"
import { ButtonOuter, ButtonInner, ButtonText, ButtonIconPositioned } from "./Button.styles"
import { ButtonProps } from "../types"
import getThemeStyles from "../services/getThemeStyles"
import mergeThemeConfig from "../services/mergeThemeConfig"
import getCssVariable from "../services/getCssVariable"
import { defaultThemes } from "../constants/defaultThemes"

/**
 * Button component v2.0.0 - LIVE TEST CHANGE
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
  antialiased = false,
  "aria-label": ariaLabel,
  backgroundColor,
  backgroundImage,
  borderColor,
  borderRadius,
  borderWidth = 1,
  bordered = true,
  children,
  className,
  condensed = false,
  config,
  "data-testid": testId,
  disabled = false,
  fontWeight = 3,
  fullWidth = false,
  icon,
  iconPosition = "right",
  iconRotation = 0,
  mode = "light",
  onClick,
  size = 3,
  state = "default",
  status = "primary",
  type = "button",
}) => {
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
      $backgroundColor={backgroundColor}
      $backgroundImage={backgroundImage}
      $borderColor={borderColor}
      $borderRadius={borderRadius}
      $bordered={bordered}
      $condensed={condensed}
      $disabled={isDisabled}
      $fullWidth={fullWidth}
      $hasIcon={hasIcon}
      $size={size}
      $themeStyles={themeStyles}
      aria-label={ariaLabel}
      className={className}
      data-testid={testId}
      disabled={isDisabled}
      onClick={isDisabled ? undefined : onClick}
      type={type}
    >
      {/* Left positioned icon */}
      <ButtonIconPositioned $size={size} $isLeft={true}>
        <ButtonIcon
          color={themeStyles.color}
          icon={hasIcon && isLeft ? icon : undefined}
          iconRotation={iconRotation}
          size={size}
        />
      </ButtonIconPositioned>
      <ButtonInner
        $borderWidth={themeStyles.borderWidth || getCssVariable("border-width", borderWidth)}
        $bordered={bordered}
        $size={size}
      >
        {/* Button text content */}
        {children && (
          <ButtonText $size={size}>
            <Typography
              antialiased={antialiased}
              as="span"
              color={themeStyles.color}
              fontWeight={fontWeight}
              size={size}
            >
              {children}
            </Typography>
          </ButtonText>
        )}
      </ButtonInner>
      {/* Right positioned icon */}
      <ButtonIconPositioned $size={size} $isLeft={false}>
        <ButtonIcon
          color={themeStyles.color}
          icon={hasIcon && !isLeft ? icon : undefined}
          iconRotation={iconRotation}
          size={size}
        />
      </ButtonIconPositioned>
    </ButtonOuter>
  )
}

export default Button
