import * as React from "react"
import { createPortal } from "react-dom"
import { Theme } from "@niceprototypes/styles"
import { StyledPopover } from "./Popover.styles"
import type { PopoverCoordinatesType, PopoverProps } from "./Popover.types"
import { computeAnchorPosition } from "../../services/computeAnchorPosition"
import { getPopoverOffset } from "../../utilities/getPopoverOffset"

// Hydration-safe client check: false during server render and hydration, true
// on client renders. Keeps createPortal / document access off the server.
const subscribeNoop = () => () => {}
const getClientSnapshot = () => true
const getServerSnapshot = () => false

/**
 * Popover
 *
 * Controlled surface anchored to `anchorRef`. While `open`, renders in a portal
 * at `<body>` with `position: fixed`, placed by `computeAnchorPosition` on
 * `position`'s side of the anchor with `align` on the cross axis; with
 * `matchAnchorWidth`, its min-width is the anchor's width. Coordinates
 * are recomputed on window scroll (capture phase, so nested scrollers count)
 * and resize. Escape, or a pointerdown outside the popover, the anchor and
 * every `ignoreOutsideRefs` element, calls `onOpenChange(false)`. On close, focus returns to the anchor
 * if it was inside the popover. Focus is not trapped.
 *
 * @example
 * ```tsx
 * const anchorRef = React.useRef<HTMLButtonElement>(null)
 * const [open, setOpen] = React.useState(false)
 *
 * <button ref={anchorRef} onClick={() => setOpen((o) => !o)}>Options</button>
 * <Popover open={open} onOpenChange={setOpen} anchorRef={anchorRef} aria-label="Options">
 *   …
 * </Popover>
 * ```
 */
const Popover: React.FC<PopoverProps> = ({
  open,
  onOpenChange,
  anchorRef,
  ignoreOutsideRefs,
  position = "bottom",
  align = "start",
  matchAnchorWidth = false,
  children,
  role = "dialog",
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  id,
  ref,
  className,
  theme,
}) => {
  const isClient = React.useSyncExternalStore(subscribeNoop, getClientSnapshot, getServerSnapshot)
  const popoverRef = React.useRef<HTMLDivElement | null>(null)
  // Placement plus the anchor's width, measured together (for matchAnchorWidth).
  const [coords, setCoords] = React.useState<(PopoverCoordinatesType & { anchorWidth: number }) | null>(null)

  // Latest onOpenChange, read by the document listeners so they subscribe once
  // per open rather than on every render with an inline callback.
  const onOpenChangeRef = React.useRef(onOpenChange)
  React.useEffect(() => {
    onOpenChangeRef.current = onOpenChange
  })

  // Latest ignoreOutsideRefs, read the same way: an inline array is a new value
  // every render, and re-running the dismiss effect would fire its focus-return
  // cleanup.
  const ignoreOutsideRefsRef = React.useRef(ignoreOutsideRefs)
  React.useEffect(() => {
    ignoreOutsideRefsRef.current = ignoreOutsideRefs
  })

  // Forward the popover element to both the internal ref and the consumer's ref.
  const setPopoverNode = React.useCallback(
    (node: HTMLDivElement | null) => {
      popoverRef.current = node
      if (typeof ref === "function") ref(node)
      else if (ref) ref.current = node
    },
    [ref]
  )

  // Position: measure before paint on open, then on scroll (capture) / resize.
  React.useLayoutEffect(() => {
    if (!open) return
    // Gap in px from the `popover.offset` token, read once per open.
    const offset = getPopoverOffset()
    const update = () => {
      const anchor = anchorRef.current
      if (!anchor) return
      const rect = anchor.getBoundingClientRect()
      setCoords({ ...computeAnchorPosition(rect, position, align, offset), anchorWidth: rect.width })
    }
    update()
    window.addEventListener("scroll", update, true)
    window.addEventListener("resize", update)
    return () => {
      window.removeEventListener("scroll", update, true)
      window.removeEventListener("resize", update)
      setCoords(null)
    }
  }, [open, anchorRef, position, align])

  // Dismiss + focus return. focusin tracks whether focus is inside the popover,
  // because by the time this cleanup runs the popover node is already removed
  // and document.activeElement has fallen back to <body>.
  React.useEffect(() => {
    if (!open) return
    // Seed from the current focus, in case content focused itself on mount.
    let focusInside = !!popoverRef.current?.contains(document.activeElement)

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onOpenChangeRef.current?.(false)
    }
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null
      if (!target) return
      if (popoverRef.current?.contains(target)) return
      if (anchorRef.current?.contains(target)) return
      if (ignoreOutsideRefsRef.current?.some((ignored) => ignored.current?.contains(target))) return
      onOpenChangeRef.current?.(false)
    }
    const onFocusIn = (event: FocusEvent) => {
      focusInside = !!popoverRef.current?.contains(event.target as Node | null)
    }

    document.addEventListener("keydown", onKeyDown)
    document.addEventListener("pointerdown", onPointerDown, true)
    document.addEventListener("focusin", onFocusIn)
    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.removeEventListener("pointerdown", onPointerDown, true)
      document.removeEventListener("focusin", onFocusIn)
      if (focusInside) anchorRef.current?.focus()
    }
  }, [open, anchorRef])

  if (!open || !isClient) return null

  const popover = (
    <StyledPopover
      ref={setPopoverNode}
      id={id}
      role={role}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      className={className}
      style={
        coords
          ? {
              top: coords.top,
              left: coords.left,
              transform: coords.transform,
              minWidth: matchAnchorWidth ? coords.anchorWidth : undefined,
            }
          : { top: 0, left: 0, visibility: "hidden" }
      }
    >
      {children}
    </StyledPopover>
  )

  return createPortal(theme ? <Theme name={theme}>{popover}</Theme> : popover, document.body)
}

export default Popover
