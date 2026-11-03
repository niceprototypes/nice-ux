// Card example configs — one ComponentExample per facet, shaped like Toggle's. ComponentDocs renders each
// entry as a section of the Card docs page, sorted by name.
import { useState } from "react"
import { Card, CardBody, CardFooter, CardHeader } from "@niceprototypes/card"
import Button from "@niceprototypes/button"
import Flex from "@niceprototypes/flex"
import Ink from "@niceprototypes/ink"
import { Theme, getToken } from "@niceprototypes/styles"
import type { ComponentExample } from "../../dataTables/components/demos/Components"

/** A button card that toggles its own `selected` state, starting at `initial`. */
const SelectableCard = ({ initial }: { initial: boolean }) => {
  const [selected, setSelected] = useState(initial)
  return (
    <Card
      selected={selected}
      onClick={() => setSelected(!selected)}
    >
      <CardHeader title="Pro" description={selected ? "Selected" : "Not selected"} />
    </Card>
  )
}

/** Shows the event onClick receives. */
const ReportingCard = () => {
  const [last, setLast] = useState<string | null>(null)
  return (
    <Card onClick={event => setLast(`onClick(${event.type})`)}>
      <CardHeader title="Plan" description={last ?? "Click the card"} />
    </Card>
  )
}

export const cardChildren = {
  name: "children",
  description: "The card's content, stacked in a column: CardHeader, CardBody, CardFooter, or any nodes.",
  variants: ["header", "header + body + footer", "any nodes"],
  default: "header + body + footer",
  preview: variant =>
    variant === "header" ? (
      <Card>
        <CardHeader title="Plan" description="Billed monthly." />
      </Card>
    ) : variant === "any nodes" ? (
      <Card>
        <Ink>Plan</Ink>
        <Ink color="light">Billed monthly.</Ink>
      </Card>
    ) : (
      <Card>
        <CardHeader title="Plan" description="Billed monthly." />
        <CardBody>
          <Ink>Unlimited projects.</Ink>
        </CardBody>
        <CardFooter>
          <Button>Cancel</Button>
          <Button filled>Upgrade</Button>
        </CardFooter>
      </Card>
    ),
  code: variant =>
    variant === "header"
      ? `<Card>\n  <CardHeader title="Plan" description="Billed monthly." />\n</Card>`
      : variant === "any nodes"
        ? `<Card>\n  <Ink>Plan</Ink>\n  <Ink color="light">Billed monthly.</Ink>\n</Card>`
        : `<Card>\n  <CardHeader title="Plan" description="Billed monthly." />\n  <CardBody>\n    <Ink>Unlimited projects.</Ink>\n  </CardBody>\n  <CardFooter>\n    <Button>Cancel</Button>\n    <Button filled>Upgrade</Button>\n  </CardFooter>\n</Card>`,
} satisfies ComponentExample

export const cardVariant = {
  name: "variant",
  description: "Surface style: a border, a shadow, or a raised background.",
  variants: ["outline", "elevated", "filled"],
  default: "outline",
  preview: variant => (
    <Card variant={variant}>
      <CardHeader title="Plan" description="Billed monthly." />
    </Card>
  ),
  code: variant =>
    variant === "outline"
      ? `<Card>\n  <CardHeader title="Plan" description="Billed monthly." />\n</Card>`
      : `<Card variant="${variant}">\n  <CardHeader title="Plan" description="Billed monthly." />\n</Card>`,
} satisfies ComponentExample

export const cardPadding = {
  name: "padding",
  description: "Inner padding as a shorthand of 1–4 gap tokens. Unset, the card.padding token.",
  variants: ["unset", "none", "smaller", "small", "base", "large", "larger", "small large"],
  default: "unset",
  preview: variant => (
    <Card padding={variant === "unset" ? undefined : variant}>
      <CardHeader title="Plan" description="Billed monthly." />
    </Card>
  ),
  code: variant =>
    variant === "unset"
      ? `<Card>\n  <CardHeader title="Plan" description="Billed monthly." />\n</Card>`
      : `<Card padding="${variant}">\n  <CardHeader title="Plan" description="Billed monthly." />\n</Card>`,
} satisfies ComponentExample

export const cardGap = {
  name: "gap",
  description: "Space between the card's children, from the gap tokens. Unset, the card.gap token.",
  variants: ["unset", "none", "smaller", "small", "base", "large", "larger"],
  default: "unset",
  preview: variant => (
    <Card gap={variant === "unset" ? undefined : variant}>
      <CardHeader title="Plan" />
      <CardBody>
        <Ink>Unlimited projects.</Ink>
      </CardBody>
    </Card>
  ),
  code: variant =>
    `<Card${variant === "unset" ? "" : ` gap="${variant}"`}>\n  <CardHeader title="Plan" />\n  <CardBody>\n    <Ink>Unlimited projects.</Ink>\n  </CardBody>\n</Card>`,
} satisfies ComponentExample

