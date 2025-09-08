import { TypographyAsType } from "../types"

const getEffectiveLineHeight = (
  lineHeight: "default" | "condensed" | undefined,
  as: TypographyAsType
): "default" | "condensed" => {
  if (lineHeight) return lineHeight

  return as === "h1" || as === "h2" || as === "h3" || as === "h4" ? "condensed" : "default"
}

export default getEffectiveLineHeight
