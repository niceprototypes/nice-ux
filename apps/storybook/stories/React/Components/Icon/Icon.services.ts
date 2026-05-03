import type {
  IconSizeType,
  IconColorType,
  IconStrokeWidthType,
} from "nice-react-icon"

export const fontSizes = [
  "smaller",
  "small",
  "base",
  "large",
  "larger",
] as const satisfies readonly IconSizeType[]

export const foregroundColors = [
  "base",
  "light",
  "lighter",
  "lightest",
  "disabled",
  "link",
  "success",
  "warning",
  "error",
] as const satisfies readonly IconColorType[]

export const strokeWidths = [
  "small",
  "base",
  "large",
] as const satisfies readonly IconStrokeWidthType[]
