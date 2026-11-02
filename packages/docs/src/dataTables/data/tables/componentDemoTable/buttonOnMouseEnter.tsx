import Ink from "@niceprototypes/ink"
import { useState } from "react"
import Button from "@niceprototypes/button"
import Flex from "@niceprototypes/flex"
import type { ComponentExample } from "../../../components/demos/Components"

/** Shows the event type onMouseEnter last received. */
const Reporting = () => {
  const [last, setLast] = useState<string | null>(null)
  return (
    <Flex gap="small" alignItems="center">
      <Button onClick={() => {}} onMouseEnter={event => setLast(event.type)}>
        Hover
      </Button>
      <Ink code>{last === null ? "–" : `onMouseEnter(${last})`}</Ink>
    </Flex>
  )
}

export const buttonOnMouseEnter = {
  name: "onMouseEnter",
  description: "Called with the mouse event when the pointer enters the button.",
  variants: ["handler"],
  default: "handler",
  preview: () => <Reporting />,
  code: () => `<Button onMouseEnter={event => setLast(event.type)} />`,
} satisfies ComponentExample
