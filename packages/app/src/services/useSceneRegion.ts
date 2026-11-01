import { useAppContext } from "../utilities/AppContext"

/**
 * The scene region: the focusable element the scene renders in. A scene's keyboard and click
 * handling belongs to it, so the nav beside it keeps its own keys and clicks.
 */
export const useSceneRegion = () => useAppContext().region
