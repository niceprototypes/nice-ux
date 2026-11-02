import * as React from "react"
import { StyledAppFooter, StyledAppFooterBody, StyledAppFooterContent, StyledAppHandle } from "./App.styles"

/** The fraction of the content height one arrow key moves the handle. */
const KEY_STEP = 0.1

/** A height kept between 0 (collapsed to the handle) and the content height (fully open). */
const clamp = (height: number, content: number) => Math.min(Math.max(height, 0), content)

/**
 * The sidebar's footer, under the nav and the scene sidebar, the width of both: a rule, a drag handle
 * and the element a scene portals its settings into (`onContent`). Dragging the handle (or its arrow
 * keys) resizes the footer between the handle alone and its content's height; it opens fully.
 * Empty, it takes no space.
 */
const AppFooter: React.FC<{ onContent: (element: HTMLDivElement | null) => void }> = ({ onContent }) => {
  const [content, setContent] = React.useState<HTMLDivElement | null>(null)
  const [contentHeight, setContentHeight] = React.useState(0)
  // `null` follows the content's height: fully open.
  const [height, setHeight] = React.useState<number | null>(null)
  const drag = React.useRef<{ y: number; height: number } | null>(null)
  const shown = clamp(height ?? contentHeight, contentHeight)

  const setContentElement = React.useCallback(
    (element: HTMLDivElement | null) => {
      setContent(element)
      onContent(element)
    },
    [onContent],
  )

  React.useEffect(() => {
    if (!content) return
    const observer = new ResizeObserver(() => setContentHeight(content.offsetHeight))
    observer.observe(content)
    return () => observer.disconnect()
  }, [content])

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId)
    drag.current = { y: event.clientY, height: shown }
  }
  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (drag.current) setHeight(clamp(drag.current.height + drag.current.y - event.clientY, contentHeight))
  }
  const onPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.releasePointerCapture(event.pointerId)
    drag.current = null
  }
  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const direction = { ArrowUp: 1, ArrowDown: -1 }[event.key]
    if (!direction) return
    event.preventDefault()
    event.stopPropagation()
    setHeight(clamp(shown + direction * KEY_STEP * contentHeight, contentHeight))
  }

  return (
    <StyledAppFooter>
      <StyledAppHandle
        role="separator"
        aria-orientation="horizontal"
        aria-label="Resize"
        aria-valuemin={0}
        aria-valuemax={Math.round(contentHeight)}
        aria-valuenow={Math.round(shown)}
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onKeyDown={onKeyDown}
      />
      <StyledAppFooterBody style={{ height: shown }}>
        <StyledAppFooterContent ref={setContentElement} />
      </StyledAppFooterBody>
    </StyledAppFooter>
  )
}

export default AppFooter
