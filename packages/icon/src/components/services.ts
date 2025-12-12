import {
  ArrowFillIcon,
  ArrowStrokeIcon,
  AttentionFillIcon,
  AttentionStrokeIcon,
  BoxFillIcon,
  BoxStrokeIcon,
  BrushFillIcon,
  BrushStrokeIcon,
  CalendarFillIcon,
  CalendarStrokeIcon,
  CancelFillIcon,
  CancelStrokeIcon,
  CaratFillIcon,
  CaratStrokeIcon,
  CheckFillIcon,
  CheckStrokeIcon,
  CloudFillIcon,
  CloudStrokeIcon,
  CodeFillIcon,
  CodeStrokeIcon,
  CogFillIcon,
  CogStrokeIcon,
  ContactFillIcon,
  ContactStrokeIcon,
  ContentFillIcon,
  ContentStrokeIcon,
  EditFillIcon,
  EditStrokeIcon,
  LinkFillIcon,
  LinkStrokeIcon,
  LockFillIcon,
  LockStrokeIcon,
  MenuFillIcon,
  MenuStrokeIcon,
  MessageFillIcon,
  MessageStrokeIcon,
  PauseFillIcon,
  PauseStrokeIcon,
  PlaceholderFillIcon,
  PlaceholderStrokeIcon,
  PlusFillIcon,
  PlusStrokeIcon,
  ProfileFillIcon,
  ProfileStrokeIcon,
  PuzzleFillIcon,
  PuzzleStrokeIcon,
  SearchFillIcon,
  SearchStrokeIcon,
  ShuffleFillIcon,
  ShuffleStrokeIcon,
  SkipFillIcon,
  SkipStrokeIcon,
  SpinnerFillIcon,
  SpinnerStrokeIcon,
  TrashFillIcon,
  TrashStrokeIcon,
  UploadFillIcon,
  UploadStrokeIcon,
  XFillIcon,
  XStrokeIcon,
} from "nice-icons"

const iconMap = {
  arrow: { Fill: ArrowFillIcon, Stroke: ArrowStrokeIcon },
  attention: { Fill: AttentionFillIcon, Stroke: AttentionStrokeIcon },
  box: { Fill: BoxFillIcon, Stroke: BoxStrokeIcon },
  brush: { Fill: BrushFillIcon, Stroke: BrushStrokeIcon },
  calendar: { Fill: CalendarFillIcon, Stroke: CalendarStrokeIcon },
  cancel: { Fill: CancelFillIcon, Stroke: CancelStrokeIcon },
  carat: { Fill: CaratFillIcon, Stroke: CaratStrokeIcon },
  check: { Fill: CheckFillIcon, Stroke: CheckStrokeIcon },
  cloud: { Fill: CloudFillIcon, Stroke: CloudStrokeIcon },
  code: { Fill: CodeFillIcon, Stroke: CodeStrokeIcon },
  cog: { Fill: CogFillIcon, Stroke: CogStrokeIcon },
  contact: { Fill: ContactFillIcon, Stroke: ContactStrokeIcon },
  content: { Fill: ContentFillIcon, Stroke: ContentStrokeIcon },
  edit: { Fill: EditFillIcon, Stroke: EditStrokeIcon },
  link: { Fill: LinkFillIcon, Stroke: LinkStrokeIcon },
  lock: { Fill: LockFillIcon, Stroke: LockStrokeIcon },
  menu: { Fill: MenuFillIcon, Stroke: MenuStrokeIcon },
  message: { Fill: MessageFillIcon, Stroke: MessageStrokeIcon },
  pause: { Fill: PauseFillIcon, Stroke: PauseStrokeIcon },
  placeholder: { Fill: PlaceholderFillIcon, Stroke: PlaceholderStrokeIcon },
  plus: { Fill: PlusFillIcon, Stroke: PlusStrokeIcon },
  profile: { Fill: ProfileFillIcon, Stroke: ProfileStrokeIcon },
  puzzle: { Fill: PuzzleFillIcon, Stroke: PuzzleStrokeIcon },
  search: { Fill: SearchFillIcon, Stroke: SearchStrokeIcon },
  shuffle: { Fill: ShuffleFillIcon, Stroke: ShuffleStrokeIcon },
  skip: { Fill: SkipFillIcon, Stroke: SkipStrokeIcon },
  spinner: { Fill: SpinnerFillIcon, Stroke: SpinnerStrokeIcon },
  trash: { Fill: TrashFillIcon, Stroke: TrashStrokeIcon },
  upload: { Fill: UploadFillIcon, Stroke: UploadStrokeIcon },
  x: { Fill: XFillIcon, Stroke: XStrokeIcon },
} as const

export type IconName = keyof typeof iconMap

/**
 * Gets an icon component by name and outlined mode
 * @param name - The icon name
 * @param outlined - Use outlined/fill variant (true) or stroke variant (false)
 * @returns The React component for the icon, or undefined if not found
 */
const services = (name: string, outlined: boolean = false): React.FunctionComponent<React.SVGAttributes<SVGElement>> | undefined => {
  const icon = iconMap[name as IconName]
  if (!icon) return undefined

  return outlined ? icon.Fill : icon.Stroke
}

export default services
