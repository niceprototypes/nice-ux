import React from "react"
import Typography from "../../nice/Typography"

interface SubsectionHeaderProps {
  children: React.ReactNode
}

const SubsectionHeader: React.FC<SubsectionHeaderProps> = ({ children }) => {
  return (
    <div
      style={{
        margin: "16px 0 8px 0",
        paddingTop: "8px",
      }}
    >
      <Typography as="h4" size="0.875rem" weight="500">
        {children}
      </Typography>
    </div>
  )
}

export default SubsectionHeader