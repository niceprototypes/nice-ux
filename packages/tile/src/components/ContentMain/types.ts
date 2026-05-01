import * as React from "react"
import type { ModeType, GapType } from "nice-react-styles"
import type { TileTypographyProps } from "../TileContent/types"

export interface ContentMainProps {
  title?: React.ReactNode
  titleProps?: TileTypographyProps
  contentCenter?: React.ReactNode
  description?: React.ReactNode | string[]
  descriptionProps?: TileTypographyProps
  mode?: ModeType
  gap?: GapType
}
