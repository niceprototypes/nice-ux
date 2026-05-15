import { getReactToken, getReactTokenKey, getReactTokenValue } from "nice-react-styles"
import type { StoryVariable } from "../components/Story"

export const createToken = <T extends string | { name: string }>(
  groupName: string,
  variants: T[],
  renderDemo?: (variant: T extends string ? string : T) => React.ReactNode
): StoryVariable[] => {
  return variants.map(variant => {
    const itemName = typeof variant === "string" ? variant : variant.name

    return {
      name: itemName,
      key: getReactTokenKey(groupName as any, itemName),
      var: getReactToken(groupName as any, itemName),
      value: getReactTokenValue(groupName as any, itemName),
      demo: renderDemo ? renderDemo(variant as any) : undefined,
    }
  })
}
