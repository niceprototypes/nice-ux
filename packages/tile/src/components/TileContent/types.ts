import * as React from "react"
import type { AlignType, TypographyProps } from "nice-react-typography"
import type { ModeType, GapType } from "nice-react-styles"

export type TileTypographyProps = Partial<Omit<TypographyProps, "children">>

export interface TileContentProps {
  children?: React.ReactNode
  contentTop?: React.ReactNode
  contentCenter?: React.ReactNode
  title?: React.ReactNode
  titleProps?: TileTypographyProps
  description?: React.ReactNode | string[]
  descriptionProps?: TileTypographyProps
  align?: AlignType
  mode?: ModeType
  /** Top spacing applied to the Flex that wraps `children`. */
  gap?: GapType
}
