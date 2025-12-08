import {
  Arrow,
  Attention,
  Box,
  Brush,
  Calendar,
  Cancel,
  Carat,
  Check,
  Cloud,
  Code,
  Cog,
  Contact,
  Content,
  Edit,
  Link,
  Lock,
  Menu,
  Message,
  Pause,
  Placeholder,
  Plus,
  Profile,
  Puzzle,
  Search,
  Shuffle,
  Skip,
  Spinner,
  Trash,
  Upload,
  X,
} from "../components/vectors"

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
 * Gets an icon component by name and outlined mode
 * @param name - The icon name
 * @param outlined - Use outlined/fill variant (true) or stroke variant (false)
 * @returns The React component for the icon, or undefined if not found
 */
const getIcon = (name: string, outlined: boolean = false): React.FunctionComponent<React.SVGAttributes<SVGElement>> | undefined => {
  const icon = iconMap[name as IconName]
  if (!icon) return undefined

  return outlined ? icon.Fill : icon.Stroke
}

export default getIcon
