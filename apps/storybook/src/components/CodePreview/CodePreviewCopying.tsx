import React from "react"
import { getToken } from "nice-styles"
import { colors } from "./styles"
import Flex from "nice-react-flex"
import Typography from "nice-react-typography"

/**
 * CodePreviewCopying Component
 *
 * Displays a "Copied to clipboard" overlay.
 */
const CodePreviewCopying: React.FC = () => {
  return (
    <Flex
      style={{
        backgroundColor: colors.background,
        padding: "0.5rem 0.625rem",
        borderRadius: getToken("borderRadius", "base").var,
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        cursor: "default",
      }}
    >
      <Typography code size="smaller" color="lighter">
        <span style={{ color: colors.copying }}>✓ Copied to clipboard</span>
      </Typography>
    </Flex>
  )
}

export default CodePreviewCopying