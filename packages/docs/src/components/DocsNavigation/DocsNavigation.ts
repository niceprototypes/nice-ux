import * as React from "react"

/**
 * How a docs link opens another page, by its Storybook page id (`basics-tokens--docs`): the
 * host provides it (Storybook through addon-links, the docs site through its page index), so
 * the links carry no host API. Without a provider, links do nothing.
 */
export const DocsNavigationContext = React.createContext<(storyId: string) => void>(() => {})
