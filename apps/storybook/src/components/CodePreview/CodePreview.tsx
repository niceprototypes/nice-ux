import React, { useState } from "react"
import { CodePreviewProps } from "./types"
import { ClickableDiv, ClickableFlex } from "./styles"
import CodePreviewString from "./CodePreviewString"
import CodePreviewCopying from "./CodePreviewCopying"

/**
 * CodePreview Component
 *
 * Renders JSX code with syntax highlighting and optional indentation.
 *
 * Features:
 * - Syntax highlighting for JSX elements, props, and values
 * - Line breaks via \n in code strings
 * - Indentation via +X at start of line (renders as X rem spacer)
 *
 * @example
 * // Single line
 * <CodePreview code={`<Flex>{children}</Flex>`} />
 *
 * @example
 * // Multi-line with indentation
 * <CodePreview code={`<Flex>{children}</Flex>`} />
 * // Renders as:
 * // <Flex>
 * //   {children}
 * // </Flex>
 */
const CodePreview: React.FC<CodePreviewProps> = ({
  code,
  clipboard = true,
}) => {
  const [copying, setCopying] = useState(false)

  const getCleanCode = (input: string): string => {
    return input.replace(/\\n/g, "\n").replace(/^\+\d+/gm, "")
  }

  const handleClick = () => {
    if (!clipboard || copying) return
    navigator.clipboard.writeText(getCleanCode(code))
    setCopying(true)
    setTimeout(() => setCopying(false), 1000)
  }

  return (
    <ClickableDiv
      onClick={clipboard ? handleClick : undefined}
      $clickable={clipboard}
    >
      <ClickableFlex>
        {copying && <CodePreviewCopying />}
        <CodePreviewString code={code} />
      </ClickableFlex>
    </ClickableDiv>
  )
}

export default CodePreview
