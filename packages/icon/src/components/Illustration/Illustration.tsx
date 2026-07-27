import * as React from "react"
import { Theme } from "nice-react-styles"
import { IllustrationProps } from "./Illustration.types"
import { IllustrationWrapperStyled } from "./Illustration.styles"
import { resolveIllustrationComponent } from "../../utilities/resolveIllustrationComponent"

/**
 * A fixed-color illustration — the illustration counterpart to `<Icon>`.
 *
 * Overloads Icon's shape but drops every recolor prop (`color`, `strokeWidth`,
 * `strokeScaling`, `outlined`): an illustration ships its own authored colors, so
 * it is only sized/positioned/animated, never repainted. Resolves from
 * nice-icons' illustration surface — `getIllustration` is the vanilla string
 * equivalent. An unknown name renders nothing.
 *
 * @example
 * ```tsx
 * import { Illustration } from 'nice-react-icon'
 *
 * <Illustration name="nice-heart" size="larger" />
 * <Illustration name="nice-skull" theme="night" />
 * ```
 */
const Illustration: React.FC<IllustrationProps> = ({
  name = "nice-heart",
  variant,
  size = "base",
  viewBox = "0 0 16 16",
  className,
  theme,
  style,
  animation,
  animationDuration = "base",
}) => {
  const resolvedVariant = variant ?? "base"
  const withTheme = (el: React.ReactElement) => (theme ? <Theme name={theme}>{el}</Theme> : el)

  const SvgIllustration = resolveIllustrationComponent(name, resolvedVariant)
  if (!SvgIllustration) return null

  return withTheme(
    <IllustrationWrapperStyled
      $size={size}
      $animation={animation}
      $animationDuration={animationDuration}
      className={className}
      style={style}
    >
      <SvgIllustration viewBox={viewBox} />
    </IllustrationWrapperStyled>
  )
}

export default Illustration
