import * as React from "react"
import type { FlexSpacingType } from "@niceprototypes/flex"
import type { TileContentProps } from "../TileContent/TileContent.types"
import type {
  TileMaxWidthType,
  TileAlignItemsType,
  TileJustifyContentType,
} from "../Tile/Tile.types"

export interface TileLayoutProps extends TileContentProps {
  contentLeft?: React.ReactNode
  contentRight?: React.ReactNode
  padding?: FlexSpacingType
  maxWidth?: TileMaxWidthType
  alignItems?: TileAlignItemsType
  justifyContent?: TileJustifyContentType
}
