import React from "react"
import { TokenPreviewItemProps } from "./TokenPreview.types"
import { ItemKey, ItemValue } from "./TokenPreview.styles"

const TokenPreviewItem: React.FC<TokenPreviewItemProps> = ({ itemKey, itemValue }) => {
  return (
    <div>
      <ItemKey>{itemKey}</ItemKey>: <ItemValue>{itemValue}</ItemValue>
    </div>
  )
}

export default TokenPreviewItem