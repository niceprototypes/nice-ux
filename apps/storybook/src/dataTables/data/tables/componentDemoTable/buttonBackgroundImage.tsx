import Button from "nice-react-button"
import type { ComponentExample } from "../../../components/demos/Components"
import { getToken } from "nice-react-styles"

const gradient = `linear-gradient(${getToken("backgroundColor", "link")}, ${getToken("backgroundColor", "raised")})`

export const buttonBackgroundImage = {
  name: "backgroundImage",
  description:
    "Background image override: any CSS background-image value (a gradient or a url()). The preview's gradient is built from color tokens.",
  variants: ["none", "gradient"],
  default: "none",
  preview: (variant) => (
    <Button onClick={() => {}} backgroundImage={variant === "gradient" ? gradient : undefined}>
      Label
    </Button>
  ),
  code: (variant) =>
    variant === "gradient" ? `<Button backgroundImage="linear-gradient(…)" />` : `<Button />`,
} satisfies ComponentExample
