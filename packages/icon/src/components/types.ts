import { IconVariant } from "./vectors"
import { StatusType } from "../types"

export type IconNameType =
  | "arrow"
  | "box"
  | "brush"
  | "carat"
  | "check"
  | "contact"
  | "content"
  | "pause"
  | "placeholder"
  | "plus"
  | "search"
  | "spinner"
  | "upload"
  | "x"

export type IconSizeType = 1 | 2 | 3 | 4
export type IconBorderRadiusType = 1 | 2 | 3

export interface IconProps {
  name?: IconNameType
  variant?: IconVariant
  url?: string
  color?: string
  backgroundColor?: string
  size?: IconSizeType
  borderRadius?: IconBorderRadiusType
  imageSize?: string
  status?: StatusType
  spinning?: boolean
  rotation?: number
  strokeWidth?: 1 | 2
  isActive?: boolean
}
