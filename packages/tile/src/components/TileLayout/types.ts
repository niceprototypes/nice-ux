import * as React from "react"
import type { TileContentProps } from "../TileContent/types"

export interface TileLayoutProps extends TileContentProps {
  contentLeft?: React.ReactNode
  contentRight?: React.ReactNode
}
