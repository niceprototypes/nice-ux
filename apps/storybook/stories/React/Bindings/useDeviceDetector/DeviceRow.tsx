import styled from "styled-components"
import { getBreakpoint } from "nice-react-styles"
import Flex from "nice-react-flex"
import Typography from "../../../../src/nice/Typography"

const LabelWrapper = styled.div`
  ${getBreakpoint("tablet")} {
    width: 10em;
  }
`

export interface DeviceRowProps {
  showIcon?: boolean
  isMobile?: boolean
  label?: string
  description?: string
}

/**
 * Local presentational row for the useDeviceDetector demos — a code-styled
 * label paired with a value (and an optional device icon). Used only by this
 * binding's docs.
 */
export const DeviceRow = ({
  showIcon = false,
  isMobile,
  label = "mobile",
  description,
}: DeviceRowProps) => {
  const defaultDescription =
    isMobile !== undefined ? (isMobile ? "true" : "false") : undefined

  return (
    <Flex
      alignItems="center"
      gap="base"
    >
      <LabelWrapper>
        <Typography
          code
          as="span"
        >
          {label}
        </Typography>
      </LabelWrapper>
      <Flex
        alignItems="center"
        gap="smaller"
      >
        {showIcon && (isMobile ? "📱" : "💻")}
        <Typography
          code
          as="span"
          weight="bold"
        >
          {description ?? defaultDescription}
        </Typography>
      </Flex>
    </Flex>
  )
}
