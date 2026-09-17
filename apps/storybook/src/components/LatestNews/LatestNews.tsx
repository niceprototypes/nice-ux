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
  /** Publish time (ms since epoch); rendered as a relative "X ago" stamp under the title. */
  date: number
  items: React.ReactNode[]
}

const HOUR_MS = 60 * 60 * 1000
const DAY_MS = 24 * HOUR_MS

/** Relative "X ago" label for a past timestamp, measured against `Date.now()`. */
function timeAgo(timestamp: number): string {
  const elapsed = Date.now() - timestamp
  const hours = Math.round(elapsed / HOUR_MS)
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`
  const days = Math.round(elapsed / DAY_MS)
  return `${days} day${days === 1 ? "" : "s"} ago`
}

const SECTIONS: NewsSection[] = [
  {
    title: "You can now have agents tune your colors quickly and safely",
    date: Date.now() - 11 * HOUR_MS,
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
    date: Date.now() - 3 * DAY_MS,
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
    padding-left: calc(
      ${getToken("icon.size:larger")} + ${getToken("gap", "large")}
    );
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

const TimestampInk = styled(Ink)`
  padding-top: 0.1em;
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
          >
            <Icon
              name="nice-heart"
              size="larger"
              color={NEWS_COLOR}
            />
            <Flex
              grow={1}
              direction="column"
            >
              <Ink
                as="h3"
                weight="medium"
                color={NEWS_COLOR}
              >
                {section.title}
              </Ink>
              <TimestampInk
                size="smaller"
                lineHeight="condensed"
                color={NEWS_COLOR}
              >
                {timeAgo(section.date)}
              </TimestampInk>
            </Flex>
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
