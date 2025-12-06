import type { IconNameType, IconType } from "../types"
import getIcon from "./getIcon"

interface GetEffectiveIconParams {
  name: IconNameType
  type: IconType
}

/**
 * Gets the icon component based on name and type
 * @param params - Icon configuration parameters
 * @returns The React component for the icon, or undefined if not found
 */
const getEffectiveIcon = ({ name, type }: GetEffectiveIconParams): React.FC | undefined => {
  return getIcon(name, type)
}

export default getEffectiveIcon