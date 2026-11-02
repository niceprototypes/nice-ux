/**
 * `@storybook/addon-links` on this site: `navigate({ storyId })` opens the docs page of that
 * Storybook id (`basics-tokens--docs`). The page index loads on first use, since the pages
 * that call this are part of it.
 */
export const navigate = ({ storyId }: { storyId: string }): void => {
  void import("../pages").then(({ docsUrlOf }) => {
    const url = docsUrlOf(storyId)
    if (url) window.location.assign(url)
  })
}
