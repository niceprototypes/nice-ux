export interface VariableListProps {
  variables: Array<{
    name: string
    description?: string
    key?: string
    var?: string
    value?: string
    demo?: React.ReactNode
    code?: string
    default?: boolean
  }>
}
