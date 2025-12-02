import { getToken } from "nice-styles"

export const createToken = <T extends string | { name: string }>(
  groupName: string,
  variants: T[],
  renderDemo?: (variant: T extends string ? string : T) => React.ReactNode
) => {
  return variants.map(variant => {
    const itemName = typeof variant === "string" ? variant : variant.name

    const token = getToken(groupName as any, itemName)
    const code =
      itemName === "base"
        ? `getToken("${groupName}")`
        : `getToken("${groupName}", "${itemName}")`
    return {
      name: itemName,
      key: token.key,
      var: token.var,
      value: token.value,
      code,
      demo: renderDemo ? renderDemo(variant as any) : undefined,
    }
  })
}
