import * as React from "react"
import { Theme } from "@niceprototypes/styles"
import { isDevelopment } from "../../utilities/isDevelopment"
import { StyledCard } from "./Card.styles"
import type { CardProps } from "./Card.types"

/** Focusable or activatable descendants: invalid inside a link or button card. */
const INTERACTIVE_SELECTOR = "a[href], button, input, select, textarea, [tabindex]"

/**
 * Card
 *
 * A token-styled surface (outline, elevated or filled) that stacks its children in a column:
 * CardHeader, CardBody, CardFooter, or any nodes. Static by default (`<div>`). With `href` the
 * root is a native `<a>`; with `onClick` a native `<button type="button">`, which becomes a
 * toggle button (`aria-pressed`) when `selected` is set. `disabled` disables the button, or marks
 * the link `aria-disabled` and stops it navigating.
 *
 * A link or button card must not contain interactive elements (nested interactive content is
 * invalid HTML); in development, Card warns when it does.
 *
 * @example
 * ```tsx
 * <Card>
 *   <CardHeader title="Plan" description="Billed monthly." end={<Button>Edit</Button>} />
 *   <CardBody>…</CardBody>
 * </Card>
 *
 * <Card onClick={toggle} selected={chosen}>
 *   <CardHeader title="Pro" />
 * </Card>
 * ```
 */
const Card: React.FC<CardProps> = ({
  children,
  variant = "outline",
  padding,
  gap,
  borderRadius,
  backgroundColor,
  onClick,
  href,
  selected,
  disabled = false,
  theme,
  ref,
}) => {
  const rootRef = React.useRef<HTMLElement | null>(null)
  const setRootNode = React.useCallback(
    (node: HTMLElement | null) => {
      rootRef.current = node
      if (typeof ref === "function") ref(node)
      else if (ref) ref.current = node
    },
    [ref],
  )

  const as = href !== undefined ? "a" : onClick ? "button" : "div"
  const interactive = as !== "div"

  // Dev warning, once per card: interactive descendants inside an interactive root.
  const warnedRef = React.useRef(false)
  React.useEffect(() => {
    if (warnedRef.current || !interactive || !isDevelopment()) return
    if (rootRef.current?.querySelector(INTERACTIVE_SELECTOR)) {
      warnedRef.current = true
      console.warn(
        "@niceprototypes/card: a Card with `href` or `onClick` contains an interactive element. " +
          "Nested interactive content is invalid HTML; move the control out of the card or drop `href`/`onClick`.",
      )
    }
  })

  const rootProps =
    as === "a"
      ? {
          href,
          "aria-disabled": disabled ? true : undefined,
          onClick: (event: React.MouseEvent<HTMLElement>) => {
            if (disabled) {
              event.preventDefault()
              return
            }
            onClick?.(event)
          },
        }
      : as === "button"
        ? { type: "button" as const, disabled, "aria-pressed": selected, onClick }
        : {}

  const card = (
    <StyledCard
      as={as}
      ref={setRootNode}
      {...rootProps}
      $variant={variant}
      $padding={padding}
      $gap={gap}
      $borderRadius={borderRadius}
      $backgroundColor={backgroundColor ?? (variant === "filled" ? "raised" : "base")}
      $selected={selected ?? false}
      $interactive={interactive}
      $disabled={disabled}
    >
      {children}
    </StyledCard>
  )

  return theme ? <Theme name={theme}>{card}</Theme> : card
}

export default Card
