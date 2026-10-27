import { useState } from "react"
import Button from "@niceprototypes/button"
import Flex from "@niceprototypes/flex"
import type { ComponentExample } from "../../../components/demos/Components"

/** Shows the event type onMouseLeave last received. */
const Reporting = () => {
  const [last, setLast] = useState<string | null>(null)
  return (
    <Flex gap="small" alignItems="center">
      <Button onClick={() => {}} onMouseLeave={event => setLast(event.type)}>
        Hover
      </Button>
      <code>{last === null ? "–" : `onMouseLeave(${last})`}</code>
    </Flex>
  )
}

export const buttonOnMouseLeave = {
  name: "onMouseLeave",
  description: "Called with the mouse event when the pointer leaves the button.",
  variants: ["handler"],
  default: "handler",
  preview: () => <Reporting />,
  code: () => `<Button onMouseLeave={event => setLast(event.type)} />`,
} satisfies ComponentExample
