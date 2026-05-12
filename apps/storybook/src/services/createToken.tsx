import { getReactToken } from "nice-react-styles"
import type { StoryVariable } from "../components/Story"

export const createToken = <T extends string | { name: string }>(
  groupName: string,
  variants: T[],
  renderDemo?: (variant: T extends string ? string : T) => React.ReactNode
): StoryVariable[] => {
  return variants.map(variant => {
    const itemName = typeof variant === "string" ? variant : variant.name

    const token = getReactToken(groupName as any, itemName)
    return {
      name: itemName,
      key: token.key,
      var: token.var,
      value: token.value,
      demo: renderDemo ? renderDemo(variant as any) : undefined,
    }
  })
}