export const cardBorderRadius = {
  name: "borderRadius",
  description: "Corner radius, from the core borderRadius tokens. Unset, the card.borderRadius token.",
  variants: ["unset", "none", "smaller", "small", "base", "large", "larger"],
  default: "unset",
  preview: variant => (
    <Card borderRadius={variant === "unset" ? undefined : variant}>
      <CardHeader title="Plan" description="Billed monthly." />
    </Card>
  ),
  code: variant =>
    variant === "unset"
      ? `<Card>\n  <CardHeader title="Plan" description="Billed monthly." />\n</Card>`
      : `<Card borderRadius="${variant}">\n  <CardHeader title="Plan" description="Billed monthly." />\n</Card>`,
} satisfies ComponentExample

export const cardBackgroundColor = {
  name: "backgroundColor",
  description: "Surface fill, from the card.backgroundColor tokens. Unset, base (raised for filled).",
  variants: ["base", "raised", "success", "highlight", "warning", "error", "link"],
  default: "base",
  preview: variant => (
    <Card backgroundColor={variant}>
      <CardHeader title="Plan" description="Billed monthly." />
    </Card>
  ),
  code: variant =>
    variant === "base"
      ? `<Card>\n  <CardHeader title="Plan" description="Billed monthly." />\n</Card>`
      : `<Card backgroundColor="${variant}">\n  <CardHeader title="Plan" description="Billed monthly." />\n</Card>`,
} satisfies ComponentExample

export const cardOnClick = {
  name: "onClick",
  description:
    "Click handler. The card renders as a native button (Enter and Space activate it); it must not contain other interactive elements.",
  variants: ["handler"],
  default: "handler",
  preview: () => <ReportingCard />,
  code: () =>
    `<Card onClick={event => setLast(\`onClick(\${event.type})\`)}>\n  <CardHeader title="Plan" description={last} />\n</Card>`,
} satisfies ComponentExample

export const cardHref = {
  name: "href",
  description: "Link target. The card renders as a native link; it takes precedence over onClick's button.",
  variants: ["#tokens"],
  default: "#tokens",
  preview: variant => (
    <Card href={variant}>
      <CardHeader title="Tokens" description="Opens this page's Tokens section." />
    </Card>
  ),
  code: variant => `<Card href="${variant}">\n  <CardHeader title="Tokens" description="Opens this page's Tokens section." />\n</Card>`,
} satisfies ComponentExample

export const cardSelected = {
  name: "selected",
  description:
    "Selected state: the card.borderColor selected token. On a button card it sets aria-pressed, making a toggle button. Click to toggle.",
  variants: ["false", "true"],
  default: "false",
  preview: variant => <SelectableCard initial={variant === "true"} />,
  code: variant =>
    `const [selected, setSelected] = useState(${variant})\n\n<Card selected={selected} onClick={() => setSelected(!selected)}>\n  <CardHeader title="Pro" />\n</Card>`,
} satisfies ComponentExample

export const cardDisabled = {
  name: "disabled",
  description:
    "Disables a button card (native disabled) or a link card (aria-disabled, no navigation), drawn at the card.disabledOpacity token.",
  variants: ["false", "true"],
  default: "false",
  preview: variant => (
    <Card
      onClick={() => {}}
      disabled={variant === "true"}
    >
      <CardHeader title="Plan" description="Billed monthly." />
    </Card>
  ),
  code: variant =>
    `<Card onClick={choose}${variant === "true" ? " disabled" : ""}>\n  <CardHeader title="Plan" description="Billed monthly." />\n</Card>`,
} satisfies ComponentExample

export const cardTheme = {
  name: "theme",
  description: "Pins token resolution to a theme. Each preview sits on its theme's base background.",
  variants: ["day", "night"],
  default: "day",
  preview: variant => (
    <Theme name={variant}>
      <Flex
        padding="small"
        style={{ backgroundColor: getToken("backgroundColor", "base") }}
      >
        <Card theme={variant}>
          <CardHeader title="Plan" description="Billed monthly." />
        </Card>
      </Flex>
    </Theme>
  ),
  code: variant => `<Card theme="${variant}">\n  <CardHeader title="Plan" description="Billed monthly." />\n</Card>`,
} satisfies ComponentExample

/** Every Card example facet — each one a section of the Card docs page. */
export const cardExamples = {
  children: cardChildren,
  variant: cardVariant,
  padding: cardPadding,
  gap: cardGap,
  borderRadius: cardBorderRadius,
  backgroundColor: cardBackgroundColor,
  onClick: cardOnClick,
  href: cardHref,
  selected: cardSelected,
  disabled: cardDisabled,
  theme: cardTheme,
} satisfies Record<string, ComponentExample>
