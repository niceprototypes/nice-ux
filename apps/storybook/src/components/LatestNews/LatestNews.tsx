import * as React from "react"
import Flex from "@niceprototypes/flex"
import Icon from "@niceprototypes/icon"
import Ink from "../../nice/Ink"
import styled from "styled-components"
import { getToken } from "@niceprototypes/styles"
import Line from "../Line"

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
  /**
   * When the item was actually added (a fixed real date, ms since epoch) — not an
   * offset from now, so the "X ago" stamp below the title grows as time passes.
   */
  date: number
  items: React.ReactNode[]
}

const HOUR_MS = 60 * 60 * 1000
const DAY_MS = 24 * HOUR_MS

/** Relative "X ago" label for a past timestamp, measured against `Date.now()`. */
function timeAgo(timestamp: number): string {
  const elapsed = Date.now() - timestamp
  const hours = Math.round(elapsed / HOUR_MS)
  if (hours < 1) return "just now"
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`
  const days = Math.round(elapsed / DAY_MS)
  return `${days} day${days === 1 ? "" : "s"} ago`
}

const SECTIONS: NewsSection[] = [
  {
    title: "Manifest is now public and ready for teams to use",
    // Added 2026-09-22 — the manifest published for public use.
    date: new Date("2026-09-22T18:41:00-04:00").getTime(),
    items: [
      "One shared rulebook every AI assistant follows. Work stays consistent, no guessing.",
      "Predictable, repeatable results across the product. Less backtracking, fewer surprises.",
      "Onboard teammates and agents. Get up to speed quickly with minimal effort.",
      "Accessible and readable. Partners, managers, and new hires can get informed quick.",
    ],
  },
  {
    title: "You can now have agents tune your colors quickly and safely",
    // Added 2026-09-16 in 994b2cc ("add colors section").
    date: new Date("2026-09-16T17:48:00-04:00").getTime(),
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
  /*
   * Commented out 2026-09-22 — the earliest item, rolled off as newer news was added above.
  {
    title: "Agents can now access every token and breakpoint from one place",
    // The panel's original item, added 2026-09-16 in 07ec01c.
    date: new Date("2026-09-16T17:33:00-04:00").getTime(),
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
  */
]

const OuterFlex = styled(Flex).attrs({
  direction: "column",
})`
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

const TimestampInk = styled(Ink)`
  padding-top: 0.1em;
`

/** Wrapper that vertically centers a list marker icon against the first text line. */
const MarkerFlex = styled(Flex).attrs({
  alignItems: "center",
})`
  height: ${getToken("size", "smaller")};
  transform: translateY(-0.1em);
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
                    <MarkerFlex>
                      <Icon
                        name="plus"
                        size="smaller"
                        strokeScaling
                        color={NEWS_COLOR}
                      />
                    </MarkerFlex>
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
        {sectionIndex < SECTIONS.length - 1 && <Line />}
      </React.Fragment>
    ))}
  </OuterFlex>
)

export default LatestNews
