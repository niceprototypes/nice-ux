import styled from "styled-components"
import Flex from "nice-react-flex"
import { getBreakpoint } from "nice-react-styles"

export const BreakpointRow = styled(Flex)`
  padding: 12px 16px;
  background: var(--np--background-color--dark);
  border-radius: 8px;
  font-family: var(--np--font-family--code);
`

export const Label = styled.span`
  min-width: 80px;
  font-weight: 600;
`

export const Value = styled.span`
  color: var(--np--foreground-color--link);
`

export const Query = styled.span`
  color: var(--np--foreground-color--light);
  font-size: 14px;
`

export const ResponsiveBox = styled(Flex)`
  padding: 24px;
  border-radius: 8px;
  background: var(--np--foreground-color--link);
  color: white;
  font-weight: 600;
  text-align: center;
  font-size: 18px;
`

export const SmallLabel = styled.span`
  display: none;

  ${getBreakpoint("small", true).query} {
    display: inline;
  }
`

export const MediumLabel = styled.span`
  display: none;

  ${getBreakpoint("medium", true).query} {
    display: inline;
  }
`

export const LargeLabel = styled.span`
  display: none;

  ${getBreakpoint("large", true).query} {
    display: inline;
  }
`
