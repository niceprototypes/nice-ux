import { Theme } from "nice-styles"

export const fontSizes = Object.keys(
  Theme.fontSize.items
) as (keyof typeof Theme.fontSize.items)[]

export const foregroundColors = Object.keys(
  Theme.foregroundColor.items
) as (keyof typeof Theme.foregroundColor.items)[]

export const borderWidths = Object.keys(
  Theme.borderWidth.items
) as (keyof typeof Theme.borderWidth.items)[]
