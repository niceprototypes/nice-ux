import config from "@niceprototypes/config-jest/react"

// jest.setup.js fills in browser APIs jsdom lacks.
export default { ...config, setupFiles: ["<rootDir>/jest.setup.js"] }
