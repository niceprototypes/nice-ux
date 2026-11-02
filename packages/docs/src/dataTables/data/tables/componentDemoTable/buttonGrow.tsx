import Button from "@niceprototypes/button"
import type { ComponentExample } from "../../../components/demos/Components"
import Flex from "@niceprototypes/flex"

export const buttonGrow = {
  name: "grow",
  description:
    "Flex grow factor of the root element (flex-grow plus flex-basis: 0, as @niceprototypes/flex grow). Needs a flex-container parent; unset emits no flex-grow. Each preview pairs the button with a fixed one in a Flex row.",
  variants: ["unset", "1"],
  default: "unset",
  preview: (variant) => (
    <Flex gap="small" grow={1}>
      <Button onClick={() => {}} grow={variant === "unset" ? undefined : Number(variant)}>
        Grow
      </Button>
      <Button onClick={() => {}}>Fixed</Button>
    </Flex>
  ),
  code: (variant) => (variant === "unset" ? `<Button />` : `<Button grow={${variant}} />`),
} satisfies ComponentExample
