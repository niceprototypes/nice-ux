import Button from "nice-react-button"
import type { ComponentExample } from "../../../components/demos/Components"

export const buttonForm = {
  name: "form",
  description:
    "Id of the form the native <button> submits, for a button rendered outside that form. Ignored when as is set.",
  variants: ["newsletter"],
  default: "newsletter",
  preview: (variant) => (
    <Button onClick={() => {}} type="submit" form={variant}>
      Subscribe
    </Button>
  ),
  code: (variant) => `<form id="${variant}">…</form>\n\n<Button type="submit" form="${variant}" />`,
} satisfies ComponentExample
