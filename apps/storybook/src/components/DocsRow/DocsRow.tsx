import Flex from "nice-react-flex"
import { withBreakpoints } from "nice-react-styles"
import { Source } from "@storybook/addon-docs/blocks"
import { PreviewWrapper, RowFlex } from "./DocsRow.styles"
import { DocsRowProps } from "./DocsRow.types"

const BaseDocsRow = ({
  previewCell,
  code,
  language = "tsx",
  previewCellWidth,
  fullWidth = false,
}: DocsRowProps) => {
  const sourceBlock = (
    <Source
      language={language}
      code={code}
    />
  )

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

export const DocsRow = withBreakpoints<DocsRowProps>(BaseDocsRow, [
  {
    min: "tablet",
    props: {
      previewCellWidth: "45%",
    },
  },
])
