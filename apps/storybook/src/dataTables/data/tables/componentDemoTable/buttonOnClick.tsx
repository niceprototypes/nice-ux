import { useState } from "react"
import Button from "@niceprototypes/button"
import Flex from "@niceprototypes/flex"
import type { ComponentExample } from "../../../components/demos/Components"

/** Shows how many times onClick has been called. */
const ReportingButton = () => {
  const [count, setCount] = useState(0)
  return (
    <Flex gap="small" alignItems="center">
      <Button onClick={() => setCount(current => current + 1)}>Click</Button>
      <code>{count === 0 ? "–" : `onClick() × ${count}`}</code>
    </Flex>
  )
}

export const buttonOnClick = {
  name: "onClick",
  description:
    "Called on activation: a click, or Enter / Space on a focused button (as=\"div\" wires the keys itself). Not called while disabled.",
  variants: ["handler"],
  default: "handler",
  preview: () => <ReportingButton />,
  code: () => `<Button onClick={() => setCount(count + 1)} />`,
} satisfies ComponentExample
