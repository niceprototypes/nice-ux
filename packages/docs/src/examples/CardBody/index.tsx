// CardBody example configs — one ComponentExample per facet, shaped like Toggle's. ComponentDocs renders each
// entry as a section of the CardBody docs page, sorted by name.
import { Card, CardBody, CardFooter, CardHeader } from "@niceprototypes/card"
import { Grid } from "@niceprototypes/grid"
import Button from "@niceprototypes/button"
import Ink from "@niceprototypes/ink"
import { Fill } from "../Card/Fill"
import type { ComponentExample } from "../../dataTables/components/demos/Components"

export const cardBodyChildren = {
  name: "children",
  description:
    "The card's main content, between header and footer. The body takes the card's spare height, so footers line up across equal-height cards.",
  variants: ["text", "equal-height cards"],
  default: "text",
  preview: variant => (
    <Fill>
      {variant === "text" ? (
        <Card>
          <CardBody>
            <Ink>Unlimited projects.</Ink>
          </CardBody>
        </Card>
      ) : (
        <Grid columns={2}>
          <Card>
            <CardHeader title="Free" />
            <CardBody>
              <Ink>1 project</Ink>
            </CardBody>
            <CardFooter>
              <Button size="small">Choose</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader title="Pro" />
            <CardBody>
              <Ink>Projects</Ink>
              <Ink>Support</Ink>
              <Ink>Domains</Ink>
            </CardBody>
            <CardFooter>
              <Button size="small">Choose</Button>
            </CardFooter>
          </Card>
        </Grid>
      )}
    </Fill>
  ),
  code: variant =>
    variant === "text"
      ? `<Card>\n  <CardBody>\n    <Ink>Unlimited projects.</Ink>\n  </CardBody>\n</Card>`
      : `<Grid columns={2}>\n  <Card>\n    <CardHeader title="Free" />\n    <CardBody>\n      <Ink>1 project</Ink>\n    </CardBody>\n    <CardFooter>\n      <Button size="small">Choose</Button>\n    </CardFooter>\n  </Card>\n  <Card>\n    <CardHeader title="Pro" />\n    <CardBody>\n      <Ink>Projects</Ink>\n      <Ink>Support</Ink>\n      <Ink>Domains</Ink>\n    </CardBody>\n    <CardFooter>\n      <Button size="small">Choose</Button>\n    </CardFooter>\n  </Card>\n</Grid>`,
} satisfies ComponentExample

/** Every CardBody example facet — each one a section of the CardBody docs page. */
export const cardBodyExamples = {
  children: cardBodyChildren,
} satisfies Record<string, ComponentExample>
