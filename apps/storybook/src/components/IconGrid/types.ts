import type { IconNameType } from "nice-react-icon"

export interface IconGridItem {
  name: IconNameType
}

export interface IconGridProps {
  icons: IconGridItem[]
}