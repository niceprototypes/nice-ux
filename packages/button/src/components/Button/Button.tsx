import * as React from "react"
import Ink from "nice-react-ink"
import { Theme } from "nice-react-styles"
import { StyledButton, ButtonContent } from "./Button.styles"
import { ButtonProps } from "./Button.types"
import { getButtonElementProps } from "./Button.helpers"
import ButtonIcon from "../ButtonIcon"
import { isDisabled } from "../../utilities/isDisabled"
import { isSquare } from "../../utilities/isSquare"
import { resolveGhost } from "../../utilities/resolveGhost"
import { resolveStateColor } from "../../utilities/resolveStateColor"

const Button: React.FC<ButtonProps> = ({
  animationDuration = "base",
  antialiased = false,
  "aria-controls": ariaControls,
  "aria-current": ariaCurrent,
  "aria-expanded": ariaExpanded,
  "aria-haspopup": ariaHasPopup,
  "aria-label": ariaLabel,
  "aria-pressed": ariaPressed,
  "aria-selected": ariaSelected,
  as,
  backgroundImage,
  borderColor,
  borderRadius = "base",
  borderWidth = "base",
  children,
  className,
  color,
  "data-testid": testId,
  disabled: disabledProp = false,
  filled = false,
  form,
  ghost = false,
  grow,
  href,
  iconColor,
  iconLeft,
  iconRight,
  iconVendor = false,
  id,
  inlined: inlinedProp,
  justifyContent = "center",
  theme,
  onClick,
  onMouseEnter,
  onMouseLeave,
  size = "base",
  padding,
  ref,
  role,
  selected = false,
  status = "base",
  style,
  tabIndex,
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
    form,
    href,
    onClick,
    role,
    tabIndex,
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
      // selected overrides ghost in every state.
      $ghost={resolveGhost(selected ? false : ghost)}
      $iconColor={resolveStateColor(iconColor)}
      $color={resolveStateColor(color)}
      $animationDuration={animationDuration}
      $isHovered={isHovered}
      $isPressed={isPressed}
      $filled={filled}
      $selected={selected}
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
      aria-selected={ariaSelected}
      aria-current={ariaCurrent}
      id={id}
      className={className}
      data-testid={testId}
      style={style}
    >
      <ButtonContent
        direction="row"
        alignItems="center"
        justifyContent={justifyContent}
        inlined
        padding={contentPadding}
        $fill={justifyContent !== "center"}
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
