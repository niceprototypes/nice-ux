import Typography from "../../../../nice/Typography"
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
    <Typography weight={weight} code={code}>
      {text}
    </Typography>
  ),
} satisfies TokenTable
