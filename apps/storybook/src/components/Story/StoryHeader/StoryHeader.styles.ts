import styled from "styled-components"
import Flex from "nice-react-flex"
import { getToken } from "nice-react-styles"

/**
 * Story header column — wraps the title, optional description, and any children
 * in a vertical Flex so the header stacks as one styled block, closed by a rule.
 */
export const HeaderFlex = styled(Flex).attrs({
  direction: "column",
})`
  margin-bottom: ${getToken("gap", "larger")} !important;
  border-bottom: 1px solid ${getToken("borderColor")};
`

/**
 * A single repo link — the brand icon plus the package name, recoloring to the
 * link token on hover so it reads as interactive.
 */
export const RepoLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: ${getToken("gap", "small")};
  text-decoration: none;
  color: ${getToken("color", "light")};
  font-family: ${getToken("fontFamily", "code")};
  font-size: ${getToken("fontSize", "small")};
  transition: color ${getToken("animationDuration")} ${getToken("animationEasing")};

  &:hover {
    color: ${getToken("color", "link")};
  }
`

/** The dependency-kind badge (e.g. `peer`) shown after a related repo's name. */
export const StatusPill = styled.span`
  font-family: ${getToken("fontFamily", "code")};
  font-size: ${getToken("fontSize", "smaller")};
  line-height: 1;
  color: ${getToken("color", "lighter")};
  padding: ${getToken("gap", "smaller")} ${getToken("gap", "small")};
  border: 1px solid ${getToken("borderColor")};
  border-radius: ${getToken("borderRadius", "small")};
  text-transform: lowercase;
`

/** The SPDX license label (e.g. `MIT`) shown after a repo's name — muted, plain. */
export const LicenseTag = styled.span`
  font-family: ${getToken("fontFamily", "code")};
  font-size: ${getToken("fontSize", "smaller")};
  line-height: 1;
  color: ${getToken("color", "lighter")};
`
