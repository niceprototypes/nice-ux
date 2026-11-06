import * as React from "react"
import { createPortal } from "react-dom"
import { Theme } from "@niceprototypes/styles"
import { computeAnchorPosition, getAnchorOffset, type PopoverCoordinatesType } from "@niceprototypes/popover"
import { TriggerWrapper, Bubble } from "./Tooltip.styles"
import { TooltipProps } from "./Tooltip.types"

/** Descendants that take keyboard focus themselves; without one, the trigger wrapper does. */
const FOCUSABLE = 'a[href], button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])'

/**
 * Tooltip
 *
 * Wraps a single trigger element (`children`) and shows an inverse-themed bubble
 * with `content` when activated. Activation is `hover` (default) or `click`.
 * In hover mode, keyboard focus on the trigger also shows it and blur hides it;
 * a trigger with no focusable child gets `tabIndex={0}` on its wrapper, and in
 * click mode that wrapper toggles on Enter and Space. Escape dismisses the visible bubble. `delayShow` / `delayHide`
 * defer the render / unrender so brief passes don't flash the tooltip. The
 * bubble renders in a portal at `<body>` with `position: fixed`, so it is never
 * clipped by an overflow-scrolling ancestor, and flips / shifts to stay in the
 * viewport (@niceprototypes/popover's `computeAnchorPosition`). `open` forces it
 * shown or hidden; `theme` pins the bubble's theme.
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
  open,
  theme,
  className,
}) => {
  const triggerRef = React.useRef<HTMLSpanElement>(null)
  const bubbleRef = React.useRef<HTMLDivElement>(null)
  const showTimer = React.useRef<number | undefined>(undefined)
  const hideTimer = React.useRef<number | undefined>(undefined)
  // Pointer position captured synchronously at activation, for anchor="cursor".
  // Stored in a ref so the deferred (delayShow) read isn't stale and doesn't
  // depend on event pooling.
  const cursor = React.useRef<{ x: number; y: number } | null>(null)
  const [visible, setVisible] = React.useState(false)
  const shown = open ?? visible
  // Whether the wrapper itself takes focus: true when `children` hold no focusable element.
  const [wrapperFocusable, setWrapperFocusable] = React.useState(false)
  React.useLayoutEffect(() => {
    setWrapperFocusable(!triggerRef.current?.querySelector(FOCUSABLE))
  }, [children])
  // Links the trigger to the bubble via aria-describedby while it is shown.
  const bubbleId = React.useId()
  const [coords, setCoords] = React.useState<PopoverCoordinatesType>({ top: 0, left: 0, transform: "none" })

  const clearTimers = () => {
    window.clearTimeout(showTimer.current)
    window.clearTimeout(hideTimer.current)
  }

  // Once the bubble renders, place it before paint against the trigger's rect,
  // or the pointer position captured at activation when anchor="cursor", via
  // @niceprototypes/popover's `computeAnchorPosition` centered on the cross
  // axis, with the bubble's size so it flips and shifts into the viewport.
  // offsetWidth / offsetHeight ignore the transform. Both anchors yield
  // viewport coordinates, matching the bubble's position: fixed.
  React.useLayoutEffect(() => {
    if (!shown) return
    const bubble = bubbleRef.current
    const bounds = {
      size: { width: bubble?.offsetWidth ?? 0, height: bubble?.offsetHeight ?? 0 },
      viewport: { width: window.innerWidth, height: window.innerHeight },
    }
    const offset = getAnchorOffset("tooltip.offset")
    // Cursor anchor: clientX/clientY rode in on the activating event, passed
    // as a point (a zero-size anchor).
    const target = anchor === "cursor" && cursor.current ? cursor.current : triggerRef.current?.getBoundingClientRect()
    if (target) setCoords(computeAnchorPosition(target, position, "center", offset, bounds))
  }, [shown, anchor, position])

  // Show after delayShow.
  // Capture the pointer position synchronously (before the timeout) for the
  // cursor anchor — the event's clientX/clientY are only valid right now. A
  // keyboard (focus) activation has no pointer, so it clears the captured
  // position and the bubble anchors to the trigger rect.
  const show = (event?: React.MouseEvent) => {
    cursor.current = event ? { x: event.clientX, y: event.clientY } : null
    clearTimers()
    showTimer.current = window.setTimeout(() => setVisible(true), delayShow)
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
  // blur. Click trigger: toggle on click, and on Enter / Space when the wrapper
  // itself has focus (a focusable child fires its own click on those keys).
  const handlers =
    trigger === "click"
      ? {
          onClick: (event: React.MouseEvent) => (visible ? hide() : show(event)),
          onKeyDown: (event: React.KeyboardEvent) => {
            if (event.target !== event.currentTarget || (event.key !== "Enter" && event.key !== " ")) return
            event.preventDefault()
            if (visible) hide()
            else show()
          },
        }
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

  const withTheme = (element: React.ReactElement) => (theme ? <Theme name={theme}>{element}</Theme> : element)

  return (
    <>
      <TriggerWrapper
        ref={triggerRef}
        className={className}
        aria-describedby={shown ? bubbleId : undefined}
        tabIndex={wrapperFocusable ? 0 : undefined}
        $clickable={trigger === "click"}
        {...handlers}
      >
        {children}
      </TriggerWrapper>
      {shown && typeof document !== "undefined"
        ? createPortal(
            withTheme(
              <Bubble
                ref={bubbleRef}
                id={bubbleId}
                role="tooltip"
                style={{ top: coords.top, left: coords.left, transform: coords.transform }}
              >
                {content}
              </Bubble>
            ),
            document.body
          )
        : null}
    </>
  )
}

export default Tooltip
