import Button from "nice-react-button"
import type { ComponentExample } from "../../../components/demos/Components"

export const buttonTarget = {
  name: "target",
  description:
    "Anchor target when as=\"a\". \"_blank\" also adds rel=\"noopener noreferrer\".",
  variants: ["_self", "_blank", "_parent", "_top"],
  default: "_self",
  preview: (variant) => (
    <Button as="a" href="https://niceprototypes.com/" target={variant}>
      {variant}
    </Button>
  ),
  code: (variant) => `<Button as="a" href="https://niceprototypes.com/" target="${variant}" />`,
} satisfies ComponentExample
