import * as React from "react"
import { createPortal } from "react-dom"
import { computeAnchorPosition, type PopoverCoordinatesType } from "@niceprototypes/popover"
import { TriggerWrapper, Bubble } from "./Tooltip.styles"
import { TooltipProps } from "./Tooltip.types"

// Gap in px between the trigger and the bubble. A plain constant (not a token)
// because positioning runs in JS off getBoundingClientRect, where a CSS var
// can't be read directly.
const OFFSET = 8

/**
 * Tooltip
 *
 * Wraps a single trigger element (`children`) and shows an inverse-themed bubble
 * with `content` when activated. Activation is `hover` (default) or `click`.
 * In hover mode, keyboard focus on a focusable child also shows it and blur
 * hides it. Escape dismisses the visible bubble. `delayShow` / `delayHide`
 * defer the render / unrender so brief passes don't flash the tooltip. The
 * bubble renders in a portal at `<body>` with `position: fixed`, so it is never
 * clipped by an overflow-scrolling ancestor.
 * `anchor` chooses what the bubble positions against: the trigger's rect
 * (default) or the pointer position captured at activation (`"cursor"`).
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
 *
 * // Anchored to where the pointer entered, not the trigger box
 * <Tooltip content="At the cursor" anchor="cursor">
 *   <span>Hover anywhere on me</span>
 * </Tooltip>
 * ```
 */
const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  trigger = "hover",
  position = "top",
  anchor = "trigger",
  delayShow = 0,
  delayHide = 0,
  className,
}) => {
  const triggerRef = React.useRef<HTMLSpanElement>(null)
  const showTimer = React.useRef<number | undefined>(undefined)
  const hideTimer = React.useRef<number | undefined>(undefined)
  // Pointer position captured synchronously at activation, for anchor="cursor".
  // Stored in a ref so the deferred (delayShow) read isn't stale and doesn't
  // depend on event pooling.
  const cursor = React.useRef<{ x: number; y: number } | null>(null)
  const [visible, setVisible] = React.useState(false)
  // Links the trigger to the bubble via aria-describedby while it is shown.
  const bubbleId = React.useId()
  const [coords, setCoords] = React.useState<PopoverCoordinatesType>({ top: 0, left: 0, transform: "none" })

  const clearTimers = () => {
    window.clearTimeout(showTimer.current)
    window.clearTimeout(hideTimer.current)
  }

  // Anchor the bubble to the trigger's current rect, or to the pointer position
  // captured at activation when anchor="cursor", via @niceprototypes/popover's
  // `computeAnchorPosition` centered on the cross axis. It returns the anchor
  // point plus the translate that places the bubble's edge against it. Both
  // anchors yield viewport coordinates, matching the bubble's position: fixed.
  const computeCoords = () => {
    // Cursor anchor: clientX/clientY rode in on the activating event — no
    // measurement, no reflow. Passed as a point (a zero-size anchor).
    if (anchor === "cursor" && cursor.current) {
      setCoords(computeAnchorPosition(cursor.current, position, "center", OFFSET))
      return
    }
    const el = triggerRef.current
    if (!el) return
    setCoords(computeAnchorPosition(el.getBoundingClientRect(), position, "center", OFFSET))
  }

  // Show after delayShow; measure first so the bubble appears already placed.
  // Capture the pointer position synchronously (before the timeout) for the
  // cursor anchor — the event's clientX/clientY are only valid right now. A
  // keyboard (focus) activation has no pointer, so it clears the captured
  // position and the bubble anchors to the trigger rect.
  const show = (event?: React.MouseEvent) => {
    cursor.current = event ? { x: event.clientX, y: event.clientY } : null
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

  // Escape dismisses the visible bubble immediately (WCAG 1.4.13), bypassing
  // delayHide. Listening on document covers focus anywhere, and the pointer
  // still resting on the trigger.
  React.useEffect(() => {
    if (!visible) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return
      clearTimers()
      setVisible(false)
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [visible])

  // Focus moving between elements inside the trigger fires blur + focus on the
  // wrapper (React focus events bubble); skipping those keeps the bubble steady.
  const isInternalFocusMove = (event: React.FocusEvent) =>
    event.currentTarget.contains(event.relatedTarget as Node | null)

  // Hover trigger: show on pointer enter or keyboard focus, hide on leave or
  // blur. Click trigger: toggle.
  const handlers =
    trigger === "click"
      ? { onClick: (event: React.MouseEvent) => (visible ? hide() : show(event)) }
      : {
          onMouseEnter: show,
          onMouseLeave: hide,
          onFocus: (event: React.FocusEvent) => {
            if (!isInternalFocusMove(event)) show()
          },
          onBlur: (event: React.FocusEvent) => {
            if (!isInternalFocusMove(event)) hide()
          },
        }

  return (
    <>
      <TriggerWrapper
        ref={triggerRef}
        className={className}
        aria-describedby={visible ? bubbleId : undefined}
        $clickable={trigger === "click"}
        {...handlers}
      >
        {children}
      </TriggerWrapper>
      {visible && typeof document !== "undefined"
        ? createPortal(
            <Bubble
              id={bubbleId}
              role="tooltip"
              style={{ top: coords.top, left: coords.left, transform: coords.transform }}
            >
              {content}
            </Bubble>,
            document.body
          )
        : null}
    </>
  )
}

export default Tooltip
