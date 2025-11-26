import React from "react"
import { CodePreviewProps } from "./types"
import { colors } from "./styles"
import Flex from "../../../../nice-react-flex"
import Typography from "../../../../nice-react-typography"
import { getToken } from "../../../../nice-styles/src"

/**
 * Token definition for syntax highlighting.
 *
 * Each token is a tuple of [content, color?]:
 * - If content is a number, it references a regex capture group index
 * - If content is a string, it's used as literal text
 * - Color is optional; if omitted, default text color is used
 *
 * @example
 * [1, colors.element]     // Use capture group 1 with element color
 * ["<", colors.markup]    // Use literal "<" with markup color
 * [1]                     // Use capture group 1 with default color
 */
type Token = [string | number, string?]

/**
 * Pattern definitions for JSX syntax highlighting.
 *
 * Each pattern is a tuple of [regex, tokens]:
 * - Regex must start with ^ to match from current position
 * - Tokens define how to render each part of the match
 *
 * Patterns are evaluated in order; first match wins.
 */
const patterns: Array<[RegExp, Token[]]> = [
  // Opening tag: <ComponentName
  // Captures: (1) component name
  [
    /^<(\w+)/,
    [
      ["<", colors.markup],
      [1, colors.element],
    ],
  ],

  // Closing tag: </ComponentName>
  // Captures: (1) component name
  [
    /^<\/(\w+)>/,
    [
      ["</", colors.markup],
      [1, colors.element],
      [">", colors.markup],
    ],
  ],

  // Closing bracket: >
  [/^>/, [[">", colors.markup]]],

  // Prop with string value: prop="value"
  // Captures: (1) whitespace, (2) prop name, (3) value
  [
    /^(\s+)(\w+)="([^"]*)"/,
    [
      [1],
      [2, colors.markup],
      ["=", colors.markup],
      ['"', colors.value],
      [3, colors.value],
      ['"', colors.value],
    ],
  ],

  // Prop with number value: prop={0}
  // Captures: (1) whitespace, (2) prop name, (3) number
  [
    /^(\s+)(\w+)=\{(\d+)\}/,
    [
      [1],
      [2, colors.markup],
      ["=", colors.markup],
      ["{", colors.value],
      [3, colors.value],
      ["}", colors.value],
    ],
  ],

  // {children} placeholder
  [/^\{children\}/, [["{children}", colors.children]]],
]

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
const CodePreview: React.FC<CodePreviewProps> = ({ code }) => {
  /**
   * Converts literal \n sequences to actual newline characters.
   * This allows code strings to specify line breaks inline.
   */
  const processNewlines = (input: string): string => {
    return input.replace(/\\n/g, "\n")
  }

  const processedCode = processNewlines(code)

  /**
   * Parses and highlights a single line of code.
   *
   * Process:
   * 1. Check for indentation marker (+X) at line start
   * 2. Iterate through patterns to match and highlight syntax
   * 3. Fall back to plain text for unmatched content
   */
  const highlightLine = (line: string) => {
    const parts: React.ReactNode[] = []
    let remaining = line
    let key = 0

    /**
     * Advances the parser by removing characters from the start of remaining.
     */
    const consume = (length: number) => {
      remaining = remaining.slice(length)
    }

    /**
     * Adds a colored span element to the output.
     */
    const addSpan = (text: string, color?: string) => {
      parts.push(
        <span key={key++} style={color ? { color } : undefined}>
          {text}
        </span>
      )
    }

    /**
     * Adds an indentation spacer element.
     * Width is level * 1rem.
     */
    const addSpacer = (level: number) => {
      parts.push(
        <div
          key={key++}
          style={{ display: "inline-block", width: `${level}rem` }}
        />
      )
    }

    // Check for indentation marker at start of line: +X
    // Example: "+1<Flex>" renders as [1rem spacer]<Flex>
    const indentMatch = remaining.match(/^\+(\d+)/)
    if (indentMatch) {
      addSpacer(parseInt(indentMatch[1], 10))
      consume(indentMatch[0].length)
    }

    // Process remaining content using pattern matching
    while (remaining.length > 0) {
      let matched = false

      // Try each pattern in order
      for (const [regex, tokens] of patterns) {
        const match = remaining.match(regex)
        if (match) {
          // Render tokens for this pattern
          for (const [textOrIndex, color] of tokens) {
            const text =
              typeof textOrIndex === "number" ? match[textOrIndex] : textOrIndex
            addSpan(text, color)
          }
          consume(match[0].length)
          matched = true
          break
        }
      }

      if (matched) continue

      // Plain text fallback: find next special character or pattern
      const nextSpecial = remaining.search(/[<>]|\s\w+="|\s\w+=\{|\{children\}/)
      if (nextSpecial === -1) {
        // No more special patterns; render rest as plain text
        addSpan(remaining)
        break
      } else if (nextSpecial > 0) {
        // Plain text before next pattern
        addSpan(remaining.slice(0, nextSpecial))
        consume(nextSpecial)
      } else {
        // Unrecognized character; render and continue
        addSpan(remaining[0])
        consume(1)
      }
    }

    return <div>{parts}</div>
  }

  return (
    <Flex
      direction="column"
      grow={1}
      style={{
        backgroundColor: colors.background,
        padding: "0.5rem 0.625rem",
        borderRadius: getToken("borderRadius", "base").var,
      }}
    >
      {processedCode.split("\n").map((line, i) => (
        <Typography code size="smaller" key={i}>
          {highlightLine(line)}
        </Typography>
      ))}
    </Flex>
  )
}

export default CodePreview
