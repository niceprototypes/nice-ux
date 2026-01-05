import React from "react"
import Typography from "nice-react-typography"
import { SectionHeaderProps } from "./SectionHeader.types"

const SectionHeader: React.FC<SectionHeaderProps> = ({ children }) => {
  return (
    <div
      style={{
        margin: "24px 0 12px 0",
        borderBottom: "1px solid #e5e7eb",
        paddingBottom: "8px",
      }}
    >
      <Typography as="h3" size="1rem" weight="600">
        {children}
      </Typography>
    </div>
  )
}

export default SectionHeader