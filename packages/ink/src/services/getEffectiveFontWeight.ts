import { TypographyAsType } from "../types"

const getDefaultFontWeight = (as: TypographyAsType): number | undefined => {
  switch (as) {
    case "h1":
    case "h2":
    case "h3":
      return 3
    default:
      return undefined
  }
}

const getEffectiveFontWeight = (
  weight: number | undefined,
  as: TypographyAsType
): number | undefined => {
  return weight !== undefined ? weight : getDefaultFontWeight(as)
}

export default getEffectiveFontWeight
