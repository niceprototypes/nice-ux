import * as React from "react"
import Flex from "@niceprototypes/flex"
import Tooltip from "@niceprototypes/tooltip"
import { getToken } from "@niceprototypes/styles"
import { BodyDiv, CodeDiv, CollapseDiv, HandleDiv, InlineCode, PreviewDiv, ScrollDiv } from "./Code.styles"
import { CodeCopy } from "../CodeCopy"
import type { CodeProps } from "./Code.types"
import { highlightCode } from "../../utilities/highlightCode"
import { copyToClipboard } from "../../services/copyToClipboard"

/** The heights the handle moves between: the cap, and the full code. */
type Bounds = { min: number; max: number }

/**
 * Render a code string as Shiki HTML coloured by the `code.syntaxColor` tokens.
 * Use anywhere code is shown.
 *
 * Owns the card chrome, click/copy, fit layout and height limit. Card blocks put
 * the highlighted HTML in a horizontal scroll container (ScrollDiv) inside a
 * height limit (CollapseDiv) beside the copy icon (CodeCopy); code taller than
 * `maxHeight` fades out above a drag bar that sets the visible height between the
 * cap and the full code (pointer or arrow keys); `children`, a live demo, sit above the code
 * behind one divider. Inlined blocks render the code
 * as a chip with a "Copy to clipboard" tooltip; with `copyOnClick` the chip is a
 * button (Enter or Space copies).
 */
const Code: React.FC<CodeProps> = ({
  code,
  language,
  showLabel = true,
  copyOnClick = true,
  inlined = false,
  fit = false,
  margin = "none",
  maxHeight = "base",
  className,
  children,
}) => {
  const collapseRef = React.useRef<HTMLDivElement>(null)
  // The dragged height in px; unset, the cap applies.
  const [height, setHeight] = React.useState<number | undefined>(undefined)
  const [bounds, setBounds] = React.useState<Bounds | undefined>(undefined)
  const limited = !inlined && maxHeight !== "none"

  // The cap and the full height, measured while capped; the handle shows when the code overflows the cap.
  React.useLayoutEffect(() => {
    const element = collapseRef.current
    if (!limited || height !== undefined || !element) return
    const measure = () =>
      setBounds(element.scrollHeight > element.clientHeight ? { min: element.clientHeight, max: element.scrollHeight } : undefined)
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(element)
    if (element.firstElementChild) observer.observe(element.firstElementChild)
    return () => observer.disconnect()
  }, [limited, height, code])

  const clamp = (value: number) => (bounds ? Math.min(bounds.max, Math.max(bounds.min, value)) : value)
  const current = height ?? bounds?.min ?? 0

  // Drag: the height follows the pointer from where the drag started.
  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const start = event.clientY
    const startHeight = current
    const handle = event.currentTarget
    handle.setPointerCapture(event.pointerId)
    const onMove = (move: PointerEvent) => setHeight(clamp(startHeight + move.clientY - start))
    const onUp = () => {
      handle.removeEventListener("pointermove", onMove)
      handle.removeEventListener("pointerup", onUp)
    }
    handle.addEventListener("pointermove", onMove)
    handle.addEventListener("pointerup", onUp)
  }

  // Keys: one line per arrow press (measured), the ends on Home and End.
  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!bounds) return
    const line = collapseRef.current?.querySelector(".line")?.getBoundingClientRect().height || (bounds.max - bounds.min) / 10
    const next =
      event.key === "ArrowDown" ? current + line : event.key === "ArrowUp" ? current - line : event.key === "End" ? bounds.max : event.key === "Home" ? bounds.min : undefined
    if (next === undefined) return
    event.preventDefault()
    setHeight(clamp(next))
  }

  // Inline: the token spans in a <code>, which may sit in a paragraph; a block: Shiki's <pre>.
  const highlighted = inlined ? (
    <InlineCode dangerouslySetInnerHTML={{ __html: highlightCode(code, language, true) }} />
  ) : (
    <div dangerouslySetInnerHTML={{ __html: highlightCode(code, language) }} />
  )

  // Copy on click, except clicks on the copy icon, the drag bar and the live demo, which act on their own.
  const onClick = (event: React.MouseEvent) => {
    const owner = (event.target as Element).closest("[role=button], [role=separator], [data-code-preview]")
    if (owner && owner !== event.currentTarget) return
    copyToClipboard(code)
  }

  // The inline chip is the copy button itself: Enter or Space copies.
  const onChipKeyDown = (event: React.KeyboardEvent) => {
    if (event.key !== "Enter" && event.key !== " ") return
    event.preventDefault()
    copyToClipboard(code)
  }
  const chipButton = inlined && copyOnClick

  const block = (
    <CodeDiv
      as={inlined ? "span" : undefined}
      className={className}
      onClick={copyOnClick ? onClick : undefined}
      role={chipButton ? "button" : undefined}
      tabIndex={chipButton ? 0 : undefined}
      onKeyDown={chipButton ? onChipKeyDown : undefined}
      $clickable={copyOnClick}
      $inlined={inlined}
      $fit={fit}
      $margin={margin}
    >
      {/* inline blocks render as plain code text — no scroll container/padding.
          Card blocks put the code in a horizontal scroll container. */}
      {/* A live demo above the code, divided from it by the border's colour. */}
      {!inlined && children !== undefined && <PreviewDiv data-code-preview>{children}</PreviewDiv>}
      {inlined ? (
        highlighted
      ) : (
        <BodyDiv>
          <CollapseDiv
            ref={collapseRef}
            $maxHeight={limited ? getToken("code.maxHeight", maxHeight) : undefined}
            $dragged={height !== undefined}
            $faded={bounds !== undefined && current < bounds.max}
            style={height === undefined ? undefined : { height }}
          >
            <ScrollDiv>
              {/* fit: shrink to content (width: max-content); otherwise fill the row. */}
              <Flex fit={fit} grow={fit ? undefined : 1} style={fit ? undefined : { width: "100%" }}>
                {highlighted}
              </Flex>
            </ScrollDiv>
          </CollapseDiv>
          {/* the copy icon sits beside the code, in its own space. */}
          {showLabel && <CodeCopy code={code} language={language} />}
        </BodyDiv>
      )}
      {limited && bounds && (
        <HandleDiv
          role="separator"
          aria-orientation="horizontal"
          aria-label="Code height"
          aria-valuemin={Math.round(bounds.min)}
          aria-valuemax={Math.round(bounds.max)}
          aria-valuenow={Math.round(current)}
          tabIndex={0}
          onPointerDown={onPointerDown}
          onKeyDown={onKeyDown}
        />
      )}
    </CodeDiv>
  )

  return inlined && copyOnClick ? <Tooltip content="Copy to clipboard">{block}</Tooltip> : block
}

export default Code
