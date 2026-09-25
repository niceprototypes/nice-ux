import * as React from "react"
import Ink from "nice-react-ink"
import { Theme } from "nice-react-styles"
import { StyledButton, ButtonContent } from "./Button.styles"
import { ButtonProps } from "./Button.types"
import { getButtonElementProps } from "./Button.helpers"
import ButtonIcon from "../ButtonIcon"
import { isDisabled } from "../../utilities/isDisabled"
import { isSquare } from "../../utilities/isSquare"

const Button: React.FC<ButtonProps> = ({
  antialiased = false,
  "aria-controls": ariaControls,
  "aria-expanded": ariaExpanded,
  "aria-haspopup": ariaHasPopup,
  "aria-label": ariaLabel,
  "aria-pressed": ariaPressed,
  as,
  backgroundImage,
  borderColor,
  borderRadius = "base",
  borderWidth = "base",
  children,
  className,
  "data-testid": testId,
  disabled: disabledProp = false,
  filled = false,
  grow,
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
  ref,
  status = "base",
  style,
  target,
  type = "button",
  weight,
}) => {
  const [isHovered, setIsHovered] = React.useState(false)
  const [isPressed, setIsPressed] = React.useState(false)
  // Disabled when either the `disabled` prop or `status="disabled"` asks for it.
  const disabled = disabledProp || isDisabled(status)
  // A disabled button takes the disabled colouring whichever way it was disabled.
  const effectiveStatus = disabled ? "disabled" : status
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
  const inlined = inlinedProp ?? anchor

  const elementProps = getButtonElementProps({
    as,
    disabled,
    href,
    onClick,
    target,
    type,
  })

  const button = (
    <StyledButton
      onMouseEnter={event => {
        setIsHovered(true)
        onMouseEnter?.(event)
      }}
      onMouseLeave={event => {
        setIsHovered(false)
        onMouseLeave?.(event)
      }}
      onPointerDown={() => setIsPressed(true)}
      onPointerUp={() => setIsPressed(false)}
      onPointerCancel={() => setIsPressed(false)}
      $backgroundImage={backgroundImage}
      $borderColor={borderColor}
      $borderRadius={borderRadius}
      $borderWidth={borderWidth}
      $disabled={disabled}
      $isHovered={isHovered}
      $isPressed={isPressed}
      $filled={filled}
      $grow={grow}
      $inlined={inlined}
      $size={size}
      $hasPadding={contentPadding !== undefined}
      $square={square}
      $status={effectiveStatus}
      {...elementProps}
      // StyledButton's polymorphic overloads type `ref` for one element at a time;
      // the rendered element is chosen at runtime by `as` (button / a / div), so
      // the public ButtonRefType union is narrowed to the base element here.
      ref={ref as React.Ref<HTMLButtonElement>}
      aria-label={ariaLabel}
      aria-expanded={ariaExpanded}
      aria-haspopup={ariaHasPopup}
      aria-controls={ariaControls}
      aria-pressed={ariaPressed}
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
        {!!iconLeft && (
          <ButtonIcon
            name={iconLeft}
            vendor={iconVendor}
            theme={invertedTheme}
          />
        )}
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
        {!!iconRight && (
          <ButtonIcon
            name={iconRight}
            vendor={iconVendor}
            theme={invertedTheme}
          />
        )}
      </ButtonContent>
    </StyledButton>
  )

  return theme ? <Theme name={theme}>{button}</Theme> : button
}

export default Button
