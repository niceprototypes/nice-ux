import * as React from "react"
import Typography from "nice-react-typography"
import Icon from "nice-react-icon"
import { getInvertedMode } from "nice-react-styles"
import { StyledButton } from "./styles"
import { ButtonProps } from "./types"
import { isDisabled } from "../../helpers/isDisabled"
import { isSquare } from "../../helpers/isSquare"

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
  mode,
  onClick,
  onMouseEnter,
  onMouseLeave,
  size = "base",
  state = "base",
  status = "primary",
  target,
  type = "button",
}) => {
  const [isHovered, setIsHovered] = React.useState(false)
  const disabled = isDisabled(state)
  const invertedMode = getInvertedMode(mode, status)
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

  return (
    <StyledButton
      onMouseEnter={(e) => {
        setIsHovered(true)
        onMouseEnter?.(e)
      }}
      onMouseLeave={(e) => {
        setIsHovered(false)
        onMouseLeave?.(e)
      }}
      $backgroundImage={backgroundImage}
      $borderColor={borderColor}
      $borderRadius={borderRadius}
      $borderWidth={borderWidth}
      $disabled={disabled}
      $link={link}
      $mode={mode}
      $size={size}
      $square={square}
      $state={state}
      $status={status}
      {...elementProps}
      aria-label={ariaLabel}
      className={className}
      data-testid={testId}
    >
      {children && (
        <Typography
          as="span"
          antialiased={antialiased}
          mode={invertedMode}
          weight={link ? "base" : "medium"}
          size={size}
        >
          {children}
        </Typography>
      )}
      {!!icon && <Icon name={icon} size={size} color="lightest" strokeWidth="large" />}
    </StyledButton>
  )
}

export default Button
