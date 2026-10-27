import * as React from "react"
import { Theme } from "nice-react-styles"
import LogoName from "../LogoName"
import { StyledHeart, StyledLogo, StyledName } from "./Logo.styles"
import type { LogoProps } from "./Logo.types"

/**
 * The Nice Prototypes logo: the crystal heart illustration (nice-react-icon's
 * `nice-heart`) and the logo name, side by side. `height` sets the height in pixels, by default
 * the responsive `logo.height` token; the heart fills it and the name `nameHeightScale` of it (60% by
 * default), each as wide as
 * its SVG's viewBox gives. The name is filled with the `logo.color` token, the theme's base text color;
 * the heart keeps its own colors in every theme. It renders as one image named by
 * `aria-label`.
 *
 * @example
 * ```tsx
 * <Logo />
 * <Logo height={32} theme="night" />
 * <Logo showName={false} />
 * ```
 */
const Logo: React.FC<LogoProps> = ({
  height,
  showName = true,
  nameHeightScale = 0.6,
  gap = 4,
  "aria-label": ariaLabel = "Nice Prototypes",
  theme,
}) => {
  const element = (
    <StyledLogo
      role="img"
      aria-label={ariaLabel}
      $height={height}
      $gap={gap}
    >
      <StyledHeart name="nice-heart" />
      {showName && (
        <StyledName $heightScale={nameHeightScale}>
          <LogoName />
        </StyledName>
      )}
    </StyledLogo>
  )

  return theme ? <Theme name={theme}>{element}</Theme> : element
}

export default Logo
