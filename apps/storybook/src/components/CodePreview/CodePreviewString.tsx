import React from "react"
import { colors } from "./styles"
import Typography from "nice-react-typography"
import Flex from "../../../../nice-react-flex"

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
  // {children} placeholder - special case, grayed out
  [/^\{children\}/, [["{children}", colors.children]]],

  // Opening tag: <ComponentName
  [
    /^<(\w+)/,
    [
      ["<", colors.markup],
      [1, colors.element],
    ],
  ],

  // Closing tag: </ComponentName>
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

  // JS function call: functionName(
  [
    /^(\w+)\(/,
    [
      [1, colors.markup],
      ["(", colors.markup],
    ],
  ],

  // String argument: "value"
  [
    /^"([^"]*)"/,
    [
      ['"', colors.value],
      [1, colors.value],
      ['"', colors.value],
    ],
  ],

  // Punctuation: commas, colons, semicolons (with optional trailing whitespace)
  [/^,\s*/, [[",", colors.markup]]],
  [/^:\s*/, [[":", colors.markup]]],
  [/^;\s*/, [[";", colors.markup]]],

  // Closing parenthesis
  [/^\)/, [[")", colors.markup]]],
]

/**
 * CodePreviewString Component
 *
 * Parses and highlights a code string with JSX syntax highlighting.
 */
const CodePreviewString: React.FC<{ code: string }> = ({ code }) => {
  const processedCode = code.replace(/\\n/g, "\n")

  const highlightLine = (line: string, lineIndex: number) => {
    const parts: React.ReactNode[] = []
    let remaining = line
    let key = 0

    const consume = (length: number) => {
      remaining = remaining.slice(length)
    }

    const addSpan = (text: string, color?: string) => {
      parts.push(
        <span key={key++} style={color ? { color } : undefined}>
          {text}
        </span>
      )
    }

    const addSpacer = (level: number) => {
      parts.push(
        <span
          key={key++}
          style={{ display: "inline-block", width: `${level}rem` }}
        />
      )
    }

    // Check for indentation marker at start of line: +X
    const indentMatch = remaining.match(/^\+(\d+)/)
    if (indentMatch) {
      addSpacer(parseInt(indentMatch[1], 10))
      consume(indentMatch[0].length)
    }

    // Process remaining content using pattern matching
    while (remaining.length > 0) {
      let matched = false

      for (const [regex, tokens] of patterns) {
        const match = remaining.match(regex)
        if (match) {
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

      const nextSpecial = remaining.search(/[<>]|\s\w+="|\s\w+=\{|\{children}/)
      if (nextSpecial === -1) {
        addSpan(remaining)
        break
      } else if (nextSpecial > 0) {
        addSpan(remaining.slice(0, nextSpecial))
        consume(nextSpecial)
      } else {
        addSpan(remaining[0])
        consume(1)
      }
    }

    return (
      <Typography code size="smaller" key={lineIndex}>
        {parts}
      </Typography>
    )
  }

  return (
    <>
      {processedCode.split("\n").map((line, i) => (
        <Flex key={i}>{highlightLine(line, i)}</Flex>
      ))}
    </>
  )
}

export default CodePreviewString