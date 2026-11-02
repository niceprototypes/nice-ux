/**
 * `@storybook/addon-docs/blocks` on this site. The Storybook MDX pages it renders import only
 * `Meta`, whose title the site reads from the file itself (pages.tsx); here it renders nothing.
 */
export const Meta = (_props: { title?: string; name?: string; of?: unknown }) => null
