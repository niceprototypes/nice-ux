// StickySectionLinks example configs — one ComponentExample per prop, shaped like Toggle's. Each
// preview is the links above a bounded scrolling box holding the sections they point at.
import type * as React from "react"
import { StickySection, StickySectionLinks } from "@niceprototypes/scroll"
import type { StickySectionLink, StickySectionLinksProps } from "@niceprototypes/scroll"
import Button from "@niceprototypes/button"
import Flex from "@niceprototypes/flex"
import Ink from "@niceprototypes/ink"
import type { ComponentExample } from "../../dataTables/components/demos/Components"
import ScrollBox, { SCROLL_BOX_HEIGHT } from "../Sticky/ScrollBox"

const LABELS = ["About", "Services", "Contact"]

/** Links to this preview's own sections: ids are unique on the docs page. */
const getLinks = (scope: string, count = LABELS.length): StickySectionLink[] =>
  LABELS.slice(0, count).map(label => ({ href: `#sectionlinks-${scope}-${label.toLowerCase()}`, label }))

/** The links, then the box of sections they point at, one box-height each. */
const Preview = (props: StickySectionLinksProps) => (
  <Flex
    direction="column"
    gap="small"
  >
    <StickySectionLinks {...props} />
    <ScrollBox>
      {props.links.map(link => (
        <StickySection
          key={link.href}
          id={link.href.slice(1)}
          style={{ blockSize: SCROLL_BOX_HEIGHT }}
        >
          <Flex padding="small">
            <Ink as="h3">{link.label}</Ink>
          </Flex>
        </StickySection>
      ))}
    </ScrollBox>
  </Flex>
)

/** A link drawn as a Button, filled while its section is active. */
const renderButtonLink = (link: StickySectionLink, isActive: boolean) => (
  <Button
    as="div"
    filled={isActive}
  >
    {link.label}
  </Button>
)

/** The links inside a nav landmark, spaced by a gap token. */
const renderNavWrapper = (children: React.ReactNode) => (
  <Flex
    as="nav"
    gap="small"
  >
    {children}
  </Flex>
)

const LINKS_CODE = `links={[\n    { href: "#about", label: "About" },\n    { href: "#services", label: "Services" },\n  ]}`

export const sectionLinksLinks = {
  name: "links",
  description:
    "The links, each an href to a section id and a label. The active link follows the section in the upper half of the viewport; a click scrolls the window to its section.",
  variants: ["2", "3"],
  default: "3",
  preview: variant => <Preview links={getLinks(`links-${variant}`, Number(variant))} />,
  code: variant =>
    `<StickySectionLinks\n  links={[\n${LABELS.slice(0, Number(variant))
      .map(label => `    { href: "#${label.toLowerCase()}", label: "${label}" },`)
      .join("\n")}\n  ]}\n/>`,
} satisfies ComponentExample

export const sectionLinksRenderLink = {
  name: "renderLink",
  description:
    "Renders each link's content inside its anchor, with whether its section is active. Here a Button, filled while active.",
  variants: ["none", "Button"],
  default: "none",
  preview: variant => (
    <Preview
      links={getLinks(`renderlink-${variant}`)}
      renderLink={variant === "Button" ? renderButtonLink : undefined}
    />
  ),
  code: variant =>
    variant === "Button"
      ? `<StickySectionLinks\n  ${LINKS_CODE}\n  renderLink={(link, isActive) => (\n    <Button as="div" filled={isActive}>{link.label}</Button>\n  )}\n/>`
      : `<StickySectionLinks\n  ${LINKS_CODE}\n/>`,
} satisfies ComponentExample

export const sectionLinksRenderWrapper = {
  name: "renderWrapper",
  description: "Replaces the flex row around the links. Here a nav landmark with a gap between links.",
  variants: ["none", "nav"],
  default: "none",
  preview: variant => (
    <Preview
      links={getLinks(`renderwrapper-${variant}`)}
      renderWrapper={variant === "nav" ? renderNavWrapper : undefined}
    />
  ),
  code: variant =>
    variant === "nav"
      ? `<StickySectionLinks\n  ${LINKS_CODE}\n  renderWrapper={children => (\n    <Flex as="nav" gap="small">{children}</Flex>\n  )}\n/>`
      : `<StickySectionLinks\n  ${LINKS_CODE}\n/>`,
} satisfies ComponentExample

/** Every StickySectionLinks example facet — each one a section of the SectionLinks docs page. */
export const sectionLinksExamples = {
  links: sectionLinksLinks,
  renderLink: sectionLinksRenderLink,
  renderWrapper: sectionLinksRenderWrapper,
} satisfies Record<string, ComponentExample>
