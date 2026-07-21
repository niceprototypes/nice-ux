import * as React from "react"
import type { AlignType, InkProps } from "nice-react-ink"
import type { FlexProps } from "nice-react-flex"
import type { ThemeType, GapType } from "nice-react-styles"

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
