import config from "@niceprototypes/config-jest/react"

// jest.setup.js fills in browser APIs jsdom lacks; Code (through Markdown) is stubbed, see __mocks__/codeMock.js.
export default {
  ...config,
  setupFiles: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: { ...config.moduleNameMapper, "^@niceprototypes/code$": "<rootDir>/__mocks__/codeMock.js" },
}
