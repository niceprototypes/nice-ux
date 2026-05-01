import VariableList from "../VariableList"

export interface StoryVariable {
  name: string
  description?: string
  key?: string
  var?: string
  value?: string
  demo?: React.ReactNode
  code?: string
  default?: boolean
}

interface StoryProps {
  variables: StoryVariable[]
  render?: (variables: StoryVariable[]) => React.ReactNode
}

const Story = ({ variables, render }: StoryProps) => {
  if (render) {
    return <>{render(variables)}</>
  }
  return <VariableList variables={variables} />
}

export default Story
