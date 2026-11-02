import { urlOfDocsPage } from "../utilities/buildAppIndex"

/**
 * The URL App gives a docs section page, from its `pages` key: numbers left out, names as URL
 * segments (`./docs/2 Components/1 Forms/1 Button/index.tsx` → `/docs/components/forms/button`).
 * For links into the app from outside its router (a plain anchor, a full-page navigation).
 *
 * @param key - The page's key in the `pages` record
 */
export const getAppPageUrl = (key: string): string => urlOfDocsPage(key)
