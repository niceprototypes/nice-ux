import Button from "nice-react-button"
import type { ComponentExample } from "../../../components/demos/Components"

export const buttonChildren = {
  name: "children",
  description:
    "The label, rendered through Ink. Without children, an icon from iconLeft / iconRight is the sole content (see icon).",
  variants: ["text"],
  default: "text",
  preview: () => <Button onClick={() => {}}>Save changes</Button>,
  code: () => `<Button>Save changes</Button>`,
} satisfies ComponentExample
