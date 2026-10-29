/// <reference types="vitest/config" />
import path from "node:path"
import { fileURLToPath } from "node:url"
import { defineConfig } from "vitest/config"
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin"
import { playwright } from "@vitest/browser-playwright"

const dirname = path.dirname(fileURLToPath(import.meta.url))

/**
 * Story tests: every CSF story renders in headless Chromium and runs its `play` function.
 * The plugin reads `.storybook/main.ts`, so the source aliases in `viteFinal` apply here too.
 * https://storybook.js.org/docs/writing-tests/integrations/vitest-addon
 */
export default defineConfig({
  test: {
    projects: [
      {
        plugins: [storybookTest({ configDir: path.join(dirname, ".storybook") })],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [{ browser: "chromium" }],
          },
        },
      },
    ],
  },
})
