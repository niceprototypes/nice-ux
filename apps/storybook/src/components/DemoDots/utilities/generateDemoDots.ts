import { getToken, ForegroundColorType } from "nice-styles"
import { DemoProps } from "../../Demo/types"

export interface DotConfig {
  color: ForegroundColorType
  height?: string
}

const generateDemoDots = (configs: DotConfig[]): DemoProps[] => {
  return configs.map(({ color, height }) => ({
    backgroundColor: getToken("foregroundColor", color).var,
    borderRadius: "50%",
    style: {
      width: getToken("cellHeight", "smaller").var,
      height: height ?? getToken("cellHeight", "smaller").var,
    },
  }))
}

export { generateDemoDots }