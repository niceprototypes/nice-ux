import type { IconNameType, IconVariant } from "../types"
import getIcon from "./getIcon"

interface GetEffectiveIconParams {
  name: IconNameType
  variant: IconVariant
}

/**
 * Gets the icon component based on name and variant
 * @param params - Icon configuration parameters
 * @returns The React component for the icon, or undefined if not found
 */
const getEffectiveIcon = ({ name, variant }: GetEffectiveIconParams): React.FC | undefined => {
  return getIcon(name, variant)
}

export default getEffectiveIcon