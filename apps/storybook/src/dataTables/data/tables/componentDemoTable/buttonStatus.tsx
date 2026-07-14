import Button from "nice-react-button"
import Flex from "nice-react-flex"
import { cap } from "../../../utilities"
import type { ComponentExample } from "../../../components/demos/Components"

export const buttonStatus = {
  name: "status",
  description:
    "Applies a semantic status style to the button (disabled, error, success, or warning).",
  variants: ["base", "disabled", "error", "success", "warning"],
  // Shown outline and filled; base renders with no status prop.
  preview: (variant) => (
    <Flex gap="small">
      <Button onClick={() => {}} status={variant === "base" ? undefined : variant}>
        {cap(variant)}
      </Button>
      <Button filled onClick={() => {}} status={variant === "base" ? undefined : variant}>
        {cap(variant)}
      </Button>
    </Flex>
  ),
  code: (variant) => (variant === "base" ? `<Button />` : `<Button status="${variant}" />`),
} satisfies ComponentExample
