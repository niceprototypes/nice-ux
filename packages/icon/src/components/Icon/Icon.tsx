import * as React from "react"
import { IconProps } from "./types"
import { IconWrapperStyled, ImageStyled } from "./styles"
import { getIcon } from "../../services/getIcon"
import { getVendorIcon } from "../../services/registerVendorResolver"
import { isSpinning } from "../../helpers/isSpinning"

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
 * <Icon name="arrow" />
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
  outlined = false,
  url,
  color = "base",
  size = "base",
  viewBox = "0 0 16 16",
  strokeWidth = "base",
  className,
  strokeScaling = false,
  mode,
  vendor = false,
  vendorComponent: VendorComponent,
}) => {
  const spinning = isSpinning(name)

  // Tier 3: direct vendor component — bypass all resolution, apply token styling
  if (VendorComponent) {
    return (
      <IconWrapperStyled
        $color={color}
        $size={size}
        $outlined={outlined}
        $strokeWidth={strokeWidth}
        $strokeScaling={strokeScaling}
        $spinning={spinning}
        $mode={mode}
        className={className}
      >
        <VendorComponent />
      </IconWrapperStyled>
    )
  }

  // Tier 1: custom icon — check internal map first
  const SvgIcon = getIcon(name, outlined)
  if (SvgIcon) {
    return (
      <IconWrapperStyled
        $color={color}
        $size={size}
        $outlined={outlined}
        $strokeWidth={strokeWidth}
        $strokeScaling={strokeScaling}
        $spinning={spinning}
        $mode={mode}
        className={className}
      >
        {url ? <ImageStyled src={url} alt="" /> : <SvgIcon viewBox={viewBox} />}
      </IconWrapperStyled>
    )
  }

  // Tier 2: vendor icon — only when vendor flag is set and resolver is registered
  if (vendor) {
    const VendorIcon = getVendorIcon(name)
    if (VendorIcon) {
      return (
        <IconWrapperStyled
          $color={color}
          $size={size}
          $outlined={outlined}
          $strokeWidth={strokeWidth}
          $strokeScaling={strokeScaling}
          $spinning={spinning}
          $mode={mode}
          className={className}
        >
          <VendorIcon />
        </IconWrapperStyled>
      )
    }
  }

  // Fallback: render placeholder — name not found in custom or vendor sets
  const PlaceholderIcon = getIcon("placeholder", outlined)
  return (
    <IconWrapperStyled
      $color={color}
      $size={size}
      $outlined={outlined}
      $strokeWidth={strokeWidth}
      $strokeScaling={strokeScaling}
      $spinning={spinning}
      $mode={mode}
      className={className}
    >
      {PlaceholderIcon && <PlaceholderIcon viewBox={viewBox} />}
    </IconWrapperStyled>
  )
}

export default Icon