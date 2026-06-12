import Flex from "nice-react-flex"
import { withBreakpoints } from "nice-react-styles"
import { CodeBlock } from "../CodeBlock"
import { PreviewWrapper, RowFlex } from "./CodeRow.styles"
import { CodeRowProps } from "./CodeRow.types"

const BaseCodeRow = ({
  previewCell,
  code,
  language = "tsx",
  previewCellWidth,
  fullWidth = false,
}: CodeRowProps) => {
  const sourceBlock = (Array.isArray(code) ? code : [code]).map((snippet, index) => (
    <CodeBlock
      key={index}
      code={snippet}
      language={language}
    />
  ))

  if (fullWidth) {
    return (
      <>
        <PreviewWrapper $fullWidth>
          <Flex>{previewCell}</Flex>
        </PreviewWrapper>
        <RowFlex
          direction="column"
          gap="large"
          breakpoints={{
            "tablet+": {
              direction: "row",
              alignItems: "center",
            },
          }}
        >
          {sourceBlock}
        </RowFlex>
      </>
    )
  }

  return (
    <RowFlex
      direction="column"
      gap="large"
      breakpoints={{
        "tablet+": {
          direction: "row",
          alignItems: "center",
        },
      }}
    >
      <PreviewWrapper $width={previewCellWidth}>
        <Flex>{previewCell}</Flex>
      </PreviewWrapper>
      {sourceBlock}
    </RowFlex>
  )
}

export const CodeRow = withBreakpoints<CodeRowProps>(BaseCodeRow, {
  "tablet+": {
    previewCellWidth: "45%",
  },
})
