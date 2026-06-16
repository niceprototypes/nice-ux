import * as React from "react"
import { getToken } from "nice-react-styles"
import Flex from "nice-react-flex"
import Typography from "../../src/nice/Typography"
import DemoDots from "../../src/components/DemoDots"
import { StoryHeader } from "../../src/components/Story"
import { TokensCodeTable } from "./TokensCodeTable"
import type { TokenVariant } from "./TokensCodeTable"

const loremIpsum =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore."

export interface TokenTable {
  /** camelCase token group — the table's name column and the story title. */
  name: string
  /** Prose shown above the table on the standalone story page. */
  description: React.ReactNode
  /** Variant names, or objects with a `variant` key plus preview data. */
  variants: ReadonlyArray<TokenVariant>
  /** Returns the bespoke preview cell for a row, given its variant item. */
  preview: (item: any) => React.ReactNode
}

/**
 * Single source of truth for every token table. Both the Tokens/Docs page and
 * each standalone Tokens/<group> story render from these configs, so the two
 * never drift. Order here is the order tables appear on the Docs page.
 */
export const tokenTables = {
  animationDuration: {
    name: "animationDuration",
    description: "Timing values for CSS transitions and animations.",
    variants: [
      { variant: "base", backgroundColor: getToken("color", "error") },
      { variant: "slow", backgroundColor: getToken("color", "warning") },
    ],
    preview: ({ variant, backgroundColor }) => {
      const animationName = variant === "base" ? "slide" : "slideSlow"
      return (
        <Flex
          style={{
            width: "120px",
            backgroundColor: getToken("backgroundColor", "dark"),
            borderRadius: `calc(${getToken("cellHeight", "smaller")} / 2)`,
          }}
        >
          <Flex
            style={{
              backgroundColor,
              width: getToken("cellHeight", "smaller"),
              height: getToken("cellHeight", "smaller"),
              borderRadius: `calc(${getToken("cellHeight", "smaller")} / 2)`,
              animation: `${animationName} calc(${getToken("animationDuration", variant)} * 6) ${getToken("animationEasing")} infinite`,
              animationDelay: variant === "base" ? getToken("animationDuration", variant) : 0,
            }}
          />
        </Flex>
      )
    },
  },

  animationEasing: {
    name: "animationEasing",
    description: "Easing curves for CSS transitions and animations.",
    variants: [
      { variant: "base", path: "M 1 23 C 25.78 23, 35.22 1, 60 1" },
      { variant: "linear", path: "M 1 23 C 1 23, 60 1, 60 1" },
      { variant: "ease-in", path: "M 1 23 C 25.78 23, 60 1, 60 1" },
      { variant: "ease-out", path: "M 1 23 C 1 23, 35.22 1, 60 1" },
      { variant: "ease", path: "M 1 23 C 15.75 20.8, 15.75 1, 60 1" },
    ],
    preview: ({ path }) => (
      <Flex
        style={{
          backgroundColor: getToken("backgroundColor", "dark"),
          padding: getToken("gap"),
          borderRadius: getToken("borderRadius"),
        }}
      >
        <svg
          width="60"
          height="24"
          viewBox="0 0 60 24"
        >
          <path
            d={path}
            fill="none"
            stroke={getToken("color", "lighter")}
            strokeWidth={getToken("borderWidth", "large")}
            strokeLinecap="round"
          />
        </svg>
      </Flex>
    ),
  },

  backgroundColor: {
    name: "backgroundColor",
    description: "Surface color tokens for page and container backgrounds.",
    variants: ["base", "dark"],
    preview: (variant) => (
      <Flex
        style={{
          backgroundColor: getToken("backgroundColor", variant),
          width: getToken("cellHeight", "large"),
          height: getToken("cellHeight", "large"),
          border: `${getToken("borderWidth")} solid ${getToken("borderColor")}`,
          borderRadius: getToken("borderRadius"),
        }}
      />
    ),
  },

  borderColor: {
    name: "borderColor",
    description: "Stroke color tokens for outlines and dividers.",
    variants: ["base", "dark", "darker"],
    preview: (variant) => (
      <Flex
        style={{
          backgroundColor: getToken("backgroundColor"),
          width: getToken("cellHeight", "large"),
          height: getToken("cellHeight", "large"),
          border: `${getToken("borderWidth")} solid ${getToken("borderColor", variant)}`,
          borderRadius: getToken("borderRadius"),
        }}
      />
    ),
  },

  borderRadius: {
    name: "borderRadius",
    description: (
      <>
        Corner rounding tokens from <code>smaller</code> to <code>larger</code>.
      </>
    ),
    variants: ["smaller", "small", "base", "large", "larger"],
    preview: (variant) => (
      <Flex
        style={{
          borderRadius: getToken("borderRadius", variant),
          width: getToken("cellHeight", "large"),
          height: getToken("cellHeight", "large"),
          border: `${getToken("borderWidth")} solid ${getToken("color", "light")}`,
        }}
      />
    ),
  },

  borderWidth: {
    name: "borderWidth",
    description: "Stroke thickness tokens for borders and dividers.",
    variants: ["small", "base", "large"],
    preview: (variant) => (
      <Flex
        style={{
          width: getToken("cellHeight", "large"),
          height: getToken("cellHeight", "large"),
          border: `${getToken("borderWidth", variant)} solid ${getToken("color", "light")}`,
          borderRadius: getToken("borderRadius"),
        }}
      />
    ),
  },

  boxShadow: {
    name: "boxShadow",
    description: "Elevation tokens for cards and floating surfaces.",
    variants: ["base", "large"],
    preview: (variant) => (
      <Flex
        spacing="large"
        style={{
          backgroundColor: getToken("backgroundColor", "dark"),
          borderRadius: `calc(${getToken("cellHeight", "smaller")} / 2)`,
        }}
      >
        <Flex
          style={{
            backgroundColor: getToken("backgroundColor"),
            width: getToken("cellHeight", "large"),
            height: getToken("cellHeight", "large"),
            borderRadius: getToken("borderRadius"),
            boxShadow: getToken("boxShadow", variant),
          }}
        />
      </Flex>
    ),
  },

  cellHeight: {
    name: "cellHeight",
    description: "Vertical rhythm tokens for controls, buttons, and row heights.",
    variants: ["smaller", "small", "base", "large", "larger"],
    preview: (variant) => (
      <Flex
        style={{
          width: getToken("cellHeight", "large"),
          height: getToken("cellHeight", variant),
          border: `${getToken("borderWidth")} solid ${getToken("color", "light")}`,
          borderRadius: getToken("borderRadius"),
        }}
      />
    ),
  },

  fontFamily: {
    name: "fontFamily",
    description: "Typeface tokens for headings, body text, and monospace code.",
    variants: [
      { variant: "heading", weight: "bold", text: "Heading" },
      { variant: "base", text: "Body" },
      { variant: "code", code: true, text: "Code" },
    ],
    preview: ({ weight, code, text }) => (
      <Typography
        weight={weight}
        code={code}
      >
        {text}
      </Typography>
    ),
  },

  fontSize: {
    name: "fontSize",
    description: (
      <>
        Text scale tokens from <code>smaller</code> to <code>larger</code>.
        Responsive by default — values change at the laptop breakpoint.
      </>
    ),
    variants: ["smaller", "small", "base", "large", "larger"],
    preview: (variant) => (
      <Typography size={variant}>
        {variant.charAt(0).toUpperCase() + variant.slice(1)}
      </Typography>
    ),
  },

  fontWeight: {
    name: "fontWeight",
    description: (
      <>
        Font thickness tokens from <code>light</code> (300) to <code>black</code> (900).
      </>
    ),
    variants: ["light", "base", "medium", "semibold", "bold", "extrabold", "black"],
    preview: (variant) => (
      <Typography weight={variant}>
        {variant.charAt(0).toUpperCase() + variant.slice(1)}
      </Typography>
    ),
  },

  color: {
    name: "color",
    description: (
      <>
        Text and icon color tokens, including semantic states (<code>success</code>,{" "}
        <code>warning</code>, <code>error</code>).
      </>
    ),
    variants: ["lightest", "lighter", "light", "base", "disabled", "link", "success", "warning", "error"],
    preview: (variant) => (
      <Flex
        style={{
          width: getToken("cellHeight", "smaller"),
          height: getToken("cellHeight", "smaller"),
          backgroundColor: getToken("color", variant),
          borderRadius: "50%",
        }}
      />
    ),
  },

  gap: {
    name: "gap",
    description: "Spacing tokens for flex/grid gaps and margins between items.",
    variants: ["smaller", "small", "base", "large", "larger"],
    preview: (variant) => (
      <DemoDots
        gap={variant}
        dots={[
          {
            color: getToken("color", "error"),
            width: getToken("cellHeight", "smaller"),
            height: getToken("cellHeight", "smaller"),
          },
          {
            color: getToken("color", "link"),
            width: getToken("cellHeight", "smaller"),
            height: getToken("cellHeight", "smaller"),
          },
        ]}
      />
    ),
  },

  lineHeight: {
    name: "lineHeight",
    description: (
      <>
        Vertical spacing tokens between lines of text — <code>condensed</code>,{" "}
        <code>base</code>, <code>expanded</code>.
      </>
    ),
    variants: ["condensed", "base", "expanded"],
    preview: (variant) => (
      <Typography lineHeight={variant}>{loremIpsum}</Typography>
    ),
  },
} satisfies Record<string, TokenTable>

/** Tables in Docs-page order. */
export const tokenTableList: TokenTable[] = Object.values(tokenTables)

/**
 * Renders one token group as a standalone story — the story header, its
 * description, and the shared TokensCodeTable. Driven by the same config as the
 * Docs page, so a story and its Docs row can never disagree.
 */
export const TokenStory = ({ name }: { name: keyof typeof tokenTables }) => {
  const { description, ...table } = tokenTables[name]
  return (
    <>
      <StoryHeader title={table.name} />
      <Typography>{description}</Typography>
      <TokensCodeTable {...table} />
    </>
  )
}
