import * as React from "react"
import Ink from "nice-react-ink"
import Icon from "nice-react-icon"
import type { IconNameType } from "nice-react-icon"
import { Theme } from "nice-react-styles"
import { StyledButton, ButtonContent } from "./Button.styles"
import { ButtonProps } from "./Button.types"
import { isDisabled } from "../../utilities/isDisabled"
import { isSquare } from "../../utilities/isSquare"

const Button: React.FC<ButtonProps> = ({
  antialiased = false,
  "aria-label": ariaLabel,
  as,
  backgroundImage,
  borderColor,
  borderRadius = "base",
  borderWidth = "base",
  children,
  className,
  "data-testid": testId,
  filled = false,
  href,
  iconLeft,
  iconRight,
  iconVendor = false,
  inlined: inlinedProp,
  theme,
  onClick,
  onMouseEnter,
  onMouseLeave,
  size = "base",
  padding,
  status = "base",
  style,
  target,
  type = "button",
  weight,
}) => {
  const [isHovered, setIsHovered] = React.useState(false)
  const [isFocused, setIsFocused] = React.useState(false)
  const [isPressed, setIsPressed] = React.useState(false)
  const disabled = isDisabled(status)
  // Passed through unchanged to the label/icon; retained as a seam for a future
  // inverted-theme derivation.
  const invertedTheme = theme
  const square = isSquare(iconLeft, iconRight, children)
  // Square (icon-only) buttons keep their fixed 1:1 box — padding overrides don't
  // apply. Otherwise the shorthand flows to the inner ButtonContent flex, and
  // StyledButton drops its default horizontal padding when this is set.
  const contentPadding = square ? undefined : padding
  // as="a" renders an HTML anchor; as="div" renders a <div> that needs button
  // semantics added back. The inlined (chrome-stripped, link-like) layout is
  // controlled independently by the `inlined` prop, which defaults to true for
  // an anchor and false otherwise — so as="div" inlined renders a link-like div.
  const anchor = as === "a"
  const clickableDiv = as === "div"
  const inlined = inlinedProp ?? anchor

  // A <div> has no native button behaviour: Enter/Space don't fire a click, so
  // wire them up here (Space is prevented from scrolling the page).
  const onDivKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      onClick?.()
    }
  }

  // Element attributes per `as`. Anchor: href/target/rel, disabled suppresses
  // navigation. Clickable div: button-equivalent a11y (role, tabindex, keyboard
  // activation). Plain button: the native type.
  const elementProps = anchor
    ? {
        as: "a" as const,
        href: disabled ? undefined : href,
        target,
        rel: target === "_blank" ? "noopener noreferrer" : undefined,
        "aria-disabled": disabled || undefined,
        onClick: disabled ? (e: React.MouseEvent) => e.preventDefault() : onClick,
      }
    : clickableDiv
    ? {
        as: "div" as const,
        role: "button" as const,
        tabIndex: disabled ? -1 : 0,
        "aria-disabled": disabled || undefined,
        onClick: disabled ? undefined : onClick,
        onKeyDown: disabled ? undefined : onDivKeyDown,
      }
    : {
        type,
        onClick: disabled ? undefined : onClick,
      }

  const renderIcon = (name: IconNameType) => (
    <Icon
      name={name}
      vendor={iconVendor}
      // Both "base" props resolve through --np--icon--size / --np--icon--color,
      // which StyledButton reassigns to the button-scoped --np--button--icon--size
      // / --np--button--icon--color. So by default the icon tracks the button's
      // size and color, and either token can be overridden to resize/recolor button
      // icons without touching the global icon tokens.
      size="base"
      color="base"
      theme={invertedTheme}
    />
  )

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
      $filled={filled}
      $inlined={inlined}
      $size={size}
      $hasPadding={contentPadding !== undefined}
      $square={square}
      $status={status}
      {...elementProps}
      aria-label={ariaLabel}
      className={className}
      data-testid={testId}
      style={style}
    >
      <ButtonContent
        direction="row"
        alignItems="center"
        justifyContent="center"
        inlined
        padding={contentPadding}
        $size={size}
        $square={square}
      >
        {!!iconLeft && renderIcon(iconLeft)}
        {children && (
          <Ink
            as="span"
            antialiased={antialiased}
            theme={invertedTheme}
            weight={weight ?? (inlined ? undefined : "medium")}
            size={size}
          >
            {children}
          </Ink>
        )}
        {!!iconRight && renderIcon(iconRight)}
      </ButtonContent>
    </StyledButton>
  )

  return theme ? <Theme name={theme}>{button}</Theme> : button
}

export default Button
