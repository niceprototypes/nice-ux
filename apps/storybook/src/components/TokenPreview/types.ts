export interface TokenPreviewItem {
  key: string
  value: string
}

export interface TokenPreviewProps {
  items: TokenPreviewItem[]
}

export interface TokenPreviewItemProps {
  itemKey: string
  itemValue: string
}