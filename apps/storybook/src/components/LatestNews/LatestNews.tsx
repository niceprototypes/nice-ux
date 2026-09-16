import * as React from "react"
import Flex from "nice-react-flex"
import Icon from "nice-react-icon"
import Ink from "../../nice/Ink"
import styled from "styled-components"
import { getToken } from "nice-styles"

/** Headline shown beside the lightning icon. */
const HEADLINE = "Every design token now reads through one getter"

/**
 * Bulletin points under the headline, in display order.
 *
 * Nodes rather than strings, so a point can set part of itself in code —
 * `<Ink code>` for an API name, for instance.
 */
const ITEMS: React.ReactNode[] = [
  "Color, spacing, type, component, theme and responsive all in one getter",
  <>
    New companion call{" "}
    <Ink
      code
      size="small"
      color="light"
      antialiased
    >
      listTokens()
    </Ink>{" "}
    which lists available tokens
  </>,
  "Media query breakpoints are set in the same way as style tokens",
  "Changing a breakpoint updates every media query at once (JS and CSS stay synced)",
]

/**
 * The bulletin block at the top of the Welcome page — a lightning-marked
 * headline and the points beneath it.
 *
 * Content lives in {@link HEADLINE} and {@link ITEMS}, so announcing the next
 * change is an edit here rather than markup in the MDX page.
 */
const OuterFlex = styled(Flex).attrs({
  direction: "column",
  gap: "base",
  padding: "large",
})`
  max-width: ${getToken("contentMaxWidth")};
  background-color: ${getToken("backgroundColor", "success")};
  border: 1px solid ${getToken("borderColor", "success")};
  border-radius: ${getToken("borderRadius")};

  ul {
    display: flex;
    flex-direction: column;
    gap: ${getToken("gap", "small")};
    margin: 0;
    padding-left: calc(${getToken("icon.size:large")} + ${getToken("gap")});
    list-style-type: none;
  }

  li {
    margin: 0;
  }
`

/** Darkened highlight, shared by the lightning icon and the list markers. */
const NEWS_COLOR = {
  name: "success",
  transform: [null, null, 40, null],
} as const

const MarkerInk = styled(Ink)`
  font-size: 0.5em;
  padding-top: 0.6em;
`

const LatestNews: React.FC = () => (
  <OuterFlex>
    <Flex
      gap="base"
      alignItems="center"
    >
      <Icon
        name="nice-heart"
        size="large"
        color={NEWS_COLOR}
      />
      <Ink
        as="h3"
        weight="medium"
        color={NEWS_COLOR}
      >
        {HEADLINE}
      </Ink>
    </Flex>

    <Flex>
      <ul>
        {ITEMS.map((item, index) => (
          // A node cannot be a key, and the list is static, so the index is the identity
          <li key={index}>
            <Flex gap="small">
              <MarkerInk
                weight="black"
                color={NEWS_COLOR}
              >
                □
              </MarkerInk>
              <Ink
                size="small"
                weight="medium"
                color="light"
                antialiased
              >
                {item}
              </Ink>
            </Flex>
          </li>
        ))}
      </ul>
    </Flex>
  </OuterFlex>
)

export default LatestNews
