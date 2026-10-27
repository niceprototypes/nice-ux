import * as React from "react"
import type { AlignType, InkProps } from "@niceprototypes/ink"
import type { FlexProps } from "@niceprototypes/flex"
import type { ThemeType, GapType } from "@niceprototypes/styles"

export type TileInkProps = Partial<Omit<InkProps, "children">>

export interface TileContentProps {
  children?: React.ReactNode
  contentTop?: React.ReactNode
  contentCenter?: React.ReactNode
  title?: React.ReactNode
  titleProps?: TileInkProps
  description?: React.ReactNode | string[]
  descriptionProps?: TileInkProps
  align?: AlignType
  theme?: ThemeType
  /** Top spacing applied to the Flex that wraps `children`. */
  gap?: GapType
  alignItems?: FlexProps["alignItems"]
  justifyContent?: FlexProps["justifyContent"]
}
