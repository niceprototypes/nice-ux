import * as React from "react"
import { createPortal } from "react-dom"
import { TriggerWrapper, Bubble } from "./Tooltip.styles"
import { TooltipPositionType, TooltipProps } from "./Tooltip.types"

// Gap in px between the trigger and the bubble. A plain constant (not a token)
// because positioning runs in JS off getBoundingClientRect, where a CSS var
// can't be read directly.
const OFFSET = 8

/**
 * Tooltip
 *
 * Wraps a single trigger element (`children`) and shows an inverse-themed bubble
 * with `content` when activated. Activation is `hover` (default) or `click`.
 * `delayShow` / `delayHide` defer the render / unrender so brief passes don't
 * flash the tooltip. The bubble renders in a portal at `<body>` with
 * `position: fixed`, so it is never clipped by an overflow-scrolling ancestor.
 *
 * @example
 * ```tsx
 * <Tooltip content="Copy to clipboard" delayShow={600}>
 *   <button onClick={copy}>{value}</button>
 * </Tooltip>
 *
 * // Click to toggle, shown below the trigger
 * <Tooltip content="Details" trigger="click" position="bottom">
 *   <Icon name="info" />
 * </Tooltip>
 * ```
 */
const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  trigger = "hover",
  position = "top",
  delayShow = 0,
  delayHide = 0,
  className,
}) => {
  const triggerRef = React.useRef<HTMLSpanElement>(null)
  const showTimer = React.useRef<number | undefined>(undefined)
  const hideTimer = React.useRef<number | undefined>(undefined)
  const [visible, setVisible] = React.useState(false)
  const [coords, setCoords] = React.useState<{ top: number; left: number }>({ top: 0, left: 0 })

  const clearTimers = () => {
    window.clearTimeout(showTimer.current)
    window.clearTimeout(hideTimer.current)
  }

  // Anchor the bubble to the trigger's current rect. The bubble is then offset
  // onto the chosen side by `transformFor()` (it owns the centering translate).
  const computeCoords = () => {
    const el = triggerRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    switch (position) {
      case "bottom":
        setCoords({ top: r.bottom + OFFSET, left: r.left + r.width / 2 })
        break
      case "left":
        setCoords({ top: r.top + r.height / 2, left: r.left - OFFSET })
        break
      case "right":
        setCoords({ top: r.top + r.height / 2, left: r.right + OFFSET })
        break
      default: // top
        setCoords({ top: r.top - OFFSET, left: r.left + r.width / 2 })
    }
  }

  // Show after delayShow; measure first so the bubble appears already placed.
  const show = () => {
    clearTimers()
    showTimer.current = window.setTimeout(() => {
      computeCoords()
      setVisible(true)
    }, delayShow)
  }

  // Hide after delayHide.
  const hide = () => {
    clearTimers()
    hideTimer.current = window.setTimeout(() => setVisible(false), delayHide)
  }

  // Clear any pending timer on unmount so a deferred show/hide can't fire late.
  React.useEffect(() => clearTimers, [])

  // The translate that places the bubble's edge against the trigger, centered on
  // the cross axis, given the anchor point computed above.
  const transformFor = (pos: TooltipPositionType): string => {
    switch (pos) {
      case "bottom":
        return "translate(-50%, 0)"
      case "left":
        return "translate(-100%, -50%)"
      case "right":
        return "translate(0, -50%)"
      default: // top
        return "translate(-50%, -100%)"
    }
  }

  // Hover trigger: show on enter, hide on leave. Click trigger: toggle.
  const handlers =
    trigger === "click"
      ? { onClick: () => (visible ? hide() : show()) }
      : { onMouseEnter: show, onMouseLeave: hide }

  return (
    <>
      <TriggerWrapper ref={triggerRef} className={className} $clickable={trigger === "click"} {...handlers}>
        {children}
      </TriggerWrapper>
      {visible && typeof document !== "undefined"
        ? createPortal(
            <Bubble style={{ top: coords.top, left: coords.left, transform: transformFor(position) }}>{content}</Bubble>,
            document.body
          )
        : null}
    </>
  )
}

export default Tooltip
