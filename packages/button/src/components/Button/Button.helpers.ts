import type * as React from "react"
import type {
  ButtonAsType,
  ButtonElementType,
  ButtonFormType,
  ButtonHrefType,
  ButtonLoadingType,
  ButtonOnClickType,
  ButtonRoleType,
  ButtonTabIndexType,
  ButtonTargetType,
} from "./Button.types"

export interface GetButtonElementPropsArgs {
  as?: ButtonAsType
  disabled: boolean
  form?: ButtonFormType
  href?: ButtonHrefType
  loading: ButtonLoadingType
  onClick?: ButtonOnClickType
  role?: ButtonRoleType
  tabIndex?: ButtonTabIndexType
  target?: ButtonTargetType
  type: ButtonElementType
}

/**
 * Element attributes per `as`. Anchor: href/target/rel, disabled suppresses
 * navigation and removes it from the tab order. Clickable div: button-equivalent
 * a11y (role, tabindex, keyboard activation). Plain button: the native type, and
 * the native `disabled` attribute so it leaves the tab order and is announced
 * as disabled, and `form` (a form attribute only a button has). A consumer `role` / `tabIndex` overrides these defaults, except
 * that disabled keeps tabIndex -1 (anchor, div) or the native attribute (button).
 * Loading ignores activation like disabled (a click is prevented, so an anchor does not
 * navigate and a submit button does not submit) but keeps the element focusable.
 */
export function getButtonElementProps({ as, disabled, form, href, loading, onClick, role, tabIndex, target, type }: GetButtonElementPropsArgs) {
  // Loading ignores activation but stays focusable; disabled also leaves the tab order.
  const inactive = disabled || loading
  const preventActivation = (event: React.SyntheticEvent) => event.preventDefault()

  if (as === "a") {
    return {
      as: "a" as const,
      href: disabled ? undefined : href,
      target,
      rel: target === "_blank" ? "noopener noreferrer" : undefined,
      role,
      "aria-disabled": inactive || undefined,
      tabIndex: disabled ? -1 : tabIndex,
      onClick: inactive ? preventActivation : onClick,
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
      role: role ?? "button",
      tabIndex: disabled ? -1 : (tabIndex ?? 0),
      "aria-disabled": inactive || undefined,
      onClick: inactive ? undefined : onClick,
      onKeyDown: inactive ? undefined : onDivKeyDown,
    }
  }

  return {
    type,
    form,
    role,
    disabled,
    "aria-disabled": (loading && !disabled) || undefined,
    tabIndex: disabled ? undefined : tabIndex,
    onClick: disabled ? undefined : loading ? preventActivation : onClick,
  }
}
