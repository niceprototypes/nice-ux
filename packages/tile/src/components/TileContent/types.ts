import * as React from "react"
import type { AlignType, AsType, TypographyProps } from "nice-react-typography"
import type { GapType, ModeType } from "nice-react-styles"

export type TileTypographyProps = Partial<Omit<TypographyProps, "children">>

export interface TileContentProps {
  children?: React.ReactNode
  contentTop?: React.ReactNode
  contentCenter?: React.ReactNode
  title?: React.ReactNode
  titleAs?: AsType
  titleProps?: TileTypographyProps
  description?: React.ReactNode | string[]
  descriptionProps?: TileTypographyProps
  align?: AlignType
  gap?: GapType
  mode?: ModeType
}
