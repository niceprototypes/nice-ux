import * as React from "react"
import styled from "styled-components"
import { getToken } from "nice-react-styles"
import Typography from "../../src/nice/Typography"

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${getToken("gap", "small").var};
  padding: ${getToken("gap", "large").var};
  background: ${getToken("backgroundColor", "alternate").var};
  border: 1px solid ${getToken("borderColor").var};
  border-radius: ${getToken("borderRadius", "base").var};
`

const Kicker = styled(Typography).attrs({ size: "smaller", weight: "bold" })`
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${getToken("foregroundColor", "medium").var};
`

const Byline = styled(Typography).attrs({ size: "smaller" })`
  color: ${getToken("foregroundColor", "lighter").var};
`

export const ArticleWidget: React.FC = () => (
  <Card>
    <Kicker>Design</Kicker>
    <Typography as="h2" size="larger" weight="bold" color="base">
      How to build a token system
    </Typography>
    <Typography size="base" color="light">
      A walkthrough of the patterns that hold a UI together when small visual
      decisions need to scale across an entire system.
    </Typography>
    <Byline>Matt Stevens · 5 min read</Byline>
  </Card>
)

// Override a handful of core tokens for the "after" subtree only.
// CSS custom properties cascade — every descendant that resolves these
// variables picks up the new value without re-rendering.
export const overrideStyle = {
  "--np--font-size--larger": "32px",
  "--np--foreground-color--base": "#1a1a1a",
  "--np--foreground-color--medium": "#dc2626",
  "--np--background-color--alternate": "#fef3c7",
  "--np--border-radius--base": "0px",
  "--np--border-color--base": "#1a1a1a",
} as React.CSSProperties
