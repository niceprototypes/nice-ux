import * as React from "react"
import type { ThemeType, GapType } from "nice-react-styles"
import type { TileInkProps } from "../TileContent/TileContent.types"

export interface ContentMainProps {
  title?: React.ReactNode
  titleProps?: TileInkProps
  contentCenter?: React.ReactNode
  description?: React.ReactNode | string[]
  descriptionProps?: TileInkProps
  theme?: ThemeType
  gap?: GapType
}