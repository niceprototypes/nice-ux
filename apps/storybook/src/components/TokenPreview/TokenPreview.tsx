import React from "react"
import { TokenPreviewProps } from "./types"
import TokenPreviewItem from "./TokenPreviewItem"
import { colors } from "../CodePreview/styles"

const TokenPreview: React.FC<TokenPreviewProps> = ({ items }) => {
  return (
    <div style={{
      display: "block",
      backgroundColor: colors.background,
      padding: "0.5em",
      borderRadius: "8px",
      border: `1px solid ${colors.border}`
    }}>
      <div style={{
        fontFamily: "var(--font-family-code)",
        fontSize: "0.75rem",
        lineHeight: "1.5",
        overflow: "auto"
      }}>
        {items.map((item, index) => (
          <TokenPreviewItem key={index} itemKey={item.key} itemValue={item.value} />
        ))}
      </div>
    </div>
  )
}

export default TokenPreview