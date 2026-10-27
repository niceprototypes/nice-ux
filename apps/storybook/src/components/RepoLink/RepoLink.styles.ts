import styled from "styled-components"
import { getBreakpoint, getToken, transformColor } from "nice-react-styles"
import Ink from "../../nice/Ink"
import Flex from "nice-react-flex"

/**
 * The link itself — the brand icon plus the package name, recoloring to the
 * link token on hover so it reads as interactive.
 */
export const Anchor = styled.a`
  display: inline-flex;
  align-items: center;
  gap: ${getToken("gap", "small")};
  text-decoration: none;
  color: ${getToken("color", "light")};
  font-family: ${getToken("fontFamily", "code")};
  transition: color ${getToken("animationDuration")}
    ${getToken("animationEasing")};

  &:hover {
    color: ${getToken("color", "link")};
  }

  ${getBreakpoint("laptop+")} {
    font-size: ${getToken("fontSize", "small")};
  }
`

/** The dependency-kind badge (e.g. `peer`) shown after a related repo's name. */
export const StatusPill = styled.span`
  font-family: ${getToken("fontFamily", "code")};
  font-size: ${getToken("fontSize", "small")};
  line-height: 1;
  color: ${getToken("color", "lighter")};
  padding: ${getToken("gap", "smaller")} ${getToken("gap", "small")};
  border: 1px solid ${getToken("borderColor")};
  border-radius: ${getToken("borderRadius", "small")};
  text-transform: lowercase;

  ${getBreakpoint("laptop+")} {
    font-size: ${getToken("fontSize", "smaller")};
  }
`

export const LicenseFlex = styled(Flex)`
  border-radius: ${getToken("borderRadius", "small")};
  border: 1px solid ${getToken("borderColor")};
`

export const LicenseInk = styled(Ink)`
  display: block;
`
