import * as React from "react"
import { Theme } from "nice-react-styles"
import { IconProps } from "./Icon.types"
import { IconWrapperStyled, ImageStyled } from "./Icon.styles"
import { resolveIconComponent } from "../../utilities/resolveIconComponent"
import { getVendorIcon } from "../../services/registerVendorResolver"
import { isSpinning } from "../../utilities/isSpinning"

/**
 * A flexible and customizable React icon component with built-in icon set
 *
 * Three-tier icon resolution:
 * 1. Custom icons — always available, no flags needed
 * 2. Vendor icons — requires vendor resolver + vendor flag
 * 3. Direct vendor component — vendorComponent prop, bypasses all resolution
 *
 * @example
 * ```tsx
 * import Icon from 'nice-react-icon'
 *
 * // Custom icon (tier 1)
 * <Icon name="arrow-right" />
 *
 * // Vendor icon (tier 2) — requires nice-react-icon-vendor
 * <Icon name="TrendingDown" vendor />
 *
 * // Direct vendor component (tier 3)
 * <Icon vendorComponent={MyCustomIcon} color="error" />
 * ```
 */
const Icon: React.FC<IconProps> = ({
  name = "placeholder",
  variant,
  outlined = false,
  url,
  color = "base",
  size = "base",
  viewBox = "0 0 16 16",
  strokeWidth = "base",
  className,
  strokeScaling = false,
  theme,
  style,
  vendor = false,
  vendorComponent: VendorComponent,
  animation,
  animationDuration = "base",
}) => {
  // Back-compat: `spinner` still auto-spins when no explicit animation is set.
  const resolvedAnimation = animation ?? (isSpinning(name) ? "spin" : undefined)
  // Back-compat: deprecated `outlined` maps to the `fill` variant; an explicit
  // `variant` always takes precedence.
  const resolvedVariant = variant ?? (outlined ? "fill" : "base")
  const withTheme = (el: React.ReactElement) => (theme ? <Theme name={theme}>{el}</Theme> : el)

  // Tier 3: direct vendor component — bypass all resolution, apply token styling
  if (VendorComponent) {
    return withTheme(
      <IconWrapperStyled
        $color={color}
        $size={size}
        $variant={resolvedVariant}
        $strokeWidth={strokeWidth}
        $strokeScaling={strokeScaling}
        $animation={resolvedAnimation}
        $animationDuration={animationDuration}
        className={className}
        style={style}
      >
        <VendorComponent />
      </IconWrapperStyled>
    )
  }

  // Tier 1: custom icon — check internal map first
  const SvgIcon = resolveIconComponent(name, resolvedVariant)
  if (SvgIcon) {
    return withTheme(
      <IconWrapperStyled
        $color={color}
        $size={size}
        $variant={resolvedVariant}
        $strokeWidth={strokeWidth}
        $strokeScaling={strokeScaling}
        $animation={resolvedAnimation}
        $animationDuration={animationDuration}
        className={className}
        style={style}
      >
        {url ? <ImageStyled src={url} alt="" /> : <SvgIcon viewBox={viewBox} />}
      </IconWrapperStyled>
    )
  }

  // Tier 2: vendor icon — only when vendor flag is set and resolver is registered
  if (vendor) {
    const VendorIcon = getVendorIcon(name)
    if (VendorIcon) {
      return withTheme(
        <IconWrapperStyled
          $color={color}
          $size={size}
          $variant={resolvedVariant}
          $strokeWidth={strokeWidth}
          $strokeScaling={strokeScaling}
          $animation={resolvedAnimation}
          $animationDuration={animationDuration}
          className={className}
          style={style}
        >
          <VendorIcon />
        </IconWrapperStyled>
      )
    }
  }

  // Fallback: render placeholder — name not found in custom or vendor sets
  const PlaceholderIcon = resolveIconComponent("placeholder", resolvedVariant)
  return withTheme(
    <IconWrapperStyled
      $color={color}
      $size={size}
      $variant={resolvedVariant}
      $strokeWidth={strokeWidth}
      $strokeScaling={strokeScaling}
      $animation={resolvedAnimation}
      $animationDuration={animationDuration}
      className={className}
      style={style}
    >
      {PlaceholderIcon && <PlaceholderIcon viewBox={viewBox} />}
    </IconWrapperStyled>
  )
}

export default Icon