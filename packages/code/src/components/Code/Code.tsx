import * as React from "react"
import Flex from "nice-react-flex"
import { CodeDiv, ScrollDiv } from "./Code.styles"
import { CodeLabel } from "../CodeLabel"
import type { CodeProps } from "./Code.types"
import { highlightCode } from "../../utilities/highlightCode"
import { copyToClipboard } from "../../utilities/copyToClipboard"

/**
 * Render a code string as Shiki dual-theme HTML. Use anywhere code is shown.
 *
 * Owns the card chrome, click/copy, and fit layout. Card blocks put the
 * Shiki-rendered HTML in a horizontal scroll container (ScrollDiv) alongside the
 * optional language label (CodeLabel); inlined blocks skip the scroll container
 * and render the code as plain text.
 */
const Code: React.FC<CodeProps> = ({
  code,
  language,
  showLabel = true,
  copyOnClick = true,
  inlined = false,
  fit = true,
  margin = "large",
  className,
}) => {
  const highlighted = (
    <div dangerouslySetInnerHTML={{ __html: highlightCode(code, language) }} />
  )

  return (
    <CodeDiv
      className={className}
      onClick={copyOnClick ? () => copyToClipboard(code) : undefined}
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
        <ScrollDiv gap="large" grow={1}>
          {/* fit: shrink to content (width: max-content); otherwise fill the row. */}
          <Flex fit={fit} grow={fit ? undefined : 1} style={fit ? undefined : { width: "100%" }}>
            {highlighted}
          </Flex>
        </ScrollDiv>
      )}
      {/* inline blocks have no chrome, so the label is suppressed. */}
      {showLabel && !inlined && <CodeLabel language={language} />}
    </CodeDiv>
  )
}

export default Code
