import type * as React from "react"
import type { BorderRadiusType, ColorTokenProp, GapType, ThemeType } from "@niceprototypes/styles"
import type { FlexSpacingType } from "@niceprototypes/flex"

/**
 * CardChildrenType
 *
 * The card's content: CardHeader, CardBody, CardFooter, or any nodes, stacked in a column.
 */
export type CardChildrenType = React.ReactNode

/**
 * CardVariantType
 *
 * Surface style.
 *
 * Values:
 * - "outline": bordered, default
 * - "elevated": shadow, no visible border
 * - "filled": raised background, no visible border
 */
export type CardVariantType = "outline" | "elevated" | "filled"

/**
 * CardPaddingType
 *
 * Re-export of FlexSpacingType from @niceprototypes/flex.
 * Inner padding as a CSS-like shorthand of 1–4 gap tokens. Unset: the `card.padding` token.
 */
export type CardPaddingType = FlexSpacingType

/**
 * CardGapType
 *
 * Re-export of GapType from @niceprototypes/styles.
 * Space between the card's children. Unset: the `card.gap` token.
 */
export type CardGapType = GapType

/**
 * CardBorderRadiusType
 *
 * Re-export of BorderRadiusType from @niceprototypes/styles.
 * Corner radius, from the core `borderRadius` tokens. Unset: the `card.borderRadius` token (large).
 */
export type CardBorderRadiusType = BorderRadiusType

/**
 * CardBackgroundColorType
 *
 * Surface fill, from the `card.backgroundColor` component tokens (the Tile set).
 *
 * Values:
 * - "base": default for outline and elevated
 * - "raised": default for filled
 * - "success"
 * - "highlight"
 * - "warning"
 * - "error"
 * - "link"
 */
export type CardBackgroundColorType = "base" | "raised" | "success" | "highlight" | "warning" | "error" | "link"

/**
 * CardOnClickType
 *
 * Click handler. The root renders as a native `<button type="button">` (Enter and Space activate).
 */
export type CardOnClickType = (event: React.MouseEvent<HTMLElement>) => void

/**
 * CardHrefType
 *
 * Link target. The root renders as a native `<a>`; takes precedence over `onClick`'s button.
 */
export type CardHrefType = string

/**
 * CardSelectedType
 *
 * Selected state: the selected border colour; on a button card, `aria-pressed` (a toggle button).
 */
export type CardSelectedType = boolean

/**
 * CardDisabledType
 *
 * Disabled state: a native `disabled` button, or a link with `aria-disabled` that does not navigate.
 */
export type CardDisabledType = boolean

/**
 * CardThemeType
 *
 * Re-export of ThemeType from @niceprototypes/styles.
 * Pin token resolution to a specific theme.
 */
export type CardThemeType = ThemeType

/**
 * CardRefType
 *
 * Ref to the root element: `<a>`, `<button>` or `<div>` (React 19 ref-as-prop).
 */
export type CardRefType = React.Ref<HTMLElement>

/**
 * CardProps
 *
 * Complete prop definition for the Card component: a token-styled surface, static (`<div>`), a
 * link (`href`) or a button (`onClick`).
 */
export interface CardProps {
  /** The card's content */
  children?: CardChildrenType
  /**
   * Surface style
   * @default "outline"
   */
  variant?: CardVariantType
  /** Inner padding as gap-token shorthand */
  padding?: CardPaddingType
  /** Space between children */
  gap?: CardGapType
  /** Corner radius */
  borderRadius?: CardBorderRadiusType
  /** @token Surface fill. Token-bound — accepts CardBackgroundColorType variants only. */
  backgroundColor?: ColorTokenProp<CardBackgroundColorType>
  /** Click handler; renders a button */
  onClick?: CardOnClickType
  /** Link target; renders a link */
  href?: CardHrefType
  /** Selected state */
  selected?: CardSelectedType
  /**
   * Disabled state
   * @default false
   */
  disabled?: CardDisabledType
  /** Pin token resolution to a specific theme */
  theme?: CardThemeType
  /** Ref to the root element */
  ref?: CardRefType
}

// Declaration merging: const + namespace creates exportable type namespace
const CardTypes = {} as const

namespace CardTypes {
  export type Children = CardChildrenType
  export type Variant = CardVariantType
  export type Padding = CardPaddingType
  export type Gap = CardGapType
  export type BorderRadius = CardBorderRadiusType
  export type BackgroundColor = CardBackgroundColorType
  export type OnClick = CardOnClickType
  export type Href = CardHrefType
  export type Selected = CardSelectedType
  export type Disabled = CardDisabledType
  export type Theme = CardThemeType
  export type Ref = CardRefType
  export type Props = CardProps
}

export default CardTypes
