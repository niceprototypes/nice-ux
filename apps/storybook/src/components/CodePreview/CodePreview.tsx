import React, { useState } from "react"
import { getToken } from "nice-styles"
import { CodePreviewProps } from "./types"
import { colors } from "./styles"
import Flex from "nice-react-flex"
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
 * <CodePreview code={`<Flex>\\n+1{children}\\n</Flex>`} />
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
    if (!clipboard) return
    navigator.clipboard.writeText(getCleanCode(code))
    setCopying(true)
    setTimeout(() => setCopying(false), 1000)
  }

  return (
    <Flex
      direction="column"
      grow={1}
      onClick={!copying && handleClick}
      style={{
        backgroundColor: colors.background,
        padding: "0.5rem 0.625rem",
        borderRadius: getToken("borderRadius", "base").var,
        cursor: clipboard ? "pointer" : undefined,
        position: "relative",
        transition: "background-color 0.1s ease-in-out",
      }}
    >
      {copying && <CodePreviewCopying />}
      <CodePreviewString code={code} />
    </Flex>
  )
}

export default CodePreview
