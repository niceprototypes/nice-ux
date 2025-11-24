import React from "react"
import Typography from "nice-react-typography"
import { CodeRowProps } from "./types"
import Flex from "nice-react-flex"
import { LabelWrapper } from "./styles"

export const CodeRow = ({
  showIcon = false,
  isMobile,
  label = "mobile",
  description,
}: CodeRowProps) => {
  const defaultDescription =
    isMobile !== undefined ? (isMobile ? "true" : "false") : undefined

  return (
    <Flex alignItems="center" gap="base">
      <LabelWrapper>
        <Typography code as="span">
          {label}
        </Typography>
      </LabelWrapper>
      <Flex alignItems="center" gap="smaller">
        {showIcon && (isMobile ? "📱" : "💻")}
        <Typography code as="span" weight="bold">
          {description ?? defaultDescription}
        </Typography>
      </Flex>
    </Flex>
  )
}