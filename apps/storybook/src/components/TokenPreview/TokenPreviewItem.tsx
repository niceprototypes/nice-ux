import React from "react"
import { TokenPreviewItemProps } from "./types"
import { ItemKey, ItemValue } from "./styles"

const TokenPreviewItem: React.FC<TokenPreviewItemProps> = ({ itemKey, itemValue }) => {
  return (
    <div>
      <ItemKey>{itemKey}</ItemKey>: <ItemValue>{itemValue}</ItemValue>
    </div>
  )
}

export default TokenPreviewItem