import * as React from "react"
import Flex from "nice-react-flex"
import Icon from "nice-react-icon"
import Ink from "../../nice/Ink"
import styled from "styled-components"
import { getToken } from "nice-styles"

/**
 * A bulletin section — a headline and the points beneath it. Sections stack in
 * display order, each marked by the same icon, so announcing a new change is a
 * new entry in {@link SECTIONS} rather than markup in the MDX page.
 *
 * Items are nodes rather than strings, so a point can set part of itself in
 * code — `<Ink code>` for an API name, for instance.
 */
interface NewsSection {
  title: string
  items: React.ReactNode[]
}

const SECTIONS: NewsSection[] = [
  {
    title: "Tell agents how to tune your colors",
    items: [
      <>
        Any color prop takes a token name or a{" "}
        <Ink
          code
          size="small"
          color="light"
          antialiased
          style={{ fontSize: "0.9em", margin: "0.1em", letterSpacing: "-1%" }}
        >
          {"{ name, transform }"}
        </Ink>{" "}
        object
      </>,
      "Adjust any HSLA channel, using relative or absolute values",
      "The same channel vocabulary works everywhere a color is read or set",
      "AI may now tweak semantic HSLA-based color tokens, instead of inventing new hex colors (always valid, type-checked and theme-correct)",
    ],
  },
  {
    title: "Agents can now access every token and breakpoint from one place",
    items: [
      "Color, spacing, type, component, theme and responsive all in one getter",
      <>
        New companion call{" "}
        <Ink
          code
          size="small"
          color="light"
          antialiased
          style={{ fontSize: "0.9em", margin: "0.1em", letterSpacing: "-1%" }}
        >
          listTokens()
        </Ink>{" "}
        which lists available tokens
      </>,
      "Media query breakpoints are set in the same way as style tokens",
      "Changing a breakpoint updates every media query at once (JS and CSS stay synced)",
    ],
  },
]

const OuterFlex = styled(Flex).attrs({
  direction: "column",
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
    padding-left: calc(${getToken("icon.size:large")} + ${getToken("gap", "large")});
    list-style-type: none;
  }

  li {
    margin: 0;
  }

  hr {
    border-color: ${getToken("borderColor", "success")};
    margin: 0;
  }
`

/** Darkened highlight, shared by the icon and the list markers. */
const NEWS_COLOR = {
  name: "success",
  transform: [null, null, 40, null],
} as const

const MarkerInk = styled(Ink)`
  font-size: 0.5em;
  padding-top: 0.6em;
`

/**
 * The bulletin block at the top of the Welcome page — each section a
 * headline marked by the shared icon, with its points beneath it. Content
 * lives in {@link SECTIONS}.
 */
const LatestNews: React.FC = () => (
  <OuterFlex>
    {SECTIONS.map((section, sectionIndex) => (
      // Static list authored in order, so the index is a stable identity.
      <React.Fragment key={sectionIndex}>
        <Flex
          direction="column"
          gap="base"
          padding="large"
        >
          <Flex
            gap="large"
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
              {section.title}
            </Ink>
          </Flex>

          <Flex>
            <ul>
              {section.items.map((item, index) => (
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
                      color="light"
                    >
                      {item}
                    </Ink>
                  </Flex>
                </li>
              ))}
            </ul>
          </Flex>
        </Flex>
        {sectionIndex < SECTIONS.length - 1 && <hr />}
      </React.Fragment>
    ))}
  </OuterFlex>
)

export default LatestNews
