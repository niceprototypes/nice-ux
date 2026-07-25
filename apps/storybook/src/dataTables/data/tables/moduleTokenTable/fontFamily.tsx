import Ink from "../../../../nice/Ink"
import type { TokenTable } from "./types"

export const fontFamily = {
  name: "fontFamily",
  description: "Typeface tokens for headings, body text, and monospace code.",
  variants: [
    { variant: "heading", weight: "bold", text: "Heading" },
    { variant: "base", text: "Body" },
    { variant: "code", code: true, text: "Code" },
  ],
  preview: ({ weight, code, text }) => (
    <Ink weight={weight} code={code}>
      {text}
    </Ink>
  ),
} satisfies TokenTable
