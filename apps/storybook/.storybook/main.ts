import type { StorybookConfig } from "@storybook/react-vite"
import { join, dirname, resolve } from "path"

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): string {
  return dirname(require.resolve(join(value, "package.json")))
}

const config: StorybookConfig = {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-docs")
  ],
  staticDirs: ['../public'],
  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {},
  },
  docs: {},
  viteFinal: async (config) => {
    config.resolve = config.resolve || {}
    config.resolve.dedupe = [
      ...(config.resolve.dedupe || []),
      'styled-components',
      'react',
      'react-dom',
    ]
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'styled-components': resolve(__dirname, '../node_modules/styled-components'),
    }
    return config
  },
  typescript: {
    check: false,
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => {
        if (prop.parent) {
          return !prop.parent.fileName.includes("node_modules")
        }
        return true
      },
    },
  },
}

export default config