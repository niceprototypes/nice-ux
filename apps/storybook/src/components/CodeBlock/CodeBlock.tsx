import React from "react"

interface CodeBlockProps {
  children: string
  // language is accepted for call-site clarity; tokenizer is JS/TS-flavored regardless
  language?: string
  padded?: boolean
  bordered?: boolean
}

// Token color palette — picked to read well on the dark background below
const colors = {
  comment: "#6b7280",
  string: "#a5d6a7",
  number: "#ffab70",
  keyword: "#c792ea",
  func: "#82aaff",
  property: "#89ddff",
  punctuation: "#cbd5e1",
  text: "#e0e0e0",
}

const KEYWORDS = new Set([
  "const", "let", "var", "function", "return", "if", "else", "for", "while",
  "true", "false", "null", "undefined", "import", "export", "from", "default",
  "new", "class", "extends", "this", "async", "await", "try", "catch", "throw",
  "typeof", "instanceof", "in", "of", "as", "type", "interface",
])

// Tokenize a single line into colored spans. Patterns are evaluated in order;
// the first match at the current position wins. Anything not matched falls
// through as default-colored text one character at a time.
const tokenize = (line: string): React.ReactNode[] => {
  const out: React.ReactNode[] = []
  let i = 0
  let key = 0

  const push = (text: string, color: string) => {
    out.push(
      <span key={key++} style={{ color }}>
        {text}
      </span>
    )
  }

  while (i < line.length) {
    const rest = line.slice(i)

    // Line comment — consumes the rest of the line
    const commentMatch = rest.match(/^\/\/.*/)
    if (commentMatch) {
      push(commentMatch[0], colors.comment)
      i += commentMatch[0].length
      continue
    }

    // Double-quoted string
    const stringMatch = rest.match(/^"(?:[^"\\]|\\.)*"/)
    if (stringMatch) {
      push(stringMatch[0], colors.string)
      i += stringMatch[0].length
      continue
    }

    // Single-quoted string
    const sqStringMatch = rest.match(/^'(?:[^'\\]|\\.)*'/)
    if (sqStringMatch) {
      push(sqStringMatch[0], colors.string)
      i += sqStringMatch[0].length
      continue
    }

    // Template literal — simple, no interpolation handling
    const tplMatch = rest.match(/^`[^`]*`/)
    if (tplMatch) {
      push(tplMatch[0], colors.string)
      i += tplMatch[0].length
      continue
    }

    // Number literal (incl. units like 16px, 600ms)
    const numberMatch = rest.match(/^\d+(?:\.\d+)?[a-z%]*/)
    if (numberMatch) {
      push(numberMatch[0], colors.number)
      i += numberMatch[0].length
      continue
    }

    // Property access: .identifier
    const propMatch = rest.match(/^\.([a-zA-Z_$][\w$]*)/)
    if (propMatch) {
      push(".", colors.punctuation)
      push(propMatch[1], colors.property)
      i += propMatch[0].length
      continue
    }

    // Identifier — could be keyword, function call, or plain ident
    const identMatch = rest.match(/^[a-zA-Z_$][\w$]*/)
    if (identMatch) {
      const word = identMatch[0]
      const next = line[i + word.length]
      if (KEYWORDS.has(word)) {
        push(word, colors.keyword)
      } else if (next === "(") {
        push(word, colors.func)
      } else {
        push(word, colors.text)
      }
      i += word.length
      continue
    }

    // Punctuation
    if (/[{}()[\],;:=<>+\-*/!?&|]/.test(line[i])) {
      push(line[i], colors.punctuation)
      i += 1
      continue
    }

    // Whitespace and anything else — emit as-is in default color
    push(line[i], colors.text)
    i += 1
  }

  return out
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  children,
  padded = true,
  bordered = true,
}) => {
  const lines = children.split("\n")
  return (
    <pre
      style={{
        margin: 0,
        padding: padded ? "16px" : "0",
        backgroundColor: "white",
        color: colors.text,
        border: bordered ? "1px solid #2a2a3e" : "none",
        borderRadius: bordered ? "6px" : "0",
        overflow: "auto",
        fontFamily:
          "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
        fontSize: "13px",
        lineHeight: 1.5,
      }}
    >
      <code
        style={{
          fontFamily: "inherit",
          fontSize: "inherit",
          color: "inherit",
        }}
      >
        {lines.map((line, idx) => (
          <React.Fragment key={idx}>
            {tokenize(line)}
            {idx < lines.length - 1 && "\n"}
          </React.Fragment>
        ))}
      </code>
    </pre>
  )
}

export default CodeBlock
