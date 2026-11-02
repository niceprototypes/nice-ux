import * as React from "react"
import Flex from "@niceprototypes/flex"
import Button from "@niceprototypes/button"
import { getToken } from "@niceprototypes/styles"
import { CodeDiv, CollapseDiv, ScrollDiv } from "./Code.styles"
import { CodeLabel } from "../CodeLabel"
import type { CodeProps } from "./Code.types"
import { highlightCode } from "../../utilities/highlightCode"
import { copyToClipboard } from "../../utilities/copyToClipboard"

/**
 * Render a code string as Shiki HTML coloured by the `code.syntaxColor` tokens.
 * Use anywhere code is shown.
 *
 * Owns the card chrome, click/copy, fit layout and height limit. Card blocks put
 * the highlighted HTML in a horizontal scroll container (ScrollDiv) inside a
 * height limit (CollapseDiv) alongside the optional language label (CodeLabel);
 * code taller than `maxHeight` fades out above a Show more / Show less toggle.
 * Inlined blocks skip the scroll container and the limit and render the code as
 * plain text.
 */
const Code: React.FC<CodeProps> = ({
  code,
  language,
  showLabel = true,
  copyOnClick = true,
  inlined = false,
  fit = true,
  margin = "large",
  maxHeight = "base",
  className,
}) => {
  const collapseRef = React.useRef<HTMLDivElement>(null)
  const [expanded, setExpanded] = React.useState(false)
  const [overflowing, setOverflowing] = React.useState(false)
  const limited = !inlined && maxHeight !== "none"

  // Overflow is measured while collapsed (the cap applies); expanding keeps the
  // last measurement so the toggle stays to collapse again.
  React.useLayoutEffect(() => {
    const element = collapseRef.current
    if (!limited || expanded || !element) return
    const measure = () => setOverflowing(element.scrollHeight > element.clientHeight)
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(element)
    if (element.firstElementChild) observer.observe(element.firstElementChild)
    return () => observer.disconnect()
  }, [limited, expanded, code])

  const highlighted = (
    <div dangerouslySetInnerHTML={{ __html: highlightCode(code, language) }} />
  )

  // Copy on click, except clicks on the Show more toggle (the card's only button).
  const onClick = (event: React.MouseEvent) => {
    if ((event.target as Element).closest("button")) return
    copyToClipboard(code)
  }

  return (
    <CodeDiv
      className={className}
      onClick={copyOnClick ? onClick : undefined}
      $clickable={copyOnClick}
      $inlined={inlined}
      $fit={fit}
      $margin={margin}
    >
      {/* inline blocks render as plain code text — no scroll container/padding.
          Card blocks put the code in a horizontal scroll container. */}
      {inlined ? (
        highlighted
      ) : (
        <CollapseDiv
          ref={collapseRef}
          $maxHeight={limited && !expanded ? getToken("code.maxHeight", maxHeight) : undefined}
          $faded={limited && !expanded && overflowing}
        >
          <ScrollDiv gap="large" grow={1}>
            {/* fit: shrink to content (width: max-content); otherwise fill the row. */}
            <Flex fit={fit} grow={fit ? undefined : 1} style={fit ? undefined : { width: "100%" }}>
              {highlighted}
            </Flex>
          </ScrollDiv>
        </CollapseDiv>
      )}
      {limited && overflowing && (
        <Flex justifyContent="center" padding="none none small">
          <Button
            ghost
            size="small"
            iconRight={expanded ? "carat-top" : "carat-bottom"}
            aria-expanded={expanded}
            onClick={() => setExpanded(value => !value)}
          >
            {expanded ? "Show less" : "Show more"}
          </Button>
        </Flex>
      )}
      {/* inline blocks have no chrome, so the label is suppressed. */}
      {showLabel && !inlined && <CodeLabel language={language} />}
    </CodeDiv>
  )
}

export default Code
