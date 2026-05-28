import type { FlexGapSizeType, FlexSpacingType } from "nice-react-flex"

export interface DotSize {
  name?: string
  color?: string
  width?: string
  height?: string
  grow?: number
}

export interface DemoDotProps {
  backgroundColor?: string
  borderRadius?: string
  spacing?: FlexSpacingType
  width?: string
  height?: string
  grow?: number
  style?: React.CSSProperties
}

export type JustifyContent =
  | "flex-start"
  | "flex-end"
  | "center"
  | "space-between"
  | "space-around"
  | "space-evenly"

export type AlignItems =
  | "flex-start"
  | "flex-end"
  | "center"
  | "baseline"
  | "stretch"

export type Wrap = "nowrap" | "wrap" | "wrap-reverse"

export interface DemoDotsProps {
  gap?: FlexGapSizeType
  direction?: "row" | "column"
  justifyContent?: JustifyContent
  alignItems?: AlignItems
  wrap?: Wrap
  spacing?: FlexSpacingType
  width?: string
  height?: string
  bordered?: boolean
  dots?: DotSize[]
}
