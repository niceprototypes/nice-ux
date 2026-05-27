import * as React from "react"
import type { ThemeType, GapType } from "nice-react-styles"
import type { TileTypographyProps } from "../TileContent/TileContent.types"

export interface ContentMainProps {
  title?: React.ReactNode
  titleProps?: TileTypographyProps
  contentCenter?: React.ReactNode
  description?: React.ReactNode | string[]
  descriptionProps?: TileTypographyProps
  theme?: ThemeType
  gap?: GapType
}