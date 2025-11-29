import { GapSize, SpacingDefinition } from "nice-react-flex"

export interface DotSize {
  name?: string
  color?: string
  width?: string
  height?: string
}

export interface DemoDotProps {
  backgroundColor?: string
  borderRadius?: string
  spacing?: SpacingDefinition
  width?: string
  height?: string
  style?: React.CSSProperties
}

export type JustifyContent =
  | "flex-start"
  | "flex-end"
  | "center"
  | "space-between"
  | "space-around"
  | "space-evenly"

export type AlignItems = "flex-start" | "flex-end" | "center" | "baseline" | "stretch"

export interface DemoDotsProps {
  gap?: GapSize
  direction?: "row" | "column"
  justifyContent?: JustifyContent
  alignItems?: AlignItems
  spacing?: GapSize
  width?: string
  height?: string
  bordered?: boolean
  dots?: DotSize[]
}