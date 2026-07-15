import Button from "nice-react-button"
import { cap } from "../../../utilities"
import type { ComponentExample } from "../../../components/demos/Components"

export const buttonAs = {
  name: "as",
  description:
    "The element the button renders as: a native <button> (default), an inline link-styled anchor (as=\"a\", where href/target apply), or a clickable <div> that keeps the button chrome but adds button semantics (role=\"button\", tabindex, Enter/Space activation).",
  variants: ["button", "anchor", "div"],
  default: "button",
  preview: (variant) => {
    const label = cap(variant)
    if (variant === "anchor") return <Button as="a" href="#">{label}</Button>
    if (variant === "div") return <Button as="div" onClick={() => {}}>{label}</Button>
    return <Button onClick={() => {}}>{label}</Button>
  },
  code: (variant) =>
    variant === "anchor"
      ? `<Button as="a" href="#" />`
      : variant === "div"
        ? `<Button as="div" onClick={fn} />`
        : `<Button />`,
} satisfies ComponentExample
