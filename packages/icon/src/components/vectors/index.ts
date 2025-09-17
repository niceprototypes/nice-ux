import * as Arrow from "./Arrow"
import * as Attention from "./Attention"
import * as Box from "./Box"
import * as Brush from "./Brush"
import * as Calendar from "./Calendar"
import * as Cancel from "./Cancel"
import * as Carat from "./Carat"
import * as Check from "./Check"
import * as Cloud from "./Cloud"
import * as Code from "./Code"
import * as Cog from "./Cog"
import * as Contact from "./Contact"
import * as Content from "./Content"
import * as Edit from "./Edit"
import * as Link from "./Link"
import * as Lock from "./Lock"
import * as Menu from "./Menu"
import * as Message from "./Message"
import * as Pause from "./Pause"
import * as Placeholder from "./Placeholder"
import * as Plus from "./Plus"
import * as Profile from "./Profile"
import * as Puzzle from "./Puzzle"
import * as Search from "./Search"
import * as Shuffle from "./Shuffle"
import * as Skip from "./Skip"
import * as Spinner from "./Spinner"
import * as Trash from "./Trash"
import * as Upload from "./Upload"
import * as X from "./X"

export type IconVariant = "fill" | "stroke"

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

export function getIcon(name: string, variant: IconVariant = "fill"): React.FC | undefined {
  const icon = iconMap[name as IconName]
  if (!icon) return undefined

  return variant === "stroke" ? icon.Stroke : icon.Fill
}
