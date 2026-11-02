// CardFooter example configs — one ComponentExample per facet, shaped like Toggle's. ComponentDocs renders
// each entry as a section of the CardFooter docs page, sorted by name.
import { Card, CardFooter } from "@niceprototypes/card"
import Button from "@niceprototypes/button"
import { Fill } from "../Card/Fill"
import type { ComponentExample } from "../../dataTables/components/demos/Components"

export const cardFooterChildren = {
  name: "children",
  description: "The footer's content, usually actions, in a row spaced by the small gap.",
  variants: ["one action", "two actions"],
  default: "two actions",
  preview: variant => (
    <Fill>
      <Card>
        <CardFooter>
          {variant === "two actions" ? <Button>Cancel</Button> : null}
          <Button filled>Save</Button>
        </CardFooter>
      </Card>
    </Fill>
  ),
  code: variant =>
    variant === "two actions"
      ? `<Card>\n  <CardFooter>\n    <Button>Cancel</Button>\n    <Button filled>Save</Button>\n  </CardFooter>\n</Card>`
      : `<Card>\n  <CardFooter>\n    <Button filled>Save</Button>\n  </CardFooter>\n</Card>`,
} satisfies ComponentExample

export const cardFooterJustifyContent = {
  name: "justifyContent",
  description: "Main-axis distribution of the footer's children.",
  variants: ["flex-start", "flex-end", "center", "space-between", "space-around", "space-evenly"],
  default: "flex-end",
  preview: variant => (
    <Fill>
      <Card>
        <CardFooter justifyContent={variant}>
          <Button>Cancel</Button>
          <Button filled>Save</Button>
        </CardFooter>
      </Card>
    </Fill>
  ),
  code: variant =>
    `<Card>\n  <CardFooter${variant === "flex-end" ? "" : ` justifyContent="${variant}"`}>\n    <Button>Cancel</Button>\n    <Button filled>Save</Button>\n  </CardFooter>\n</Card>`,
} satisfies ComponentExample

/** Every CardFooter example facet — each one a section of the CardFooter docs page. */
export const cardFooterExamples = {
  children: cardFooterChildren,
  justifyContent: cardFooterJustifyContent,
} satisfies Record<string, ComponentExample>
