import type { StorybookConfig } from "@storybook/react-vite"
import { join, dirname } from "path"

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
  async viteFinal(config) {
    return {
      ...config,
      optimizeDeps: {
        exclude: ['nice-styles', 'nice-react-typography', 'nice-react-styles', 'nice-react-flex'],
      },
      server: {
        ...config.server,
        watch: {
          ...config.server?.watch,
          followSymlinks: true,
        },
      },
      resolve: {
        ...config.resolve,
        preserveSymlinks: false,
        alias: {
          ...config.resolve?.alias,
          'nice-react-flex': '/Users/mohammedibrahim/Code/nice-react-flex/src/index.ts',
          'nice-react-styles': '/Users/mohammedibrahim/Code/nice-react-styles/src/index.ts',
          'nice-react-typography': '/Users/mohammedibrahim/Code/nice-react-typography/src/index.ts',
        },
      },
    }
  },
}

export default config