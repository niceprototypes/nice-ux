import React from "react"

const CodeBlock: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <pre
    style={{
      margin: 0,
      padding: "16px",
      backgroundColor: "#1a1a2e",
      borderRadius: "8px",
      overflow: "auto",
    }}
  >
    <code
      style={{
        color: "#e0e0e0",
        fontFamily: "monospace",
        fontSize: "13px",
        whiteSpace: "pre",
      }}
    >
      {children}
    </code>
  </pre>
)

export default CodeBlock
