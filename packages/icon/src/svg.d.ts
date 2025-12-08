declare module "*.svg" {
  import * as React from "react"
  const ReactComponent: React.FunctionComponent<React.SVGAttributes<SVGElement>>
  export default ReactComponent
}

declare module "nice-icons" {
  import * as React from "react"
  type SvgComponent = React.FunctionComponent<React.SVGAttributes<SVGElement>>

  export const ArrowStrokeIcon: SvgComponent
  export const ArrowFillIcon: SvgComponent
  export const AttentionStrokeIcon: SvgComponent
  export const AttentionFillIcon: SvgComponent
  export const BoxStrokeIcon: SvgComponent
  export const BoxFillIcon: SvgComponent
  export const BrushStrokeIcon: SvgComponent
  export const BrushFillIcon: SvgComponent
  export const CalendarStrokeIcon: SvgComponent
  export const CalendarFillIcon: SvgComponent
  export const CancelStrokeIcon: SvgComponent
  export const CancelFillIcon: SvgComponent
  export const CaratStrokeIcon: SvgComponent
  export const CaratFillIcon: SvgComponent
  export const CheckStrokeIcon: SvgComponent
  export const CheckFillIcon: SvgComponent
  export const CloudStrokeIcon: SvgComponent
  export const CloudFillIcon: SvgComponent
  export const CodeStrokeIcon: SvgComponent
  export const CodeFillIcon: SvgComponent
  export const CogStrokeIcon: SvgComponent
  export const CogFillIcon: SvgComponent
  export const ContactStrokeIcon: SvgComponent
  export const ContactFillIcon: SvgComponent
  export const ContentStrokeIcon: SvgComponent
  export const ContentFillIcon: SvgComponent
  export const EditStrokeIcon: SvgComponent
  export const EditFillIcon: SvgComponent
  export const LinkStrokeIcon: SvgComponent
  export const LinkFillIcon: SvgComponent
  export const LockStrokeIcon: SvgComponent
  export const LockFillIcon: SvgComponent
  export const MenuStrokeIcon: SvgComponent
  export const MenuFillIcon: SvgComponent
  export const MessageStrokeIcon: SvgComponent
  export const MessageFillIcon: SvgComponent
  export const PauseStrokeIcon: SvgComponent
  export const PauseFillIcon: SvgComponent
  export const PlaceholderStrokeIcon: SvgComponent
  export const PlaceholderFillIcon: SvgComponent
  export const PlusStrokeIcon: SvgComponent
  export const PlusFillIcon: SvgComponent
  export const ProfileStrokeIcon: SvgComponent
  export const ProfileFillIcon: SvgComponent
  export const PuzzleStrokeIcon: SvgComponent
  export const PuzzleFillIcon: SvgComponent
  export const SearchStrokeIcon: SvgComponent
  export const SearchFillIcon: SvgComponent
  export const ShuffleStrokeIcon: SvgComponent
  export const ShuffleFillIcon: SvgComponent
  export const SkipStrokeIcon: SvgComponent
  export const SkipFillIcon: SvgComponent
  export const SpinnerStrokeIcon: SvgComponent
  export const SpinnerFillIcon: SvgComponent
  export const TrashStrokeIcon: SvgComponent
  export const TrashFillIcon: SvgComponent
  export const UploadStrokeIcon: SvgComponent
  export const UploadFillIcon: SvgComponent
  export const XStrokeIcon: SvgComponent
  export const XFillIcon: SvgComponent

  export const iconNames: string[]
}
