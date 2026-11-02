// CardHeader example configs — one ComponentExample per facet, shaped like Toggle's. ComponentDocs renders
// each entry as a section of the CardHeader docs page, sorted by name.
import { Card, CardHeader } from "@niceprototypes/card"
import Button from "@niceprototypes/button"
import Ink from "@niceprototypes/ink"
import type { ComponentExample } from "../../dataTables/components/demos/Components"

export const cardHeaderTitle = {
  name: "title",
  description: "Title, rendered in a semibold h3 Ink.",
  variants: ["Plan"],
  default: "Plan",
  preview: variant => (
    <Card>
      <CardHeader title={variant} />
    </Card>
  ),
  code: variant => `<Card>\n  <CardHeader title="${variant}" />\n</Card>`,
} satisfies ComponentExample

export const cardHeaderDescription = {
  name: "description",
  description: "Description under the title, in a light Ink.",
  variants: ["none", "Billed monthly."],
  default: "none",
  preview: variant => (
    <Card>
      <CardHeader
        title="Plan"
        description={variant === "none" ? undefined : variant}
      />
    </Card>
  ),
  code: variant =>
    variant === "none"
      ? `<Card>\n  <CardHeader title="Plan" />\n</Card>`
      : `<Card>\n  <CardHeader title="Plan" description="${variant}" />\n</Card>`,
} satisfies ComponentExample

export const cardHeaderTitleProps = {
  name: "titleProps",
  description: "Ink props spread over the title's defaults, e.g. the heading level, size or color.",
  variants: ["none", "as h2", "size + color"],
  default: "none",
  preview: variant => (
    <Card>
      <CardHeader
        title="Plan"
        description="Billed monthly."
        titleProps={variant === "as h2" ? { as: "h2" } : variant === "size + color" ? { size: "larger", color: "link" } : undefined}
      />
    </Card>
  ),
  code: variant =>
    variant === "none"
      ? `<Card>\n  <CardHeader title="Plan" description="Billed monthly." />\n</Card>`
      : `<Card>\n  <CardHeader\n    title="Plan"\n    description="Billed monthly."\n    titleProps={${variant === "as h2" ? `{ as: "h2" }` : `{ size: "larger", color: "link" }`}}\n  />\n</Card>`,
} satisfies ComponentExample

export const cardHeaderDescriptionProps = {
  name: "descriptionProps",
  description: "Ink props spread over the description's defaults, e.g. color or italic.",
  variants: ["none", "color + italic"],
  default: "none",
  preview: variant => (
    <Card>
      <CardHeader
        title="Plan"
        description="Billed monthly."
        descriptionProps={variant === "none" ? undefined : { color: "lighter", italic: true }}
      />
    </Card>
  ),
  code: variant =>
    variant === "none"
      ? `<Card>\n  <CardHeader title="Plan" description="Billed monthly." />\n</Card>`
      : `<Card>\n  <CardHeader\n    title="Plan"\n    description="Billed monthly."\n    descriptionProps={{ color: "lighter", italic: true }}\n  />\n</Card>`,
} satisfies ComponentExample

export const cardHeaderEnd = {
  name: "end",
  description: "Content at the end of the header row, beside the title: an action or a status.",
  variants: ["none", "Button"],
  default: "none",
  preview: variant => (
    <Card>
      <CardHeader
        title="Plan"
        description="Billed monthly."
        end={variant === "Button" ? <Button>Edit</Button> : undefined}
      />
    </Card>
  ),
  code: variant =>
    variant === "Button"
      ? `<Card>\n  <CardHeader title="Plan" description="Billed monthly." end={<Button>Edit</Button>} />\n</Card>`
      : `<Card>\n  <CardHeader title="Plan" description="Billed monthly." />\n</Card>`,
} satisfies ComponentExample

export const cardHeaderChildren = {
  name: "children",
  description: "Extra content under the title and description.",
  variants: ["none", "Ink"],
  default: "none",
  preview: variant => (
    <Card>
      <CardHeader
        title="Plan"
        description="Billed monthly."
      >
        {variant === "Ink" ? <Ink size="small">Renews on the 1st.</Ink> : null}
      </CardHeader>
    </Card>
  ),
  code: variant =>
    variant === "Ink"
      ? `<Card>\n  <CardHeader title="Plan" description="Billed monthly.">\n    <Ink size="small">Renews on the 1st.</Ink>\n  </CardHeader>\n</Card>`
      : `<Card>\n  <CardHeader title="Plan" description="Billed monthly." />\n</Card>`,
} satisfies ComponentExample

/** Every CardHeader example facet — each one a section of the CardHeader docs page. */
export const cardHeaderExamples = {
  title: cardHeaderTitle,
  description: cardHeaderDescription,
  titleProps: cardHeaderTitleProps,
  descriptionProps: cardHeaderDescriptionProps,
  end: cardHeaderEnd,
  children: cardHeaderChildren,
} satisfies Record<string, ComponentExample>
