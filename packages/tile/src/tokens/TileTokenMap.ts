import { createTokens, mapCoreToken, type ComponentTokens } from "nice-react-styles"

export const TileTokenMap = {
  backgroundColor: mapCoreToken("backgroundColor"),
  foregroundColor: mapCoreToken("foregroundColor"),
} as const

export const tileTokens: ComponentTokens<typeof TileTokenMap> = createTokens(TileTokenMap, "tile")