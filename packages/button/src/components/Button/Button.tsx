import * as React from "react"
import Typography from "nice-react-typography"
import Icon from "nice-react-icon"
import { Theme } from "nice-react-styles"
import { StyledButton } from "./Button.styles"
import { ButtonProps } from "./Button.types"
import { isDisabled } from "../../utilities/isDisabled"
import { isSquare } from "../../utilities/isSquare"

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
  href,
  icon,
  link = false,
  theme,
  onClick,
  onMouseEnter,
  onMouseLeave,
  size = "base",
  state = "base",
  status = "primary",
  style,
  target,
  type = "button",
}) => {
  const [isHovered, setIsHovered] = React.useState(false)
  const [isFocused, setIsFocused] = React.useState(false)
  const [isPressed, setIsPressed] = React.useState(false)
  const disabled = isDisabled(state)
  // getInvertedMode(theme, status) was a no-op when status was defined (always
  // returned the original theme). Button always passes status (default "primary"),
  // so the call collapsed to passing theme through unchanged.
  const invertedTheme = theme
  const square = isSquare(icon, children)

  const elementProps = link
    ? {
        as: "a" as const,
        href: disabled ? undefined : href,
        target,
        rel: target === "_blank" ? "noopener noreferrer" : undefined,
        "aria-disabled": disabled || undefined,
        onClick: disabled ? (e: React.MouseEvent) => e.preventDefault() : onClick,
      }
    : {
        onClick: disabled ? undefined : onClick,
        type,
      }

  const button = (
    <StyledButton
      onMouseEnter={(e) => {
        setIsHovered(true)
        onMouseEnter?.(e)
      }}
      onMouseLeave={(e) => {
        setIsHovered(false)
        onMouseLeave?.(e)
      }}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onPointerDown={() => setIsPressed(true)}
      onPointerUp={() => setIsPressed(false)}
      onPointerCancel={() => setIsPressed(false)}
      $backgroundImage={backgroundImage}
      $borderColor={borderColor}
      $borderRadius={borderRadius}
      $borderWidth={borderWidth}
      $disabled={disabled}
      $isHovered={isHovered}
      $isFocused={isFocused}
      $isPressed={isPressed}
      $link={link}
      $size={size}
      $square={square}
      $state={state}
      $status={status}
      {...elementProps}
      aria-label={ariaLabel}
      className={className}
      data-testid={testId}
      style={style}
    >
      {children && (
        <Typography
          as="span"
          antialiased={antialiased}
          theme={invertedTheme}
          weight={link ? undefined : "medium"}
          size={size}
        >
          {children}
        </Typography>
      )}
      {!!icon && (
        <Icon
          name={icon}
          size={size}
          color="lightest"
          strokeWidth="large"
          theme={invertedTheme}
        />
      )}
    </StyledButton>
  )

  return theme ? <Theme name={theme}>{button}</Theme> : button
}

export default Button
