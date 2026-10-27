/** The Flex `grow` demo's multi-line source snippet, parameterized by factor. */
export const growCode = (factor: string) =>
  `<Flex>\n  <Flex grow={${factor}} />\n  <Flex grow={1} />\n</Flex>`
