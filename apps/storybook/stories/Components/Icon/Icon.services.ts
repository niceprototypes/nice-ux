import { Theme } from "nice-react-styles"

export const fontSizes = Object.keys(
  Theme.fontSize
) as (keyof typeof Theme.fontSize)[]

export const foregroundColors = Object.keys(
  Theme.foregroundColor
) as (keyof typeof Theme.foregroundColor)[]

