import Button from "nice-react-button"
import type { ReactNode } from "react"
import type { ComponentExample } from "../../../components/demos/Components"

// Each variant's props; inlined defaults to true for as="a" and false otherwise.
const asVariants: Record<string, { code: string; preview: ReactNode }> = {
  button: {
    code: `<Button />`,
    preview: <Button onClick={() => {}}>Button</Button>,
  },
  anchor: {
    code: `<Button as="a" href="#" />`,
    preview: <Button as="a" href="#">Anchor</Button>,
  },
  "anchor, button chrome": {
    code: `<Button as="a" href="#" inlined={false} />`,
    preview: <Button as="a" href="#" inlined={false}>Anchor</Button>,
  },
  div: {
    code: `<Button as="div" onClick={fn} />`,
    preview: <Button as="div" onClick={() => {}}>Div</Button>,
  },
  "inlined button": {
    code: `<Button inlined onClick={fn} />`,
    preview: <Button inlined onClick={() => {}}>Button</Button>,
  },
}

export const buttonAs = {
  name: "as",
  description:
    "The element the button renders as: a native <button> (default), an inline link-styled anchor (as=\"a\", where href/target apply), or a clickable <div> that keeps the button chrome but adds button semantics (role=\"button\", tabindex, Enter/Space activation). The link-like layout is the inlined prop, which defaults to true for an anchor and false otherwise: inlined={false} gives an anchor the full button chrome, and an inlined native <button> renders like an inlined anchor.",
  variants: Object.keys(asVariants),
  default: "button",
  preview: (variant) => asVariants[variant].preview,
  code: (variant) => asVariants[variant].code,
} satisfies ComponentExample
