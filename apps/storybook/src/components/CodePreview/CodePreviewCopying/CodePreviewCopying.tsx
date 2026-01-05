import React from "react"
import { colors, CopyingFlex, StyledTypography } from "./CodePreviewCopying.styles"

/**
 * CodePreviewCopying Component
 *
 * Displays a "Copied to clipboard" overlay.
 */
const CodePreviewCopying: React.FC = () => {
  return (
    <CopyingFlex spacing="base">
      <StyledTypography code size="smaller" color="lighter">
        <span style={{ color: colors.copying }}>✓ Copied to clipboard</span>
      </StyledTypography>
    </CopyingFlex>
  )
}

export default CodePreviewCopying