import * as React from "react"
import { Theme } from "@niceprototypes/styles"
import { IconProps } from "./Icon.types"
import { IconWrapperStyled, ImageStyled } from "./Icon.styles"
import { resolveIconComponent } from "../../utilities/resolveIconComponent"
import { getVendorIcon } from "../../services/registerVendorResolver"
import { isSpinning } from "../../utilities/isSpinning"
import { isDevelopment } from "../../utilities/isDevelopment"

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
 * import Icon from '@niceprototypes/icon'
 *
 * // Custom icon (tier 1)
 * <Icon name="arrow-right" />
 *
 * // Vendor icon (tier 2) — requires @niceprototypes/icon-vendor
 * <Icon name="TrendingDown" vendor />
 *
 * // Direct vendor component (tier 3)
 * <Icon vendorComponent={MyCustomIcon} color="error" />
 * ```
 */
const Icon: React.FC<IconProps> = ({
  name = "circle",
  variant,
  outlined = false,
  url,
  color = "base",
  size = "base",
  viewBox = "0 0 16 16",
  strokeWidth = "base",
  className,
  strokeScaling = false,
  darkAntialiasing,
  theme,
  style,
  vendor = false,
  vendorComponent: VendorComponent,
  animation,
  animationDuration = "base",
  "aria-label": ariaLabel,
}) => {
  // Back-compat: `spinner` still auto-spins when no explicit animation is set.
  const resolvedAnimation = animation ?? (isSpinning(name) ? "spin" : undefined)
  // Back-compat: deprecated `outlined` maps to the `fill` variant; an explicit
  // `variant` always takes precedence.
  const resolvedVariant = variant ?? (outlined ? "fill" : "base")
  const withTheme = (el: React.ReactElement) => (theme ? <Theme name={theme}>{el}</Theme> : el)
  const a11yProps = ariaLabel ? { role: "img", "aria-label": ariaLabel } : { "aria-hidden": true }

  // Tier 3: direct vendor component — bypass all resolution, apply token styling
  // Tier 1: custom icon — check internal map first
  // Tier 2: vendor icon — only when vendor flag is set and resolver is registered
  const SvgIcon = VendorComponent ? undefined : resolveIconComponent(name, resolvedVariant)
  const VendorIcon = VendorComponent || SvgIcon || !vendor ? null : getVendorIcon(name)
  let content: React.ReactNode
  if (VendorComponent) content = <VendorComponent />
  else if (SvgIcon) content = url ? <ImageStyled src={url} alt="" /> : <SvgIcon viewBox={viewBox} />
  else if (VendorIcon) content = <VendorIcon />
  else {
    // Fallback: render the circle — name not found in custom or vendor sets
    if (isDevelopment()) {
      console.warn(
        `@niceprototypes/icon: no icon named "${name}"` +
          (vendor ? " in the built-in set or the vendor resolver" : "; vendor names need the `vendor` prop") +
          `; rendering "circle".`
      )
    }
    const FallbackIcon = resolveIconComponent("circle", resolvedVariant)
    content = FallbackIcon && <FallbackIcon viewBox={viewBox} />
  }

  return withTheme(
    <IconWrapperStyled
      $color={color}
      $size={size}
      $variant={resolvedVariant}
      $strokeWidth={strokeWidth}
      $strokeScaling={strokeScaling}
      $darkAntialiasing={darkAntialiasing}
      $animation={resolvedAnimation}
      $animationDuration={animationDuration}
      className={className}
      style={style}
      data-icon={VendorComponent ? undefined : name}
      {...a11yProps}
    >
      {content}
    </IconWrapperStyled>
  )
}

export default Icon