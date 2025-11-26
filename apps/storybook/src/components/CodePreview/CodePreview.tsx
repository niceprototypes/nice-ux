import React from "react"
import { CodePreviewProps } from "./types"
import { colors } from "./styles"

const CodePreview: React.FC<CodePreviewProps> = ({ code, display = "block" }) => {
  const highlightLine = (line: string) => {
    const parts: React.ReactNode[] = []
    let remaining = line
    let key = 0

    const addColoredSpan = (text: string, color?: string) => {
      parts.push(<span key={key++} style={color ? { color } : undefined}>{text}</span>)
    }

    const tryMatch = (pattern: RegExp, handler: (match: RegExpMatchArray) => void): boolean => {
      const match = remaining.match(pattern)
      if (match) {
        handler(match)
        remaining = remaining.slice(match[0].length)
        return true
      }
      return false
    }

    while (remaining.length > 0) {
      // Opening tag: <ComponentName
      if (tryMatch(/^<(\w+)/, (m) => {
        addColoredSpan('<', colors.bracket)
        addColoredSpan(m[1], colors.element)
      })) continue

      // Closing tag: </ComponentName>
      if (tryMatch(/^<\/(\w+)>/, (m) => {
        addColoredSpan('</', colors.bracket)
        addColoredSpan(m[1], colors.element)
        addColoredSpan('>', colors.bracket)
      })) continue

      // Closing bracket: >
      if (tryMatch(/^>/, () => {
        addColoredSpan('>', colors.bracket)
      })) continue

      // Prop with string value: prop="value"
      if (tryMatch(/^(\s+)(\w+)="([^"]*)"/, (m) => {
        addColoredSpan(m[1])
        addColoredSpan(m[2], colors.prop)
        addColoredSpan('="', colors.bracket)
        addColoredSpan(m[3], colors.stringValue)
        addColoredSpan('"', colors.bracket)
      })) continue

      // Plain text (inside tags)
      const nextSpecial = remaining.search(/[<>]|\s\w+="/)
      if (nextSpecial === -1) {
        addColoredSpan(remaining)
        break
      } else if (nextSpecial > 0) {
        addColoredSpan(remaining.slice(0, nextSpecial))
        remaining = remaining.slice(nextSpecial)
      } else {
        addColoredSpan(remaining[0])
        remaining = remaining.slice(1)
      }
    }

    return <div>{parts}</div>
  }

  return (
    <div style={{
      backgroundColor: colors.background,
      padding: "0.5em",
      borderRadius: "8px",
      border: `1px solid ${colors.border}`
    }}>
      <div style={{
        fontFamily: "var(--font-family-code)",
        fontSize: "0.75rem",
        lineHeight: "1.5",
        color: colors.text,
        overflow: "auto"
      }}>
        {code.split('\n').map((line, i) => (
          <div key={i}>{highlightLine(line)}</div>
        ))}
      </div>
    </div>
  )
}

export default CodePreview