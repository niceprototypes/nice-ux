import * as Arrow from "../components/vectors/arrow"
import * as Attention from "../components/vectors/attention"
import * as Box from "../components/vectors/box"
import * as Brush from "../components/vectors/brush"
import * as Calendar from "../components/vectors/calendar"
import * as Cancel from "../components/vectors/cancel"
import * as Carat from "../components/vectors/carat"
import * as Check from "../components/vectors/check"
import * as Cloud from "../components/vectors/cloud"
import * as Code from "../components/vectors/code"
import * as Cog from "../components/vectors/cog"
import * as Contact from "../components/vectors/contact"
import * as Content from "../components/vectors/content"
import * as Edit from "../components/vectors/edit"
import * as Link from "../components/vectors/link"
import * as Lock from "../components/vectors/lock"
import * as Menu from "../components/vectors/menu"
import * as Message from "../components/vectors/message"
import * as Pause from "../components/vectors/pause"
import * as Placeholder from "../components/vectors/placeholder"
import * as Plus from "../components/vectors/plus"
import * as Profile from "../components/vectors/profile"
import * as Puzzle from "../components/vectors/puzzle"
import * as Search from "../components/vectors/search"
import * as Shuffle from "../components/vectors/shuffle"
import * as Skip from "../components/vectors/skip"
import * as Spinner from "../components/vectors/spinner"
import * as Trash from "../components/vectors/trash"
import * as Upload from "../components/vectors/upload"
import * as X from "../components/vectors/x"
import type { IconType } from "../types"

const iconMap = {
  arrow: Arrow,
  attention: Attention,
  box: Box,
  brush: Brush,
  calendar: Calendar,
  cancel: Cancel,
  carat: Carat,
  check: Check,
  cloud: Cloud,
  code: Code,
  cog: Cog,
  contact: Contact,
  content: Content,
  edit: Edit,
  link: Link,
  lock: Lock,
  menu: Menu,
  message: Message,
  pause: Pause,
  placeholder: Placeholder,
  plus: Plus,
  profile: Profile,
  puzzle: Puzzle,
  search: Search,
  shuffle: Shuffle,
  skip: Skip,
  spinner: Spinner,
  trash: Trash,
  upload: Upload,
  x: X,
} as const

export type IconName = keyof typeof iconMap

/**
 * Gets an icon component by name and type
 * @param name - The icon name
 * @param type - The icon type (fill or stroke)
 * @returns The React component for the icon, or undefined if not found
 */
const getIcon = (name: string, type: IconType = "fill"): React.FC | undefined => {
  const icon = iconMap[name as IconName]
  if (!icon) return undefined

  return type === "stroke" ? icon.Stroke : icon.Fill
}

export default getIcon
