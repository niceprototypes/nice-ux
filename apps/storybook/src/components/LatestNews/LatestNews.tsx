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
    title: "Any color can be tuned per channel from a prop",
    items: [
      <>
        Any color prop takes a token name or a{" "}
        <Ink
          code
          size="small"
          color="light"
          antialiased
        >
          {"{ name, transform }"}
        </Ink>{" "}
        object
      </>,
      <>
        <Ink
          code
          size="small"
          color="light"
          antialiased
        >
          transform
        </Ink>{" "}
        adjusts hue, saturation, lightness and alpha per channel — relative
        (+10, -0.15) or absolute
      </>,
      <>
        The same channel vocabulary works in{" "}
        <Ink
          code
          size="small"
          color="light"
          antialiased
        >
          getToken
        </Ink>
        ,{" "}
        <Ink
          code
          size="small"
          color="light"
          antialiased
        >
          transformColor
        </Ink>{" "}
        and every color prop
      </>,
      "AI tunes a semantic token instead of inventing a hex, so colors stay valid, type-checked and theme-correct",
    ],
  },
  {
    title: "Every design token now reads through one getter",
    items: [
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
    ],
  },
]

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
      </React.Fragment>
    ))}
  </OuterFlex>
)

export default LatestNews
