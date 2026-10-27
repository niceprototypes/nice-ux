import Button from "@niceprototypes/button"
import type { ComponentExample } from "../../../components/demos/Components"

// Shown on a fixed-width button: centered content and space-between only differ
// when the button is wider than its content.
export const buttonJustifyContent = {
  name: "justifyContent",
  description:
    "Places the icon(s) and label along the button. Anything but center stretches them across the button's width, so space-between puts the label at one edge and the icon at the other.",
  variants: ["center", "space-between"],
  default: "center",
  preview: (variant) => (
    <div style={{ width: 240, display: "flex" }}>
      <Button onClick={() => {}} iconRight="arrow-right" justifyContent={variant} grow={1}>
        Next
      </Button>
    </div>
  ),
  code: (variant) =>
    variant === "center" ? `<Button iconRight="arrow-right">Next</Button>` : `<Button iconRight="arrow-right" justifyContent="${variant}">Next</Button>`,
} satisfies ComponentExample
