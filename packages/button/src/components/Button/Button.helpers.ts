import type * as React from "react"
import type {
  ButtonAsType,
  ButtonElementType,
  ButtonHrefType,
  ButtonOnClickType,
  ButtonTargetType,
} from "./Button.types"

export interface GetButtonElementPropsArgs {
  as?: ButtonAsType
  disabled: boolean
  href?: ButtonHrefType
  onClick?: ButtonOnClickType
  target?: ButtonTargetType
  type: ButtonElementType
}

/**
 * Element attributes per `as`. Anchor: href/target/rel, disabled suppresses
 * navigation and removes it from the tab order. Clickable div: button-equivalent
 * a11y (role, tabindex, keyboard activation). Plain button: the native type, and
 * the native `disabled` attribute so it leaves the tab order and is announced
 * as disabled.
 */
export function getButtonElementProps({ as, disabled, href, onClick, target, type }: GetButtonElementPropsArgs) {
  if (as === "a") {
    return {
      as: "a" as const,
      href: disabled ? undefined : href,
      target,
      rel: target === "_blank" ? "noopener noreferrer" : undefined,
      "aria-disabled": disabled || undefined,
      tabIndex: disabled ? -1 : undefined,
      onClick: disabled ? (event: React.MouseEvent) => event.preventDefault() : onClick,
    }
  }

  if (as === "div") {
    // A <div> has no native button behaviour: Enter/Space don't fire a click, so
    // wire them up here (Space is prevented from scrolling the page).
    const onDivKeyDown = (event: React.KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault()
        onClick?.()
      }
    }

    return {
      as: "div" as const,
      role: "button" as const,
      tabIndex: disabled ? -1 : 0,
      "aria-disabled": disabled || undefined,
      onClick: disabled ? undefined : onClick,
      onKeyDown: disabled ? undefined : onDivKeyDown,
    }
  }

  return {
    type,
    disabled,
    onClick: disabled ? undefined : onClick,
  }
}
