import { useState } from "react"
import Button from "nice-react-button"
import Flex from "nice-react-flex"
import type { ComponentExample } from "../../../components/demos/Components"

/** Shows the event type onMouseEnter last received. */
const Reporting = () => {
  const [last, setLast] = useState<string | null>(null)
  return (
    <Flex gap="small" alignItems="center">
      <Button onClick={() => {}} onMouseEnter={event => setLast(event.type)}>
        Hover
      </Button>
      <code>{last === null ? "–" : `onMouseEnter(${last})`}</code>
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
