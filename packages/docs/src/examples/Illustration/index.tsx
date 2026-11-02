// Illustration example configs — one ComponentExample per prop, shaped like Icon's.
import { Illustration } from "@niceprototypes/icon"
import type { IconAnimationDurationType } from "@niceprototypes/icon"
import { illustrationNames, illustrationVariants } from "@niceprototypes/icon/svg"
import Flex from "@niceprototypes/flex"
import { Theme, getToken } from "@niceprototypes/styles"
import type { FontSizeType, ThemeType } from "@niceprototypes/styles"
import type { ComponentExample } from "../../dataTables/components/demos/Components"

const SIZE_VARIANTS = ["smaller", "small", "base", "large", "larger"] as const satisfies readonly FontSizeType[]
const ANIMATION_DURATION_VARIANTS = ["fast", "base", "slow"] as const satisfies readonly IconAnimationDurationType[]
const THEME_VARIANTS = ["day", "night"] as const satisfies readonly ThemeType[]
const VARIANTS = [...new Set(Object.values(illustrationVariants).flat())]

export const illustrationName = {
  name: "name",
  description: "Illustration from the icon package's illustration catalog. An unknown name renders nothing.",
  variants: illustrationNames,
  default: "nice-heart",
  preview: variant => (
    <Illustration
      name={variant}
      size="larger"
    />
  ),
  code: variant => `<Illustration name="${variant}" />`,
} satisfies ComponentExample

export const illustrationVariant = {
  name: "variant",
  description: "Variant stem to render; every illustration in the catalog ships base.",
  variants: VARIANTS,
  default: "base",
  preview: variant => (
    <Illustration
      name="nice-heart"
      variant={variant}
      size="larger"
    />
  ),
  code: variant => (variant === "base" ? `<Illustration name="nice-heart" />` : `<Illustration name="nice-heart" variant="${variant}" />`),
} satisfies ComponentExample

export const illustrationSize = {
  name: "size",
  description: "Width and height, from the icon.size component tokens.",
  variants: SIZE_VARIANTS,
  default: "base",
  preview: variant => (
    <Illustration
      name="nice-heart"
      size={variant}
    />
  ),
  code: variant => (variant === "base" ? `<Illustration name="nice-heart" />` : `<Illustration name="nice-heart" size="${variant}" />`),
} satisfies ComponentExample

export const illustrationViewBox = {
  name: "viewBox",
  description: "viewBox of the rendered SVG. Illustrations are drawn on a 16-unit grid; a larger box shrinks the art, a smaller one crops it.",
  variants: ["0 0 16 16", "0 0 24 24", "4 4 8 8"],
  default: "0 0 16 16",
  preview: variant => (
    <Illustration
      name="nice-heart"
      size="larger"
      viewBox={variant}
    />
  ),
  code: variant =>
    variant === "0 0 16 16" ? `<Illustration name="nice-heart" />` : `<Illustration name="nice-heart" viewBox="${variant}" />`,
} satisfies ComponentExample

export const illustrationTheme = {
  name: "theme",
  description: "Pins token resolution to a theme. Each preview sits on its theme's base background.",
  variants: THEME_VARIANTS,
  preview: variant => (
    <Theme name={variant}>
      <Flex
        padding="small"
        style={{ backgroundColor: getToken("backgroundColor", "base") }}
      >
        <Illustration
          name="nice-skull"
          size="larger"
          theme={variant}
        />
      </Flex>
    </Theme>
  ),
  code: variant => `<Illustration name="nice-skull" theme="${variant}" />`,
} satisfies ComponentExample

export const illustrationAnimation = {
  name: "animation",
  description: "Named animation; spin is the only one.",
  variants: ["none", "spin"],
  default: "none",
  preview: variant => (
    <Illustration
      name="nice-heart"
      size="larger"
      animation={variant === "spin" ? "spin" : undefined}
    />
  ),
  code: variant => (variant === "spin" ? `<Illustration name="nice-heart" animation="spin" />` : `<Illustration name="nice-heart" />`),
} satisfies ComponentExample

export const illustrationAnimationDuration = {
  name: "animationDuration",
  description: "Speed of the animation, from the icon animation-duration tokens.",
  variants: ANIMATION_DURATION_VARIANTS,
  default: "base",
  preview: variant => (
    <Illustration
      name="nice-heart"
      size="larger"
      animation="spin"
      animationDuration={variant}
    />
  ),
  code: variant =>
    variant === "base"
      ? `<Illustration name="nice-heart" animation="spin" />`
      : `<Illustration name="nice-heart" animation="spin" animationDuration="${variant}" />`,
} satisfies ComponentExample

/** Every Illustration example facet — each one a section of the Illustration docs page. */
export const illustrationExamples = {
  name: illustrationName,
  variant: illustrationVariant,
  size: illustrationSize,
  viewBox: illustrationViewBox,
  theme: illustrationTheme,
  animation: illustrationAnimation,
  animationDuration: illustrationAnimationDuration,
} satisfies Record<string, ComponentExample>
